import lodash from "lodash";
import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { formRule } from "@/draggable/register/JsonSchema";
import FormItemSvg from "@/assets/images/form-item.svg?component";

export default defineComponentMeta({
    type: "FormItem",
    name: "表单项",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FormItemSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    disableDragDrop: true,
    defDesignNode: {
        props: {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "字段名",
                            labelTips: "对应表单域 model 字段，如需使用表单校验，该属性是必填的",
                            enableBind: false,
                            propsName: "prop",
                        },
                        {
                            cmp: "StringSetter",
                            label: "标签文本",
                            propsName: "label",
                            getPropsValue: props => props.label,
                            applyPropsValue: (props, value, node, setter) => {
                                const blockInstance = setter.blockInstance;
                                value = lodash.trim(value);
                                if (value) {
                                    props.label = value;
                                    blockInstance.opsForDesign.removePlaceholder(node.id, "label");
                                } else {
                                    delete props.label;
                                    blockInstance.opsForDesign.setPlaceholder(node.id, "label");
                                }
                            },
                        },
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
                                props.labelWidth = `${value ?? 80}px`;
                            },
                            defPropsValue: 80,
                        },
                        {
                            cmp: "StringSetter",
                            label: "字段提示",
                            labelTips: "表单项额外提示",
                            propsName: "extra",
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
                            cmp: "BoolSetter",
                            label: "是否必填",
                            labelTips: "是否必填，如不设置，则会根据校验规则自动生成",
                            propsName: "required",
                            defPropsValue: false,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "表单项校验规则",
                                jsonSchema: formRule,
                            },
                            label: "校验规则",
                            propsName: "rules",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "校验防抖",
                            labelTips: "是否开启校验防抖，在连续输入的情况下，会在最后一次输入结束时才开始校验",
                            propsName: "validateDebounce",
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
                            cmp: "StringSetter",
                            label: "错误文本",
                            labelTips: "表单项错误文本，设置该值会使表单验证状态变为 error",
                            propsName: "error",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "校验提示框的图标",
                            },
                            label: "提示图标",
                            labelTips: "校验提示框的图标，类型为组件",
                            propsName: "validateIcon",
                        },
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
    placeholder: {
        default: true,
        // error: true,
        // label: true,
    },
    i18n: {},
});
