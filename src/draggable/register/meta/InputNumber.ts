import lodash from "lodash";
import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { numericFormat } from "@/draggable/register/JsonSchema";
import InputNumberSvg from "@/assets/images/input-number.svg?component";

export default defineComponentMeta({
    type: "InputNumber",
    name: "数字输入",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/numeric",
    icon: createVNode(InputNumberSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            controlsPosition: "right",
            showLeft: true,
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
                cmpProps: {
                    type: "number",
                    clearable: false,
                },
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "占位文本",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                max: 20,
                            },
                            label: "数值精度",
                            propsName: "precision",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "number",
                                clearable: false,
                            },
                            label: "步长",
                            propsName: "step",
                            defPropsValue: 1,
                            applyPropsValue: (props, value) => {
                                const num = lodash.toNumber(value);
                                if (!isNaN(num)) {
                                    props.step = num;
                                } else {
                                    delete props.step;
                                }
                            },
                        },
                        {
                            cmp: "BoolSetter",
                            label: "步长倍数",
                            labelTips: "是否只能输入 step 的倍数",
                            propsName: "stepStrictly",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许清空",
                            propsName: "allowEmpty",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "number",
                                clearable: false,
                            },
                            label: "清空值",
                            labelTips: "设置计数器在可清空下，清空后组件的绑定值",
                            propsName: "emptyValue",
                            applyPropsValue: (props, value) => {
                                if (!value) {
                                    delete props.emptyValue;
                                    return;
                                }
                                const num = lodash.toNumber(value);
                                if (!isNaN(num)) {
                                    value = num;
                                }
                                props.emptyValue = value;
                            },
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加减按钮",
                            labelTips: "是否使用加减按钮",
                            propsName: "controls",
                            defPropsValue: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "right", label: "右边" },
                                ],
                            },
                            label: "按钮位置",
                            labelTips: "加减按钮位置，可选值为 right，表示加减按钮均位于最右侧",
                            propsName: "controlsPosition",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "number",
                                clearable: false,
                            },
                            label: "最小数值",
                            labelTips: "规定组件可输入的最小数值，指定合法值的范围，支持整数和小数",
                            propsName: "min",
                            applyPropsValue: (props, value) => {
                                const num = lodash.toNumber(value);
                                if (!isNaN(num)) {
                                    props.min = num;
                                } else {
                                    delete props.min;
                                }
                            },
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "number",
                                clearable: false,
                            },
                            label: "最大数值",
                            labelTips: "规定组件可输入的最大数值，指定合法值的范围，支持整数和小数",
                            propsName: "max",
                            applyPropsValue: (props, value) => {
                                const num = lodash.toNumber(value);
                                if (!isNaN(num)) {
                                    props.max = num;
                                } else {
                                    delete props.max;
                                }
                            },
                        },
                        {
                            cmp: "BoolSetter",
                            label: "滚轮调值",
                            labelTips: "鼠标滚动滑轮是否改变数值",
                            propsName: "mouseWheel",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "循环反转",
                            labelTips: "向上到达最大值后，是否从最小值开始，或反过来",
                            propsName: "circulate",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "触发变更",
                            labelTips: "设置除加减按钮及直接输入数值之外，值改变后是否触发change事件",
                            propsName: "changeCompat",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "字符串值",
                            labelTips: "使用字符串模式，精度超过JS限制时使用",
                            propsName: "stringMode",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "数字格式化置项",
                                jsonSchema: numericFormat,
                            },
                            label: "格式化",
                            propsName: "format",
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
                            labelTips: "输入框尺寸，只在 type!='textarea' 时有效",
                            propsName: "size",
                        },
                        {
                            cmp: "StringSetter",
                            label: "数值单位",
                            labelTips: "数值的单位。在设置单位时，加减按钮将不可用",
                            propsName: "unit",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "左对齐",
                            propsName: "showLeft",
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
                        },
                        {
                            cmp: "BoolSetter",
                            label: "透明背景",
                            labelTips: "过滤器背景设置为透明，默认值为true",
                            propsName: "blank",
                            defPropsValue: true,
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "label属性",
                            labelTips: "等价于原生 input aria-label 属性",
                            propsName: "label",
                        },
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
                            title: "获取焦点",
                            description: "组件获得焦点时触发的回调函数",
                            name: "focus",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "失去焦点",
                            description: "组件失去焦点时触发的回调函数",
                            name: "blur",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "值变更",
                            description: "组件的值变化时触发的回调函数",
                            name: "change",
                            params: [
                                { name: "newVal", type: "number | string | undefined", note: "" },
                                { name: "oldVal", type: "number | string | undefined", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "过滤器面板值变更",
                            description: "选择过滤器面板值的回调函数",
                            name: "filterChange",
                            params: [
                                { name: "label", type: "any", note: "" },
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
    placeholder: {},
    i18n: {},
});
