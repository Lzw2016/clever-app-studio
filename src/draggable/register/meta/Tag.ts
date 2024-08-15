import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TagSvg from "@/assets/images/tag.svg?component";

export default defineComponentMeta({
    type: "Tag",
    name: "标签",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TagSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
