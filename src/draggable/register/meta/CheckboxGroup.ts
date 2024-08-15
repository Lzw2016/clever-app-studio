import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CheckboxGroupSvg from "@/assets/images/checkbox-group.svg?component";

export default defineComponentMeta({
    type: "CheckboxGroup",
    name: "多选组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CheckboxGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
