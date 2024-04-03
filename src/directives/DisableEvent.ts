import { Directive, VNode } from "vue";
import { isFunction, isStr, noValue } from "@/utils/Typeof";

// /** 阻止事件传播 */
// function stopPropagation(event: Event) {
//     event.stopPropagation();
// }
//
// /** 事件选项 */
// const options: EventListenerOptions = {
//     /** 在事件捕获阶段触发事件 */
//     capture: true,
// };

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
    "input", "change", "focus", "blur", "submit", "reset",
    // 触摸设备上的触摸事件
    "touchstart", "touchmove", "touchend", "touchcancel",
    // 其他事件
    "contextmenu", "select", "error", "focusin", "focusout",
])!;

interface DirectiveValue {
    /** 禁用的事件名称，如果未设置就是用默认的事件集合(defEvents)，优先级: manualDisable > enableEvents > disableEvents */
    disableEvents?: string | Array<string>;
    /**启用的事件名称，优先级: manualDisable > enableEvents > disableEvents  */
    enableEvents?: string | Array<string>;
    /** 手动禁用事件，优先级: manualDisable > enableEvents > disableEvents */
    manualDisable?: (vnode: VNode) => void;
}

const disableEvent: Directive<any, DirectiveValue> = {
    created: (el, binding, vnode) => {
        console.log("vnode", vnode);
        const props: any = vnode.props;
        if (!props) return;
        const value = binding.value ?? {};
        const manualDisable = value.manualDisable;
        if (isFunction(manualDisable)) {
            manualDisable(vnode);
            return;
        }
        // TODO 递归遍历 vnode 禁用事件
        const disableEvents = fixEventNames(!value.disableEvents ? undefined : isStr(value.disableEvents) ? [value.disableEvents] : value.disableEvents) ?? defEvents;
        const enableEvents = fixEventNames(!value.enableEvents ? undefined : isStr(value.enableEvents) ? [value.enableEvents] : value.enableEvents);
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
    },
    // beforeMount: (el, binding, vnode) => {
    // },
    // mounted: (el, binding, vnode, prevVNode) => {
    //     // el.addEventListener("click", stopPropagation, options);
    // },
    // unmounted: (el, binding, vnode) => {
    //     // el.removeEventListener("click", stopPropagation, options);
    // },
};

export {
    disableEvent,
}
