import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabsSvg from "@/assets/images/tabs.svg?component";

export default defineComponentMeta({
    type: "Tabs",
    name: "多页签",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TabsSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
