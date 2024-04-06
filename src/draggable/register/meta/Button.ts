import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "Button",
    name: "按钮",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "",
    // designComponent: "",
    defDesignNode: {
        props: {
            text: "按钮",
        },
        directives: {
            'disable-event': {},
        },
    },
    events: {},
    slots: {},
    setter: {
        props: {
            title: "",
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            ref: "text",
                            cmp: "StringSetter",
                            cmpProps: {
                                clearable: true,
                            },
                            label: "按钮文本",
                            propsName: "text",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            label: "按钮类型",
                            labelTips: "展示按钮不同的状态，如：“主要”、“成功”、“信息”、“警告”、“危险”等",
                            propsName: "type",
                        },
                        {
                            cmp: "ComponentSetter",
                            label: "按钮图标",
                            propsName: "icon",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加载状态",
                            labelTips: "是否加载中状态",
                            propsName: "loading",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "禁用按钮",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "样式",
                    items: [
                        {
                            cmp: "SelectSetter",
                            label: "按钮尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆形按钮",
                            propsName: "circle",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆角按钮",
                            propsName: "round",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "幽灵按钮",
                            propsName: "ghost",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "朴素按钮",
                            propsName: "plain",
                        },
                    ],
                },
                {
                    title: "其它",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "自动聚焦",
                            labelTips: "自动获取焦点",
                            propsName: "autofocus",
                        },
                        {
                            cmp: "SelectSetter",
                            label: "Html type",
                            labelTips: "按钮原生的 html type 属性",
                            propsName: "nativeType",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "禁用时间",
                            labelTips: "设置按钮禁用时间，防止重复提交，单位毫秒",
                            propsName: "resetTime",
                        },
                    ],
                },
            ],
        },
        // events: {
        //     title: "",
        //     groups: [
        //         {
        //             title: "组件事件",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "HTML事件",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // style: {
        //     title: "",
        //     groups: [
        //         {
        //             title: "布局",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "间距",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "尺寸",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "定位",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "文本",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "背景",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "边框",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "效果",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // advanced: {
        //     title: "",
        //     groups: [
        //         {
        //             title: "指令",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "权限",
        //             items: [
        //                 {
        //                     cmp: "TextSetter",
        //                     propsName: "aaa",
        //                 },
        //             ],
        //         },
        //     ],
        // },
    },
    placeholder: {},
    i18n: {},
});
