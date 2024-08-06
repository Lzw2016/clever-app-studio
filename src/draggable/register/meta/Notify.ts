import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import NotifySvg from "@/assets/images/notify.svg?component";

export default defineComponentMeta({
    type: "Notify",
    name: "通知",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(NotifySvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
