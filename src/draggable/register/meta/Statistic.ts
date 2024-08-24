import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { statisticTitle } from "@/draggable/register/JsonSchema";
import StatisticSvg from "@/assets/images/statistic.svg?component";
import lodash from "lodash";

export default defineComponentMeta({
    type: "Statistic",
    name: "统计数值",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/statistic",
    icon: createVNode(StatisticSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            value: 123.456,
            precision: 2,
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "number",
                                clearable: false,
                            },
                            label: "数值",
                            propsName: "value",
                            applyPropsValue: (props, value) => {
                                value = lodash.trim(value);
                                const num = lodash.toNumber(value);
                                if (lodash.isNaN(num)) {
                                    delete props.value;
                                } else {
                                    props.value = num;
                                }
                            },
                            defPropsValue: 0,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置数字内容标题",
                                jsonSchema: statisticTitle,
                            },
                            label: "内容标题",
                            labelTips: "设置数字内容标题",
                            propsName: "title",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "精度值",
                            propsName: "precision",
                            defPropsValue: 0,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "前缀文本",
                            labelTips: "设置数字内容前缀",
                            propsName: "prefix",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "后缀文本",
                            labelTips: "设置数字内容后缀",
                            propsName: "suffix",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置数字样式",
                            },
                            label: "数字样式",
                            labelTips: "设置数字样式",
                            propsName: "valueStyle",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // 数字内容前置插槽
        // prefix
        // 数字内容后置插槽
        // suffix
        // 数字内容标题插槽
        // title
    },
    i18n: {},
});
