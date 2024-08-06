import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RadioGroupSvg from "@/assets/images/radio-group.svg?component";

export default defineComponentMeta({
    type: "RadioGroup",
    name: "单选组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RadioGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
