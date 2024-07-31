import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ButtonGroupSvg from "@/assets/images/button-group.svg?component";

export default defineComponentMeta({
    type: "ButtonGroup",
    name: "按钮组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ButtonGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                { text: '按钮1', value: 'v_1' },
                { text: '按钮2', value: 'v_2' },
                { text: '按钮3', value: 'v_3' },
            ],
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
        style: {
            disableFont: true,
            disableBorder: true,
        },
        advanced: {
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
