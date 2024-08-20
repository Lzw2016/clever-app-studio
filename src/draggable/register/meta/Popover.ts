import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { popoverPopperOptions } from "@/draggable/register/JsonSchema";
import PopoverSvg from "@/assets/images/popover.svg?component";

export default defineComponentMeta({
    type: "Popover",
    name: "气泡卡片",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(PopoverSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                display: "inline-block",
            },
            title: "气泡卡片",
            content: "提示文本信息，文本内容可以很长很长很长...",
            trigger: "click",
        },
    },
    setter: {
        props: {
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "标题",
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
                            propsName: "content",
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
                            labelTips: "弹出层出现的位置",
                            propsName: "placement",
                            defPropsValue: "bottom",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "hover", label: "鼠标悬停" },
                                    { value: "click", label: "鼠标点击" },
                                    { value: "manual", label: "手动" },
                                    { value: "focus", label: "获取焦点" },
                                ],
                            },
                            label: "触发方式",
                            labelTips: "气泡提示框显示触发方式",
                            watchValue: true,
                            propsName: "trigger",
                            defPropsValue: "hover",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 50,
                                unit: "毫秒",
                            },
                            label: "延迟显示",
                            labelTips: "触发方式为 hover 时的显示延迟，单位为毫秒",
                            propsName: "openDelay",
                            defPropsValue: 0,
                            isHideSetter: node => node.props.trigger !== "hover",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 50,
                                unit: "毫秒",
                            },
                            label: "延迟隐藏",
                            labelTips: "触发方式为 hover 时的隐藏延迟，单位为毫秒",
                            propsName: "closeDelay",
                            defPropsValue: 200,
                            isHideSetter: node => node.props.trigger !== "hover",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            propsName: "appendToBody",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "弹出层参数配置",
                                jsonSchema: popoverPopperOptions,
                            },
                            label: "弹层参数",
                            propsName: "popperOptions",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "显示箭头",
                            labelTips: "是否显示弹出层的箭头",
                            propsName: "visibleArrow",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                            },
                            label: "箭头偏移",
                            propsName: "arrowOffset",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                            },
                            label: "弹层偏移",
                            propsName: "offset",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "StringSetter",
                            label: "渐变动画",
                            propsName: "transition",
                            defPropsValue: "fade-in-linear",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "弹层宽度",
                            propsName: "width",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "弹层高度",
                            propsName: "height",
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "为弹出层添加类名",
                            propsName: "popperClass",
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
                            title: "进入的动画播放完毕",
                            description: "进入的动画播放完毕后触发",
                            name: "afterEnter",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/popover",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "离开的动画播放完毕",
                            description: "离开的动画播放完毕后触发",
                            name: "afterLeave",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/popover",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "隐藏事件",
                            description: "隐藏时触发",
                            name: "hide",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/popover",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "显示事件",
                            description: "显示时触发",
                            name: "show",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/popover",
                            params: [],
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
