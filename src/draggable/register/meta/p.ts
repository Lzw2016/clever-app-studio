import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import PSvg from "@/assets/images/p.svg?component";

export default defineComponentMeta({
    type: "p",
    name: "段落",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(PSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
        tpl: "文本段落",
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
                            cmpProps: {
                                type: "textarea",
                                resize: "vertical",
                                rows: 16,
                            },
                            label: "段落内容",
                            getPropsValue: (props, node) => node.tpl,
                            applyPropsValue: (props, value, node) => {
                                node.tpl.length = 0;
                                if (value) node.tpl.push(value);
                            },
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
