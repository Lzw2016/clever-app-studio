import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { wizardData } from "@/draggable/register/JsonSchema";
import BrSvg from "@/assets/images/wizard.svg?component";

export default defineComponentMeta({
    type: "Wizard",
    name: "流程图",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/wizard",
    icon: createVNode(BrSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                {
                    name: '出差信息填写',
                    status: 'ready',
                },
                {
                    name: '项目信息填写',
                    status: 'doing',
                },
                {
                    name: '主管审批',
                    status: 'wait',
                },
                {
                    name: '权签人审批',
                    status: 'wait',
                },
                {
                    name: '完成申请',
                    status: 'wait',
                },
            ],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "向导模式",
                            propsName: "pageGuide",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "时间线",
                            propsName: "timeLineFlow",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "节点数据配置",
                                jsonSchema: wizardData,
                            },
                            label: "节点数据",
                            propsName: "data",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "垂直模式",
                            propsName: "vertical",
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
                            title: "点击“下一步”",
                            description: "页向导模式下，点击“下一步”按钮触发的回调事件",
                            name: "btnNext",
                            params: [
                                { name: "datas", type: "IDataItem[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击“上一步”",
                            description: "页向导模式下，点击“上一步”按钮触发的回调事件",
                            name: "btnPrev",
                            params: [
                                { name: "datas", type: "IDataItem[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击“保存”",
                            description: "页向导模式下，点击“保存”按钮触发的回调事件",
                            name: "btnSave",
                            params: [
                                { name: "datas", type: "IDataItem[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击“提交”",
                            description: "页向导模式下，点击“下一步”导致最后一个节点的状态为 “doing” 时，点击“提交”按钮触发的回调事件",
                            name: "btnSubmit",
                            params: [
                                { name: "datas", type: "IDataItem[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "节点点击",
                            description: "节点点击事件",
                            name: "btnClick",
                            params: [
                                { name: "node", type: "IDataItem", note: "" },
                                { name: "index", type: "number", note: "" },
                                { name: "event", type: "Event", note: "" },
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
        // 基本插槽
        // base
        // 页向导模式按钮插槽
        // stepbutton
    },
    i18n: {},
});
