import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TimeSelectSvg from "@/assets/images/time-select.svg?component";

export default defineComponentMeta({
    type: "TimeSelect",
    name: "时间选择",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TimeSelectSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
