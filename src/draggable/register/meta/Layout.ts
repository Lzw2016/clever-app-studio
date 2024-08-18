import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import LayoutSvg from "@/assets/images/layout.svg?component";

export default defineComponentMeta({
    type: "Layout",
    name: "栅格布局",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(LayoutSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            tag: "div",
            cols: 12,
            style: {
                border: "1px solid #ccc",
            },
        },
        items: [
            {
                type: "Row",
                props: {
                    tag: "div",
                    gutter: 8,
                    style: {
                        marginBottom: "4px",
                    },
                },
                items: [
                    {
                        type: "Col",
                        props: {
                            tag: "div",
                            span: 3,
                        },
                    },
                    {
                        type: "Col",
                        props: {
                            tag: "div",
                            span: 3,
                        },
                    },
                ],
            },
            {
                type: "Row",
                props: {
                    tag: "div",
                    gutter: 8,
                    // style: {
                    //     marginBottom: "4px",
                    // },
                },
                items: [
                    {
                        type: "Col",
                        props: {
                            tag: "div",
                            span: 3,
                        },
                    },
                    {
                        type: "Col",
                        props: {
                            tag: "div",
                            span: 3,
                        },
                    },
                ],
            },
        ],
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
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: 12, label: "12栅格" },
                                    { value: 24, label: "24栅格" },
                                ],
                            },
                            label: "总栅格数",
                            propsName: "cols",
                            defPropsValue: 12,
                        },
                        // TODO 自定义快捷操作
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
                    minHeight: "240px",
                    minWidth: "104px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "拖拽“栅格行”组件到这里",
        },
    },
    i18n: {},
});
