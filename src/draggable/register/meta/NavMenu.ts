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
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [

                    ],
                },
                {
                    title: "风格",
                    items: [],
                },
            ],
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
