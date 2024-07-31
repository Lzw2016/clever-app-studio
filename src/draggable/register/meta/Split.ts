import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SplitSvg from "@/assets/images/split.svg?component";

export default defineComponentMeta({
    type: "Split",
    name: "分割面板",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SplitSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
