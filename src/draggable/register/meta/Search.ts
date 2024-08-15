import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SearchSvg from "@/assets/images/search.svg?component";

export default defineComponentMeta({
    type: "Search",
    name: "搜索",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SearchSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
