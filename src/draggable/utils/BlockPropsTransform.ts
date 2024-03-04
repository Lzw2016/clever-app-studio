import {withModifiers} from "vue";
import lodash from "lodash";
import {isArray, isFun, isObj, isStr, noValue} from "@/utils/Typeof";
import {AsyncFunction} from "@/utils/UseType";
import {BlockDesign, BlockWatchItem, ListenerFunctionConfig} from "@/draggable/types/Block";
import {AnyFunction, FunctionConfig} from "@/draggable/types/Base";
import {calcExpression} from "@/utils/Expression";

/** 根据 FunctionConfig 动态创建函数对象 */
function createFunction(functionConfig: FunctionConfig): AnyFunction {
    const constructor = (functionConfig.async) ? AsyncFunction : Function;
    const params = noValue(functionConfig.params) ? [] : isArray(functionConfig.params) ? functionConfig.params : [functionConfig.params];
    return constructor(...params, functionConfig.code ?? "");
}

/** 生成表达式函数或模版函数的参数 */
function getExpOrTplParam(instance: any, currBlock: BlockDesign): any {
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
function computedTransform(computed: BlockDesign['computed']): Record<string, any> {
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
            return fun.call(instance, oldValue, instance);
        };
    }
    return vueComputed;
}

/**
 * 处理 Block 的 methods 属性，使它符合 vue 组件的规范
 */
function methodsTransform(methods: BlockDesign['methods']): Record<string, Function> {
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
function watchTransform(watch: BlockDesign['watch']): Record<string, any> {
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
 * 处理 Block/ComponentNode 的 listeners 属性，使它符合 vue 组件的规范
 */
function listenersTransform(listeners: BlockDesign["listeners"], instance: any): Record<string, Function> {
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
        // 应用事件修饰符
        if (isArray(listener.modifiers) && listener.modifiers.length > 0) {
            listener.handler = withModifiers(listener.handler.bind(instance), listener.modifiers);
        }
        vueListeners[name] = listener.handler.bind(instance);
    }
    return vueListeners;
}

/**
 * 处理 Block/ComponentNode 的 props 属性，计算出表达式值
 */
function propsTransform(props: BlockDesign["props"], instance: any, currBlock: BlockDesign): Record<string, any> {
    return calcExpression(props, getExpOrTplParam(instance, currBlock), {thisArg: instance, cache: false});
}

export {
    createFunction,
    getExpOrTplParam,
    lifeCyclesTransform,
    computedTransform,
    methodsTransform,
    watchTransform,
    listenersTransform,
    propsTransform,
}
