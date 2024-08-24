import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import QrCodeSvg from "@/assets/images/qr-code.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "QrCode",
    name: "二维码",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/qr-code",
    icon: createVNode(QrCodeSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            value: "测试二维码",
            size: 100,
        },
    },
    designDirectives: {
        // "disable-event": {},
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
                            label: "内容文本",
                            propsName: "value",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                            },
                            label: "大小",
                            propsName: "size",
                            defPropsValue: 200,
                            updateVNodeKey: true,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "Low", label: "低(Low)" },
                                    { value: "Medium", label: "中(Medium)" },
                                    { value: "Quality", label: "优(Quality)" },
                                    { value: "High", label: "高(High)" },
                                ],
                            },
                            label: "纠错等级",
                            labelTips: "二维码纠错等级",
                            propsName: "level",
                            defPropsValue: "Medium",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "textarea",
                                resize: "none",
                                rows: 6,
                            },
                            label: "图片路径",
                            labelTips: "二维码中图片的地址（目前只支持图片地址）",
                            propsName: "icon",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "图片大小",
                            labelTips: "二维码中图片的大小，icon 覆盖面积不能超过二维码面积的 30%， 否则影响扫码",
                            propsName: "iconSize",
                            defPropsValue: 50,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "是否边框",
                            propsName: "bordered",
                            defPropsValue: true,
                        },
                        {
                            cmp: "ColorSetter",
                            label: "颜色",
                            labelTips: "二维码颜色, 仅支持十六进制",
                            propsName: "color",
                            defPropsValue: "#000",
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
                            title: "二维码变化",
                            description: "二维码发生变化后的回调",
                            name: "change",
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
    placeholder: {},
    i18n: {},
});
