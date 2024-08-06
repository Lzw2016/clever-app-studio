import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TagGroupSvg from "@/assets/images/tag-group.svg?component";

export default defineComponentMeta({
    type: "TagGroup",
    name: "标签组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TagGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
        },
    },
    placeholder: {},
    i18n: {},
});
