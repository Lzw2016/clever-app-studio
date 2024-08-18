import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ColSvg from "@/assets/images/col.svg?component";

export default defineComponentMeta({
    type: "Col",
    name: "栅格列",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ColSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            tag: "div",
            span: 3,
            // style: {
            //     border: "1px solid #ccc",
            // },
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
                                placeholder: "输入有效的html标签，如：div、span",
                            },
                            label: "html标签",
                            labelTips: "输入有效的html标签，如：div、span",
                            propsName: "tag",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                min: 1,
                                max: 24,
                            },
                            label: "占据列数",
                            labelTips: "子项占据的列数",
                            propsName: "span",
                            defPropsValue: 12,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "排序编号",
                            labelTips: "子项排序编号",
                            propsName: "no",
                            recalcAuxToolPosition: true,
                        },
                        // {
                        //     cmp: "NumberSetter",
                        //     cmpProps: {
                        //         step: 1,
                        //     },
                        //     label: "右偏移量",
                        //     labelTips: "子项的右偏移量,是通过 left 属性实现偏移,建议使用 offset 代替",
                        //     propsName: "move",
                        //     recalcAuxToolPosition: true,
                        // },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "右偏移量",
                            labelTips: "子项的向右偏移量,是通过 margin-left 属性实现偏移",
                            propsName: "offset",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "xs响应式",
                            labelTips: "在响应式宽度 < 768px 时，该列占用的栅格数",
                            propsName: "xs",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "sm响应式",
                            labelTips: "在响应式宽度 < 992px 时，该列占用的栅格数",
                            propsName: "sm",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "md响应式",
                            labelTips: "在响应式宽度 < 1200px 时，该列占用的栅格数",
                            propsName: "md",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "lg响应式",
                            labelTips: "在响应式宽度 < 1920px 时，该列占用的栅格数",
                            propsName: "lg",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "xl响应式",
                            labelTips: "在响应式宽度 >= 1920px 时，该列占用的栅格数",
                            propsName: "xl",
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
        default: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    minHeight: "80px",
                    minWidth: "104px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "将组件拖拽到这里",
        },
    },
    i18n: {},
});
