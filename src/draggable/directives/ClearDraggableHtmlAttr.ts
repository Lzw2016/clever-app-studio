import { Directive } from "vue";

/**
 * 清除组件内部的 HTMLElement 节点上与拖拽的相关的属性
 */
const clearDraggableHtmlAttr: Directive = {
    created: (el, binding, vnode) => {

    },
};

export {
    clearDraggableHtmlAttr,
}
