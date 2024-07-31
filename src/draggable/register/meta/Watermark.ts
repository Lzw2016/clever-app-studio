import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import WatermarkSvg from "@/assets/images/watermark.svg?component";

export default defineComponentMeta({
    type: "Watermark",
    name: "水印",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(WatermarkSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
