import lodash from "lodash";
import { createVNode } from "vue";
import { noValue } from "@/utils/Typeof";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { cardOptions } from "@/draggable/register/JsonSchema";
import CardSvg from "@/assets/images/card.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Card",
    name: "卡片",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/card",
    icon: createVNode(CardSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            title: "卡片示例",
            type: "image",
            src: "https://res.hc-cdn.com/tiny-vue-web-doc/3.17.10.20240719092807/static/images/dsj.png",
        },
        items: [
            {
                type: "Text",
                props: {
                    tagType: "p",
                    defText: [
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                        "这是一段长文本内容，",
                    ].join(""),
                },
            },
        ],
    },
    designDirectives: {
        "disable-event": {},
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
                            label: "卡片标题",
                            propsName: "title",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "text", label: "文本" },
                                    { value: "image", label: "图片" },
                                    { value: "video", label: "视频" },
                                    { value: "logo", label: "Logo" },
                                ],
                            },
                            label: "选中效果",
                            labelTips: "卡片被选中后的呈现模式",
                            propsName: "type",
                            defPropsValue: "text",
                        },
                        {
                            cmp: "StringSetter",
                            label: "资源地址",
                            labelTips: "图片或者视频的地址",
                            propsName: "src",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "操作按钮配置",
                                jsonSchema: cardOptions,
                            },
                            label: "操作按钮",
                            propsName: "options",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "选择",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "radio", label: "单选" },
                                    { value: "checkbox", label: "多选" },
                                ],
                            },
                            label: "选择类型",
                            labelTips: "设置卡片单选、多选",
                            propsName: "checkType",
                        },
                        {
                            cmp: "StringSetter",
                            label: "多选label",
                            labelTips: "checkbox或radio的label",
                            propsName: "label",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "normal", label: "正常" },
                                    { value: "simple", label: "简单" },
                                    { value: "badge", label: "徽章" },
                                ],
                            },
                            label: "选中效果",
                            labelTips: "卡片被选中后的呈现模式",
                            propsName: "checkMode",
                            defPropsValue: "normal",
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
                                    { value: "large", label: "大" },
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "尺寸",
                            propsName: "size",
                            defPropsValue: "medium",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "default", label: "默认" },
                                    { value: "success", label: "成功" },
                                    { value: "warning", label: "警告" },
                                    { value: "alerting", label: "提醒" },
                                    { value: "danger", label: "危险" },
                                ],
                            },
                            label: "卡片状态",
                            propsName: "status",
                            defPropsValue: "default",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动宽度",
                            labelTips: "卡片的宽度是否自动撑开，设置后将不再给卡片设置固定宽度",
                            propsName: "autoWidth",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "高度",
                            labelTips: "卡片内容区域的高度",
                            propsName: "height",
                            getPropsValue: props => {
                                let height = lodash.trim(props.height);
                                if (!height) return;
                                if (height.endsWith("px")) {
                                    height = height.substring(0, height.length - 2);
                                }
                                return lodash.toInteger(height);
                            },
                            applyPropsValue: (props, value) => {
                                if (noValue(value) || value <= 0) {
                                    delete props.height;
                                } else {
                                    props.height = `${(value)}px`;
                                }
                            },
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "更多图标",
                            labelTips: "更多按钮图标",
                            propsName: "iconMore",
                            enableBind: false,
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "卡片的class",
                            propsName: "customClass",
                            recalcAuxToolPosition: true,
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
                            title: "选中/取消",
                            description: "组件选中/取消事件",
                            name: "change",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "点击卡",
                            description: "点击卡片事件",
                            name: "click",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "操作栏按钮点击",
                            description: "操作栏按钮点击事件",
                            name: "iconClick",
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
        // 组件默认插槽
        // footer
        // 标题插槽
        // title
        // 标题左侧插槽
        // title-left
        // 标题右侧插槽
        // title-right
    },
    i18n: {},
});
