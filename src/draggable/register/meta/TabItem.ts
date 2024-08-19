import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabItemSvg from "@/assets/images/tab-item.svg?component";

export default defineComponentMeta({
    type: "TabItem",
    name: "页签项",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TabItemSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
