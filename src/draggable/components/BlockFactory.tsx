import {createVNode, defineComponent, withModifiers} from "vue";
import {isArray, isFun, isObj, isStr, noValue} from "@/utils/Typeof";
import {AnyFunction, FunctionConfig} from "@/draggable/types/Base";
import {BlockDesign, BlockWatchItem, ComponentNode, ListenerFunctionConfig} from "@/draggable/types/Block";
import {ComponentManageModel} from "@/draggable/models/ComponentManageModel";
import {AsyncFunction} from "@/utils/UseType";
import {createVNodeID} from "@/utils/IDCreate";
import {isString} from "lodash";

/** 所有的html标签 */
const htmlTags = [
    // 主根元素 文档元数据 分区根元素
    'html', 'base', 'head', 'link', 'meta', 'style', 'title', 'body',
    // 内容分区
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'main', 'nav', 'section',
    // 文本内容
    'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'menu', 'ol', 'p', 'pre', 'ul',
    // 内联文本语义
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    // 图片和多媒体
    'area', 'audio', 'img', 'map', 'track', 'video',
    // 内嵌内容
    'embed', 'iframe', 'object', 'picture', 'portal', 'source',
    // SVG 和 MathML
    'svg', 'math',
    // 脚本
    'canvas', 'noscript', 'script',
    // 编辑标识
    'del', 'ins',
    // 表格内容
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
    // 表单
    'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea',
    // 交互元素
    'details', 'dialog', 'summary',
    // Web 组件
    'slot', 'template',
];

/** 判断字符串是否是HTML标签 */
function isHtmlTag(htmlTag: string): boolean {
    return htmlTags.includes(htmlTag);
}

/** 组件管理器实例 */
const componentManage = new ComponentManageModel();

/** 给 ComponentNode 对象属性设置默认值 */
function fillNodeDefValue(node: ComponentNode): Required<ComponentNode> {
    if (!node.id) node.id = createVNodeID();
    if (!node.props) node.props = {};
    if (!node.listeners) node.listeners = {};
    if (!node.directives) node.directives = {};
    if (!node.slots) node.slots = {};
    if (!node.items) node.items = [];
    return node as any;
}

/**
 * 处理 Block/ComponentNode 的 listeners 属性，使它符合 vue 组件的规范
 */
function listenersTransform(listeners: ComponentNode["listeners"], instance: any) {
    const vueListeners: any = {};
    for (let name in listeners) {
        const value = listeners[name];
        const listener: Partial<ListenerFunctionConfig> = {};
        if (isStr(value) && isFun(instance[value])) {
            listener.handler = instance[value];
        } else if (isFun(value)) {
            listener.handler = value;
        } else if (isObj(value) && !isArray(value)) {
            const {handler, async, params, code, modifiers} = value as any;
            if (isStr(handler) && isFun(instance[handler])) {
                listener.handler = instance[handler];
            } else if (isFun(handler)) {
                listener.handler = handler;
            } else if (isObj(handler) && !isArray(handler) && isString(handler.code)) {
                listener.handler = createFunction(handler);
            } else if (isStr(code)) {
                listener.handler = createFunction({async, params, code});
            }
            if (isArray(modifiers)) listener.modifiers = modifiers;
        }
        if (!isFun(listener.handler)) {
            throw new Error(`listeners 定义错误(${name}=${value})`);
        }
        if (isArray(listener.modifiers) && listener.modifiers.length > 0) {
            listener.handler = withModifiers(listener.handler.bind(instance), listener.modifiers);
        }
        vueListeners[name] = listener.handler.bind(instance);
    }
    return vueListeners;
}

/**
 * 基于 ComponentNode 创建 VNode
 */
function createComponentVNode(node: ComponentNode | string, instance: any) {
    if (isStr(node)) return node;
    // 填充基本属性
    fillNodeDefValue(node);
    // 加载当前组件
    const type = node.type.trim();
    const component: any = isHtmlTag(type) ? type : componentManage.getComponent(type);
    if (!component) {
        throw new Error(`UI组件未注册也不是html原生标签，组件: ${type}`);
    }
    // 配置 ref 属性
    if (node.ref) node.props!.ref = node.ref;
    // TODO 设置属性的绑定
    // 处理 listeners
    const listeners = listenersTransform(node.listeners, instance);
    // 插槽和子组件(default插槽其实就是子组件)
    const children: any = {};
    // TODO 设置插槽 待验证
    for (let name in node.slots) {
        const slot = node.slots[name];
        if (isArray(slot)) {
            children[name] = () => slot.map(item => createComponentVNode(item, instance));
        } else {
            children[name] = () => createComponentVNode(slot, instance);
        }
    }
    // 设置子组件
    const defaultVNodes = node.items?.map(item => createComponentVNode(item, instance));
    children.default = () => defaultVNodes;
    return createVNode(
        component,
        {
            ...node.props,
            ...listeners,
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

/** 根据 FunctionConfig 动态创建函数对象 */
function createFunction(functionConfig: FunctionConfig): AnyFunction {
    const constructor = (functionConfig.async) ? AsyncFunction : Function;
    const params = noValue(functionConfig.params) ? [] : isArray(functionConfig.params) ? functionConfig.params : [functionConfig.params];
    return constructor(...params, functionConfig.code ?? "");
}

/**
 * 处理 Block 的 lifeCycles 属性，使它符合 vue 组件的规范
 */
function lifeCyclesTransform(lifeCycles: BlockDesign['lifeCycles']): Record<string, Function> {
    const vueLifeCycles: Record<string, Function> = {};
    if (!lifeCycles) return vueLifeCycles;
    for (let name in lifeCycles) {
        const value = lifeCycles[name];
        let fun: AnyFunction;
        if (isFun(value)) {
            fun = value;
        } else if (isObj(value)) {
            fun = createFunction(value as FunctionConfig);
        } else {
            throw new Error(`Block lifeCycles 定义错误(${name}=${value})`);
        }
        vueLifeCycles[name] = function () {
            // 这里的 this 指向 vue 组件实例
            return fun(this);
        };
    }
    return vueLifeCycles;
}

/**
 * 处理 Block 的 computed 属性，使它符合 vue 组件的规范
 */
function computedTransform(computed: BlockDesign['computed']) {
    const vueComputed: any = {};
    if (!computed) return vueComputed;
    for (let name in computed) {
        const value = computed[name];
        let fun: AnyFunction;
        if (isFun(value)) {
            fun = value;
        } else if (isObj(value)) {
            fun = createFunction(value);
        } else {
            throw new Error(`Block computed 定义错误(${name}=${value})`);
        }
        // 实测在当前环境中的 computed 回调函数有两个参数: instance: vue组件实例, oldValue: 之前的计算返回值
        vueComputed[name] = function (instance: any, oldValue: any) {
            // 这里的 this 指向 vue 组件实例
            return fun(oldValue, instance);
        };
    }
    return vueComputed;
}

/**
 * 处理 Block 的 methods 属性，使它符合 vue 组件的规范
 */
function methodsTransform(methods: BlockDesign['methods']) {
    const vueMethods: any = {};
    if (!methods) return vueMethods;
    for (let name in methods) {
        const value = methods[name];
        let fun: AnyFunction;
        if (isFun(value)) {
            fun = value;
        } else if (isObj(value)) {
            fun = createFunction(value);
        } else {
            throw new Error(`Block methods 定义错误(${name}=${value})`);
        }
        vueMethods[name] = fun;
    }
    return vueMethods;
}

/**
 * 处理 Block 的 watch 属性，使它符合 vue 组件的规范
 */
function watchTransform(watch: BlockDesign['watch']) {
    const vueWatch: any = {};
    if (!watch) return vueWatch;
    const watchItemTransform = (watchItem: BlockWatchItem) => {
        let item: any;
        if (isStr(watchItem) || isFun(watchItem)) {
            item = watchItem;
        } else if (isObj(watchItem) && !isArray(watchItem)) {
            const watchObj: any = watchItem;
            if (isStr(watchObj.handler) || isFun(watchObj.handler)) {
                item = watchObj;
            } else if (isObj(watchObj.handler) && !isArray(watchObj.handler) && isString(watchObj.handler.code)) {
                const {handler, ...other} = watchObj;
                item = {
                    ...other,
                    handler: createFunction(handler),
                };
            } else if (isStr(watchObj.code)) {
                const {async, params, code, ...other} = watchObj;
                item = {
                    ...other,
                    handler: createFunction({async, params, code}),
                };
            }
        }
        return item;
    };
    for (let name in watch) {
        const value = watch[name];
        let watchItem: any;
        if (isArray(value)) {
            watchItem = value.map((item, idx) => {
                const newItem = watchItemTransform(item);
                if (!newItem) {
                    throw new Error(`Block watch 定义错误(${name}[${idx}]=${JSON.stringify(item)})`);
                }
                return newItem;
            });
        } else {
            watchItem = watchItemTransform(value);
        }
        if (!watchItem) {
            throw new Error(`Block watch 定义错误(${name}=${JSON.stringify(watch)})`);
        }
        vueWatch[name] = watchItem;
    }
    return vueWatch;
}

/** 给 Block 对象属性设置默认值 */
function fillBlockDefValue(block: BlockDesign): Required<BlockDesign> {
    if (!block.props) block.props = {};
    if (!block.data) block.data = {};
    if (!block.computed) block.computed = {};
    if (!block.watch) block.watch = {};
    if (!block.methods) block.methods = {};
    if (!block.lifeCycles) block.lifeCycles = {};
    return block as any;
}

function createBlock(block: BlockDesign) {
    // 填充基本属性
    fillBlockDefValue(block);
    // 处理 Block 属性，使它符合 vue 组件的规范
    const lifeCycles = lifeCyclesTransform(block.lifeCycles);
    const computed = computedTransform(block.computed);
    const methods = methodsTransform(block.methods);
    const watch = watchTransform(block.watch);
    //


    // 定义 vue 组件
    return defineComponent({
        ...lifeCycles,
        props: {
            style: Object,
            class: String,
        },
        setup(props, ctx) {
        },
        data(vm) {
            return block.data;
        },
        computed: computed,
        methods: methods,
        watch: watch,
        render() {
            return (
                <div {...block.props} {...this.$.attrs} {...this.$props}>
                    {block.items!.map(node => createComponentVNode(node, this))}
                </div>
            )
        },
    });
}

export {
    createBlock,
}



