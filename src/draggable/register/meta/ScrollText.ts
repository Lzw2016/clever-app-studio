import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ScrollTextSvg from "@/assets/images/scroll-text.svg?component";

export default defineComponentMeta({
    type: "ScrollText",
    name: "文字滚动",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/scroll-text",
    icon: createVNode(ScrollTextSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            text: "这是一段滚动的文字",
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
                            label: "文本内容",
                            propsName: "text",
                            defPropsValue: "ScrollText",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "up", label: "向上" },
                                    { value: "left", label: "向左" },
                                    { value: "down", label: "向下" },
                                    { value: "right", label: "向右" },
                                ],
                            },
                            label: "滚动方向",
                            propsName: "direction",
                            defPropsValue: "left",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "秒",
                            },
                            label: "滚动时间",
                            labelTips: "整个滚动过程所用的时间",
                            propsName: "time",
                            defPropsValue: 5,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动停止",
                            labelTips: "hover 滚动是否停止",
                            propsName: "hoverStop",
                            defPropsValue: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [],
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
        // 默认插槽，滚动的内容的插槽
        // default
    },
    i18n: {},
});
