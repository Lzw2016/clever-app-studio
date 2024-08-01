import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import StepsSvg from "@/assets/images/steps.svg?component";

export default defineComponentMeta({
    type: "Steps",
    name: "步骤条",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(StepsSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
