import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CropSvg from "@/assets/images/crop.svg?component";

export default defineComponentMeta({
    type: "Crop",
    name: "图片裁剪",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CropSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
