import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TreeMenuSvg from "@/assets/images/tree-menu.svg?component";

export default defineComponentMeta({
    type: "TreeMenu",
    name: "树型菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TreeMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
