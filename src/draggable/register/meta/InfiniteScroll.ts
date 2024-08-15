import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import InfiniteScrollSvg from "@/assets/images/infinite-scroll.svg?component";

export default defineComponentMeta({
    type: "InfiniteScroll",
    name: "无限滚动",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(InfiniteScrollSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
