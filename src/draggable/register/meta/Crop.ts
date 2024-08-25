import lodash from "lodash";
import { createVNode, VNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CropSvg from "@/assets/images/crop.svg?component";

export default defineComponentMeta({
    type: "Crop",
    name: "图片裁剪",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/crop",
    icon: createVNode(CropSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            cropvisible: true,
            modal: false,
            src: "https://res.hc-cdn.com/tiny-vue-web-doc/3.18.0.20240821112032/static/images/mountain.png",
        },
    },
    designDirectives: {
        "deep-traverse-each": {
            value: {
                maxDepth: 1,
                eachVNode: function (rootVNode: VNode, htmlTag: boolean, current: VNode, parent?: VNode) {
                    const el = current.el as HTMLElement;
                    if (!el) return;
                    if (lodash.toLower(el.tagName) !== "div" || el.className !== "tiny-crop") return;
                    el.style.pointerEvents = "none";
                },
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
                            cmpProps: {
                                type: "textarea",
                                resize: "none",
                                rows: 6,
                            },
                            label: "图片地址",
                            labelTips: "默认裁剪的源图片",
                            propsName: "src",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否可见",
                            labelTips: "设置裁剪弹框是否可见",
                            propsName: "cropvisible",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动显示",
                            labelTips: "初始化时，是否自动显示裁剪框",
                            propsName: "autoCrop",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                precision: 2,
                                min: 0.01,
                                max: 0.99,
                            },
                            label: "裁剪面积",
                            labelTips: "定义自动裁剪面积大小（百分比）",
                            propsName: "autoCropArea",
                            defPropsValue: 0.8,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                precision: 2,
                                min: 0.01,
                                max: 0.99,
                            },
                            label: "压缩比例",
                            labelTips: "设置图片裁剪后的压缩比例，值在 0-1 之间，默认为 0.92",
                            propsName: "quality",
                            defPropsValue: 0.92,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                precision: 2,
                            },
                            label: "宽高比",
                            labelTips: "裁剪框的宽高比;默认为 16 / 9",
                            propsName: "aspectRatio",
                            defPropsValue: 16 / 9,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "crop", label: "使用裁剪框" },
                                    { value: "move", label: "只可以移动图片" },
                                    { value: "none", label: "什么也不处理" },
                                ],
                            },
                            label: "拖拽模式",
                            propsName: "dragMode",
                            defPropsValue: "crop",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "blob", label: "blob" },
                                    { value: "base64", label: "base64" },
                                ],
                            },
                            label: "裁剪数据",
                            labelTips: "设置图片裁剪后返回的类型，可配置为 blob 和 base64",
                            propsName: "cropType",
                            defPropsValue: "base64",
                        },
                        {
                            cmp: "StringSetter",
                            label: "图片大小",
                            labelTips: "设置待裁剪图片的最大大小，默认为 1M",
                            propsName: "maxSize",
                            defPropsValue: "1M",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "图片移动",
                            labelTips: "是否允许可以移动后面的图片;默认为 true",
                            propsName: "movable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "可预览",
                            labelTips: "设置裁剪区域图片是否可预览，默认为 false",
                            propsName: "preview",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许旋转",
                            labelTips: "是否允许旋转图像;默认为 true",
                            propsName: "rotatable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许放大",
                            labelTips: "是否允许放大图像;默认为 true",
                            propsName: "zoomable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "滚轮缩放",
                            labelTips: "是否可以通过滚动鼠标滚轮来缩放图像;默认为 true",
                            propsName: "zoomOnWheel",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                precision: 2,
                            },
                            label: "鼠标缩放",
                            labelTips: "用鼠标移动图像时，定义缩放比例;默认为 0.1",
                            propsName: "wheelZoomRatio",
                            defPropsValue: 0.1,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: 0, label: "裁剪框可以移动到图片外面" },
                                    { value: 1, label: "裁剪框只能在图片内移动" },
                                    { value: 2, label: "图片不全部铺满容器" },
                                    { value: 3, label: "图片填充整个容器" },
                                ],
                            },
                            label: "视图模式",
                            propsName: "viewMode",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "最小高度",
                            labelTips: "容器的最小高度;默认为 300",
                            propsName: "minContainerHeight",
                            defPropsValue: 300,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "最小宽度",
                            labelTips: "容器的最小宽度;默认为 652",
                            propsName: "minContainerWidth",
                            defPropsValue: 652,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "最小高度",
                            labelTips: "裁剪层的最小高度;默认为 0",
                            propsName: "minCropBoxHeight",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 8,
                                unit: "px",
                            },
                            label: "最小宽度",
                            labelTips: "裁剪层的最小宽度;默认为 0",
                            propsName: "minCropBoxWidth",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "模态框",
                            labelTips: "是否显示图片上方裁剪框下方的黑色模态;默认为 true",
                            propsName: "modal",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "网格背景",
                            labelTips: "是否显示容器的网格背景;默认为 true",
                            propsName: "background",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示虚线",
                            labelTips: "是否在裁剪框上方显示虚线;默认为 true",
                            propsName: "guides",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "中心裁剪",
                            labelTips: "裁剪框是否在图片正中心;默认为 true",
                            propsName: "center",
                            defPropsValue: true,
                        },
                        // {
                        //     cmp: "ColorSetter",
                        //     label: "网格背景",
                        //     labelTips: "是否显示容器的网格背景;默认为 true",
                        //     propsName: "background",
                        // },
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
                            title: "裁剪框改变",
                            description: "当画布（图像包装器）或裁剪框发生改变时触发",
                            name: "crop",
                            params: [
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "裁剪事件",
                            description: "cropdata 事件回调函数中可以拿到裁剪后的数据，默认为 base64 数据",
                            name: "cropdata",
                            params: [
                                { name: "data", type: "string | blob", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "剪切框开始变化",
                            description: "当画布（图像包装器）或剪切框开始发生变化时触发",
                            name: "cropstart",
                            params: [
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "剪切框变化结束",
                            description: "当画布（图像包装器）或剪切框发生变化结束时触发",
                            name: "cropend",
                            params: [
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "剪切框正在变化",
                            description: "当画布（图像包装器）或剪切框正在发生变化时触发",
                            name: "cropmove",
                            params: [
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "cropper实例初始化完成",
                            description: "当一个 cropper 实例完全构建时触发",
                            name: "ready",
                            params: [
                                { name: "event", type: "Event", note: "" },
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
    placeholder: {},
    i18n: {},
});
