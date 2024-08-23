import { Directive, DirectiveBinding, VNode } from "vue";
import { isFun, isStr } from "@/utils/Typeof";
import { toElementEventName, toPropsEventName } from "@/draggable/utils/HtmlTag";
import { deepTraverseDOM } from "@/draggable/utils/DesignerUtils";

interface EmptyEventListenerConfig {
    /** 阻止事件默认行为 */
    preventDefault?: boolean;
    /** 停止事件冒泡 */
    stopPropagation?: boolean;
}

const emptyEventListenerCache: Record<string, Function> = {};

function getEmptyEventListener(config: EmptyEventListenerConfig) {
    const key = [config.preventDefault, config.stopPropagation].join("|");
    let emptyEventListener = emptyEventListenerCache[key];
    if (emptyEventListener) return emptyEventListener;
    emptyEventListener = function (event?: Event) {
        if (config.preventDefault && event?.preventDefault) event.preventDefault();
        if (config.stopPropagation && event?.stopPropagation) event.stopPropagation();
    };
    emptyEventListenerCache[key] = emptyEventListener;
    return emptyEventListener;
}

let veiKey: symbol | undefined;

/**
 * 获取通过vue注册的dom事件的指针对象key值，
 * 参考vue3源码: https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/modules/events.ts 第36行
 * @param el HtmlElement
 */
function getVeiKey(el?: any) {
    if (!el) return;
    if (veiKey) return veiKey;
    const symbolKeys: symbol[] = Object.getOwnPropertySymbols(el);
    if (symbolKeys) {
        for (let symbolKey of symbolKeys) {
            if ('_vei' === symbolKey.description) {
                return symbolKey;
            }
        }
    }
}

type EventInvokers = Record<string, { value: any }>;

/**
 * 获取通过vue注册的dom事件的指针对象，
 * 参考vue3源码: https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/modules/events.ts 第36行
 * @param el HtmlElement
 */
function getEventInvokers(el?: any): EventInvokers | undefined {
    if (!el) return;
    if (!veiKey) veiKey = getVeiKey(el);
    if (!veiKey) return;
    return el[veiKey] as Record<string, { value: any }>;
}

function fixEventNames(names?: Array<string>) {
    if (!names) return;
    return names.filter(name => isStr(name))
        .map(name => toPropsEventName(name))
        .filter(name => name.length > 0);
}

// 默认禁用的事件
const defDisableEvents = fixEventNames([
    // 鼠标事件
    "click", "dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove",
    // 拖拽事件
    "dragstart", "drag", "dragend", "dragenter", "dragleave", "dragover", "drop",
    // 键盘事件
    "keydown", "keyup", "keypress",
    // 表单事件
    "input", "change", "focus", "blur", "submit", "reset", "paste",
    // 触摸设备上的触摸事件
    "touchstart", "touchmove", "touchend", "touchcancel",
    // 其他事件
    "contextmenu", "select", "error", "focusin", "focusout",
] as Array<keyof DocumentEventMap>)!;

const defPreventDefaultEvents = fixEventNames([
    // 鼠标事件
    // "click", "dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove",
    // 键盘事件
    "keydown", "keyup", "keypress",
    // 表单事件
    // "input", "change", "focus", "blur", "submit", "reset", "paste",
    // 其他事件
    "contextmenu",
] as Array<keyof DocumentEventMap>)!;

interface DirectiveValue {
    /** 递归的最大深度 */
    maxDepth?: number;
    /** 禁用的事件名称(“onXxx”)，如果未设置就是用默认的事件集合(defDisableEvents)，优先级: enableEvents > disableEvents */
    disableEvents?: string | Array<string>;
    /**启用的事件名称(“onXxx”)，优先级: enableEvents > disableEvents  */
    enableEvents?: string | Array<string>;
    /** 阻止默认行为的事件集合(“onXxx”) */
    preventDefaultEvents?: Array<string>;
    /** 阻止事件冒泡的事件集合(“onXxx”) */
    stopPropagationEvents?: Array<string>;
    /** 自定义禁用事件的实现 Record<事件名(“onXxx”), 事件函数> */
    manualEvents?: Record<string, Function>;
}

function doDisableEvent(el: Element, binding: DirectiveBinding<DirectiveValue>, vnode: VNode) {
    const value = binding.value ?? {};
    const maxDepth = value.maxDepth ?? 8;
    // 递归遍历 vnode 禁用事件
    const disableEvents = fixEventNames(!value.disableEvents ? undefined : isStr(value.disableEvents) ? [value.disableEvents] : value.disableEvents) ?? [];
    const enableEvents = fixEventNames(!value.enableEvents ? undefined : isStr(value.enableEvents) ? [value.enableEvents] : value.enableEvents);
    const preventDefaultEvents = fixEventNames(value.preventDefaultEvents) ?? defPreventDefaultEvents;
    const stopPropagationEvents = fixEventNames(value.stopPropagationEvents);
    const manualEvents = value.manualEvents;
    // 加入默认禁用的事件
    disableEvents.push(...defDisableEvents);
    // 递归处理 VNode
    // deepTraverseVNode(vnode, current => {
    //     const props: any = current.props;
    //     if (!props) return;
    //     // 当前 VNode 不是简单节点(如：动态组件节点)
    //     // if (!isStr(current.type) || !isHtmlTag(current.type)) return;
    //     const invokers = getEventInvokers(current.el);
    //     for (let event of disableEvents) {
    //         disableVNodeOrDOMEvent(event, props, invokers, enableEvents, preventDefaultEvents, stopPropagationEvents, manualEvents);
    //     }
    // }, maxDepth);
    // 递归处理 DOM
    deepTraverseDOM(el, current => {
        const invokers = getEventInvokers(current);
        if (!invokers) return;
        for (let event of disableEvents) {
            disableVNodeOrDOMEvent(event, undefined, invokers, enableEvents, preventDefaultEvents, stopPropagationEvents, manualEvents);
        }
    }, maxDepth);
}

function disableVNodeOrDOMEvent(event: string,
                                props: any,
                                invokers?: EventInvokers,
                                enableEvents?: Array<string>,
                                preventDefaultEvents?: Array<string>,
                                stopPropagationEvents?: Array<string>,
                                manualEvents?: Record<string, Function>) {
    if (enableEvents?.includes(event)) return;
    const preventDefault = preventDefaultEvents && preventDefaultEvents.includes(event);
    const stopPropagation = stopPropagationEvents && stopPropagationEvents.includes(event);
    let emptyEventListener: Function | undefined;
    if (manualEvents) {
        if (isFun(manualEvents[event])) emptyEventListener = manualEvents[event];
        if (isFun(manualEvents[toElementEventName(event)])) emptyEventListener = manualEvents[toElementEventName(event)];
    }
    if (!emptyEventListener) {
        emptyEventListener = getEmptyEventListener({ preventDefault, stopPropagation });
    }
    // 这里可以移除 VNode 的事件，防止组件报非空错误
    replaceEventEventListener(props, invokers, event, emptyEventListener);
    // 处理html原生事件修饰符
    ["Capture", "Once", "Passive"].forEach(modifier => {
        const name = event + modifier;
        replaceEventEventListener(props, invokers, name, emptyEventListener);
    });
}

// 空函数标记
const emptyFunction = Symbol('__empty_function');

function replaceEventEventListener(props: any, invokers: EventInvokers | undefined, eventName: string, emptyEventListener: Function) {
    if (props?.[eventName]) {
        props[eventName] = emptyEventListener;
    }
    if (invokers?.[eventName]) {
        if (!invokers[eventName].value?.emptyFunction) {
            emptyEventListener[emptyFunction] = true;
            invokers[eventName].value = emptyEventListener;
            invokers[eventName].attached = Date.now();
        }
    }
}

/**
 * 禁用组件内部的事件
 */
const disableEvent: Directive<Element, DirectiveValue> = {
    // created: (el, binding, vnode) => {
    //     doDisableEvent(el, binding, vnode);
    // },
    mounted: (el, binding, vnode) => {
        doDisableEvent(el, binding, vnode);
    },
    // beforeUpdate: (el, binding, vnode) => {
    //     doDisableEvent(el, binding, vnode);
    // },
    updated: (el, binding, vnode) => {
        doDisableEvent(el, binding, vnode);
    },
};

export {
    disableEvent,
}
