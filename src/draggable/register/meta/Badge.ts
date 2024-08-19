import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import BadgeSvg from "@/assets/images/badge.svg?component";

export default defineComponentMeta({
    type: "Badge",
    name: "徽标数",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(BadgeSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
            value: 66,
            data: "徽标示例",
            offset: ["-30%", "-50%"],
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "primary", label: "主要徽标" },
                                    { value: "success", label: "成功徽标" },
                                    { value: "warning", label: "警告徽标" },
                                    { value: "danger", label: "危险徽标" },
                                    { value: "info", label: "信息徽标" },
                                ],
                            },
                            label: "徽标类型",
                            propsName: "type",
                            defPropsValue: "danger",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "徽标数据",
                            propsName: "value",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "最大值",
                            labelTips: "指定徽章显示的最大值，如果实际获取的徽章值超过该最大值，则以最大值后接一个 '+' 的形式显示徽章数，要求 value 是 number 类型",
                            propsName: "max",
                        },
                        {
                            cmp: "StringSetter",
                            label: "徽标内容",
                            propsName: "data",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "跳转url",
                            watchValue: true,
                            propsName: "href",
                        },
                        {
                            cmp: "StringSetter",
                            label: "跳转方式",
                            labelTips: "点击标记时链接到目标页面的跳转方式，仅在 href 属性存在时使用",
                            propsName: "target",
                            isHideSetter: node => !node.props.href,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否隐藏",
                            propsName: "hidden",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "圆点形式",
                            propsName: "isDot",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置偏移量",
                            },
                            label: "偏移量",
                            labelTips: "设置标记位置的偏移量",
                            propsName: "offset",
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
            type: "span",
            props: {
                style: {
                    width: "60px",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    padding: "4px 0",
                },
            },
            tpl: "拖拽组件",
        },
    },
    i18n: {},
});
