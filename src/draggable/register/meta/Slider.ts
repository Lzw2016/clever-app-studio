import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SliderSvg from "@/assets/images/slider.svg?component";

export default defineComponentMeta({
    type: "Slider",
    name: "滑动输入",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SliderSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
