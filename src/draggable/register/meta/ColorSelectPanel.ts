import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ColorSelectPanelSvg from "@/assets/images/color-select-panel.svg?component";

export default defineComponentMeta({
    type: "ColorSelectPanel",
    name: "颜色面板",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/color-select-panel",
    icon: createVNode(ColorSelectPanelSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            visible: true,
        },
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
                            propsName: "alpha",
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
                            label: "是否显示",
                            propsName: "visible",
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
                        {
                            title: "color值更新",
                            description: "color值更新",
                            name: "colorUpdate",
                            params: [
                                { name: "color", type: "Color", note: "" },
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
