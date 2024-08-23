import { createVNode } from "vue";
import { Tooltip } from "@opentiny/vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { createBaseWrapper } from "@/draggable/utils/ComponentWrapper";
import { popoverPopperOptions } from "@/draggable/register/JsonSchema";
import TooltipSvg from "@/assets/images/tooltip.svg?component";

export default defineComponentMeta({
    type: "Tooltip",
    name: "文字提示",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TooltipSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    designComponent: createBaseWrapper(
        "span",
        {
            style: {
                display: "inline-block",
            },
        },
        Tooltip,
    ),
    defDesignNode: {
        props: {
            content: "文本提示信息...",
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
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "always", label: "总是(always)" },
                                    { value: "auto", label: "自动(auto)" },
                                ],
                            },
                            label: "智能模式",
                            labelTips: "提示的智能出现的模式",
                            propsName: "visible",
                            defPropsValue: "always",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "normal", label: "常规提示" },
                                    { value: "warning", label: "警告提示" },
                                    { value: "error", label: "错误提示" },
                                    { value: "info", label: "信息提示" },
                                    { value: "success", label: "成功提示" },
                                ],
                            },
                            label: "提示类型",
                            labelTips: "提示的类型， type 的优先级大于 effect",
                            propsName: "type",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "鼠标可进",
                            labelTips: "鼠标是否可进入到 tooltip 的弹出层中",
                            propsName: "enterable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "手动模式",
                            labelTips: "手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效",
                            propsName: "manual",
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
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 50,
                                unit: "毫秒",
                            },
                            label: "自动隐藏",
                            labelTips: "出现后自动隐藏的时长，单位毫秒，为 0 则不会自动隐藏",
                            propsName: "hideAfter",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            labelTips: "弹出显示内容是否追加到html的body的末尾位置",
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
                        // TODO 函数参数
                        // renderContent    (h: Vue.h, content:string)=> VNode 自定义渲染函数,返回需要渲染的节点内容
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "预格式化",
                            labelTips: "content 文本是否预格式化",
                            propsName: "pre",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "dark", label: "黑色主题" },
                                    { value: "light", label: "白色主题" },
                                ],
                            },
                            label: "主题",
                            propsName: "effect",
                            defPropsValue: "dark",
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
                            defPropsValue: "tiny-fade-in-linear",
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "为弹出层添加类名",
                            propsName: "popperClass",
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "tabindex",
                            labelTips: "原生属性，输入框的 tabindex",
                            propsName: "tabindex",
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: {
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
        // content: true,
    },
    i18n: {},
});
