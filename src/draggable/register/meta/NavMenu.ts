import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import NavMenuSvg from "@/assets/images/nav-menu.svg?component";

export default defineComponentMeta({
    type: "NavMenu",
    name: "导航菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(NavMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
