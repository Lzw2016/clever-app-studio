import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "div",
    name: "行级块",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "far square",
    defDesignNode: {
        props: {
            style: {
                width: "auto",
                height: "auto",
                border: "1px solid #ccc",
                margin: "4px",
            },
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    slots: {},
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
