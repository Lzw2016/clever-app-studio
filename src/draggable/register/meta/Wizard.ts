import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import BrSvg from "@/assets/images/wizard.svg?component";

export default defineComponentMeta({
    type: "Wizard",
    name: "流程图",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(BrSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
