import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CardSvg from "@/assets/images/card.svg?component";

export default defineComponentMeta({
    type: "Card",
    name: "卡片",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CardSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
