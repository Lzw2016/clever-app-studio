import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ScrollTextSvg from "@/assets/images/scroll-text.svg?component";

export default defineComponentMeta({
    type: "ScrollText",
    name: "文字滚动",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ScrollTextSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
