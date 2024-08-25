import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { milestoneData, milestonesStatus } from "@/draggable/register/JsonSchema";
import MilestoneSvg from "@/assets/images/milestone.svg?component";

export default defineComponentMeta({
    type: "Milestone",
    name: "里程碑",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/milestone",
    icon: createVNode(MilestoneSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                {
                    name: 'completed 状态',
                    time: '2018-9-7',
                    status: 'completed',
                    flags: [
                        {
                            status: 'completed',
                            name: 'test1',
                            content: '已完成',
                        },
                    ],
                },
                {
                    name: 'completed 状态',
                    time: '2018-9-8',
                    status: 'completed',
                    flags: [
                        {
                            status: 'back',
                            content: '引导用户按照流程完成任务',
                        },
                    ],
                },
                { name: 'doing 状态', time: '2018-9-10', status: 'doing', content: null },
                {
                    name: 'cancel 状态',
                    time: '2018-9-9',
                    status: 'cancel',
                    flags: [
                        {
                            status: 'back',
                            content: '欢迎使用vui',
                            name: 'test7'
                        },
                        {
                            status: 'doing',
                            content: 'test8',
                        },
                    ],
                },
                { name: 'back 状态', time: '2018-9-11', status: 'back' },
                {
                    name: 'end 状态',
                    time: '2018-9-9',
                    status: 'end',
                    flags: [
                        {
                            status: 'completed',
                            content: 'test6',
                        },
                    ],
                },
            ],
            milestonesStatus: {
                // 对应 status = completed
                completed: 'var(--ti-common-color-line-active)',
                // 对应 status = doing
                doing: '#7ED321',
                // 对应 status = back
                back: '#f5222d',
                // 对应 status = end
                end: '#faad14',
                // 对应 status = cancel
                cancel: '#d9d9d9',
            },
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
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "序号起点",
                            labelTips: "设置节点的序号起始值，从首个节点开始计算",
                            propsName: "start",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "步骤条的数据配置",
                                jsonSchema: milestoneData,
                            },
                            label: "步骤数据",
                            labelTips: "设置步骤条的数据，可自定义键值映射",
                            propsName: "data",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "节点数据配置",
                                jsonSchema: milestonesStatus,
                            },
                            label: "步骤状态",
                            labelTips: "定义状态与颜色对应关系，颜色取值须是 16 进制颜色值或组件库的主题变量",
                            propsName: "milestonesStatus",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示序号",
                            labelTips: "设置未完成状态的节点是否显示序号",
                            propsName: "showNumber",
                            defPropsValue: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "名称字段",
                            labelTips: "设置节点名称对应的键名",
                            propsName: "nameField",
                            defPropsValue: "name",
                        },
                        {
                            cmp: "StringSetter",
                            label: "状态字段",
                            labelTips: "设置节点状态对应的键名",
                            propsName: "statusField",
                            defPropsValue: "status",
                        },
                        {
                            cmp: "StringSetter",
                            label: "时间字段",
                            labelTips: "设置节点时间信息对应的键名",
                            propsName: "timeField",
                            defPropsValue: "time",
                        },
                        {
                            cmp: "StringSetter",
                            label: "完成字段",
                            labelTips: "设置节点完成状态对应的键值",
                            propsName: "completedField",
                            defPropsValue: "completed",
                        },
                    ],
                },
                {
                    title: "旗子",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "标题字段",
                            labelTips: "设置旗子标题对应的键名",
                            propsName: "flagNameField",
                            defPropsValue: "name",
                        },
                        {
                            cmp: "StringSetter",
                            label: "内容字段",
                            labelTips: "设置旗子内容描述部分对应的键名",
                            propsName: "flagContentField",
                            defPropsValue: "content",
                        },
                        {
                            cmp: "StringSetter",
                            label: "旗子字段",
                            labelTips: "设置旗子信息数组对应的键名",
                            propsName: "flagField",
                            defPropsValue: "flags",
                        },
                        {
                            cmp: "StringSetter",
                            label: "状态字段",
                            labelTips: "设置旗子状态对应的键名",
                            propsName: "flagStatusField",
                            defPropsValue: "status",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "节点实心",
                            labelTips: "在里程碑模式下，设置已经完成节点显示为实心，且光晕不透明",
                            propsName: "solid",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "节点间距",
                            labelTips: "设置相邻节点的间距，即节点间线条的长度",
                            propsName: "space",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "ColorSetter",
                            label: "线条颜色",
                            propsName: "lineStyle",
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
                            title: "节点点击",
                            description: "节点的点击事件，参数（index:节点索引, node：节点数据信息）",
                            name: "click",
                            params: [
                                { name: "index", type: "number", note: "" },
                                { name: "node", type: "ICustomData", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "旗子的点击",
                            description: "旗子的点击事件，参数（index:旗子索引, node：旗子数据信息）",
                            name: "flagClick",
                            params: [
                                { name: "index", type: "number", note: "" },
                                { name: "node", type: "ICustomData", note: "" },
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
        // 节点下方内容
        // bottom
        // 旗帜内容
        // flag
        // 节点图标
        // icon
        // 节点上方内容
        // top
    },
    i18n: {},
});
