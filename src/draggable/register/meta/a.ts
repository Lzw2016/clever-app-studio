import { createVNode, VNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ASvg from "@/assets/images/a.svg?component";

export default defineComponentMeta({
    type: "a",
    name: "链接",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ASvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            href: "https://cn.vuejs.org/",
        },
        tpl: "超链接",
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
                    delete props.href;
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
                            getPropsValue: (props, node) => node.tpl,
                            applyPropsValue: (props, value, node) => {
                                node.tpl.length = 0;
                                if (value) node.tpl.push(value);
                            },
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "连接地址",
                            propsName: "href",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "_self", label: "当前页面(_self)" },
                                    { value: "_blank", label: "新标签页(_blank)" },
                                    { value: "_parent", label: "父级窗口(_parent)" },
                                    { value: "_top", label: "顶层窗口(_top)" },
                                ],
                            },
                            labelTips: "a标签的“target”属性值",
                            label: "打开方式",
                            propsName: "target",
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
    placeholder: {},
    i18n: {},
});
