import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { radioGroupOptions } from "@/draggable/register/JsonSchema";
import RadioGroupSvg from "@/assets/images/radio-group.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "RadioGroup",
    name: "单选组",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/radio",
    icon: createVNode(RadioGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            options: [
                { label: "v_1", text: "选项1" },
                { label: "v_2", text: "选项2" },
                { label: "v_3", text: "选项3" },
            ],
            modelValue: [],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                defPropsValue: [],
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "radio", label: "单选框" },
                                    { value: "button", label: "单选按钮" },
                                ],
                            },
                            label: "单选类型",
                            labelTips: "配置式单选组的展示形式",
                            propsName: "type",
                            defPropsValue: "radio",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置式单选组设置列表",
                                jsonSchema: radioGroupOptions,
                            },
                            label: "子项配置",
                            propsName: "options",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示模式",
                            propsName: "displayOnly",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "垂直排列",
                            labelTips: "垂直显示单选组",
                            propsName: "vertical",
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
                            cmp: "ColorSetter",
                            label: "文本颜色",
                            propsName: "textColor",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "充色颜色",
                            labelTips: "按钮形式单选选中时的背景颜色",
                            propsName: "fill",
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
                                { name: "value", type: "string[] | number[]", note: "" },
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
        // radio-group 的默认插槽
        // default
    },
    i18n: {},
});
