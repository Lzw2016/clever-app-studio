import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "ButtonGroup",
    name: "按钮组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "",
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
            disableFont: true,
            disableBorder: true,
            componentStyles: [
                { name: "测试1", class: "test_1 compact" },
                { name: "测试2", class: "test_3 gorgeous" },
            ],
        },
        advanced: {
            title: "",
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
