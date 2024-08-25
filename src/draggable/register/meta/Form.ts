import lodash from "lodash";
import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { formRules, popoverPopperOptions } from "@/draggable/register/JsonSchema";
import FormSvg from "@/assets/images/form.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Form",
    name: "表单",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/form",
    icon: createVNode(FormSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                minHeight: "150px",
                // border: "1px solid #ccc",
            },
            labelWidth: "75px",
            rules: {
                f1: [
                    { required: true, message: "字段1必填", trigger: "blur" },
                ],
            },
        },
        items: [
            {
                type: "Row",
                items: [
                    {
                        type: "Col",
                        props: {
                            span: 6,
                        },
                        items: [
                            {
                                type: "FormItem",
                                props: {
                                    prop: "f1",
                                    label: "字段1",
                                },
                                items: [
                                    {
                                        type: "Input",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Col",
                        props: {
                            span: 6,
                        },
                        items: [
                            {
                                type: "FormItem",
                                props: {
                                    prop: "f2",
                                    label: "字段2",
                                },
                                items: [
                                    {
                                        type: "Input",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: "Row",
                items: [
                    {
                        type: "Col",
                        props: {
                            span: 6,
                        },
                        items: [
                            {
                                type: "FormItem",
                                props: {
                                    prop: "f3",
                                    label: "字段3",
                                },
                                items: [
                                    {
                                        type: "Input",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Col",
                        props: {
                            span: 6,
                        },
                        items: [
                            {
                                type: "FormItem",
                                props: {
                                    prop: "f4",
                                    label: "字段4",
                                },
                                items: [
                                    {
                                        type: "Input",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: "Row",
                items: [
                    {
                        type: "Col",
                        props: {
                            span: 12,
                        },
                        items: [
                            {
                                type: "FormItem",
                                props: {
                                    prop: "f5",
                                    label: "字段5",
                                },
                                items: [
                                    {
                                        type: "Input",
                                        props: {
                                            type: "textarea",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    setter: {
        props: {
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "行内模式",
                            labelTips: "行内布局模式",
                            propsName: "inline",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "medium", label: "中(medium)" },
                                    { value: "small", label: "小(small)" },
                                    { value: "mini", label: "迷你(mini)" },
                                ],
                            },
                            label: "组件尺寸",
                            labelTips: "表单内组件的尺寸，不设置则为默认尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "表单验证规则",
                                jsonSchema: formRules,
                            },
                            label: "验证规则",
                            propsName: "rules",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "立即验证",
                            labelTips: "是否在 rules 属性改变后立即触发一次验证",
                            propsName: "validateOnRuleChange",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "禁用表单",
                            labelTips: "是否禁用该表单内的所有表单组件，若设置为 true，则表单内组件上的 disabled 属性不再生效",
                            propsName: "disabled",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示模式",
                            propsName: "displayOnly",
                        },
                        // TODO 自定义快捷操作
                    ],
                },
                {
                    title: "字段标签",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                                min: 0,
                            },
                            label: "标签宽度",
                            labelTips: "表单中标签占位宽度",
                            propsName: "labelWidth",
                            getPropsValue: props => {
                                let labelWidth = lodash.trim(props.labelWidth);
                                if (!labelWidth) return;
                                if (labelWidth.endsWith("px")) {
                                    labelWidth = labelWidth.substring(0, labelWidth.length - 2);
                                }
                                return lodash.toInteger(labelWidth);
                            },
                            applyPropsValue: (props, value) => {
                                props.labelWidth = `${(value ?? 80)}px`;
                            },
                            defPropsValue: 80,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "right", label: "右边" },
                                    { value: "left", label: "左边" },
                                    { value: "top", label: "上边" },
                                ],
                            },
                            label: "标签位置",
                            labelTips: "表单中标签的布局位置",
                            propsName: "labelPosition",
                            defPropsValue: "right",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "标签对齐",
                            labelTips: "当出现必填星号时，标签文本是否对齐，当 label-position 为 'right' 时有效",
                            propsName: "labelAlign",
                        },
                        {
                            cmp: "StringSetter",
                            label: "标签后缀",
                            propsName: "labelSuffix",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "隐藏星号",
                            labelTips: "是否隐藏必填字段的标签旁边的红色星号",
                            propsName: "hideRequiredAsterisk",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "标签提示",
                            labelTips: "标签超长是否显示提示",
                            propsName: "overflowTitle",
                        },
                    ],
                },
                {
                    title: "校验消息",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "显示错误",
                            labelTips: "是否显示校验错误信息",
                            propsName: "showMessage",
                            defPropsValue: true,
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
                            label: "错误位置",
                            labelTips: "指定校验提示框显示的位置",
                            propsName: "validatePosition",
                            defPropsValue: "right",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "tip", label: "提示文本框" },
                                    { value: "text", label: "文本提示" },
                                ],
                            },
                            label: "错误形式",
                            labelTips: "错误消息显示的形式",
                            propsName: "validateType",
                            defPropsValue: "tip",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "inline", label: "行内(inline)" },
                                    { value: "block", label: "单行(block)" },
                                ],
                            },
                            label: "单行消息",
                            labelTips: "当 validate-type 设置为 text 时，配置文本类型错误类型，可配置行内或者块级，不设置则为 absolute 定位",
                            propsName: "messageType",
                        },
                        // {
                        //     cmp: "BoolSetter",
                        //     label: "行内消息",
                        //     labelTips: "当 validate-type 设置为 text 时，是否以行内形式展示校验信息(推荐使用 message-type 设置)",
                        //     propsName: "inlineMessage",
                        // },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "校验错误提示配置",
                                jsonSchema: popoverPopperOptions,
                            },
                            label: "提示配置",
                            labelTips: "校验错误提示配置，透传至 Popover 组件",
                            propsName: "popperOptions",
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
                            title: "表单项校验",
                            description: "任一表单项被校验后触发",
                            name: "validate",
                            params: [
                                { name: "prop", type: "string", note: "" },
                                { name: "isValid", type: "boolean", note: "" },
                                { name: "message", type: "string", note: "" },
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
