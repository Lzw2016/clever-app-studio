import { createVNode } from "vue";
import { noValue } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SpanSvg from "@/assets/images/span.svg?component";

export default defineComponentMeta({
    type: "span",
    name: "内联块",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SpanSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                display: 'inline-block',
                width: "auto",
                height: "auto",
                border: "1px solid #ccc",
                margin: "4px",
            },
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "无内容",
                            getPropsValue: (props, node) => noValue(node.__designPlaceholder?.default),
                            applyPropsValue: (props, value, node, setter) => {
                                const blockInstance = setter.blockInstance;
                                if (value) {
                                    blockInstance.opsForDesign.removePlaceholder(node.id, childSlotName);
                                } else {
                                    blockInstance.opsForDesign.setPlaceholder(node.id, childSlotName);
                                }
                            },
                        },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
