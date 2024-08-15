import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ToggleMenuSvg from "@/assets/images/toggle-menu.svg?component";

export default defineComponentMeta({
    type: "ToggleMenu",
    name: "收缩菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ToggleMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
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
