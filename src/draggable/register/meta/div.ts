import { noValue } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "div",
    name: "行级块",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "far square",
    defDesignNode: {
        props: {
            style: {
                border: "1px solid #ccc",
            },
        },
    },
    designDirectives: {
        "disable-event": {},
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
