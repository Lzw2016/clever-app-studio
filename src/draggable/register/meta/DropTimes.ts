import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DropTimesSvg from "@/assets/images/drop-times.svg?component";

export default defineComponentMeta({
    type: "DropTimes",
    name: "时间下拉",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DropTimesSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
