import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import AlertSvg from "@/assets/images/alert.svg?component";

export default defineComponentMeta({
    type: "Alert",
    name: "警告",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/alert",
    icon: createVNode(AlertSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            description: "这是一个警告提示信息!",
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
                            label: "标题",
                            labelTips: "警告的标题，在 size 为 large 时有效，默认会根据 type 自动设置",
                            propsName: "title",
                        },
                        {
                            cmp: "StringSetter",
                            cmpProps: {
                                type: "textarea",
                                resize: "none",
                                rows: 6,
                            },
                            label: "提示内容",
                            labelTips: "警告的提示内容",
                            propsName: "description",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许关闭",
                            propsName: "closable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "关闭文本",
                            labelTips: "关闭按钮自定义文本",
                            propsName: "close-text",
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
                                    { value: "success", label: "成功" },
                                    { value: "warning", label: "警告" },
                                    { value: "info", label: "信息" },
                                    { value: "error", label: "错误" },
                                    { value: "simple", label: "简单" },
                                ],
                            },
                            label: "警告类型",
                            propsName: "type",
                            defPropsValue: "info",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "normal", label: "正常" },
                                    { value: "large", label: "大" },
                                ],
                            },
                            label: "尺寸大小",
                            propsName: "size",
                            defPropsValue: "normal",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "文本居中",
                            labelTips: "文字是否居中",
                            propsName: "center",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示图标",
                            propsName: "showIcon",
                            defPropsValue: true,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "图标",
                            labelTips: "传入图标组件自定义警告的图标，默认会根据 type 值自动使用对应图标",
                            propsName: "icon",
                            enableBind: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "自定义类名",
                            propsName: "customClass",
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
                            title: "关闭alert",
                            description: "关闭 alert 时触发的事件",
                            name: "close",
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
        // 自定义关闭内容，当 closable 属性为 false 时有效
        // close
        // 组件默认插槽，当 size 设置为 large 后有效
        // default
        // 提示内容
        // description
        // 标题的内容，当 size 设置为 large 后有效
        // title
    },
    i18n: {},
});
