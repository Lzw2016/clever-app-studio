import { createVNode } from "vue";
import { Divider } from "@opentiny/vue";
import { style } from "@/utils/UseType";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";

/**
 * 使用函数式组件包装 Divider
 * https://cn.vuejs.org/guide/extras/render-function.html#typing-functional-components
 * @param props 组件属性
 * @param ctx   组件上下文
 */
function DividerWrapper(props, ctx) {
    const { attrs, slots } = ctx;
    const innerProps = { ...props, ...attrs };
    const divProps = {
        style: style({
            minHeight: "16px",
            overflow: "auto",
        }),
    };
    for (let key of Object.values(htmlExtAttr)) {
        const value = innerProps[key];
        if (value) {
            divProps[key] = value;
            delete innerProps[key];
        }
    }
    return createVNode(
        "div",
        divProps,
        [
            createVNode(
                Divider,
                innerProps,
                slots,
            )
        ],
    );
}

export default DividerWrapper;
