import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { checkboxGroupOptions } from "@/draggable/register/JsonSchema";
import CheckboxGroupSvg from "@/assets/images/checkbox-group.svg?component";

export default defineComponentMeta({
    type: "CheckboxGroup",
    name: "多选组",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(CheckboxGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
                                    { value: "checkbox", label: "多选框" },
                                    { value: "button", label: "复选按钮" },
                                ],
                            },
                            label: "组件模式",
                            labelTips: "复选框组子项组件类型，需配合 options 属性使用",
                            propsName: "type",
                            defPropsValue: "checkbox",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 0,
                            },
                            label: "最小勾选",
                            labelTips: "可被勾选的 checkbox 的最小数量",
                            propsName: "min",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 0,
                            },
                            label: "最大勾选",
                            labelTips: "可被勾选的 checkbox 的最大数量",
                            propsName: "max",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "checkbox-group 子项配置列表",
                                jsonSchema: checkboxGroupOptions,
                            },
                            label: "子项配置",
                            propsName: "options",
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
                            cmp: "BoolSetter",
                            label: "垂直排列",
                            labelTips: "设置组件排列方式，设置复选框是否垂直排列",
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
                            label: "边框颜色",
                            labelTips: "按钮形式的 checkbox 激活时的文本颜色",
                            propsName: "textColor",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "边框颜色",
                            labelTips: "按钮形式的 checkbox 激活时的填充色和边框色",
                            propsName: "fill",
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
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // checkbox-group 选项组
        // default
    },
    i18n: {},
});
