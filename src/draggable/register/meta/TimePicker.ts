import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TimePickerSvg from "@/assets/images/time-picker.svg?component";

export default defineComponentMeta({
    type: "TimePicker",
    name: "时间选择",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/time-picker",
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
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [],
                },
                {
                    title: "风格",
                    items: [],
                },
                {
                    title: "html原生属性",
                    items: [],
                },
            ],
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
