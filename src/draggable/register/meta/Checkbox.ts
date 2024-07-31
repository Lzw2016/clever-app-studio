import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CheckboxSvg from "@/assets/images/checkbox.svg?component";

export default defineComponentMeta({
    type: "Checkbox",
    name: "多选框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CheckboxSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
