import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import GridSvg from "@/assets/images/grid.svg?component";

export default defineComponentMeta({
    type: "Grid",
    name: "表格",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(GridSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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