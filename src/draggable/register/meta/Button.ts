import { createVNode, VNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ButtonSvg from "@/assets/images/button.svg?component";

export default defineComponentMeta({
    type: "Button",
    name: "按钮",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ButtonSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            text: "按钮",
        },
    },
    designDirectives: {
        "disable-event": {},
        "deep-traverse-each": {
            value: {
                maxDepth: 1,
                eachVNode: function (rootVNode: VNode, htmlTag: boolean, current: VNode, parent?: VNode) {
                    if (rootVNode !== current) return;
                    if (rootVNode.type !== "button") return;
                    const props = rootVNode.props;
                    if (!props) return;
                    if (props.disabled) {
                        props.disabled = false;
                        if (!props.style) props.style = {};
                        props.style['pointer-events'] = 'all';
                    }
                },
            },
        },
    },
    slots: {},
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            ref: "text",
                            cmp: "StringSetter",
                            label: "按钮文本",
                            propsName: "text",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "text", label: "默认按钮" },
                                    { value: "primary", label: "主要按钮" },
                                    { value: "success", label: "成功按钮" },
                                    { value: "info", label: "信息按钮" },
                                    { value: "warning", label: "警告按钮" },
                                    { value: "danger", label: "危险按钮" },
                                ],
                            },
                            label: "按钮类型",
                            labelTips: "展示按钮不同的状态，如：“主要”、“成功”、“信息”、“警告”、“危险”等",
                            propsName: "type",
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "按钮图标",
                            propsName: "icon",
                            enableBind: false,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加载状态",
                            labelTips: "是否加载中状态",
                            propsName: "loading",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "禁用按钮",
                            propsName: "disabled",
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
                                    { value: "large", label: "大" },
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "按钮尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆形按钮",
                            propsName: "circle",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆角按钮",
                            propsName: "round",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "幽灵按钮",
                            propsName: "ghost",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "朴素按钮",
                            propsName: "plain",
                        },
                    ],
                },
                {
                    title: "其它",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "自动聚焦",
                            labelTips: "自动获取焦点",
                            propsName: "autofocus",
                            disableReRender: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "button", label: "button(按钮)" },
                                    { value: "submit", label: "submit(提交表单)" },
                                    { value: "reset", label: "reset(重置表单)" },
                                ],
                            },
                            label: "Html type",
                            labelTips: "按钮原生的 html type 属性",
                            propsName: "nativeType",
                            disableReRender: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 500,
                                unit: "毫秒",
                            },
                            label: "禁用时间",
                            labelTips: "设置按钮禁用时间，防止重复提交，单位毫秒",
                            propsName: "resetTime",
                            disableReRender: true,
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
