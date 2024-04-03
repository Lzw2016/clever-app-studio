import type { Directive } from "vue";

const focus: Directive = {
    mounted: (el, binding, vnode, prevVNode) => {
        el.focus();
        // console.log("focus", binding);
    },
};

export {
    focus,
}
