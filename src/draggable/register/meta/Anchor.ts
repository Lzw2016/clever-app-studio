import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import AnchorSvg from "@/assets/images/anchor.svg?component";

export default defineComponentMeta({
    type: "Anchor",
    name: "锚点",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(AnchorSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
