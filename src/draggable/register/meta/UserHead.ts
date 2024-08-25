import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import UserHeadSvg from "@/assets/images/user-head.svg?component";

export default defineComponentMeta({
    type: "UserHead",
    name: "用户头像",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/user-head",
    icon: createVNode(UserHeadSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            type: "image",
            modelValue: "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/ld.png",
        },
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "StringSetter",
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "icon", label: "图标类名" },
                                    { value: "label", label: "字体串" },
                                    { value: "image", label: "资源路径" },
                                ],
                            },
                            label: "头像类型",
                            propsName: "type",
                            defPropsValue: "label",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "消息计数",
                            propsName: "messageTotal",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "消息上限",
                            propsName: "messageUpperLimit",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "mini模式",
                            propsName: "min",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆形模式",
                            propsName: "round",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "details", label: "数字" },
                                    { value: "basic", label: "圆点" },
                                ],
                            },
                            label: "消息类型",
                            propsName: "messageType",
                            defPropsValue: "details",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "ColorSetter",
                            label: "文字颜色",
                            propsName: "color",
                            defPropsValue: "#ffffff",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "背景色",
                            propsName: "backgroundColor",
                            defPropsValue: "#d9d9d9",
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
        // default: {
        //     type: "div",
        //     props: {
        //         style: {
        //             height: "100%",
        //             width: "100%",
        //             minHeight: "32px",
        //             overflow: "hidden",
        //             fontSize: "12px",
        //             backgroundColor: "#f0f0f0",
        //             color: "#a7b1bd",
        //         },
        //     },
        //     tpl: "拖拽组件",
        // },
    },
    i18n: {},
});
