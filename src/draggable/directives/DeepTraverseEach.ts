import { Directive, DirectiveBinding, VNode } from "vue";
import { isFunction, isStr } from "@/utils/Typeof";
import { deepTraverseElement, isHtmlTag } from "@/draggable/utils/HtmlTag";
import { deepTraverseVNode } from "@/draggable/utils/DesignerUtils";

interface DirectiveValue {
    /** 递归的最大深度 */
    maxDepth?: number;
    /** 遍历VNode */
    eachVNode?: (rootVNode: VNode, htmlTag: boolean, current: VNode, parent?: VNode) => void;
    /** 遍历Element */
    eachElement?: (rootEl: Element, current: Element, parent?: Element) => void;
}

function eachVNode(binding: DirectiveBinding<DirectiveValue>, rootVNode: VNode) {
    const value = binding.value ?? {};
    const maxDepth = value.maxDepth ?? 8;
    const each = value.eachVNode;
    if (!isFunction(each)) return;
    deepTraverseVNode(
        rootVNode,
        (current, parent) => {
            const htmlTag = isStr(current.type) && isHtmlTag(current.type);
            each(rootVNode, htmlTag, current, parent);
        },
        maxDepth,
    );
}

function eachElement(binding: DirectiveBinding<DirectiveValue>, rootEl: Element) {
    const value = binding.value ?? {};
    const maxDepth = value.maxDepth ?? 8;
    const each = value.eachElement;
    if (!isFunction(each)) return;
    deepTraverseElement(
        rootEl,
        (current, parent) => each(rootEl, current, parent),
        maxDepth,
    );
}

/**
 * 深度遍历 VNode 和 Element
 */
const deepTraverseEach: Directive<Element, DirectiveValue> = {
    deep: false,
    created: (el, binding, vnode) => {
        if (vnode) eachVNode(binding, vnode);
    },
    beforeMount: (el, binding, vnode) => {
        if (el) eachElement(binding, el);
    },
    beforeUpdate: (el, binding, vnode) => {
        if (vnode) eachVNode(binding, vnode);
    },
};

export {
    deepTraverseEach,
}
