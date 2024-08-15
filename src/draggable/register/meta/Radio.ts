import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RadioSvg from "@/assets/images/radio.svg?component";

export default defineComponentMeta({
    type: "Radio",
    name: "单选框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RadioSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
