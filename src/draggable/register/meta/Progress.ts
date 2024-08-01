import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ProgressSvg from "@/assets/images/progress.svg?component";

export default defineComponentMeta({
    type: "Progress",
    name: "进度条",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ProgressSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
