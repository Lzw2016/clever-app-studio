import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { dropdownMenuOptions } from "@/draggable/register/JsonSchema";
import DropdownSvg from "@/assets/images/dropdown.svg?component";

export default defineComponentMeta({
    type: "Dropdown",
    name: "下拉菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DropdownSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            title: "下拉菜单",
            trigger: "hover",
            menuOptions: {
                options: [
                    { label: "功能1" },
                    { label: "功能2" },
                    { label: "功能3", divided: true },
                ],
            },
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
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置下拉菜单",
                                jsonSchema: dropdownMenuOptions,
                            },
                            label: "配置菜单",
                            propsName: "menuOptions",
                        },
                        {
                            cmp: "StringSetter",
                            label: "显示文本",
                            propsName: "title",
                            defPropsValue: "下拉菜单",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示图标",
                            labelTips: "是否显示下拉触发源图标",
                            propsName: "showIcon",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动收起",
                            labelTips: "点击菜单项后是否收起菜单",
                            propsName: "hideOnClick",
                            defPropsValue: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "hover", label: "鼠标悬停" },
                                    { value: "click", label: "鼠标点击" },
                                ],
                            },
                            label: "触发方式",
                            watchValue: true,
                            propsName: "trigger",
                            defPropsValue: "hover",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "毫秒",
                            },
                            label: "展开延时",
                            labelTips: "延时多久展开下拉菜单，单位毫秒。注意：仅在 trigger 为 hover 时有效",
                            propsName: "showTimeout",
                            defPropsValue: 250,
                            isHideSetter: node => node.props.trigger !== 'hover',
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "毫秒",
                            },
                            label: "收起延时",
                            labelTips: "延时多久收起下拉菜单，单位毫秒。注意：仅在 trigger 为 hover 时有效",
                            propsName: "hideTimeout",
                            defPropsValue: 150,
                            isHideSetter: node => node.props.trigger !== 'hover',
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "按钮模式",
                            labelTips: "下拉触发元素呈现为按钮",
                            watchValue: true,
                            propsName: "splitButton",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "菜单尺寸",
                            labelTips: "菜单尺寸。注意：只在 split-button为 true 的情况下生效",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                            isHideSetter: node => node.props.splitButton !== true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "primary", label: "主要菜单" },
                                    { value: "success", label: "成功菜单" },
                                    { value: "warning", label: "警告菜单" },
                                    { value: "danger", label: "危险菜单" },
                                    { value: "info", label: "信息菜单" },
                                    { value: "text", label: "默认菜单" },
                                ],
                            },
                            label: "按钮类型",
                            labelTips: "按钮类型。注意：只在 split-button 为 true 的情况下有效",
                            propsName: "type",
                            isHideSetter: node => node.props.splitButton !== true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示箭头",
                            labelTips: "下拉弹框是否显示箭头，默认不显示",
                            propsName: "visibleArrow",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "继承宽度",
                            labelTips: "下拉弹框的最小宽度是否继承触发源的宽度，默认不继承",
                            propsName: "inheritWidth",
                        },
                        // {
                        //     cmp: "",
                        //     label: "下拉图标",
                        //     propsName: "suffixIcon",
                        // },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "tabindex",
                            labelTips: "初始化触发元素的原生属性 tabindex",
                            propsName: "tabindex",
                            defPropsValue: 0,
                        },
                    ],
                }
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
                            title: "点击按钮事件",
                            name: "buttonClick",
                            description: "监听左侧按钮点击事件，仅 split-button 为 true 时生效",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/dropdown",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "点击菜单项事件",
                            name: "itemClick",
                            description: "监听点击菜单项事件",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/dropdown",
                            params: [
                                {
                                    name: "data",
                                    type: "IItemClickParam",
                                    note: "包含 itemData、vm 属性",
                                },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "显示或隐藏状态变化",
                            name: "visibleChange",
                            description: "监听下拉框的显示或隐藏状态",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/dropdown",
                            params: [
                                {
                                    name: "status",
                                    type: "boolean",
                                    note: "包含 itemData、vm 属性",
                                },
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
