import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FallMenuSvg from "@/assets/images/fall-menu.svg?component";

export default defineComponentMeta({
    type: "FallMenu",
    name: "瀑布菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FallMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
