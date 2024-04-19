import type { Directive } from "vue";

/**
 * 获取 HTMLElement 节点的焦点
 */
const focus: Directive = {
    mounted: (el, binding, vnode, prevVNode) => {
        if (el?.focus) el.focus();
    },
};

export {
    focus,
}
