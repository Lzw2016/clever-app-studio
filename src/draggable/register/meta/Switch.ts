import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SwitchSvg from "@/assets/images/switch.svg?component";

export default defineComponentMeta({
    type: "Switch",
    name: "开关",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SwitchSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
        },
    },
    placeholder: {},
    i18n: {},
});
