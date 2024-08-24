import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { datePickerOptions, datePickerStep } from "@/draggable/register/JsonSchema";
import DatePickerSvg from "@/assets/images/date-picker.svg?component";

export default defineComponentMeta({
    type: "DatePicker",
    name: "日期选择",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/date-picker",
    icon: createVNode(DatePickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            placeholder: "请选择日期",
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "DateSetter",
                cmpProps: {
                    type: "datetime",
                },
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "date", label: "日期" },
                                    { value: "datetime", label: "日期时间" },
                                    { value: "week", label: "周" },
                                    { value: "month", label: "月份" },
                                    { value: "quarter", label: "季度" },
                                    { value: "year", label: "年份" },
                                    { value: "daterange", label: "日期范围" },
                                    { value: "datetimerange", label: "日期时间范围" },
                                    { value: "monthrange", label: "月份范围" },
                                    { value: "yearrange", label: "年份范围" },
                                    { value: "dates", label: "日期多选" },
                                    { value: "years", label: "年份多选" },
                                ],
                            },
                            label: "选择模式",
                            propsName: "type",
                            defPropsValue: "date",
                            recalcAuxToolPosition: true,
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
                            label: "输入校验",
                            labelTips: "设置日期选择器在输入时是否会触发表单校验",
                            propsName: "validateEvent",
                            defPropsValue: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "值格式",
                            labelTips: "指定绑定值的格式，不指定则绑定值为 Date 对象",
                            propsName: "valueFormat",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "yyyy-MM-dd", label: "yyyy-MM-dd" },
                                    { value: "yyyy-MM-dd HH:mm:ss", label: "yyyy-MM-dd HH:mm:ss" },
                                    { value: "yyyy 年 MM 月 dd 日", label: "yyyy 年 MM 月 dd 日" },
                                    { value: "yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒", label: "yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒" },
                                ],
                                allowCreate: true,
                                filterable: true,
                                defaultFirstOption: true,
                            },
                            label: "日期格式",
                            propsName: "format",
                            defPropsValue: "yyyy-MM-dd",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "HH:mm:ss", label: "HH:mm:ss" },
                                    { value: "HH:mm", label: "HH:mm" },
                                    { value: "HH 时 mm 分 ss 秒", label: "HH 时 mm 分 ss 秒" },
                                    { value: "HH 时 mm 分", label: "HH 时 mm 分" },
                                ],
                                allowCreate: true,
                                filterable: true,
                                defaultFirstOption: true,
                            },
                            label: "时间格式",
                            propsName: "timeFormat",
                            defPropsValue: "HH:mm:ss",
                        },
                        {
                            cmp: "DateSetter",
                            label: "默认日期",
                            labelTips: "当选中的日期值为空时，选择器面板打开时默认显示的时间，可以是日期格式或者能被 new Date() 解析的字符串",
                            propsName: "defaultValue",
                        },
                        {
                            cmp: "StringSetter",
                            label: "默认时间",
                            labelTips: "type='datetime' 时，default-time 是一个字符串，用于设置选择一个日期后，时间输入框中的默认值",
                            propsName: "defaultTime",
                            defPropsValue: "00:00:00",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "left", label: "左对齐" },
                                    { value: "center", label: "中间对齐" },
                                    { value: "right", label: "右对齐" },
                                ],
                            },
                            label: "对齐方式",
                            labelTips: "日期选择面板和输入框的对齐方式",
                            propsName: "align",
                            defPropsValue: "left",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否只读",
                            propsName: "readonly",
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
                            cmp: "BoolSetter",
                            label: "系统时区",
                            labelTips: "默认值为 false，设置为 true 时切换系统默认时区，时间依然显示为东八区时间，适用场景为海外地区显示东八区时间",
                            propsName: "isutc8",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "选择时区",
                            labelTips: "是否开启设置日期选择面板时区选择",
                            propsName: "showTimezone",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示周号",
                            propsName: "showWeekNumber",
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
                            cmp: "StringSetter",
                            label: "字段标题",
                            labelTips: "设置 shape='filter' 属性之后，代表过滤器模式下显示的标题，单独设置 label 属性可以使 label 放置在组件的开始位置",
                            propsName: "label",
                        },
                        {
                            cmp: "StringSetter",
                            label: "提示信息",
                            labelTips: "过滤器模式下显示的提示信息",
                            propsName: "tip",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "滚轮调值",
                            labelTips: "通过箭头按钮控制时间选择，当 type 为 datetime、datetimerange 时使用，默认为 通过鼠标滚轮滚动选择时间",
                            propsName: "timeArrowControl",
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
                                title: "配置部分禁用、快捷选项等",
                                jsonSchema: datePickerOptions,
                            },
                            label: "组件配置",
                            labelTips: "配置部分禁用、快捷选项等，包含 firstDayOfWeek / disabledDate / onPick / shortcuts 属性，详细用法可参考 IPickerOptions 类型声明",
                            propsName: "pickerOptions",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数参数
                        // format-weeks     (customWeeks: number, weekFirstDays: string[]) => string    格式化周次序号，该回调函数有两个参数，customWeeks 用来获取自定义周次的序号，weekFirstDays 用来获取每周次中的首个日期
                    ],
                },
                {
                    title: "日期范围",
                    items: [
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "默认的时间范围",
                            },
                            label: "默认时间",
                            labelTips: "type='datetimerange' 时，default-time 是一个字符串数组，用于设置选择一个日期范围后，开始和结束时间输入框中的默认值",
                            propsName: "defaultTime",
                            defPropsValue: ["00:00:00", "00:00:00"],
                        },
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
                        {
                            cmp: "BoolSetter",
                            label: "取消联动",
                            labelTips: "在范围选择器里取消两个日期面板之间的联动",
                            propsName: "unlinkPanels",
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
                            label: "尾部图标",
                            labelTips: "自定义选择器的后置图标",
                            propsName: "suffixIcon",
                            enableBind: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉样式",
                            labelTips: "为 DatePicker 下拉弹框添加的 class 类名",
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
