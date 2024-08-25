import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { actionMenuOptions } from "@/draggable/register/JsonSchema";
import ActionMenuSvg from "@/assets/images/action-menu.svg?component";

export default defineComponentMeta({
    type: "ActionMenu",
    name: "动作菜单",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/action-menu",
    icon: createVNode(ActionMenuSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            options: [
                { label: "功能1" },
                { label: "功能2" },
                { label: "功能3" },
                {
                    label: "功能4",
                    children: [
                        { label: "功能4-1" },
                        { label: "功能4-2" },
                        { label: "功能4-3" }
                    ],
                },
                { label: "功能5" },
            ],
        },
    },
    designDirectives: {
        "disable-event": {
            value: {
                disableEvents: ["onItemClick"],
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
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置动作菜单",
                                jsonSchema: actionMenuOptions,
                            },
                            label: "配置菜单",
                            propsName: "options",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "文本字段",
                            labelTips: "菜单按钮文本的键值",
                            propsName: "textField",
                            defPropsValue: "label",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "最大数量",
                            labelTips: "最多显示菜单按钮的个数，其他菜单在下拉弹框显示",
                            propsName: "maxShowNum",
                            defPropsValue: 2,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉文本",
                            propsName: "moreText",
                            defPropsValue: "更多",
                            recalcAuxToolPosition: true,
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
                                    { value: "default", label: "默认(default)" },
                                    { value: "card", label: "卡片(card)" },
                                ],
                            },
                            label: "按钮模式",
                            propsName: "mode",
                            defPropsValue: "default",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                precision: 0,
                                min: 0,
                            },
                            label: "按钮间距",
                            labelTips: "菜单按钮之间的间距",
                            propsName: "spacing",
                            defPropsValue: 5,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "下拉图标",
                            labelTips: "是否显示下拉触发源图标",
                            propsName: "showIcon",
                            defPropsValue: true,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "下拉图标",
                            labelTips: "下拉触发源图标",
                            propsName: "suffixIcon",
                            enableBind: false,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "下拉弹框的类名，用于自定义样式",
                            propsName: "popperClass",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "点击菜单项",
                            name: "itemClick",
                            description: "监听菜单项的点击事件",
                            params: [
                                {
                                    name: "data",
                                    type: "IItemClickParams",
                                    note: "包含 itemData、vm 属性",
                                },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击下拉按钮",
                            name: "moreClick",
                            description: "监听下拉按钮的点击事件",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "下拉菜单显示状态变化",
                            name: "visibleChange",
                            description: "监听下拉弹框的显示或隐藏状态变化",
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
