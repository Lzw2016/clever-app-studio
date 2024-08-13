import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import HrSvg from "@/assets/images/hr.svg?component";

export default defineComponentMeta({
    type: "Divider",
    name: "分割线",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(HrSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
        items: [
            {
                type: "div",
                tpl: "文案",
            },
        ],
    },
    slots: {},
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "left", label: "左(left)" },
                                    { value: "center", label: "中(center)" },
                                    { value: "right", label: "右(right)" },
                                ],
                            },
                            label: "文案位置",
                            propsName: "contentPosition",
                            defPropsValue: "center",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "solid", label: "实线(solid)" },
                                    { value: "dashed", label: "虚线(dashed)" },
                                ],
                            },
                            label: "样式",
                            propsName: "borderStyle",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "文案颜色",
                            propsName: "contentColor",
                            defPropsValue: "#252b3a",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "分隔颜色",
                            propsName: "color",
                            defPropsValue: "#adb0b8",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "背景颜色",
                            propsName: "contentBackgroundColor",
                            defPropsValue: "#ffffff",
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
