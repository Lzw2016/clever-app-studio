import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TimelineSvg from "@/assets/images/timeline.svg?component";

export default defineComponentMeta({
    type: "Timeline",
    name: "时间线",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TimelineSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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