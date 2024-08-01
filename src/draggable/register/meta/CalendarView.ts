import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CalendarViewSvg from "@/assets/images/calendar-view.svg?component";

export default defineComponentMeta({
    type: "CalendarView",
    name: "日历视图",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CalendarViewSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
