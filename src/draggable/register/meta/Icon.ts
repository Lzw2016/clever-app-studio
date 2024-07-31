import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import IconSvg from "@/assets/images/icon.svg?component";

export default defineComponentMeta({
    type: "Icon",
    name: "图标",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(IconSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
