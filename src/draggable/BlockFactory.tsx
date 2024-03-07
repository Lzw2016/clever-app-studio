import { ComponentPublicInstance, createVNode, defineComponent, Fragment, renderList, resolveDirective, withDirectives } from "vue";
import lodash from "lodash";
import { hasValue, isArray, isObj, isStr } from "@/utils/Typeof";
import { AnyFunction, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, DesignBlock } from "@/draggable/types/DesignBlock";
import { ComponentManageModel } from "@/draggable/models/ComponentManageModel";
import { blockDeepTransform, deepBindThis, deepExtractBlock, expTransform, propsTransform, renderTpl } from "@/draggable/utils/BlockPropsTransform";
import { RuntimeBlock, RuntimeBlockNode, RuntimeComponentNode } from "@/draggable/types/RuntimeBlock";
import { parseHTML } from "@/draggable/utils/HtmlTag";
import { calcExpression } from "@/utils/Expression";

/** 组件管理器实例 */
const componentManage = new ComponentManageModel();

/** Block vue 组件的内部属性名 */
const innerName = {
    /** DesignBlock 对象，只有顶层 Block 拥有此属性 */
    designBlock: /*     */ Symbol('__design_block__'),
    /** 当前层级 Block 所对应的 RuntimeBlock 对象 */
    runtimeBlock: /*    */ Symbol('__runtime_block__'),
}

/**
 * 创建 BlockComponent 时的全局上下文
 */
class Global {
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
 * 当前调用的上下文，不能在函数间传递这个对象(需要创建)
 */
interface Context {
    /**  当前渲染节点所属的 vue 组件实例 */
    readonly instance: any;
    /** 当前渲染节点所属的 RuntimeBlock 对象 */
    readonly block: RuntimeBlock;
    /** 当前渲染节点所属的 RuntimeComponentNode 对象 */
    readonly node: RuntimeComponentNode;
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
    const global = new Global();
    // 递归初始化 allBlock
    deepExtractBlock(runtimeBlock, global.allBlock);
    // 创建组件
    const blockComponent = createRuntimeBlockComponent(runtimeBlock, global, designBlock);
    runtimeBlock.__blockComponent = blockComponent;
    return blockComponent;
}

/**
 * 基于 RuntimeBlock 动态创建 vue 组件
 * @param runtimeBlock  当前需要渲染的 Block 对象
 * @param global        全局的 global 对象
 * @param designBlock   根 DesignBlock 对象
 */
function createRuntimeBlockComponent(runtimeBlock: RuntimeBlock, global: Global, designBlock?: DesignBlock) {
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
            // 更新 global.allBlock
            global.allBlock[runtimeBlock.ref] = vm;
            // 返回组件数据
            return data;
        },
        computed: computed,
        methods: methods,
        watch: watch,
        render(this: any) {
            try {
                const context: Context = {
                    instance: this,
                    block: runtimeBlock,
                    node: runtimeBlock,
                };
                return createChildVNode(runtimeBlock, context, global, true);
            } catch (e) {
                console.warn("组件渲染失败", runtimeBlock, e);
                // TODO 优化错误渲染组件(使用对话框查看错误详情)
                return createVNode('span', {}, ['组件渲染失败']);
            }
        },
    });
}

/**
 * 基于 RuntimeBlockNode 创建 VNode
 * @param child             当前节点信息
 * @param context           上层函数数据
 * @param global            全局的 global 对象
 * @param startRenderBlock  当前是否是开始渲染 RuntimeBlock
 */
function createChildVNode(child: RuntimeBlockNode, context: Context, global: Global, startRenderBlock: boolean = false) {
    const {
        instance,
        block,
        node,
    } = context;
    // 静态 html 文本
    if (isStr(child)) {
        const tpl = [child];
        const props = propsTransform(node.props, instance, block, global.toExtData());
        const staticHtml = renderTpl(tpl, props, instance, undefined, global.toExtData());
        return createHtmlVNode(staticHtml);
    }
    // RuntimeBlock
    const childBlock = child as RuntimeBlock;
    if (!startRenderBlock && childBlock.block) {
        if (!childBlock.__blockComponent) {
            childBlock.__blockComponent = createRuntimeBlockComponent(childBlock, global);
        }
        return createVNode(childBlock.__blockComponent);
    }
    // RuntimeComponentNode
    const runtimeNode = child as RuntimeComponentNode;
    // 组件类型
    const component: any = runtimeNode.type;
    // 处理 props 表达式(属性的绑定)
    const props = propsTransform(runtimeNode.props, instance, block, global.toExtData());
    const allProps = {
        ...props,
        ...(startRenderBlock ? { ...instance.$attrs, ...instance.$props } : {}),
        ...runtimeNode.__bindListeners,
        key: runtimeNode.id,
        ref: runtimeNode.ref,
    };
    // 应用指令 - if
    if (runtimeNode.directives.if) {
        const needRender = expTransform(runtimeNode.directives.if, instance, block, global.toExtData());
        if (!needRender) return undefined;
    }
    // 应用指令 - show
    if (runtimeNode.directives.show) {
        const show = expTransform(runtimeNode.directives.show, instance, block, global.toExtData());
        _setShowStyle(allProps, show);
    }
    // 应用指令 - for
    if (runtimeNode.directives.for) {
        let {
            data,
            item,
            key,
            index,
        } = runtimeNode.directives.for;
        data = lodash.trim(data);
        item = lodash.trim(item);
        key = lodash.trim(key);
        index = lodash.trim(index);
        if (data.length > 0 && item.length > 0) {
            let renderListData = expTransform(data, instance, block, global.toExtData());
            if (!isObj(renderListData)) renderListData = [];
            return createVNode(
                Fragment,
                undefined,
                renderList(renderListData, (itemData, idx: number) => {
                    // 计算 vnode key
                    let keyOrIdx = `_for_${idx}`;
                    if (key) keyOrIdx = calcExpression(key, itemData, { thisArg: itemData, cache: false });
                    // 设置 vnode props
                    const innerProps = { ...allProps, key: keyOrIdx };
                    if (item) innerProps[item] = itemData;
                    if (key) innerProps[key] = keyOrIdx;
                    if (index) innerProps[index] = keyOrIdx;
                    return doCreateChildVNode(runtimeNode, component, innerProps, global, instance, block);
                })
            );
        }
    }
    return doCreateChildVNode(runtimeNode, component, allProps, global, instance, block);
}

/**
 * @param runtimeNode   runtimeNode 运行时的渲染节点对象
 * @param component     当前 runtimeNode 应该使用的 vue 组件
 * @param allProps      已经合并了的 props
 * @param global        全局的 global 对象
 * @param instance      当前 runtimeNode 所属的 vue 组件实例
 * @param runtimeBlock  当前层级 Block 所对应的 RuntimeBlock 对象
 */
function doCreateChildVNode(runtimeNode: RuntimeComponentNode, component: any, allProps: Record<string, any>, global: Global, instance: any, runtimeBlock: RuntimeBlock) {
    const context: Context = {
        instance: instance,
        block: runtimeBlock,
        node: runtimeNode,
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
            slots[name] = () => slot.map(item => createChildVNode(item, context, global));
        }
    }
    if (runtimeNode.items.length > 0) {
        // 子组件
        children = runtimeNode.items.map(item => createChildVNode(item, context, global));
    } else if (runtimeNode.tpl.length > 0) {
        // html模版
        const staticHtml = renderTpl(runtimeNode.tpl, allProps, instance, runtimeBlock, global.toExtData());
        children = [createHtmlVNode(staticHtml, allProps, component)];
    }
    if (children) slots.default = () => children!;
    /*
     * 创建 VNode
     * 1. component === Fragment || runtimeNode.__htmlTag
     *      没有插槽
     *      createVNode(component, allProps, [children]);
     * 2. runtimeNode.items===null
     *      没有 children
     *      createVNode(component, allProps, null);
     * 3. 插槽 & children
     *      createVNode(component, allProps, {children});
     */
    let vnode: any;
    if (component === Fragment || runtimeNode.__htmlTag) {
        // 1.没有插槽
        vnode = createVNode(component, allProps, children);
    } else if (runtimeNode.items.length <= 0) {
        // 2.没有 children
        vnode = createVNode(component, allProps, null);
    } else {
        // 3.插槽 & children
        vnode = createVNode(component, allProps, children);
    }
    // 应用其他用户自定义指令
    vnode = _applyDirectives(vnode, runtimeNode.directives);
    return vnode;
}

/**
 * 基于 HTML 创建 VNode
 * @param staticHtml    静态的html片段
 * @param allProps      html片段所属node的属性
 * @param component     html片段所属node的组件信息
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
 * 设置组件是否显示
 */
function _setShowStyle(props: any, show: boolean) {
    const cssShow = show ? 'unset' : 'hidden';
    if (!props.style) props.style = {};
    if (isObj(props.style)) {
        props.style.visibility = cssShow;
    } else if (isStr(props.style)) {
        props.style = `${props.style};visibility: ${cssShow};`
    }
}

/**
 *  应用其他用户自定义指令
 */
function _applyDirectives<Directives extends BaseDirectives = BaseDirectives>(vnode: any, directives: Directives) {
    const innerDirectives = ['show', 'if', 'for'];
    const useDirectives: Array<any> = [];
    for (let name in directives) {
        if (innerDirectives.includes(name)) {
            continue;
        }
        const param = directives[name];
        const directive = resolveDirective(name);
        if (directive) {
            // [directive: Directive, value:any, argument:string, modifiers: Record<string, boolean>]
            let value: any;
            let argument: string | undefined;
            let modifiers: Record<string, boolean> | undefined;
            if (isArray(param)) {
                value = param[0];
                argument = param[1];
                modifiers = param[3];
            } else if (isObj(param)) {
                value = param.value;
                argument = param.argument;
                modifiers = param.modifiers;
            }
            useDirectives.push([directive, value, argument, modifiers]);
        }
    }
    if (useDirectives.length > 0) {
        vnode = withDirectives(vnode, useDirectives)
    }
    return vnode;
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
