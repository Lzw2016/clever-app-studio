import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { bulletinBoardData } from "@/draggable/register/JsonSchema";
import BulletinBoardSvg from "@/assets/images/bulletin-board.svg?component";

export default defineComponentMeta({
    type: "BulletinBoard",
    name: "公告牌",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/bulletin-board",
    icon: createVNode(BulletinBoardSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            title: "公告牌",
            tabTitle: ["叶签1", "叶签2", "叶签3"],
            data: [
                [
                    {
                        text: 'VUE 1.3 版本',
                        date: '2019-07-31',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                    {
                        text: 'VUE 1.2 版本',
                        date: '2019-06-11',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                    {
                        text: 'VUE 1.1 版本',
                        date: '2019-05-11',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                ],
                [
                    {
                        text: 'SRM 采购云',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                    {
                        text: 'iSales',
                        url: 'https://cn.vuejs.org/',
                        date: '2018-09-11',
                        route: 'Alert',
                    },
                    {
                        text: '数易平台',
                        url: 'https://cn.vuejs.org/',
                        date: '2018-09-11',
                    },
                    {
                        text: 'MES+ 制造平台',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                    {
                        text: 'ISDP',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                        route: 'Alert',
                    },
                    {
                        text: '财经智慧助手',
                        url: 'https://cn.vuejs.org/',
                        date: '2018-09-11',
                    },
                ],
                [
                    {
                        text: '秒级系统体验，按需打包；一致 UX 体验规范',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                        target: '_blank',
                    },
                    {
                        text: '内置公共 API 并支持扩展；组件、主题均可扩展',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                    },
                    {
                        text: '丰富教程案例、FAQ、开源组件快速引入',
                        date: '2018-09-11',
                        url: 'https://cn.vuejs.org/',
                    },
                    {
                        text: '内置 80+ web 组件拿来即用；内置 mock, UI 组件库与后端服务自由组合',
                        url: 'https://cn.vuejs.org/',
                        date: '2018-09-11',
                    },
                ],
            ],
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
                            label: "默认显示",
                            labelTips: "默认显示第1栏，可选'1' '2' '3'等",
                            propsName: "activeName",
                            defPropsValue: "1",
                        },
                        {
                            cmp: "StringSetter",
                            label: "标题",
                            labelTips: "公告牌的标题",
                            propsName: "title",
                            defPropsValue: "1",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "节点数据配置",
                                jsonSchema: bulletinBoardData,
                            },
                            label: "节点数据",
                            propsName: "data",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "tab栏数据配置",
                            },
                            label: "tab数据",
                            propsName: "tabTitle",
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "图标",
                            propsName: "icon",
                            enableBind: false,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "更多按钮跳转地址",
                            },
                            label: "跳转地址",
                            propsName: "moreLink",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "更多按钮",
                            labelTips: "是否显示更多按钮，默认显示,需要与 more-link 同时使用",
                            propsName: "showMore",
                            defPropsValue: true,
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [],
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
