import { createVNode, VNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ASvg from "@/assets/images/a.svg?component";

export default defineComponentMeta({
    type: "Link",
    name: "链接",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ASvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            href: "https://cn.vuejs.org/",
            value: "超链接",
        },
    },
    designDirectives: {
        "deep-traverse-each": {
            value: {
                maxDepth: 1,
                eachVNode: function (rootVNode: VNode, htmlTag: boolean, current: VNode, parent?: VNode) {
                    if (rootVNode !== current) return;
                    if (rootVNode.type !== "a") return;
                    const props = rootVNode.props;
                    if (!props) return;
                    props.href = 'javascript:void(0);';
                },
            },
        },
    },
    slots: {},
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "连接文本",
                            propsName: "value",
                        },
                        {
                            cmp: "StringSetter",
                            label: "连接地址",
                            propsName: "href",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "按钮图标",
                            propsName: "icon",
                            enableBind: false,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "primary", label: "主要按钮" },
                                    { value: "success", label: "成功按钮" },
                                    { value: "warning", label: "警告按钮" },
                                    { value: "danger", label: "危险按钮" },
                                    { value: "info", label: "信息按钮" },
                                ],
                            },
                            label: "链接类型",
                            propsName: "type",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "下划线",
                            propsName: "underline",
                            defPropsValue: true,
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {},
    i18n: {},
});
