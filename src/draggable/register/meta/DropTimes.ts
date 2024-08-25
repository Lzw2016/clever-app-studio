import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DropTimesSvg from "@/assets/images/drop-times.svg?component";

export default defineComponentMeta({
    type: "DropTimes",
    name: "时间下拉",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/drop-times",
    icon: createVNode(DropTimesSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "占位文本",
                            labelTips: "非范围选择时的占位内容",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                min: 0,
                            },
                            label: "开始时间",
                            labelTips: "开始时间，以分钟计算",
                            propsName: "start",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                min: 0,
                            },
                            label: "结束时间",
                            labelTips: "结束时间，以分钟计算",
                            propsName: "end",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                min: 0,
                            },
                            label: "间隔时间",
                            labelTips: "间隔时间，以分钟计算",
                            propsName: "step",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            labelTips: "弹出显示内容是否追加到html的body的末尾位置",
                            propsName: "popperAppendToBody",
                            defPropsValue: true,
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
                            labelTips: "输入框尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "为 DropTimes 下拉弹框添加的 class 类名",
                            propsName: "popperClass",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [],
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
                                { name: "value", type: "string | undefined", note: "" },
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
