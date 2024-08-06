import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import InputNumberSvg from "@/assets/images/input-number.svg?component";

export default defineComponentMeta({
    type: "InputNumber",
    name: "数字输入",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(InputNumberSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
        },
    },
    placeholder: {},
    i18n: {},
});
