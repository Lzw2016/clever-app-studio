import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FilterPanelSvg from "@/assets/images/filter-panel.svg?component";

export default defineComponentMeta({
    type: "FilterPanel",
    name: "过滤器",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/filter-panel",
    icon: createVNode(FilterPanelSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            label: "过滤标题",
        },
    },
    designDirectives: {
        // "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "StringSetter",
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "过滤标题",
                            propsName: "label",
                        },
                        {
                            cmp: "StringSetter",
                            label: "提示信息",
                            labelTips: "标题右侧的提示信息",
                            propsName: "tip",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "top", label: "top" },
                                    { value: "top-start", label: "top-start" },
                                    { value: "top-end", label: "top-end" },
                                    { value: "bottom", label: "bottom" },
                                    { value: "bottom-start", label: "bottom-start" },
                                    { value: "bottom-end", label: "bottom-end" },
                                    { value: "left", label: "left" },
                                    { value: "left-start", label: "left-start" },
                                    { value: "left-end", label: "left-end" },
                                    { value: "right", label: "right" },
                                    { value: "right-start", label: "right-start" },
                                    { value: "right-end", label: "right-end" },
                                ],
                            },
                            label: "下拉位置",
                            labelTips: "下拉面板位置，可选值请参考popover组件的同属性",
                            propsName: "placement",
                            defPropsValue: "bottom-start",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            labelTips: "弹出显示内容是否追加到html的body的末尾位置",
                            propsName: "popperAppendToBody",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "透明背景",
                            labelTips: "将过滤器背景设置为",
                            propsName: "blank",
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "下拉面板的class",
                            propsName: "popperClass",
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
                            title: "清除事件",
                            description: "清除按钮点击事件",
                            name: "handleClear",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "下拉面板显示状态变化",
                            description: "下拉面板显示隐藏事件",
                            name: "visibleChange",
                            params: [
                                { name: "visible", type: "boolean", note: "" },
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
    placeholder: {
        default: true,
    },
    i18n: {},
});
