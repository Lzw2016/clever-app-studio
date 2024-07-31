import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import LayoutSvg from "@/assets/images/layout.svg?component";

export default defineComponentMeta({
    type: "Layout",
    name: "栅格布局",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(LayoutSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
