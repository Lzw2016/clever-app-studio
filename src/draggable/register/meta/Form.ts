import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FormSvg from "@/assets/images/form.svg?component";

export default defineComponentMeta({
    type: "Form",
    name: "表单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FormSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
