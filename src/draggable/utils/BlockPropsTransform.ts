import { Fragment, withModifiers } from "vue";
import lodash from "lodash";
import { isArray, isFun, isObj, isStr, noValue } from "@/utils/Typeof";
import { AsyncFunction } from "@/utils/UseType";
import { calcExpression } from "@/utils/Expression";
import { createRefID, createVNodeID } from "@/utils/IDCreate";
import { compileTpl } from "@/utils/Template";
import { AnyFunction, FunctionConfig } from "@/draggable/types/Base";
import { BlockWatchItem, DesignBlock, DesignNode } from "@/draggable/types/DesignBlock";
import { RuntimeBlock, RuntimeBlockWatchItem, RuntimeComponentSlotsItem, RuntimeListener, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";

/**
 * 根据 FunctionConfig 动态创建函数对象
 */
function createFunction(functionConfig: FunctionConfig): AnyFunction {
    const constructor = (functionConfig.async) ? AsyncFunction : Function;
    const params = noValue(functionConfig.params) ? [] : isArray(functionConfig.params) ? functionConfig.params : [functionConfig.params];
    return constructor(...params, functionConfig.code ?? "");
}

/**
 * 给 Block 对象属性设置默认值
 */
function fillBlockDefValue(block: DesignNode | DesignBlock): Required<DesignBlock> | Required<DesignNode> {
    // DesignNode
    if (!block.id || lodash.trim(block.id).length <= 0) block.id = createVNodeID();
    if (!block.ref || lodash.trim(block.ref).length <= 0) block.ref = createRefID();
    if (!block.props) block.props = {};
    if (!block.listeners) block.listeners = {};
    if (!block.directives) block.directives = {};
    if (!block.slots) block.slots = {};
    if (!block.items) block.items = [];
    if (!block.tpl) block.tpl = [];
    // DesignBlock
    const designBlock = block as DesignBlock;
    if (designBlock.block) {
        if (!designBlock.data) designBlock.data = {};
        if (!designBlock.computed) designBlock.computed = {};
        if (!designBlock.watch) designBlock.watch = {};
        if (!designBlock.methods) designBlock.methods = {};
        if (!designBlock.lifeCycles) designBlock.lifeCycles = {};
        if (!designBlock.i18n) designBlock.i18n = {};
    }
    return block as any;
}

/**
 * 处理 Block 的 methods 属性，使它符合 vue 组件的规范
 */
function methodsTransform(methods: DesignBlock['methods']): Record<string, Function> {
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
 * 处理 Block 的 lifeCycles 属性，使它符合 vue 组件的规范
 */
function lifeCyclesTransform(lifeCycles: DesignBlock['lifeCycles'], methods: Record<string, any>): Record<string, Function> {
    const vueLifeCycles: Record<string, Function> = {};
    if (!lifeCycles) return vueLifeCycles;
    for (let name in lifeCycles) {
        const value = lifeCycles[name];
        let fun: AnyFunction | undefined;
        if (isStr(value)) {
            fun = methods[value];
        } else if (isFun(value)) {
            fun = value;
        } else if (isObj(value)) {
            fun = createFunction(value as FunctionConfig);
        }
        if (noValue(fun)) {
            throw new Error(`Block lifeCycles 定义错误(${name}=${value})`);
        }
        vueLifeCycles[name] = function () {
            return fun!.call(this, this);
        };
    }
    return vueLifeCycles;
}

/**
 * 处理 Block 的 computed 属性，使它符合 vue 组件的规范
 */
function computedTransform(computed: DesignBlock['computed'], methods: Record<string, any>): Record<string, Function> {
    const vueComputed: any = {};
    if (!computed) return vueComputed;
    for (let name in computed) {
        const value = computed[name];
        let fun: AnyFunction | undefined;
        if (isStr(value)) {
            fun = methods[value];
        } else if (isFun(value)) {
            fun = value;
        } else if (isObj(value)) {
            fun = createFunction(value);
        }
        if (noValue(fun)) {
            throw new Error(`Block computed 定义错误(${name}=${value})`);
        }
        // 实测在当前环境中的 computed 回调函数有两个参数: instance: vue组件实例, oldValue: 之前的计算返回值
        vueComputed[name] = function (instance: any, oldValue: any) {
            return fun!.call(instance, oldValue, instance);
        };
    }
    return vueComputed;
}

/**
 * 处理 Block 的 watch 属性，使它符合 vue 组件的规范
 */
function watchTransform(watch: DesignBlock['watch']): Record<string, RuntimeBlockWatchItem> {
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
            } else if (isObj(watchObj.handler) && !isArray(watchObj.handler) && isStr(watchObj.handler.code)) {
                const { handler, ...other } = watchObj;
                item = {
                    ...other,
                    handler: createFunction(handler),
                };
            } else if (isStr(watchObj.code)) {
                const { async, params, code, ...other } = watchObj;
                item = {
                    ...other,
                    handler: createFunction({ async, params, code }),
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

/**
 * 处理 DesignBlock/DesignNode 的 listeners 属性
 */
function listenersTransform(listeners: DesignBlock["listeners"], methods: Record<string, any>): Record<string, RuntimeListener> {
    const vueListeners: any = {};
    for (let name in listeners) {
        const value = listeners[name];
        if (!value) continue;
        const listener: Partial<RuntimeListener> = {};
        if (isStr(value) && isFun(methods[value])) {
            listener.handler = methods[value];
        } else if (isFun(value)) {
            listener.handler = value;
        } else if (isObj(value) && !isArray(value)) {
            const { handler, async, params, code, modifiers } = value as any;
            if (isStr(handler) && isFun(methods[handler])) {
                listener.handler = methods[handler];
            } else if (isFun(handler)) {
                listener.handler = handler;
            } else if (isObj(handler) && !isArray(handler) && isStr(handler.code)) {
                listener.handler = createFunction(handler);
            } else if (isStr(code)) {
                listener.handler = createFunction({ async, params, code });
            }
            if (isArray(modifiers)) listener.modifiers = modifiers;
        }
        if (!isFun(listener.handler)) {
            throw new Error(`listeners 定义错误(${name}=${value})`);
        }
        vueListeners[name] = listener;
    }
    return vueListeners;
}

/**
 * 深度转换 DesignBlock。
 * 会转换的属性：type、listeners、slots、items、tpl、computed、watch、methods、lifeCycles
 */
function blockDeepTransform(block: DesignNode | DesignBlock, componentManage: ComponentManage, parent?: RuntimeBlock): RuntimeBlock {
    const {
        block: isBlock,
        defaults,
        type,
        listeners,
        slots,
        items,
        tpl,
        computed,
        watch,
        methods,
        lifeCycles,
        ...other
    } = fillBlockDefValue(block) as DesignBlock;
    // 应用 defaults 属性
    if (defaults && Object.keys(defaults).length > 0) {
        if (isArray(items)) {
            for (let item of items) {
                if (isObj(item) && !isArray(item)) {
                    lodash.defaultsDeep(item, defaults);
                }
            }
        }
    }
    const runtime: any = { block: isBlock, type: type };
    // 如果没有父级 Block 强制让当前节点为 Block
    if (!parent) runtime.block = true;
    // 读取组件类型
    if (type && lodash.trim(type).length > 0) {
        runtime.__type = type.trim();
        runtime.__htmlTag = isHtmlTag(runtime.__type);
        if (!runtime.__htmlTag) runtime.__type = componentManage.getComponent(runtime.__type);
    } else {
        runtime.__type = Fragment;
    }
    if (!runtime.__type) {
        throw new Error(`UI组件未注册也不是html原生标签，组件: ${type}`);
    }
    // 处理 tpl 属性
    runtime.tpl = tpl;
    if (isStr(tpl)) runtime.tpl = [tpl];
    // 处理 Block 属性
    if (runtime.block) {
        runtime.methods = methodsTransform(methods);
        runtime.lifeCycles = lifeCyclesTransform(lifeCycles, runtime.methods);
        runtime.computed = computedTransform(computed, runtime.methods);
        runtime.watch = watchTransform(watch);
    }
    // 处理 listeners
    if (runtime.block) {
        runtime.listeners = listenersTransform(listeners, runtime.methods);
    } else if (parent) {
        runtime.listeners = listenersTransform(listeners, parent.methods);
    }
    // 递归处理 slots
    runtime.slots = {};
    const designBlock: RuntimeBlock = (parent ? parent : runtime);
    for (let name in slots) {
        const slot = slots[name];
        runtime.slots[name] = _deepTransformSlotsOrItems(slot, componentManage, designBlock, "slots", name);
    }
    // 递归处理 items
    runtime.items = _deepTransformSlotsOrItems(items, componentManage, designBlock, "items", "items");
    // 返回数据
    return { ...other, ...runtime };
}

// blockDeepTransform 处理 slots 或者 items
function _deepTransformSlotsOrItems(itemsOrSlots: DesignNode['items'], componentManage: ComponentManage, parent: RuntimeBlock, propName: 'items' | 'slots', slotName: string): Array<RuntimeComponentSlotsItem> {
    let result: Array<RuntimeComponentSlotsItem>;
    if (isStr(itemsOrSlots)) {
        result = [itemsOrSlots];
    } else if (isArray(itemsOrSlots)) {
        result = itemsOrSlots.map((item: any, idx) => {
            if (isStr(item)) {
                return item;
            } else if (isObj(item) && !isArray(item)) {
                return blockDeepTransform(item, componentManage, parent);
            } else {
                throw new Error(`Block ${propName} 定义错误(${slotName}[${idx}]=${JSON.stringify(item)})`);
            }
        });
    } else if (isObj(itemsOrSlots)) {
        result = [blockDeepTransform(itemsOrSlots as any, componentManage, parent)];
    } else {
        throw new Error(`Block ${propName} 定义错误(${slotName}=${JSON.stringify(itemsOrSlots)})`);
    }
    return result;
}

/**
 * 深度绑定 this 指针。
 * 会绑定的函数：listeners、lifeCycles
 */
function deepBindThis(cmpNode: RuntimeNode, instance: any) {
    const {
        listeners,
        __bindListeners,
        slots,
        items,
    } = cmpNode;
    if (__bindListeners) return;
    // 处理 listeners
    cmpNode.__bindListeners = {};
    for (let name in listeners) {
        const listener = listeners[name];
        // 应用事件修饰符
        if (isArray(listener.modifiers) && listener.modifiers.length > 0) {
            listener.handler = withModifiers(listener.handler.bind(instance), listener.modifiers);
        }
        cmpNode.__bindListeners[name] = listener.handler.bind(instance);
    }
    // 递归处理 slots
    for (let name in slots) {
        const slot = slots[name];
        if (slot.length <= 0) continue;
        _deepBindThisSlotsOrItems(slot, instance);
    }
    // 递归处理 items
    if (items && items.length > 0) {
        _deepBindThisSlotsOrItems(items, instance);
    }
}

// deepBindThis 处理 slots 或者 items
function _deepBindThisSlotsOrItems(cmpNodes: Array<RuntimeComponentSlotsItem>, instance: any) {
    for (let cmpNode of cmpNodes) {
        const runtimeBlock = cmpNode as RuntimeBlock;
        if (!runtimeBlock.block && isObj(runtimeBlock) && !isArray(runtimeBlock)) {
            deepBindThis(runtimeBlock, instance);
        }
    }
}

/**
 * 深度提取 Block 的属性，模拟 Block 对应的 vue 组件的初始化状态
 */
function deepExtractBlock(nodeOrBlock: RuntimeNode, allBlock: Record<string, object>, parentBlock?: any): void {
    const {
        ref,
        props,
        slots,
        items,
    } = nodeOrBlock;
    const runtimeBlock = nodeOrBlock as RuntimeBlock;
    const data = runtimeBlock.data ?? {};
    const mockBlock: any = {
        $props: props,
        $attrs: props,
        $data: data,
        ...props,
        ...data,
        $root: {},
        $parent: parentBlock ?? {},
        $refs: {},
    };
    if (runtimeBlock.block || !parentBlock) {
        allBlock[ref] = mockBlock;
    } else {
        parentBlock.$refs[ref] = mockBlock;
    }
    const nextParentBlock = runtimeBlock.block ? mockBlock : parentBlock;
    // 递归处理 slots
    for (let name in slots) {
        const slot = slots[name];
        if (slot.length <= 0) continue;
        _deepExtractSlotsOrItems(slot, allBlock, nextParentBlock);
    }
    // 递归处理 items
    if (items && items.length > 0) {
        _deepExtractSlotsOrItems(items, allBlock, nextParentBlock)
    }
}

// deepExtractBlock 处理 slots 或者 items
function _deepExtractSlotsOrItems(cmpNodes: Array<RuntimeComponentSlotsItem>, allBlock: Record<string, object>, parentBlock?: any) {
    for (let cmpNode of cmpNodes) {
        const node = cmpNode as RuntimeNode;
        if (isObj(node) && !isArray(node)) {
            deepExtractBlock(node, allBlock, parentBlock);
        }
    }
}

/** 遍历 RuntimeNode 的回调函数 */
type TraverseNode = (current: RuntimeNode, isSlot: boolean, parent?: RuntimeNode) => void;

/**
 * 深度递归 RuntimeNode 遍历所有的 node(包含slot)
 */
function deepTraverseNodes(node: RuntimeNode, callback: TraverseNode, isSlot: boolean, parentNode?: RuntimeNode): void {
    const { items, slots } = node;
    callback(node, isSlot, parentNode);
    // 递归 slots
    for (let name in slots) {
        const slot = slots[name];
        if (slot.length <= 0) continue;
        _deepBlockSlotsOrItems(slot, callback, true, node);
    }
    // 递归 items
    if (items && items.length > 0) {
        _deepBlockSlotsOrItems(items, callback, false, node);
    }
}

// deepTraverseNodes 处理 slots 或者 items
function _deepBlockSlotsOrItems(cmpNodes: Array<RuntimeComponentSlotsItem>, callback: TraverseNode, isSlot: boolean, parentNode?: RuntimeNode) {
    for (let cmpNode of cmpNodes) {
        const node = cmpNode as RuntimeNode;
        if (isObj(node) && !isArray(node)) {
            deepTraverseNodes(node, callback, isSlot, parentNode);
        }
    }
}

/**
 * 生成表达式函数的上下文数据。
 * props表达式的数据范围(优先级由上到下)
 *     1.this指向当前tpl所属block对应的vue组件实例
 *     2.lodash 对象 _ 属性
 *     3.当前node所属block对应的vue实例 $block 属性
 *     4.自定义扩展属性 $allBlock
 *     5.for指令中的数据，通过 index、item 配置的属性名
 *     6.当前node所属block对应的vue实例平铺的 methods 函数
 *     7.当前node所属block对应的vue实例平铺的 computed 数据
 *     8.当前node所属block对应的vue实例的 $props、$attrs、$data、$root、$parent、$slots、$refs、$el、$emit、$forceUpdate 属性
 *     9.当前node所属block对应的vue实例平铺的 $props 和 $data 数据
 * @param instance      当前 vue 组件实例
 * @param runtimeBlock  当前节点所属的Block
 * @param extData       扩展数据
 */
function getExpData(instance: any, runtimeBlock?: RuntimeBlock, extData?: object): any {
    const data: any = {
        ...instance.$props,
        ...instance.$data,
        $props: instance.$props,
        $attrs: instance.$attrs,
        $data: instance.$data,
        $root: instance.$root,
        $parent: instance.$parent,
        $slots: instance.$slots,
        $refs: instance.$refs,
        $el: instance.$el,
        $emit: instance.$emit,
        $forceUpdate: instance.$forceUpdate,
    };
    // 计算数据
    if (runtimeBlock?.computed) {
        for (let name in runtimeBlock.computed) {
            data[name] = instance[name];
        }
    }
    // 自定义函数
    if (runtimeBlock?.methods) {
        for (let name in runtimeBlock.methods) {
            data[name] = instance[name];
        }
    }
    // 自定义扩展属性
    if (extData) {
        for (let name in extData) {
            data[name] = extData[name];
        }
    }
    // 内置属性
    data.$block = instance;
    data._ = lodash;
    return data;
}

/**
 * 生成模版函数的上下文数据。
 * tpl数据范围(优先级由上到下)
 *      1.this指向当前tpl所属block对应的vue组件实例
 *      2.包含当前tpl的node的props(计算后的props)
 *      3.lodash 对象 _ 属性
 *      4.当前node所属block对应的vue实例 $block 属性
 *      5.自定义扩展属性 $allBlock
 *      6.for指令中的数据，通过 index、item 配置的属性名
 *      7.当前node所属block对应的vue实例平铺的 methods 函数
 *      8.当前node所属block对应的vue实例平铺的 computed 数据
 *      9.当前node所属block对应的vue实例的 $props、$attrs、$data、$root、$parent、$slots、$refs、$el、$emit、$forceUpdate 属性
 *     10.当前node所属block对应的vue实例平铺的 $props 和 $data 数据
 * @param props         当前渲染节点的 props(RuntimeNode.props)
 * @param instance      当前 vue 组件实例
 * @param runtimeBlock  当前节点所属的Block
 * @param extData       扩展数据
 */
function getTplData(props: Record<string, any>, instance: any, runtimeBlock?: RuntimeBlock, extData?: object): any {
    const data = getExpData(instance, runtimeBlock, extData);
    return { ...data, ...props };
}

/**
 * 处理 DesignBlock/DesignNode 的 props 属性，计算出表达式值
 * @param props         需要计算的 props 对象
 * @param instance      当前 vue 组件实例
 * @param runtimeBlock  当前节点所属的Block
 * @param extData       扩展数据
 */
function propsTransform(props: DesignBlock["props"], instance: any, runtimeBlock: RuntimeBlock, extData?: object): Record<string, any> {
    const data = getExpData(instance, runtimeBlock, extData);
    return calcExpression(props, data, { thisArg: instance, cache: false });
}

/**
 * 计算 DesignBlock/DesignNode 中的单条表达式
 * @param exp           单个字符串表达式
 * @param instance      当前 vue 组件实例
 * @param runtimeBlock  当前节点所属的Block
 * @param extData       扩展数据
 */
function expTransform(exp: string, instance: any, runtimeBlock: RuntimeBlock, extData?: object): any {
    exp = lodash.trim(exp);
    if (exp.length <= 0) return undefined;
    const data = getExpData(instance, runtimeBlock, extData);
    return calcExpression(exp, data, { thisArg: instance, cache: false });
}

/**
 * 渲染 tpl 模版，返回渲染后的字符串
 * @param tpl           字符串模版
 * @param props         当前渲染节点的 props(RuntimeNode.props)
 * @param instance      当前 vue 组件实例
 * @param runtimeBlock  当前节点所属的Block
 * @param extData       扩展数据
 */
function renderTpl(tpl: string[], props: Record<string, any>, instance: any, runtimeBlock?: RuntimeBlock, extData?: object): string {
    const template = tpl.join("\n");
    if (lodash.trim(template).length <= 0) return template;
    const data = getTplData(props, instance, runtimeBlock, extData);
    return compileTpl(template, { cache: true }).bind(instance)(data);
}

// 当访问不存在的属性时返回空字符串
function _createSafeObject(obj: object) {
    // 在with语句中Proxy 的 get不生效
    return new Proxy(obj, {
        get(target: object, prop: string | symbol, receiver: any): any {
            return Reflect.get(target, prop, receiver) || '';
        },
    });
}

export {
    createFunction,
    fillBlockDefValue,
    methodsTransform,
    lifeCyclesTransform,
    computedTransform,
    watchTransform,
    listenersTransform,
    blockDeepTransform,
    deepBindThis,
    deepExtractBlock,
    deepTraverseNodes,
    getExpData,
    getTplData,
    propsTransform,
    expTransform,
    renderTpl,
}
