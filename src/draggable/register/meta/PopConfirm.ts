import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import PopConfirmSvg from "@/assets/images/pop-confirm.svg?component";

export default defineComponentMeta({
    type: "PopConfirm",
    name: "气泡确认",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/popconfirm",
    icon: createVNode(PopConfirmSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            title: "气泡确认",
            message: "确认文本信息，文本内容可以很长很长很长...",
            trigger: "click",
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "提示标题",
                            labelTips: "设置气泡提示框的标题",
                            propsName: "title",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "textarea",
                                resize: "none",
                                rows: 6,
                            },
                            label: "提示内容",
                            labelTips: "气泡提示框的内容",
                            propsName: "message",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "info", label: "信息按钮" },
                                    { value: "success", label: "成功按钮" },
                                    { value: "warning", label: "警告按钮" },
                                    { value: "error", label: "错误按钮" },
                                ],
                            },
                            label: "图标类型",
                            labelTips: "提示图标类型，可以传入自定义图标",
                            propsName: "type",
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
                            label: "提示位置",
                            labelTips: "气泡提示框显示位置",
                            propsName: "placement",
                            defPropsValue: "top",
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "hover", label: "鼠标悬停" },
                                    { value: "click", label: "鼠标点击" },
                                ],
                            },
                            label: "触发方式",
                            labelTips: "气泡提示框显示触发方式",
                            propsName: "trigger",
                            defPropsValue: "hover",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "取消按钮",
                            labelTips: "是否展示取消按钮",
                            propsName: "cancelButton",
                            defPropsValue: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "提示宽度",
                            propsName: "width",
                            defPropsValue: 350,
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "为气泡提示框自定义类名",
                            propsName: "customClass",
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "点击确认按钮",
                            description: "点击确认按钮时触发",
                            name: "confirm",
                            params: [
                                { name: "state", type: "IPopconfirmState", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "气泡框关闭",
                            description: "气泡确认框关闭时触发",
                            name: "hide",
                            params: [
                                { name: "state", type: "IPopconfirmState", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "气泡框显示",
                            description: "气泡确认框显示时触发",
                            name: "show",
                            params: [
                                { name: "state", type: "IPopconfirmState", note: "" },
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
        reference: {
            type: "span",
            props: {
                style: {
                    display: "inline-block",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    padding: "6px",
                },
            },
            tpl: "将组件拖拽到这里",
        },
    },
    i18n: {},
});
