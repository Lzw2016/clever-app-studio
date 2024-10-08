import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { createBaseWrapper } from "@/draggable/utils/ComponentWrapper";
import HrSvg from "@/assets/images/hr.svg?component";

export default defineComponentMeta({
    type: "hr",
    name: "分割线",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(HrSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    designComponent: createBaseWrapper(
        "div",
        {
            style: {
                overflow: "auto",
            },
        },
        "hr",
    ),
    defDesignNode: {
        props: {},
    },
    setter: {
        props: {
            groups: [],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
