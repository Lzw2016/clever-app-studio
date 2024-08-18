import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import RowSvg from "@/assets/images/row.svg?component";

export default defineComponentMeta({
    type: "Row",
    name: "栅格行",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RowSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            tag: "div",
            gutter: 8,
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
                            cmp: "BoolSetter",
                            label: "禁用间隔",
                            labelTips: "子项没有间隔，相当于强制gutter=0的情况",
                            // watchValue: true,
                            propsName: "noSpace",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "子项间隔",
                            labelTips: "子项的间隔的像素",
                            propsName: "gutter",
                            defPropsValue: 0,
                            // isHideSetter: node => node.props.noSpace,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "启用flex",
                            labelTips: "是否为flex容器",
                            watchValue: true,
                            propsName: "flex",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "start", label: "开始方向对齐(start)" },
                                    { value: "center", label: "居中对齐(center)" },
                                    { value: "end", label: "结束方向对齐(end)" },
                                    { value: "space-between", label: "两端对齐(space-between)" },
                                    { value: "space-around", label: "环绕对齐(space-around)" },
                                ],
                            },
                            label: "主轴对齐",
                            labelTips: "子项的主轴对齐方向，可取值：'start', 'center', 'end', 'space-between', 'space-around'",
                            propsName: "justify",
                            defPropsValue: "start",
                            isHideSetter: node => !node.props.flex,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "top", label: "顶部对齐(top)" },
                                    { value: "middle", label: "居中对齐(middle)" },
                                    { value: "bottom", label: "底部对齐(bottom)" },
                                ],
                            },
                            label: "副轴对齐",
                            labelTips: "子项的副轴对齐方向，可取值：'top', 'middle', 'bottom'",
                            propsName: "align",
                            defPropsValue: "top",
                            isHideSetter: node => !node.props.flex,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: false,
                                options: [
                                    { value: "asc", label: "正序(asc)" },
                                    { value: "des", label: "倒序(des)" },
                                ],
                            },
                            label: "排序方式",
                            labelTips: "子项的排序方式。 不设置时，保留子项在模板中的顺序。",
                            propsName: "order",
                            isHideSetter: node => !node.props.flex,
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
                    minHeight: "48px",
                    minWidth: "104px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "拖拽“栅格列”组件到这里",
        },
    },
    i18n: {},
});
