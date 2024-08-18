import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabsSvg from "@/assets/images/tabs.svg?component";

export default defineComponentMeta({
    type: "TabItem",
    name: "页签项",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TabsSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
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
    placeholder: {
        default: true,
    },
    i18n: {},
});
