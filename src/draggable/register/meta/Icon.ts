import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import IconSvg from "@/assets/images/icon.svg?component";

export default defineComponentMeta({
    type: "Icon",
    name: "图标",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(IconSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            iconType: "FontAwesomeIcon",
            iconProps: {
                size: "lg",
                fixedWidth: true,
                icon: [
                    "far",
                    "star",
                ],
            },
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        // {
                        //     cmp: "IconSetter",
                        //     cmpProps: {
                        //         placeholder: "选择图标",
                        //         readonly: true,
                        //     },
                        //     label: "按钮图标",
                        //     // propsName: "icon",
                        //     enableBind: false,
                        //     recalcAuxToolPosition: true,
                        // },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
