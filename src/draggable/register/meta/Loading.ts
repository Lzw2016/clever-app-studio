import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import LoadingSvg from "@/assets/images/loading.svg?component";

export default defineComponentMeta({
    type: "Loading",
    name: "加载",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(LoadingSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
