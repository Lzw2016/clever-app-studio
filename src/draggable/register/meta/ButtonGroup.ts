import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ButtonGroupSvg from "@/assets/images/button-group.svg?component";

export default defineComponentMeta({
    type: "ButtonGroup",
    name: "按钮组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ButtonGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                { text: '按钮1', value: 'val_1' },
                { text: '按钮2', value: 'val_2' },
                { text: '按钮3', value: 'val_3' },
            ],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        // TODO js对象输入框
                        // {
                        //     cmp: "",
                        //     label: "按钮组数据",
                        //     propsName: "disabled",
                        //     recalcAuxToolPosition: true,
                        // },
                        {
                            cmp: "StringSetter",
                            label: "文本字段",
                            labelTips: "按钮显示文字的字段值",
                            propsName: "textField",
                            defPropsValue: "text",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "值字段",
                            labelTips: "按钮选中值的字段值",
                            propsName: "valueField",
                            defPropsValue: "value",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                            recalcAuxToolPosition: true,
                        },
                        // {
                        //     cmp: "NumberSetter",
                        //     label: "显示更多",
                        //     labelTips: "当超过给定的按钮数量时显示更多按钮",
                        //     propsName: "showMore",
                        //     recalcAuxToolPosition: true,
                        // },
                        // {
                        //     cmp: "BoolSetter",
                        //     label: "编辑按钮",
                        //     labelTips: "是否显示编辑按钮，只有在显示更多的情况下生效",
                        //     propsName: "showEdit",
                        //     recalcAuxToolPosition: true,
                        // },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "large", label: "大" },
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "按钮尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示边框",
                            propsName: "border",
                            defPropsValue: true,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "朴素按钮",
                            propsName: "plain",
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
                            title: "按钮组的值变化",
                            name: "change",
                            description: "当选中按钮发生改变时触发",
                            params: [
                                {
                                    name: "value",
                                    type: "string | number",
                                    note: "当前的按钮值",
                                },
                            ],
                            return: VarType.Void,
                        }
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
