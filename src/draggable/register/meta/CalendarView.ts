import lodash from "lodash";
import { createVNode } from "vue";
import { noValue } from "@/utils/Typeof";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { timelineData, timelineEvents } from "@/draggable/register/JsonSchema";
import CalendarViewSvg from "@/assets/images/calendar-view.svg?component";

export default defineComponentMeta({
    type: "CalendarView",
    name: "日历视图",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/calendar-view",
    icon: createVNode(CalendarViewSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            year: 2023,
            month: 5,
            events: [
                {
                    title: '前端周会1',
                    start: '2023-05-15 8:30:00',
                    end: '2023-05-15 9:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'blue'
                },
                {
                    title: '前端周会2',
                    start: '2023-05-15 10:00:00',
                    end: '2023-05-15 12:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'green'
                },
                {
                    title: '前端周会2-1',
                    start: '2023-05-15 13:00:00',
                    end: '2023-05-15 15:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'red'
                },
                {
                    title: '前端周会3',
                    start: '2023-05-16 9:00:00',
                    end: '2023-05-16 10:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'yellow'
                },
                {
                    title: '前端周会4',
                    start: '2023-05-16 11:00:00',
                    end: '2023-05-16 14:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'purple'
                },
                {
                    title: '前端周会5',
                    start: '2023-05-25 8:00:00',
                    end: '2023-05-25 9:00:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'cyan'
                },
                {
                    title: '前端周会6',
                    start: '2023-05-26 8:00:00',
                    end: '2023-05-26 11:30:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'blue'
                },
                {
                    title: '前端周会7',
                    start: '2023-05-27 8:30:00',
                    end: '2023-05-27 9:30:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'blue'
                },
                {
                    title: '节假日25-28',
                    start: '2023-05-25 10:30:00',
                    end: '2023-05-28 03:30:00',
                    content: '日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注日程备注',
                    theme: 'green'
                },
            ],
        },
    },
    designDirectives: {
        // "disable-event": {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "timeline", label: "时间线模式" },
                                    { value: "schedule", label: "日程模式" },
                                    { value: "month", label: "月模式" },
                                ],
                            },
                            label: "显示模式",
                            propsName: "mode",
                            defPropsValue: "month",
                            recalcAuxToolPosition: true,
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                multiple: true,
                                options: [
                                    { value: "timeline", label: "时间线模式" },
                                    { value: "schedule", label: "日程模式" },
                                    { value: "month", label: "月模式" },
                                ],
                            },
                            label: "模式组",
                            propsName: "modes",
                            defPropsValue: [],
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "年",
                            },
                            label: "当前年份",
                            labelTips: "日历当前显示年份",
                            propsName: "year",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "月",
                                min: 1,
                                max: 12,
                            },
                            label: "当前月份",
                            labelTips: "日历当前显示月份",
                            propsName: "month",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "日期多选",
                            propsName: "multiSelect",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "节点数据配置",
                                jsonSchema: timelineData,
                            },
                            label: "时间范围",
                            labelTips: "配置时间线模式下所展示的时间范围，默认为[8,18]，可配范围[0,23]",
                            propsName: "dayTimes",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "日程事件配置",
                                jsonSchema: timelineEvents,
                            },
                            label: "日程事件",
                            propsName: "events",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数参数
                        // set-day-bg-color () => void 设置日期背景色
                        // show-mark () => void 显示点标记
                        // show-new-schedule () => void 显示新增日程按钮
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "日历高度",
                            propsName: "height",
                            getPropsValue: props => {
                                let height = lodash.trim(props.height);
                                if (!height) return;
                                if (height.endsWith("px")) {
                                    height = height.substring(0, height.length - 2);
                                }
                                return lodash.toInteger(height);
                            },
                            applyPropsValue: (props, value) => {
                                if (noValue(value) || value <= 0) {
                                    delete props.height;
                                } else {
                                    props.height = `${(value)}px`;
                                }
                            },
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "ColorSetter",
                            label: "标记颜色",
                            labelTips: "点标记的颜色",
                            propsName: "voidColor",
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
                            title: "月改变",
                            description: "月改变事件",
                            name: "monthChange",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "新增日程",
                            description: "新增日程按钮点击事件",
                            name: "newSchedule",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "点击下一周",
                            description: "下一周按钮点击事件",
                            name: "nextWeekClick",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "点击上一周",
                            description: "上一周按钮点击事件",
                            name: "prevWeekClick",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "年改变",
                            description: "年改变事件",
                            name: "yearChange",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "周改变",
                            description: "周改变事件",
                            name: "weekChange",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "选中日期改变",
                            description: "选中日期改变事件",
                            name: "selectedDateChange",
                            params: [],
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
        // 头部插槽
        // header
        // 时间线插槽，有timeline1-timeline7 7个插槽
        // timeline
        // 工具栏插槽
        // tool
        // 日程插槽，有weekday1-weekday7 7个插槽
        // weekday
    },
    i18n: {},
});
