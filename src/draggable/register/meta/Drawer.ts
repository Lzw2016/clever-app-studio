import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DrawerSvg from "@/assets/images/drawer.svg?component";

export default defineComponentMeta({
    type: "Drawer",
    name: "抽屉",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DrawerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
