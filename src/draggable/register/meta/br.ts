import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import BrSvg from "@/assets/images/br.svg?component";

export default defineComponentMeta({
    type: "br",
    name: "换行",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(BrSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
        },
    },
    setter: {
         events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
