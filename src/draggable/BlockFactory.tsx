import { ComponentPublicInstance, createStaticVNode, createVNode, defineComponent } from "vue";
import lodash from "lodash";
import { hasValue, isArray, isStr } from "@/utils/Typeof";
import { AnyFunction, VueComponent } from "@/draggable/types/Base";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { ComponentManageModel } from "@/draggable/models/ComponentManageModel";
import { blockDeepTransform, deepBindThis, deepExtractBlock, propsTransform, renderTpl } from "@/draggable/utils/BlockPropsTransform";
import { RuntimeBlock, RuntimeBlockNode, RuntimeComponentNode } from "@/draggable/types/RuntimeBlock";

/** 组件管理器实例 */
const componentManage = new ComponentManageModel();

/** Block vue 组件的内部属性名 */
const innerName = {
    /** DesignBlock 对象，只有顶层 Block 拥有此属性 */
    designBlock: /*     */ Symbol('__design_block__'),
    /** 当前层级 Block 所对应的 RuntimeBlock 对象 */
    runtimeBlock: /*    */ Symbol('__runtime_block__'),
}

/** 创建 BlockComponent 时的全局上下文 */
class FactoryContext {
    /** 当前所有的 Block vue 组件 */
    readonly allBlock: Record<string, VueComponent> = {};

    /**
     * “表达式”和“模版”的扩展参数
     */
    toExtData(): object {
        return {
            $allBlock: this.allBlock,
        };
    }
}

/**
 * 基于 DesignBlock 动态创建 vue 组件
 */
function createBlockComponent(block: DesignBlock) {
    const designBlock: DesignBlock = block;
    // 深度克隆 block 对象，保护原始 block 对象不被篡改
    block = lodash.cloneDeep(designBlock);
    // 递归处理 Block 属性，使它符合 vue 组件的规范
    const runtimeBlock = blockDeepTransform(block, componentManage);
    const factoryContext = new FactoryContext();
    // 递归初始化 allBlock
    deepExtractBlock(runtimeBlock, factoryContext.allBlock);
    // 创建组件
    const blockComponent = createRuntimeBlockComponent(runtimeBlock, factoryContext, designBlock);
    runtimeBlock.__blockComponent = blockComponent;
    return blockComponent;
}

/**
 * 基于 RuntimeBlock 动态创建 vue 组件
 */
function createRuntimeBlockComponent(runtimeBlock: RuntimeBlock, context: FactoryContext, designBlock?: DesignBlock) {
    const {
        id,
        ref,
        type,
        props,
        data,
        computed,
        methods,
        watch,
        lifeCycles,
        items,
        tpl,
    } = runtimeBlock;
    // 内置默认的异常处理
    if (!lifeCycles.errorCaptured) {
        lifeCycles.errorCaptured = function (err: Error, instance: ComponentPublicInstance | null, info: string) {
            // 组件渲染报错时的默认处理
        }
    }
    // 组件卸载时释放资源
    const unmounted = lifeCycles.unmounted;
    lifeCycles.unmounted = function () {
        if (unmounted) unmounted.call(this);
        // 可以在这里释放组件依赖的资源
    };
    // 当前组件类型
    const Component: any = type;
    return defineComponent({
        ...lifeCycles,
        props: {
            style: Object,
            class: String,
        },
        setup(props, ctx) {
            // const instance = getCurrentInstance()!;
            // const exposed: Record<string, any> = {};
            // ctx.expose(exposed);
        },
        data(vm: any) {
            // 深度绑定 this 指针
            deepBindThis(runtimeBlock, vm);
            // 保存原始的 block 对象
            if (hasValue(designBlock)) {
                vm[innerName.designBlock] = designBlock;
            }
            // 保存当前运行时的 block 对象
            vm[innerName.runtimeBlock] = runtimeBlock;
            // 更新 context.allBlock
            context.allBlock[runtimeBlock.ref] = vm;
            // 返回组件数据
            return data;
        },
        computed: computed,
        methods: methods,
        watch: watch,
        render(this: any) {
            const newProps = propsTransform(props, this, this[innerName.runtimeBlock], context.toExtData());
            let children: any = undefined;
            if (items.length > 0) {
                // 子组件
                children = items.map((node, idx) => createChildVNode(node, context, this, idx));
            } else if (tpl.length > 0) {
                // html模版
                const staticHtml = renderTpl(tpl, this, runtimeBlock, context.toExtData());
                children = [createStaticVNode(staticHtml, 0)];
            }
            return (
                <Component {...newProps} {...this.$attrs} {...this.$props} {...runtimeBlock.__bindListeners} key={id} ref={ref}>
                    {children}
                </Component>
            );
        },
    });
}

/**
 * 基于 ComponentNode 创建 VNode
 */
function createChildVNode(child: RuntimeBlockNode, context: FactoryContext, instance: any, nodeIdx: number) {
    // 静态 html 文本
    if (isStr(child)) return createStaticVNode(child, nodeIdx);
    // RuntimeBlock
    const currBlock = child as RuntimeBlock;
    if (currBlock.block) {
        if (!currBlock.__blockComponent) {
            currBlock.__blockComponent = createRuntimeBlockComponent(currBlock, context);
        }
        return createVNode(currBlock.__blockComponent);
    }
    // RuntimeComponentNode
    const childNode = child as RuntimeComponentNode;
    // 当前层级 Block 所对应的 RuntimeBlock 对象
    const runtimeBlock = instance[innerName.runtimeBlock];
    // 插槽和子组件(default插槽其实就是子组件)
    const children: Record<string, AnyFunction<any, Array<any>>> = {
        default: () => ([]),
    };
    // TODO 设置插槽 待验证，需要使用 withCtx(slotProps=> [...VNode])
    for (let name in childNode.slots) {
        const slot = childNode.slots[name];
        if (isArray(slot)) {
            children[name] = () => slot.map((item, idx) => createChildVNode(item, context, instance, idx));
        } else {
            children[name] = () => [createChildVNode(slot, context, instance, 0)];
        }
    }
    // 设置子组件
    if (childNode.items.length > 0) {
        // 子组件
        children.default = () => childNode.items.map((item, idx) => createChildVNode(item, context, instance, idx));
    } else if (childNode.tpl.length > 0) {
        // html模版
        const staticHtml = renderTpl(child.tpl, instance, runtimeBlock, context.toExtData());
        children.default = () => ([createStaticVNode(staticHtml, 0)]);
    }
    // 处理 props 表达式(属性的绑定)
    const props = propsTransform(child.props, instance, runtimeBlock, context.toExtData());
    // 创建 VNode
    return createVNode(
        child.type,
        {
            key: child.id,
            ref: child.ref,
            ...props,
            ...child.__bindListeners,
        },
        children,
    );
    // TODO 应用指令
    // vnode = withDirectives(
    //     vnode,
    //     [
    //         [
    //             // 不能使用内置指令
    //             resolveDirective('focus'),
    //             // {},
    //             // "",
    //             // {},
    //         ],
    //     ],
    // )
    // return vnode;
}

/**
 * 定义一个 DesignBlock 对象，仅仅是为了类型声明，无任何处理逻辑
 */
function defineDesignBlock(designBlock: DesignBlock): DesignBlock {
    return designBlock;
}

export {
    createBlockComponent,
    defineDesignBlock,
}
