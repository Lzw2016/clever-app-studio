import { createVNode } from "vue";
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
                width: "80px",
                height: "40px",
                border: "1px solid #ae3ec9",
                margin: "4px",
            },
        },
        tpl: "新span",
    },
    slots: {},
    setter: {
        props: {
            groups: [
                {
                    title: "常规",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "配置A",
                            propsName: "bbb",
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {},
        // advanced: {
        //     groups: [],
        // },
    },
    placeholder: {},
    i18n: {},
});
