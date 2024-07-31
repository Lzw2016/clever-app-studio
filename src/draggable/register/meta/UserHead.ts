import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import UserHeadSvg from "@/assets/images/user-head.svg?component";

export default defineComponentMeta({
    type: "UserHead",
    name: "用户头像",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(UserHeadSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
