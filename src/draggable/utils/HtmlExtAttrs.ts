import { ComponentManage } from "@/draggable/types/ComponentManage";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

function getAttribute(attr: string, element?: Element): string | null | undefined {
    if (!element) return;
    return element.getAttribute(attr);
}

/**
 * 自定义 html 元素属性
 */
const htmlExtAttr = {
    /** 获取被拖拽的组件类型(值是：DesignNode.type) */
    componentType: 'data-component-type',
    /** 组件节点id(值是：RuntimeNode.id) */
    nodeId: 'data-node-id',
    /** 组件节点ref(值是：RuntimeNode.ref) */
    nodeRef: 'data-node-ref',
    /** 可以容纳插槽的容器(值是：slot_name，子节点是一种特殊的插槽，名为：default) */
    slotContainer: 'data-slot-container',
    /** 当前组件在父组件的插槽内(值是：slot_name，子节点是一种特殊的插槽，名为：default) */
    inSlot: 'data-in-slot',
};

/**
 * 使用 htmlAttr 的逻辑
 */
const useHtmlExtAttr = {
    /** 获取被拖拽的组件类型 */
    componentType(element: Element | null, componentManage: ComponentManage): ComponentMeta | undefined {
        if (!element) return;
        const type = getAttribute(htmlExtAttr.componentType, element);
        if (!type) return;
        return componentManage.getComponentMeta(type);
    },

}

export {
    htmlExtAttr,
    useHtmlExtAttr,
}
