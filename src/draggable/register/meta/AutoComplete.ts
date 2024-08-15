import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import AutoCompleteSvg from "@/assets/images/auto-complete.svg?component";

export default defineComponentMeta({
    type: "AutoComplete",
    name: "自动完成",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(AutoCompleteSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
