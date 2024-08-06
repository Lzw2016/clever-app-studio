import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SelectSvg from "@/assets/images/select.svg?component";

export default defineComponentMeta({
    type: "Select",
    name: "选择器",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SelectSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
