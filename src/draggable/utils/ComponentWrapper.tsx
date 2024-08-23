import { createVNode } from "vue";
import { HtmlTag, VueComponent } from "@/draggable/types/Base";
import { BaseProps } from "@/draggable/types/DesignBlock";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";

/**
 * 动态创建一个包装组件，用于包装原始组件
 * @param wrapperTag    包装的html标签
 * @param wrapperProps  html标签的props
 * @param component     被包装的组件对象
 * @return 包装组件
 */
function createBaseWrapper(wrapperTag: HtmlTag, wrapperProps: BaseProps, component: any): VueComponent {
    /**
     * 使用函数式组件包装 BaseSelect
     * https://cn.vuejs.org/guide/extras/render-function.html#typing-functional-components
     * @param props 组件属性
     * @param ctx   组件上下文
     */
    return function (props, ctx) {
        const { attrs, slots } = ctx;
        const innerProps = { ...props, ...attrs };
        for (let key of Object.values(htmlExtAttr)) {
            const value = innerProps[key];
            if (value) {
                wrapperProps[key] = value;
                delete innerProps[key];
            }
        }
        return createVNode(wrapperTag, wrapperProps, [createVNode(component, innerProps, slots)]);
    };
}

export {
    createBaseWrapper,
}
