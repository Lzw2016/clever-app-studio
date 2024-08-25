import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { datePickerStep, timePickerOptions } from "@/draggable/register/JsonSchema";
import TimePickerSvg from "@/assets/images/time-picker.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "TimePicker",
    name: "时间选择",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/time-picker",
    icon: createVNode(TimePickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "TimeSetter",
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "范围选择",
                            labelTips: "范围选择时结束日期的占位内容",
                            propsName: "isRange",
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "占位文本",
                            labelTips: "非范围选择时的占位内容",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "TimeSetter",
                            label: "默认时间",
                            labelTips: "当选中的日期值为空时，选择器面板打开时默认显示的时间，可以是日期格式或者能被 new Date() 解析的字符串",
                            propsName: "defaultValue",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许输入",
                            propsName: "editable",
                            labelTips: "文本框可输入",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "滚轮调值",
                            labelTips: "是否使用鼠标滚轮进行时间选择",
                            propsName: "arrowControl",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            labelTips: "弹出显示内容是否追加到html的body的末尾位置",
                            propsName: "popperAppendToBody",
                            defPropsValue: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义时分秒步长",
                                jsonSchema: datePickerStep,
                            },
                            label: "时间步长",
                            labelTips: "可以通过 step 配置时间的步长",
                            propsName: "step",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置可选的时间范围、下拉框中显示的格式",
                                jsonSchema: timePickerOptions,
                            },
                            label: "组件配置",
                            labelTips: "配置可选的时间范围、下拉框中显示的格式",
                            propsName: "pickerOptions",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "日期范围",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "开始占位",
                            labelTips: "范围选择时开始日期的占位内容",
                            propsName: "startPlaceholder",
                        },
                        {
                            cmp: "StringSetter",
                            label: "结束占位",
                            labelTips: "范围选择时结束日期的占位内容",
                            propsName: "endPlaceholder",
                        },
                        {
                            cmp: "StringSetter",
                            label: "范围分隔",
                            labelTips: "选择范围时的分隔符",
                            propsName: "rangeSeparator",
                            defPropsValue: "-",
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
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "清空图标",
                            propsName: "clearIcon",
                            enableBind: false,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "尾部图标",
                            labelTips: "自定义选择器的后置图标",
                            propsName: "suffixIcon",
                            enableBind: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "为 TimePicker 下拉弹框添加的 class 类名",
                            propsName: "popperClass",
                            recalcAuxToolPosition: true,
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
                                { name: "value", type: "string | Date | Date[] | undefined", note: "" },
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
