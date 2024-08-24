import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TextPopupSvg from "@/assets/images/text-popup.svg?component";

export default defineComponentMeta({
    type: "TextPopup",
    name: "输入框",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/text-popup",
    icon: createVNode(TextPopupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            placeholder: "请输入",
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
                            cmp: "StringSetter",
                            label: "占位文本",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "StringSetter",
                            label: "分隔符",
                            propsName: "separtor",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否只读",
                            propsName: "readonly",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "px",
                            },
                            label: "宽度",
                            propsName: "width",
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
