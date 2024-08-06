import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ASvg from "@/assets/images/a.svg?component";

export default defineComponentMeta({
    type: "a",
    name: "链接",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ASvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
            },
        },
        // tpl: "连接",
    },
    slots: {},
    setter: {
        props: {
            groups: [],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {
        },
    },
    placeholder: {},
    i18n: {},
});
