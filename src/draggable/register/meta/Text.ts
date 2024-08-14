import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TextSvg from "@/assets/images/text.svg?component";

export default defineComponentMeta({
    type: "Text",
    name: "文本",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TextSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            defText: "自定义文本",
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    slots: {},
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "文本内容",
                            propsName: "defText",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "span", label: "内联块(span)" },
                                    { value: "div", label: "行级块(div)" },
                                    { value: "p", label: "段落(p)" },
                                ],
                            },
                            label: "Html标签",
                            propsName: "tagType",
                            defPropsValue: "span",
                            recalcAuxToolPosition: true,
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
    placeholder: {},
    i18n: {},
});
