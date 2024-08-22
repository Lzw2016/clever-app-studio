import lodash from "lodash";
import { createVNode } from "vue";
import { hasValue } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RadioButtonSvg from "@/assets/images/radio.svg?component";

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
    type: "RadioButton",
    name: "单选按钮",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/radio",
    icon: createVNode(RadioButtonSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            text: "单选按钮",
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
                            cmp: "StringSetter",
                            label: "显示文本",
                            labelTips: "单选框文本内容",
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
                            cmp: "StringSetter",
                            label: "选中时值",
                            labelTips: "radio 选中时的值",
                            propsName: "label",
                            applyPropsValue: (props, value) => applyPropsValue("label", props, value),
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
        // 默认插槽
        // default
    },
    i18n: {},
});
