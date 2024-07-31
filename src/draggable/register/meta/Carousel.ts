import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CarouselSvg from "@/assets/images/carousel.svg?component";

export default defineComponentMeta({
    type: "Carousel",
    name: "走马灯",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CarouselSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
