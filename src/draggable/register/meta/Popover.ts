import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import PopoverSvg from "@/assets/images/popover.svg?component";

export default defineComponentMeta({
    type: "Popover",
    name: "气泡卡片",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(PopoverSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
