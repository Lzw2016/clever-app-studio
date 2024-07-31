import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import IpAddressSvg from "@/assets/images/ip-address.svg?component";

export default defineComponentMeta({
    type: "IpAddress",
    name: "IP输入框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(IpAddressSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
