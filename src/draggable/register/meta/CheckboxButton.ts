import lodash from "lodash";
import { createVNode } from "vue";
import { hasValue } from "@/utils/Typeof";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { checkboxButtonEvents } from "@/draggable/register/JsonSchema";
import CheckboxButtonSvg from "@/assets/images/checkbox.svg?component";

function applyPropsValue(propName: string, props: any, value: any) {
    value = lodash.trim(value);
    if (value.length <= 0) {
        // undefined
        value = undefined;
    } else {
        const num = lodash.toNumber(value);
        // number
        if (!isNaN(num)) {
            value = num;
        } else {
            // string
        }
    }
    if (hasValue(value)) {
        props[propName] = value;
    } else {
        delete props[propName];
    }
}

export default defineComponentMeta({
    type: "CheckboxButton",
    name: "复选按钮",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/checkbox",
    icon: createVNode(CheckboxButtonSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            text: "复选按钮",
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
                            label: "默认勾选",
                            propsName: "checked",
                        },
                        {
                            cmp: "StringSetter",
                            label: "按钮文本",
                            propsName: "text",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "未选时值",
                            propsName: "falseLabel",
                            applyPropsValue: (props, value) => applyPropsValue("falseLabel", props, value),
                        },
                        {
                            cmp: "StringSetter",
                            label: "选中时值",
                            propsName: "trueLabel",
                            applyPropsValue: (props, value) => applyPropsValue("trueLabel", props, value),
                        },
                        {
                            cmp: "StringSetter",
                            label: "多选时值",
                            labelTips: "选中状态的值（只有在 checkbox-group 中或者绑定对象类型为 array 时有效）",
                            propsName: "label",
                            applyPropsValue: (props, value) => applyPropsValue("label", props, value),
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "组件配置",
                                jsonSchema: checkboxButtonEvents,
                            },
                            label: "组件配置",
                            propsName: "events",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
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
                                { name: "value", type: "string | number", note: "" },
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
        // checkbox-button 的内容
        // default
    },
    i18n: {},
});
