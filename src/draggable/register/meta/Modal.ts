import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ModalSvg from "@/assets/images/modal.svg?component";

export default defineComponentMeta({
    type: "Modal",
    name: "模态框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ModalSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
