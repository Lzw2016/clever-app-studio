import { Directive, DirectiveBinding, VNode } from "vue";
import { isStr } from "@/utils/Typeof";
import { deepTraverseElement, isHtmlTag } from "@/draggable/utils/HtmlTag";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { deepTraverseVNode } from "@/draggable/utils/DesignerUtils";

interface DirectiveValue {
    /** 递归的最大深度 */
    maxDepth?: number;
}

function delPropsAttr(binding: DirectiveBinding<DirectiveValue>, vnode: VNode) {
    const value = binding.value ?? {};
    const maxDepth = value.maxDepth ?? 8;
    // console.log("vnode", vnode);
    deepTraverseVNode(vnode, current => {
        // if (current.type === "input") {
        //     console.log("vnode", current);
        // }
        if (vnode === current) return;
        const props: any = current.props;
        if (!props) return;
        if (!isStr(current.type) || !isHtmlTag(current.type)) return;
        delete props[htmlExtAttr.componentType];
        delete props[htmlExtAttr.nodeId];
        delete props[htmlExtAttr.nodeRef];
        delete props[htmlExtAttr.nodeParentId];
        delete props[htmlExtAttr.placeholderName];
        delete props[htmlExtAttr.slotName];
    }, maxDepth);
}

function delElementAttr(binding: DirectiveBinding<DirectiveValue>, el: Element) {
    const value = binding.value ?? {};
    const maxDepth = value.maxDepth ?? 8;
    // console.log("el", el);
    deepTraverseElement(el, current => {
        if (el === current) return;
        current.removeAttribute(htmlExtAttr.componentType);
        current.removeAttribute(htmlExtAttr.nodeId);
        current.removeAttribute(htmlExtAttr.nodeRef);
        current.removeAttribute(htmlExtAttr.nodeParentId);
        current.removeAttribute(htmlExtAttr.placeholderName);
        current.removeAttribute(htmlExtAttr.slotName);
    }, maxDepth);
}

/**
 * 清除组件内部的 HTMLElement 节点上与拖拽的相关的属性
 */
const clearDraggableHtmlAttr: Directive<Element, DirectiveValue> = {
    deep: false,
    created: (el, binding, vnode) => {
        delPropsAttr(binding, vnode);
    },
    beforeMount: (el, binding, vnode) => {
        delElementAttr(binding, el);
    },
    beforeUpdate: (el, binding, vnode) => {
        delPropsAttr(binding, vnode);
    },
};

export {
    clearDraggableHtmlAttr,
}
