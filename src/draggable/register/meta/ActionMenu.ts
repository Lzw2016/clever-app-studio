import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ActionMenuSvg from "@/assets/images/action-menu.svg?component";

export default defineComponentMeta({
    type: "ActionMenu",
    name: "动作菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ActionMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
            },
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
