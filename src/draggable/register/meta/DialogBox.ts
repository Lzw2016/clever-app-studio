import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DialogBoxSvg from "@/assets/images/dialog-box.svg?component";

export default defineComponentMeta({
    type: "DialogBox",
    name: "对话框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DialogBoxSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
