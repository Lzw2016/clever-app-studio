import lodash from "lodash";
import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { sliderMarks } from "@/draggable/register/JsonSchema";
import SliderSvg from "@/assets/images/slider.svg?component";

export default defineComponentMeta({
    type: "Slider",
    name: "滑动输入",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/slider",
    icon: createVNode(SliderSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {},
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置滑杆的刻度值",
                                jsonSchema: sliderMarks,
                            },
                            label: "刻度配置",
                            propsName: "marks",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 0,
                            },
                            label: "最小值",
                            propsName: "min",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 0,
                            },
                            label: "最大值",
                            labelTips: "设置最大值，必需是整数，可以负数，必需大于所设置的最小值",
                            propsName: "max",
                            defPropsValue: 100,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "步长",
                            labelTips: "设置滑块移动时，每步位移距离，必需是大于0的正整数",
                            propsName: "step",
                            defPropsValue: 1,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "键步长",
                            labelTips: "按快捷键 PageDown/PageUp 时，每次移动的距离",
                            propsName: "numPages",
                            defPropsValue: 1,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示值",
                            propsName: "showTip",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示输入",
                            labelTips: "是否显示输入框",
                            propsName: "showInput",
                        },
                        {
                            cmp: "StringSetter",
                            label: "显示单位",
                            labelTips: "输入框后面显示的单位，仅在输入框模式下有效",
                            propsName: "unit",
                            defPropsValue: "%",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数参数
                        // format-tooltip   (currentValue: number) => string    格式化 tooltip 提示
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "竖向模式",
                            propsName: "vertical",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                                min: 0,
                            },
                            label: "组件高度",
                            labelTips: "Slider 组件的高度，当 vertical 为 true 时有效",
                            propsName: "height",
                            getPropsValue: props => {
                                let labelWidth = lodash.trim(props.height);
                                if (!labelWidth) return;
                                if (labelWidth.endsWith("px")) {
                                    labelWidth = labelWidth.substring(0, labelWidth.length - 2);
                                }
                                return lodash.toInteger(labelWidth);
                            },
                            applyPropsValue: (props, value) => {
                                props.height = `${(value ?? 300)}px`;
                            },
                            defPropsValue: 300,
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
                                { name: "value", type: "number | [number, number]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "滑块滑动开始",
                            description: "设置滑块滑动开始时，触发该事件",
                            name: "start",
                            params: [
                                { name: "event", type: "Event", note: "" },
                                { name: "value", type: "number | [number, number]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "滑块滑动结束时",
                            description: "设置滑块滑动结束时，触发该事件",
                            name: "stop",
                            params: [
                                { name: "value", type: "number | [number, number]", note: "" },
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
        // 显示滑块值的插槽，仅仅 v-model 是单数值时才有效，插槽参数为：slotArg: { slotScope: number }
        // default
    },
    i18n: {},
});
