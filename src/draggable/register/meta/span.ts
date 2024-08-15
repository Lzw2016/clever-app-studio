import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SpanSvg from "@/assets/images/span.svg?component";

export default defineComponentMeta({
    type: "span",
    name: "内联块",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SpanSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                display: 'inline-block',
                width: "auto",
                height: "auto",
                border: "1px solid #ccc",
                margin: "4px",
            },
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
    placeholder: {
        default: true,
    },
    i18n: {},
});
