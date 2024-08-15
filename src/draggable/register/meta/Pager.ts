import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import PagerSvg from "@/assets/images/pager.svg?component";

export default defineComponentMeta({
    type: "Pager",
    name: "分页",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(PagerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
