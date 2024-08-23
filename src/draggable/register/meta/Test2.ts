import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SearchSvg from "@/assets/images/search.svg?component";

export default defineComponentMeta({
    type: "Test2",
    name: "Test2",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SearchSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [

                    ],
                },
                {
                    title: "风格",
                    items: [],
                },
            ],
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
