import { ComponentManage } from "@/draggable/types/ComponentManage";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

/**
 * 自定义 html 元素属性
 */
const htmlExtendAttr = {
    // 获取被拖拽的组件类型
    componentType: 'data-component-type',
};

/**
 * 使用 htmlAttr 的逻辑
 */
const useHtmlExtendAttr = {
    componentType(element: Element | null, componentManage: ComponentManage): ComponentMeta | undefined {
        if (!element) return;
        const type = element.getAttribute(htmlExtendAttr.componentType);
        if (!type) return;
        return componentManage.getComponentMeta(type);
    }

    // /**
    //  * 支持鼠标双击编辑文本
    //  */
    // idEditable(element?: HTMLElement): boolean {
    //     if (!element) return false;
    //     return `${element[htmlAttr.editable]}` === 'true';
    // },
}

export {
    htmlExtendAttr,
    useHtmlExtendAttr,
}
