import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ImageSvg from "@/assets/images/image.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Image",
    name: "图片",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/image",
    icon: createVNode(ImageSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                width: "200px",
                height: "100px",
            },
            src: "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/mountain.png",
            previewSrcList: [
                "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/mountain.png",
                "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/house.jpg",
                "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/bridge.jpg",
            ],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "图片路径",
                            labelTips: "设置图片路径",
                            propsName: "src",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "懒加载",
                            propsName: "lazy",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "指定预览大图时的图片列表",
                            },
                            label: "图片列表",
                            labelTips: "指定预览大图时的图片列表",
                            propsName: "previewSrcList",
                            defPropsValue: [],
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "z-index",
                            labelTips: "图片预览功能时，设置最外层元素的 z-index",
                            propsName: "zIndex",
                            defPropsValue: 2000,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "展示列号",
                            labelTips: "开启图片序列号展示",
                            propsName: "showIndex",
                        },
                        {
                            cmp: "StringSetter",
                            label: "滚动容器",
                            labelTips: "指定滚动容器。启用懒加载时，监听滚动容器的 scroll 事件来懒加载。 该属性用于设置图片的容器,当未设置容器时，默认会取最近一个 overflow 值为 auto 或 scroll 的父元素做为滚动容器",
                            propsName: "scrollContainer",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "fill", label: "填充整个元素(fill)" },
                                    { value: "contain", label: "包含整个图片(contain)" },
                                    { value: "cover", label: "覆盖整个元素(cover)" },
                                    { value: "none", label: "尺寸不变(none)" },
                                    { value: "scale-down", label: "缩放最小版(scale-down)" },
                                ],
                            },
                            label: "适应容器",
                            labelTips: "确定图片如何适应容器大小",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "保持样式",
                            labelTips: "保持图片样式属性",
                            propsName: "keepStyle",
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
                            title: "图片加载成功",
                            description: "图片加载成功的触发的事件，参数为原生的成功事件",
                            name: "load",
                            params: [
                                { name: "ev", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "图片加载失败",
                            description: "图片加载失败后触发的事件，参数为原生的失败事件",
                            name: "error",
                            params: [
                                { name: "ev", type: "Event", note: "" },
                            ],
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
        // 设置图片计数插槽
        // count
        // 图片加载失败的占位内容插槽
        // error
        // 图片加载的占位内容插槽
        // placeholder
    },
    i18n: {},
});
