import { ComponentPublicInstance, createVNode, defineComponent, Fragment } from "vue";
import lodash from "lodash";
import { hasValue, isStr } from "@/utils/Typeof";
import { AnyFunction, VueComponent } from "@/draggable/types/Base";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { ComponentManageModel } from "@/draggable/models/ComponentManageModel";
import { blockDeepTransform, deepBindThis, deepExtractBlock, propsTransform, renderTpl } from "@/draggable/utils/BlockPropsTransform";
import { RuntimeBlock, RuntimeBlockNode, RuntimeComponentNode } from "@/draggable/types/RuntimeBlock";
import { parseHTML } from "@/draggable/utils/HtmlTag";

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
        data,
        computed,
        methods,
        watch,
        lifeCycles,
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
    return defineComponent({
        ...lifeCycles,
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
            return createRuntimeComponentNode(runtimeBlock, context, this, true);
        },
    });
}

/**
 * 基于 ComponentNode 创建 VNode
 */
function createChildVNode(child: RuntimeBlockNode, context: FactoryContext, instance: any) {
    // 静态 html 文本
    if (isStr(child)) {
        const staticHtml = renderTpl([child], instance, undefined, context.toExtData());
        return createHtmlVNode(staticHtml);
    }
    // RuntimeBlock
    const currBlock = child as RuntimeBlock;
    if (currBlock.block) {
        if (!currBlock.__blockComponent) {
            currBlock.__blockComponent = createRuntimeBlockComponent(currBlock, context);
        }
        return createVNode(currBlock.__blockComponent);
    }
    // RuntimeComponentNode
    const runtimeNode = child as RuntimeComponentNode;
    return createRuntimeComponentNode(runtimeNode, context, instance);
}

/**
 * 基于 RuntimeComponentNode 创建 VNode
 */
function createRuntimeComponentNode(runtimeNode: RuntimeComponentNode, context: FactoryContext, instance: any, isBlock: boolean = false) {
    // 当前层级 Block 所对应的 RuntimeBlock 对象
    const runtimeBlock = instance[innerName.runtimeBlock];
    // 组件类型
    const component: any = runtimeNode.type;
    // 处理 props 表达式(属性的绑定)
    const props = propsTransform(runtimeNode.props, instance, runtimeBlock, context.toExtData());
    const allProps = {
        ...props,
        ...(isBlock ? { ...instance.$attrs, ...instance.$props } : {}),
        ...runtimeNode.__bindListeners,
        key: runtimeNode.id,
        ref: runtimeNode.ref,
    };
    // 子组件和插槽(子组件就是default插槽)
    let children: Array<any> | undefined;
    const slots: Record<string, AnyFunction<any, Array<any>>> = {
        default: () => ([]),
    };
    if (!runtimeNode.__htmlTag && component != Fragment) {
        // TODO 设置插槽 待验证，需要使用 withCtx(slotProps=> [...VNode])
        for (let name in runtimeNode.slots) {
            const slot = runtimeNode.slots[name];
            slots[name] = () => slot.map(item => createChildVNode(item, context, instance));
        }
    }
    if (runtimeNode.items.length > 0) {
        // 子组件
        children = runtimeNode.items.map(item => createChildVNode(item, context, instance));
    } else if (runtimeNode.tpl.length > 0) {
        // html模版
        const staticHtml = renderTpl(runtimeNode.tpl, instance, runtimeBlock, context.toExtData());
        children = [createHtmlVNode(staticHtml, allProps, component)];
    }
    if (children) slots.default = () => children!;
    /*
     * 创建 VNode  // TODO 应用指令
     * 1. component === Fragment || runtimeNode.__htmlTag
     *      没有插槽
     *      createVNode(component, allProps, [children]);
     * 2. runtimeNode.items===null
     *      没有 children
     *      createVNode(component, allProps, null);
     * 3. 插槽 & children
     *      createVNode(component, allProps, {children});
     */
    if (component === Fragment || runtimeNode.__htmlTag) {
        // 1.没有插槽
        return createVNode(component, allProps, children);
    }
    if (runtimeNode.items.length <= 0) {
        // 2.没有 children
        return createVNode(component, allProps, null);
    }
    // 3.插槽 & children
    return createVNode(component, allProps, children);
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
 * 基于 HTML 创建 VNode
 */
function createHtmlVNode(staticHtml: string, allProps?: Record<string, any>, component?: any) {
    const defComponent = 'span';
    if (!allProps) allProps = {};
    if (isStr(component)) {
        component = lodash.trim(component);
        if (component.length <= 0) component = undefined;
    }
    if (component) {
        if (component === Fragment) component = defComponent;
        allProps.innerHTML = staticHtml;
        return createVNode(component, allProps, null);
    }
    const htmlInfo = parseHTML(staticHtml);
    if (htmlInfo.onlyOne) {
        return createVNode(htmlInfo.tagName, { ...allProps, ...htmlInfo.attrs, innerHTML: htmlInfo.innerHTML }, null);
    }
    allProps.innerHTML = staticHtml;
    return createVNode(defComponent, allProps, null);
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
