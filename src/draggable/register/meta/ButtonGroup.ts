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
            border: true,
            data: [
                { text: '按钮1', value: 'val_1' },
                { text: '按钮2', value: 'val_2' },
                { text: '按钮3', value: 'val_3' },
            ],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    slots: {},
    setter: {
        props: {
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "显示边框",
                            propsName: "border",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "朴素按钮",
                            propsName: "plain",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {
            disableFont: true,
            disableBorder: true,
        },
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
