import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TimePickerSvg from "@/assets/images/time-picker.svg?component";

export default defineComponentMeta({
    type: "TimePicker",
    name: "时间选择",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TimePickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
