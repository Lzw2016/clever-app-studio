import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import AlertSvg from "@/assets/images/alert.svg?component";

export default defineComponentMeta({
    type: "Alert",
    name: "警告",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(AlertSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
