import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { timelineData } from "@/draggable/register/JsonSchema";
import TimelineSvg from "@/assets/images/timeline.svg?component";

export default defineComponentMeta({
    type: "Timeline",
    name: "时间线",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TimelineSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                { name: "已下单", time: "2019-11-11 00:01:30" },
                { name: "运输中", time: "2019-11-12 14:20:15" },
                { name: "已签收", time: "2019-11-14 20:45:50" },
            ],
            active: 1,
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
                            label: "当前节点",
                            labelTips: "当前节点索引，从0开始计数",
                            propsName: "active",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "序号起点",
                            labelTips: "节点序号起始值",
                            propsName: "start",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "节点数据配置",
                                jsonSchema: timelineData,
                            },
                            label: "节点数据",
                            propsName: "data",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "节点字段",
                            labelTips: "节点名称对应的字段名",
                            propsName: "nameField",
                            defPropsValue: "name",
                        },
                        {
                            cmp: "StringSetter",
                            label: "时间字段",
                            labelTips: "节点时间信息对应的字段名",
                            propsName: "timeField",
                            defPropsValue: "time",
                        },
                        {
                            cmp: "StringSetter",
                            label: "标题字段",
                            labelTips: "显示组件二级标题内容，默认值为 autoColor",
                            propsName: "autoColorField",
                            defPropsValue: "autoColor",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        // {
                        //     cmp: "BoolSetter",
                        //     label: "水平方向",
                        //     propsName: "horizontal",
                        //     defPropsValue: true,
                        //     recalcAuxToolPosition: true,
                        // },
                        {
                            cmp: "BoolSetter",
                            label: "竖直方向",
                            propsName: "vertical",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "circle", label: "圆圈" },
                                    { value: "dot", label: "小点" },
                                ],
                            },
                            label: "节点类型",
                            labelTips: "圆点外形: 空心圆形或实心圆点",
                            propsName: "shape",
                            defPropsValue: "circle",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "节点三角",
                            labelTips: "是否显示底部指标三角，适用于横向时间线",
                            propsName: "showDivider",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示序号",
                            labelTips: "未完成状态的节点是否显示序号",
                            propsName: "showNumber",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "仅看序号",
                            labelTips: "节点序号是否只显示数字，适用于横向时间线",
                            propsName: "onlyNumber",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "逆序排列",
                            labelTips: "是否逆序排列节点，仅用于竖式时间线",
                            propsName: "reverse",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "节点宽度",
                            labelTips: "节点宽度， 取值为数字、带长度单位的数值字符串和百分比字符串，数字会默认以px为长度单位",
                            propsName: "space",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "连线长度",
                            labelTips: "连接线长度，仅当 text-position 取值为 'right' 时生效，设置后 space 属性失效",
                            propsName: "lineWidth",
                            recalcAuxToolPosition: true,
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
                            title: "节点的点击",
                            description: "节点的点击事件",
                            name: "click",
                            params: [
                                { name: "index", type: "number", note: "" },
                                { name: "node", type: "ITimelineItem", note: "" },
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
        // 自定义节点底部内容
        // bottom
        // 节点描述信息插槽，适用于横向时间线
        // description
        // 自定义节点左侧内容
        // left
        // 自定义节点右侧内容
        // right
        // 自定义节点顶部内容
        // top
    },
    i18n: {},
});
