import { ComponentPublicInstance, createVNode, defineComponent, Fragment, renderList, resolveDirective, vModelCheckbox, vModelRadio, vModelSelect, vModelText, VNode, vShow, withCtx, withDirectives } from "vue";
import lodash from "lodash";
import { isArray, isObj, isStr, noValue } from "@/utils/Typeof";
import { calcExpression, getKeyPathValue, setKeyPathValue } from "@/utils/Expression";
import { componentManage } from "@/draggable/Constant";
import { ComponentInstance, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, DesignBlock, DesignNode } from "@/draggable/types/DesignBlock";
import { RenderErrType, RuntimeBlock, RuntimeBlockNode, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { isHtmlTag, parseHTML } from "@/draggable/utils/HtmlTag";
import { blockDeepTransform, deepBindThis, deepExtractBlock, expTransform, propsTransform, renderTpl } from "@/draggable/utils/BlockPropsTransform";
import BlockRenderError from "@/draggable/components/BlockRenderError.vue";
import { ComponentManage } from "@/draggable/types/ComponentManage";

/** 创建渲染组件的配置 */
interface CreateBlockConfig {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 是否是设计时 */
    isDesigning: boolean;
}

/**
 * 创建 BlockComponent 时的全局上下文
 */
interface Global extends CreateBlockConfig {
    /** 当前所有的 Block vue 组件 */
    readonly allBlock: Record<string, VueComponent>;
    /** 当前渲染的顶层 DesignBlock */
    readonly designBlock: DesignBlock;
}

/**
 * 当前调用的上下文，不能在函数间传递这个对象(需要创建)
 */
interface Context {
    /**  当前渲染节点所属的 vue 组件实例 */
    readonly instance: any;
    /** 当前渲染节点所属的 RuntimeBlock 对象 */
    readonly block: RuntimeBlock;
    /** 当前渲染节点所属的 RuntimeNode 对象 */
    readonly node: RuntimeNode;
    /** v-for指令的上下文数据 */
    vForData?: Record<string, any>;
    /** 插槽中的 props 数据 */
    slotProps?: Record<string, any>;
}

// 创建渲染组件的默认配置
const defConfig: CreateBlockConfig = {
    componentManage: componentManage,
    isDesigning: false,
};

/**
 * 基于 DesignBlock 动态创建 vue 组件
 */
function createBlockComponent(block: DesignBlock, config: CreateBlockConfig = defConfig) {
    const designBlock: DesignBlock = block;
    // 深度克隆 block 对象，保护原始 block 对象不被篡改
    block = lodash.cloneDeep(designBlock);
    // 新建全局上下文
    const global: Global = { ...config, allBlock: {}, designBlock: designBlock };
    let runtimeBlock: RuntimeBlock;
    try {
        // 递归处理 Block 属性，使它符合 vue 组件的规范
        runtimeBlock = blockDeepTransform(block, global.componentManage);
    } catch (e) {
        return createVNode(BlockRenderError, {
            msg: "解析 DesignBlock 失败",
            errType: RenderErrType.blockDeepTransform,
            errConfig: block,
            node: block, error: e,
        });
    }
    // console.log("createBlockComponent", runtimeBlock);
    // 递归初始化 allBlock
    deepExtractBlock(runtimeBlock, global.allBlock);
    // 创建组件
    const blockComponent = createRuntimeBlockComponent(runtimeBlock, global);
    runtimeBlock.__blockComponent = blockComponent;
    return blockComponent;
}

/**
 * 基于 RuntimeBlock 动态创建 vue 组件
 * @param runtimeBlock  当前需要渲染的 Block 对象
 * @param global        全局的 global 对象
 */
function createRuntimeBlockComponent(runtimeBlock: RuntimeBlock, global: Global) {
    // console.log("createRuntimeBlockComponent", runtimeBlock);
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
            vm.__global = global
            // 深度绑定 this 指针
            deepBindThis(runtimeBlock, vm);
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
 * @param context           当前调用的上下文
 * @param global            全局的 global 对象
 * @param startRenderBlock  当前是否是开始渲染 RuntimeBlock
 */
function createChildVNode(child: RuntimeBlockNode, context: Context, global: Global, startRenderBlock: boolean = false) {
    // console.log("createChildVNode", child);
    const fromInstance = context.instance;
    const fromBlock = context.block;
    const fromNode = context.node;
    const extData = _toExtData(global, context);
    // 静态 html 文本
    if (isStr(child)) {
        // html模版 items -> tlp
        const tpl = [child];
        try {
            const props = propsTransform(fromNode.props, fromInstance, fromBlock, extData);
            try {
                const staticHtml = renderTpl(tpl, props, fromInstance, fromBlock, extData);
                return createHtmlVNode(staticHtml);
            } catch (e) {
                return createVNode(BlockRenderError, {
                    msg: `渲染模版失败，tpl: \n${tpl.join('\n')}\n`,
                    errType: RenderErrType.renderTpl,
                    errConfig: tpl,
                    node: child, error: e,
                });
            }
        } catch (e) {
            return createVNode(BlockRenderError, {
                msg: `计算渲染节点属性失败，props: \n${JSON.stringify(fromNode.props, null, 4)}\n`,
                errType: RenderErrType.propsTransform,
                errConfig: fromNode.props,
                node: child, error: e,
            });
        }
    }
    // RuntimeBlock
    const childBlock = child as RuntimeBlock;
    if (!startRenderBlock && childBlock.block) {
        if (!childBlock.__blockComponent) {
            childBlock.__blockComponent = createRuntimeBlockComponent(childBlock, global);
        }
        return createVNode(childBlock.__blockComponent);
    }
    // RuntimeNode
    const runtimeNode = child as RuntimeNode;
    // 组件类型
    const component: any = runtimeNode.__type;
    // 处理 props 表达式(属性的绑定)
    let props: any;
    try {
        props = propsTransform(runtimeNode.props, fromInstance, fromBlock, extData);
    } catch (e) {
        return createVNode(BlockRenderError, {
            msg: `计算渲染节点属性失败，props: \n${JSON.stringify(runtimeNode.props, null, 4)}\n`,
            errType: RenderErrType.propsTransform,
            errConfig: runtimeNode.props,
            node: child, error: e,
        });
    }
    const allProps = {
        ...props,
        ...(startRenderBlock ? { ...fromInstance.$attrs, ...fromInstance.$props } : {}),
        ...runtimeNode.__bindListeners,
        key: runtimeNode.id,
        ref: runtimeNode.ref,
    };
    // 应用指令 - if
    if (runtimeNode.directives.if) {
        try {
            const needRender = expTransform(runtimeNode.directives.if, fromInstance, fromBlock, extData);
            if (!needRender) return undefined;
        } catch (e) {
            return createVNode(BlockRenderError, {
                msg: `计算v-if指令表达式失败，v-if: ${runtimeNode.directives.if}`,
                errType: RenderErrType.expTransform,
                errConfig: runtimeNode.directives.if,
                node: child, error: e,
            });
        }
    }
    // 应用指令 - show
    if (runtimeNode.directives.show) {
        try {
            const show = expTransform(runtimeNode.directives.show, fromInstance, fromBlock, extData);
            // 这里配置一下 show 指令参数，具有应用指令需要在 _applyDirectives 中实现
            runtimeNode.directives.__inner_show = {
                value: show,
            };
            // _setShowStyle(allProps, show);
        } catch (e) {
            return createVNode(BlockRenderError, {
                msg: `计算v-show指令表达式失败，v-show: ${runtimeNode.directives.show}`,
                errType: RenderErrType.expTransform,
                errConfig: runtimeNode.directives.show,
                node: child, error: e
            });
        }
    }
    // 应用指令 - v-model
    if (runtimeNode.directives.model) {
        const modelValue = getKeyPathValue(runtimeNode.directives.model, fromInstance);
        if (!child.__htmlTag) {
            // vue 组件
            if (noValue(allProps.modelValue)) {
                allProps.modelValue = modelValue;
            }
            if (!allProps['onUpdate:modelValue']) {
                allProps['onUpdate:modelValue'] = function (value: any) {
                    if (runtimeNode.directives.model) {
                        setKeyPathValue(runtimeNode.directives.model, fromInstance, value);
                    }
                }
            }
        } else if (['input', 'select'].includes(child.__type as string)) {
            if (!allProps['onUpdate:modelValue']) {
                allProps['onUpdate:modelValue'] = function (value: any) {
                    if (runtimeNode.directives.model) {
                        setKeyPathValue(runtimeNode.directives.model, fromInstance, value);
                    }
                }
            }
            // 原生html，这里配置一下 model 指令参数，具有应用指令需要在 _applyDirectives 中实现
            runtimeNode.directives.__inner_model = { value: modelValue };
            let fun: any = vModelText;
            if (child.__type === "input") {
                if ("checkbox" === child.props?.type) {
                    fun = vModelCheckbox;
                } else if ("radio" === child.props?.type) {
                    fun = vModelRadio;
                }
            } else if (child.__type === "select") {
                fun = vModelSelect;
            }
            runtimeNode.directives.__inner_model.fun = fun;
        }
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
            let renderListData: any;
            try {
                renderListData = expTransform(data, fromInstance, fromBlock, extData);
            } catch (e) {
                return createVNode(BlockRenderError, {
                    msg: `计算v-for指令表达式失败，v-for: \n${JSON.stringify(runtimeNode.directives.for, null, 4)}\n`,
                    errType: RenderErrType.expTransform,
                    errConfig: runtimeNode.directives.for,
                    node: child, error: e
                });
            }
            if (!isObj(renderListData)) renderListData = [];
            return createVNode(
                Fragment,
                undefined,
                renderList(renderListData, (itemData, keyOrIdx: number) => {
                    // 计算 vnode key
                    let vnodeKey = `_for_${keyOrIdx}`;
                    if (key) vnodeKey = calcExpression(key, itemData, { thisArg: itemData, cache: false });
                    // 设置 vnode key
                    allProps.key = vnodeKey;
                    allProps.ref = `${allProps.ref}_${keyOrIdx}`;
                    // 设置指令变量
                    const vForData = {};
                    if (index) vForData[index] = keyOrIdx;
                    if (item) vForData[item] = itemData;
                    context.vForData = vForData;
                    return doCreateChildVNode(runtimeNode, context, global, component, allProps);
                })
            );
        }
    }
    return doCreateChildVNode(runtimeNode, context, global, component, allProps);
}

/**
 * @param runtimeNode   runtimeNode 运行时的渲染节点对象
 * @param context       当前调用的上下文
 * @param global        全局的 global 对象
 * @param component     当前 runtimeNode 应该使用的 vue 组件
 * @param props         已经计算合并了的 props(包含 listeners)
 */
function doCreateChildVNode(runtimeNode: RuntimeNode, context: Context, global: Global, component: any, props: Record<string, any>) {
    // console.log("doCreateChildVNode", runtimeNode);
    const fromInstance = context.instance;
    const fromBlock = context.block;
    const newContext: Context = { ...context, node: runtimeNode };
    const createSlotsVNode = function (): Record<string, Function> {
        const slots: any = { default: () => ([]) };
        for (let name in runtimeNode.slots) {
            const slot = runtimeNode.slots[name];
            slots[name] = withCtx((slotProps: any) => slot.map(item => {
                return createChildVNode(item, { ...newContext, slotProps: slotProps }, global);
            }));
        }
        return slots;
    };
    const createItemsVNode = function (): Array<VNode> {
        return runtimeNode.items.map(item => createChildVNode(item, newContext, global));
    };
    const createTplVNode = function (): VNode {
        try {
            const staticHtml = renderTpl(runtimeNode.tpl, props, fromInstance, fromBlock, _toExtData(global, context));
            return createHtmlVNode(staticHtml, props, component);
        } catch (e) {
            return createVNode(BlockRenderError, {
                msg: `渲染模版失败，tpl: \n${runtimeNode.tpl.join('\n')}\n`,
                errType: RenderErrType.renderTpl,
                errConfig: runtimeNode.tpl,
                node: runtimeNode, error: e,
            });
        }
    };
    // 当前 component 是 html 标签
    const isHtmlTag = runtimeNode.__htmlTag;
    // 当前 component 是 Fragment 标签
    const isFragment = component === Fragment;
    // 存在 slots
    const existsSlots = !isHtmlTag && !isFragment && Object.keys(runtimeNode.slots).length > 0;
    // 存在 items
    const existsItems = runtimeNode.items.length > 0;
    // 存在 tpl
    const existsTpl = runtimeNode.tpl.length > 0;
    // 创建 VNode
    let vnode: any;
    if (existsSlots) {
        const slots = createSlotsVNode();
        if (existsItems) {
            // slots + items
            slots.default = withCtx(() => createItemsVNode());
        } else if (existsTpl) {
            // slots + tpl
            slots.default = withCtx(() => [createTplVNode()]);
        }
        vnode = createVNode(component, props, slots);
    } else if (existsItems) {
        // items
        if (isHtmlTag) {
            vnode = createVNode(component, props, createItemsVNode());
        } else if (isFragment) {
            vnode = createVNode(component, props, createItemsVNode());
        } else {
            // 当前 component 是 vue 组件类型 children 使用 withCtx 包裹，传递 default 插槽
            vnode = createVNode(component, props, { default: withCtx(() => createItemsVNode()) });
        }
    } else if (existsTpl) {
        // tpl
        vnode = createTplVNode();
    } else if (component != Fragment) {
        vnode = createVNode(component, props, null);
    } else {
        return undefined;
    }
    // 应用其他用户自定义指令
    vnode = _applyDirectives(vnode, runtimeNode.directives);
    return vnode;
}

/**
 * 基于 HTML 创建 VNode
 * @param staticHtml    静态的html片段
 * @param props         html片段所属node的属性
 * @param component     html片段所属node的组件信息
 */
function createHtmlVNode(staticHtml: string, props?: Record<string, any>, component?: any) {
    // console.log("createHtmlVNode", staticHtml, props, component);
    const defComponent = 'span';
    if (!props) props = {};
    if (isStr(component)) {
        component = lodash.trim(component);
        if (component.length <= 0) component = undefined;
    }
    if (component) {
        if (component === Fragment) component = defComponent;
        return createVNode(component, { ...props, innerHTML: staticHtml }, null);
    }
    const htmlInfo = parseHTML(staticHtml);
    if (htmlInfo.onlyOne) {
        return createVNode(htmlInfo.tagName, { ...htmlInfo.attrs, innerHTML: htmlInfo.innerHTML }, null);
    }
    return createVNode(defComponent, { innerHTML: staticHtml }, null);
}

/**
 * “表达式”和“模版”的扩展参数
 */
function _toExtData(global: Global, context: Context) {
    let extData: any = {
        $allBlock: global.allBlock,
        $slotProps: context.slotProps,
    };
    if (context.vForData) {
        extData = { ...extData, ...context.vForData };
    }
    return extData;
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
    const innerDirectives = ['model', 'show', 'if', 'for'];
    const useDirectives: Array<any> = [];
    for (let name in directives) {
        if (innerDirectives.includes(name)) {
            continue;
        }
        const param = directives[name];
        let directive: any = undefined;
        if (name === '__inner_show') {
            directive = vShow;
        } else if (name === '__inner_model') {
            directive = param.fun;
        } else {
            directive = resolveDirective(name);
        }
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
 * 递归获取当前 DesignNode 中所有的 vue 组件名称
 */
function getAllComponentType(node: DesignNode, allType?: Set<string>): Array<string> {
    if (!allType) allType = new Set<string>();
    if (node.type) {
        node.type = lodash.trim(node.type);
        if (!isHtmlTag(node.type)) {
            allType.add(node.type)
        }
    }
    if (node.slots) {
        for (let name in node.slots) {
            const slot: any = node.slots[name];
            if (isArray(slot)) {
                slot.forEach(item => getAllComponentType(item, allType));
            } else if (isObj(slot)) {
                getAllComponentType(slot, allType);
            }
        }
    }
    if (node.items) {
        if (isArray(node.items)) {
            node.items.forEach(item => {
                if (isObj(item)) {
                    getAllComponentType(item as any, allType);
                }
            });
        } else if (isObj(node.items)) {
            getAllComponentType(node.items as any, allType);
        }
    }
    return Array.from(allType);
}

/**
 * 定义一个 DesignBlock 对象，仅仅是为了类型声明，无任何处理逻辑
 */
function defineDesignBlock(designBlock: DesignBlock): DesignBlock {
    return designBlock;
}

/** 定义一个简单明了的别名 */
type Block = ComponentInstance;

export type  {
    Block,
}

export {
    createBlockComponent,
    getAllComponentType,
    defineDesignBlock,
}
