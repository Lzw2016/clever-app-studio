import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CollapseSvg from "@/assets/images/collapse.svg?component";

export default defineComponentMeta({
    type: "Collapse",
    name: "折叠面板",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CollapseSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
