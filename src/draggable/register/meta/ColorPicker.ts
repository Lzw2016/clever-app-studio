import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ColorPickerSvg from "@/assets/images/color-picker.svg?component";

export default defineComponentMeta({
    type: "ColorPicker",
    name: "颜色选择",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/color-picker",
    icon: createVNode(ColorPickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "ColorSetter",
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "启用alpha",
                            labelTips: "是否启用alpha选择",
                            propsName: "vertical",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置预定义颜色",
                            },
                            label: "预定义值",
                            propsName: "predefine",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置历史记录",
                            },
                            label: "历史记录",
                            propsName: "history",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "默认显示",
                            labelTips: "默认显示颜色选择面板",
                            propsName: "visible",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "large ", label: "大" },
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "组件大小",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "取消",
                            description: "按下取消或点击外部的时触发该事件",
                            name: "cancel",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "确认",
                            description: "按下确认时触发该事件",
                            name: "confirm",
                            params: [
                                { name: "hex", type: "string", note: "" },
                            ],
                            return: VarType.Void,
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
