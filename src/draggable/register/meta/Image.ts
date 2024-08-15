import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ImageSvg from "@/assets/images/image.svg?component";

export default defineComponentMeta({
    type: "Image",
    name: "图片",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ImageSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
