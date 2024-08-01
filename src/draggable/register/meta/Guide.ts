import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import GuideSvg from "@/assets/images/guide.svg?component";

export default defineComponentMeta({
    type: "Guide",
    name: "引导",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(GuideSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
