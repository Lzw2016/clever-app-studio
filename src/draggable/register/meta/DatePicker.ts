import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DatePickerSvg from "@/assets/images/date-picker.svg?component";

export default defineComponentMeta({
    type: "DatePicker",
    name: "日期选择",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DatePickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
