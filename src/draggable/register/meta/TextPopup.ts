import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TextPopupSvg from "@/assets/images/text-popup.svg?component";

export default defineComponentMeta({
    type: "TextPopup",
    name: "输入框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TextPopupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
