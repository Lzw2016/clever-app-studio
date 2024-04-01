import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "ButtonGroup",
    // designComponent: "",
    defDesignNode: {
        props: {
            data: [
                { text: '按钮1', value: 'v_1' },
                { text: '按钮2', value: 'v_2' },
                { text: '按钮3', value: 'v_3' },
            ],
        },
    },
    events: {},
    slots: {},
    setter: {
        props: {
            title: "",
            groups: [],
        },
        events: {
            title: "",
            groups: [],
        },
        style: {
            title: "",
            groups: [],
        },
        advanced: {
            title: "",
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
