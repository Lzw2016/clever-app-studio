import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import QrCodeSvg from "@/assets/images/qr-code.svg?component";

export default defineComponentMeta({
    type: "QrCode",
    name: "二维码",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(QrCodeSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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