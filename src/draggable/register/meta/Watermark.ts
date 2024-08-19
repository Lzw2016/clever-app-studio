import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { watermarkFont } from "@/draggable/register/JsonSchema";
import WatermarkSvg from "@/assets/images/watermark.svg?component";

export default defineComponentMeta({
    type: "Watermark",
    name: "水印",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(WatermarkSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            // content: ["水印示例", "Happy Working"],
            content: "水印示例",
            style: {
                height: "300px",
                width: "100%",
                border: "1px solid #ccc",
            },
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
                            label: "水印文字",
                            labelTips: "水印文字内容，此属性低于 image",
                            propsName: "content",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "水印文字样式",
                                jsonSchema: watermarkFont,
                            },
                            label: "文字样式",
                            labelTips: "水印文字样式",
                            propsName: "font",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "水印之间的间距",
                            },
                            label: "水印间距",
                            labelTips: "水印之间的间距",
                            propsName: "gap",
                            defPropsValue: [100, 100],
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                unit: "px",
                            },
                            label: "水印高度",
                            labelTips: "水印的高度, 最小高度64px",
                            propsName: "height",
                            defPropsValue: 64,
                            disableReRender: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                unit: "px",
                            },
                            label: "水印宽度",
                            labelTips: "水印的宽度, 最小宽度120px",
                            propsName: "width",
                            defPropsValue: 120,
                            disableReRender: true,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "水印层级",
                            labelTips: "追加的水印元素的 'z-index'",
                            propsName: "zIndex",
                            defPropsValue: 9,
                            disableReRender: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "水印图片",
                            labelTips: "图片源，建议导出 2 倍或 3 倍图，优先级高（支持 base64 格式），此属性高于 content",
                            propsName: "image",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "交错水印",
                            propsName: "interlaced",
                            defPropsValue: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "水印距离容器左上角的偏移量",
                            },
                            label: "偏移量",
                            labelTips: "水印距离容器左上角的偏移量",
                            propsName: "gap",
                            defPropsValue: [20, 20],
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: -360,
                                max: 360,
                            },
                            label: "旋转角度",
                            labelTips: "水印绘制时，旋转的角度，单位 °",
                            propsName: "rotate",
                            defPropsValue: -22,
                            disableReRender: true,
                        },
                    ],
                },
            ],
        },
        // events: {
        //     includeInnerEvents: true,
        //     excludeInnerEvents: ["表单事件"],
        //     groups: [],
        // },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: {
            type: "div",
            props: {
                style: {
                    width: "100%",
                    height: "100%",
                },
            },
        },
    },
    i18n: {},
});
