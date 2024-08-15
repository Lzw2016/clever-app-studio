import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SkeletonSvg from "@/assets/images/skeleton.svg?component";

export default defineComponentMeta({
    type: "Skeleton",
    name: "骨架屏",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SkeletonSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
