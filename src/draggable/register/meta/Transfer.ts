import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TransferSvg from "@/assets/images/transfer.svg?component";

export default defineComponentMeta({
    type: "Transfer",
    name: "穿梭框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TransferSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
