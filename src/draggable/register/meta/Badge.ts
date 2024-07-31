import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import BadgeSvg from "@/assets/images/badge.svg?component";

export default defineComponentMeta({
    type: "Badge",
    name: "徽标数",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(BadgeSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
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
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
