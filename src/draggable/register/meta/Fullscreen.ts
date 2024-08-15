import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FullscreenSvg from "@/assets/images/fullscreen.svg?component";

export default defineComponentMeta({
    type: "Fullscreen",
    name: "全屏",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FullscreenSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
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
