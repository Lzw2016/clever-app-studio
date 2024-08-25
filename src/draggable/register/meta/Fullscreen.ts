import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FullscreenSvg from "@/assets/images/fullscreen.svg?component";

export default defineComponentMeta({
    type: "Fullscreen",
    name: "全屏",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/fullscreen",
    icon: createVNode(FullscreenSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            // style: {
            //     width: "100%",
            //     height: "200px",
            // },
        },
        items: [
            {
                type: "img",
                props: {
                    style: {
                        width: "100%",
                        height: "100%",
                    },
                    src: "https://res.hc-cdn.com/tiny-vue-web-doc/3.18.0.20240821112032/static/images/book-small.jpg",
                },
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
                            cmp: "BoolSetter",
                            label: "是否全屏",
                            labelTips: "组件式使用时，控制组件是否全屏显示",
                            propsName: "fullscreen",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "网页全屏",
                            labelTips: "显示模式。true 为网页全屏，false 为浏览器全屏",
                            propsName: "pageOnly",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "移到body",
                            labelTips: "是否将目标元素移动到 body 下。true 为移动，false 为不移动",
                            propsName: "teleport",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否关闭",
                            labelTips: "组件式使用时，点击组件 wrapper 是否关闭全屏显示",
                            propsName: "exitOnClickWrapper",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "z-index",
                            labelTips: "在全屏显示时，目标元素的 zIndex",
                            propsName: "zIndex",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "包装class",
                            labelTips: "自定义组件 wrapper 的样式类名",
                            propsName: "fullscreenClass",
                        },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "拦截事件",
                            name: "beforeChange",
                            params: [
                                { name: "done", type: "() => void", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "更新fullscreen属性",
                            description: "组件式使用时，更新 fullscreen 属性",
                            name: "update:fullscreen",
                            params: [],
                            return: VarType.Void,
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
