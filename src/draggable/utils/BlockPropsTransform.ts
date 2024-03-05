import {Fragment, withModifiers} from "vue";
import lodash from "lodash";
import {isArray, isFun, isObj, isStr, noValue} from "@/utils/Typeof";
import {AsyncFunction} from "@/utils/UseType";
import {calcExpression} from "@/utils/Expression";
import {createRefID, createVNodeID} from "@/utils/IDCreate";
import {AnyFunction, FunctionConfig} from "@/draggable/types/Base";
import {BlockWatchItem, ComponentNode, DesignBlock} from "@/draggable/types/DesignBlock";
import {RuntimeBlock, RuntimeBlockWatchItem, RuntimeComponentNode, RuntimeComponentSlotsItem, RuntimeListener} from "@/draggable/types/RuntimeBlock";
import {ComponentManage} from "@/draggable/types/ComponentManage";
import {isHtmlTag} from "@/draggable/utils/HtmlTag";

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
function fillBlockDefValue(block: ComponentNode | DesignBlock): Required<DesignBlock> | Required<ComponentNode> {
    // ComponentNode
    if (!block.id) block.id = createVNodeID();
    if (!block.ref) block.ref = createRefID();
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
        vueLifeCycles[name] = fun;
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

/**
 * 处理 Block/ComponentNode 的 listeners 属性
 */
function listenersTransform(listeners: DesignBlock["listeners"], methods: Record<string, any>): Record<string, RuntimeListener> {
    const vueListeners: any = {};
    for (let name in listeners) {
        const value = listeners[name];
        const listener: Partial<RuntimeListener> = {};
        if (isStr(value) && isFun(methods[value])) {
            listener.handler = methods[value];
        } else if (isFun(value)) {
            listener.handler = value;
        } else if (isObj(value) && !isArray(value)) {
            const {handler, async, params, code, modifiers} = value as any;
            if (isStr(handler) && isFun(methods[handler])) {
                listener.handler = methods[handler];
            } else if (isFun(handler)) {
                listener.handler = handler;
            } else if (isObj(handler) && !isArray(handler) && isStr(handler.code)) {
                listener.handler = createFunction(handler);
            } else if (isStr(code)) {
                listener.handler = createFunction({async, params, code});
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
function blockDeepTransform(block: ComponentNode | DesignBlock, componentManage: ComponentManage, parents?: RuntimeBlock): RuntimeBlock {
    const {
        block: isBlock,
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
    const runtime: any = {block: isBlock};
    // 如果没有父级 Block 强制让当前节点为 Block
    if (!parents) runtime.block = true;
    // 读取组件类型
    if (type) {
        runtime.type = type.trim();
        const htmlTag = isHtmlTag(runtime.type);
        if (!htmlTag) runtime.type = componentManage.getComponent(runtime.type);
    } else {
        runtime.type = Fragment;
    }
    if (!runtime.type) {
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
    } else if (parents) {
        runtime.listeners = listenersTransform(listeners, parents.methods);
    }
    // 递归处理 slots
    runtime.slots = {};
    const designBlock: RuntimeBlock = (parents ? parents : runtime);
    for (let name in slots) {
        const slot = slots[name];
        runtime.slots[name] = _deepTransformSlotsOrItems(slot, componentManage, designBlock, "slots", name);
    }
    // 递归处理 items
    runtime.items = _deepTransformSlotsOrItems(items, componentManage, designBlock, "items", "items");
    // 返回数据
    return {...other, ...runtime};
}

// blockDeepTransform 处理 slots 或者 items
function _deepTransformSlotsOrItems(itemsOrSlots: ComponentNode['items'], componentManage: ComponentManage, parents: RuntimeBlock, propName: 'items' | 'slots', slotName: string): Array<RuntimeComponentSlotsItem> {
    let result: Array<RuntimeComponentSlotsItem>;
    if (isStr(itemsOrSlots)) {
        result = [itemsOrSlots];
    } else if (isArray(itemsOrSlots)) {
        result = itemsOrSlots.map((item: any, idx) => {
            if (isStr(item)) {
                return item;
            } else if (isObj(item) && !isArray(item)) {
                return blockDeepTransform(item, componentManage, parents);
            } else {
                throw new Error(`Block ${propName} 定义错误(${slotName}[${idx}]=${JSON.stringify(item)})`);
            }
        });
    } else if (isObj(itemsOrSlots)) {
        result = [blockDeepTransform(itemsOrSlots as any, componentManage, parents)];
    } else {
        throw new Error(`Block ${propName} 定义错误(${slotName}=${JSON.stringify(itemsOrSlots)})`);
    }
    return result;
}

/**
 * 深度绑定 this 指针。
 * 会绑定的函数：listeners、lifeCycles
 */
function deepBindThis(cmpNode: RuntimeComponentNode, instance: any) {
    const {
        block,
        listeners,
        computed,
        lifeCycles,
        slots,
        items,
        __bindListeners,
        __bindLifeCycles,
    } = cmpNode as RuntimeBlock;
    // RuntimeComponentNode 只需要处理 listeners
    if (!block && __bindListeners) return;
    // RuntimeBlock 需要处理 lifeCycles
    if (block && __bindLifeCycles) return;
    // RuntimeComponentNode
    if (!__bindListeners) {
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
    }
    // RuntimeBlock
    const runtimeBlock = cmpNode as RuntimeBlock;
    if (!__bindLifeCycles) {
        // 处理 lifeCycles
        runtimeBlock.__bindLifeCycles = {};
        for (let name in lifeCycles) {
            const fun = lifeCycles[name];
            runtimeBlock.__bindLifeCycles[name] = function () {
                return fun.call(instance, arguments);
            };
        }
    }
    // methods、watch、methods、
    // 递归处理 slots
    if (slots) {
        for (let name in slots) {
            const slot: any = slots[name];
            _deepBindThisSlotsOrItems(slot, instance);
        }
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
 * 生成表达式函数或模版函数的参数
 */
function getExpOrTplParam(instance: any, currBlock: RuntimeBlock): any {
    const params: any = {...instance.$props, ...instance.$attrs, ...instance.$data};
    // 计算数据
    if (currBlock.computed) {
        for (let name in currBlock.computed) {
            params[name] = instance[name];
        }
    }
    // 自定义函数
    if (currBlock.methods) {
        for (let name in currBlock.methods) {
            params[name] = instance[name];
        }
    }
    // 内置属性
    params.$block = instance;
    params._ = lodash;
    return params;
}

/**
 * 处理 Block/ComponentNode 的 props 属性，计算出表达式值
 */
function propsTransform(props: DesignBlock["props"], instance: any, currBlock: RuntimeBlock): Record<string, any> {
    return calcExpression(props, getExpOrTplParam(instance, currBlock), {thisArg: instance, cache: false});
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
    getExpOrTplParam,
    propsTransform,
}
