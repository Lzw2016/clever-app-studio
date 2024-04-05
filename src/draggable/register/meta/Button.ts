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
                    title: "常规",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "自动聚焦",
                            labelTips: "是否默认聚焦",
                            propsName: "autofocus",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆形按钮",
                            labelTips: "是否圆形按钮",
                            propsName: "circle",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "禁用按钮",
                            labelTips: "是否被禁用按钮",
                            propsName: "disabled",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "幽灵按钮",
                            labelTips: "是否幽灵按钮",
                            propsName: "ghost",
                        },
                        {
                            cmp: "ComponentSetter",
                            label: "图标",
                            labelTips: "按钮左侧展示的图标，接收为Icon组件",
                            propsName: "icon",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加载中",
                            labelTips: "是否加载中状态",
                            propsName: "loading",
                        },
                        {
                            cmp: "SelectSetter",
                            label: "Html type",
                            labelTips: "对应按钮原生 type 属性",
                            propsName: "nativeType",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "朴素按钮",
                            labelTips: "是否朴素按钮",
                            propsName: "plain",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "禁用时间",
                            labelTips: "设置按钮禁用时间，防止重复提交，单位毫秒",
                            propsName: "resetTime",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "圆角按钮",
                            labelTips: "是否圆角按钮",
                            propsName: "round",
                        },
                        {
                            cmp: "SelectSetter",
                            label: "按钮尺寸",
                            labelTips: "定义按钮尺寸",
                            propsName: "size",
                        },
                        {
                            cmp: "StringSetter",
                            label: "按钮文本",
                            labelTips: "按钮显示的文本",
                            propsName: "text",
                        },
                        {
                            cmp: "SelectSetter",
                            label: "按钮类型",
                            labelTips: "展示按钮不同的状态，设置为text则展示为文本按钮",
                            propsName: "type",
                        },


                    ],
                },
                // {
                //     title: "数据绑定",
                //     items: [
                //         {
                //             cmp: "TextSetter",
                //             propsName: "aaa",
                //         },
                //         {
                //             cmp: "TextSetter",
                //             propsName: "aaa",
                //         },
                //         {
                //             cmp: "TextSetter",
                //             propsName: "aaa",
                //         },
                //     ],
                // },
                // {
                //     title: "数据源",
                //     items: [
                //         {
                //             cmp: "TextSetter",
                //             propsName: "aaa",
                //         },
                //         {
                //             cmp: "TextSetter",
                //             propsName: "aaa",
                //         },
                //     ],
                // },
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
