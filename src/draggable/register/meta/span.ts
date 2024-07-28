import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RectangleHorizontal from "@/assets/images/rectangle-horizontal.svg?component";

export default defineComponentMeta({
    type: "span",
    name: "[span]",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RectangleHorizontal, { 'stroke-width': "2.5", style: { width: "18px", height: "18px" } }, []),
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
