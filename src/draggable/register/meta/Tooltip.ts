import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TooltipSvg from "@/assets/images/tooltip.svg?component";

export default defineComponentMeta({
    type: "Tooltip",
    name: "文字提示",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TooltipSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
