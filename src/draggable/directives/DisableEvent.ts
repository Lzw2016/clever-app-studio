import { Directive, DirectiveBinding, VNode } from "vue";
import { isFunction, isStr, noValue } from "@/utils/Typeof";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { deepTraverseVNode } from "@/draggable/utils/DesignerUtils";

function empty() {
}

function fixEventName(name: string) {
    if (noValue(name)) name = "";
    name = name.trim();
    if (!name.startsWith("on")) {
        if (name.length > 1) {
            name = `on${name[0].toUpperCase()}${name.substring(1)}`;
        } else {
            name = `on${name[0].toUpperCase()}`;
        }
    }
    return name;
}

function fixEventNames(names?: Array<string>) {
    if (!names) return;
    return names.filter(name => isStr(name))
        .map(name => fixEventName(name))
        .filter(name => name.length > 0);
}

const defEvents = fixEventNames([
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

interface DirectiveValue {
    /** 递归的最大深度 */
    maxDepth?: number;
    /** 禁用的事件名称，如果未设置就是用默认的事件集合(defEvents)，优先级: manualDisable > enableEvents > disableEvents */
    disableEvents?: string | Array<string>;
    /**启用的事件名称，优先级: manualDisable > enableEvents > disableEvents  */
    enableEvents?: string | Array<string>;
    /** 手动禁用事件，优先级: manualDisable > enableEvents > disableEvents */
    manualDisable?: (vnode: VNode) => void;
}

function doDisableEvent(binding: DirectiveBinding<DirectiveValue>, vnode: VNode) {
    // console.log("vnode", vnode);
    const value = binding.value ?? {};
    const manualDisable = value.manualDisable;
    if (isFunction(manualDisable)) {
        manualDisable(vnode);
        return;
    }
    // 递归遍历 vnode 禁用事件
    const disableEvents = fixEventNames(!value.disableEvents ? undefined : isStr(value.disableEvents) ? [value.disableEvents] : value.disableEvents) ?? defEvents;
    const enableEvents = fixEventNames(!value.enableEvents ? undefined : isStr(value.enableEvents) ? [value.enableEvents] : value.enableEvents);
    const maxDepth = value.maxDepth ?? 8;
    deepTraverseVNode(vnode, current => {
        const props: any = current.props;
        if (!props) return;
        if (!isStr(current.type) || !isHtmlTag(current.type)) return;
        for (let event of disableEvents) {
            if (enableEvents && enableEvents.includes(event)) continue;
            // 这里可以移除 VNode 的事件，防止组件报非空错误
            if (props[event]) props[event] = empty;
            // 处理html原生事件修饰符
            ["Capture", "Once", "Passive"].forEach(modifier => {
                const name = event + modifier;
                if (props[name]) props[name] = empty;
            });
        }
    }, maxDepth);
}

/**
 * 禁用组件内部的事件
 */
const disableEvent: Directive<any, DirectiveValue> = {
    created: (el, binding, vnode) => {
        // TODO 测试深层次内部事件是否能够替换成功
        doDisableEvent(binding, vnode);
    },
    // beforeMount: (el, binding, vnode) => {
    //     doDisableEvent(binding, vnode);
    //     binding.instance?.$forceUpdate();
    //     console.log("binding.instance", binding.instance);
    // },
    beforeUpdate: (el, binding, vnode) => {
        doDisableEvent(binding, vnode);
    },
};

export {
    disableEvent,
}
