import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TextSvg from "@/assets/images/text.svg?component";

export default defineComponentMeta({
    type: "Text",
    name: "文本",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TextSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
