import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FloatBarSvg from "@/assets/images/float-bar.svg?component";

export default defineComponentMeta({
    type: "FloatBar",
    name: "浮动块",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FloatBarSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
