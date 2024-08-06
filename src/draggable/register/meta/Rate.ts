import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RateSvg from "@/assets/images/rate.svg?component";

export default defineComponentMeta({
    type: "Rate",
    name: "评分",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RateSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
