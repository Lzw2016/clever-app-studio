import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DropdownSvg from "@/assets/images/dropdown.svg?component";

export default defineComponentMeta({
    type: "Dropdown",
    name: "下拉菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DropdownSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
