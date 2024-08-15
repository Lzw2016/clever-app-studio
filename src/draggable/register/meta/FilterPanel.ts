import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FilterPanelSvg from "@/assets/images/filter-panel.svg?component";

export default defineComponentMeta({
    type: "FilterPanel",
    name: "过滤器",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FilterPanelSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
