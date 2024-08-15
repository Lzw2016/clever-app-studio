import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ContainerSvg from "@/assets/images/container.svg?component";

export default defineComponentMeta({
    type: "Container",
    name: "容器布局",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ContainerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
