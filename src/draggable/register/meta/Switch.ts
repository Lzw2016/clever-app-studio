import lodash from "lodash";
import { createVNode } from "vue";
import { hasValue } from "@/utils/Typeof";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SwitchSvg from "@/assets/images/switch.svg?component";

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
    type: "Switch",
    name: "开关",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/switch",
    icon: createVNode(SwitchSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
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
                            label: "显示文本",
                            labelTips: "switch 是否显示内容里面的文字",
                            propsName: "showText",
                        },
                        {
                            cmp: "StringSetter",
                            label: "关闭时值",
                            labelTips: "switch 关闭时的值",
                            propsName: "falseValue",
                            applyPropsValue: (props, value) => applyPropsValue("falseValue", props, value),
                            defPropsValue: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "打开时值",
                            labelTips: "switch 打开时的值",
                            propsName: "trueValue",
                            applyPropsValue: (props, value) => applyPropsValue("trueValue", props, value),
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数属性
                        // before-change (done: () => void) => void 开关值变化前置处理
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "mini模式",
                            labelTips: "设置是否显示为 mini 模式，mini 模式下不会显示 slot 的内容",
                            propsName: "mini",
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
        // 关闭内容，当 show-text 为 true 时有效
        // close
        // 开启内容，当 show-text 为 true 时有效
        // open
    },
    i18n: {},
});
