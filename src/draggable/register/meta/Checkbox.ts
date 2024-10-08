import lodash from "lodash";
import { createVNode } from "vue";
import { hasValue } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CheckboxSvg from "@/assets/images/checkbox.svg?component";

// noinspection DuplicatedCode
function applyPropsValue(propName: string, props: any, value: any) {
    value = lodash.trim(value);
    if (value.length <= 0) {
        // undefined
        value = undefined;
    } else {
        // boolean
        if ("false" === value) {
            value = false;
        } else if ("true" === value) {
            value = true;
        } else {
            const num = lodash.toNumber(value);
            // number
            if (!isNaN(num)) {
                value = num;
            } else {
                // string
            }
        }
    }
    if (hasValue(value)) {
        props[propName] = value;
    } else {
        delete props[propName];
    }
}

export default defineComponentMeta({
    type: "Checkbox",
    name: "多选框",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/checkbox",
    icon: createVNode(CheckboxSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            text: "多选框",
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "StringSetter",
                applyPropsValue: (props, value) => applyPropsValue("modelValue", props, value),
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "样式模式",
                            labelTips: "设置 indeterminate 状态，只负责样式控制",
                            propsName: "indeterminate",
                        },
                        {
                            cmp: "StringSetter",
                            label: "显示文本",
                            labelTips: "复选框显示的文本",
                            propsName: "text",
                            applyPropsValue: (props, value, node, setter) => {
                                const blockInstance = setter.blockInstance;
                                value = lodash.trim(value);
                                if (value) {
                                    props.text = value;
                                    blockInstance.opsForDesign.removePlaceholder(node.id, childSlotName);
                                } else {
                                    delete props.text;
                                    blockInstance.opsForDesign.setPlaceholder(node.id, childSlotName);
                                }
                            },
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "默认勾选",
                            propsName: "checked",
                        },
                        {
                            cmp: "StringSetter",
                            label: "未选时值",
                            propsName: "falseLabel",
                            applyPropsValue: (props, value) => applyPropsValue("falseLabel", props, value),
                            defPropsValue: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "选中时值",
                            propsName: "trueLabel",
                            applyPropsValue: (props, value) => applyPropsValue("trueLabel", props, value),
                            defPropsValue: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "多选时值",
                            labelTips: "选中状态的值（只有在 checkbox-group 中或者绑定对象类型为 array 时有效）",
                            propsName: "label",
                            applyPropsValue: (props, value) => applyPropsValue("label", props, value),
                            defPropsValue: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "filter", label: "过滤器模式(filter)" },
                                ],
                            },
                            label: "组件模式",
                            labelTips: "设置输入的shape='filter',切换至过滤器模式",
                            propsName: "shape",
                            recalcAuxToolPosition: true,
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
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "组件大小",
                            labelTips: "输入框尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示边框",
                            propsName: "border",
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "name属性",
                            labelTips: "原生 input name 属性",
                            propsName: "name",
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
                            title: "值变更",
                            description: "组件的值变化时触发的回调函数",
                            name: "change",
                            params: [
                                { name: "value", type: "boolean | string | number", note: "" },
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
        // checkbox的内容
        // default
    },
    i18n: {},
});
