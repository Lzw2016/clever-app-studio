import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabsSvg from "@/assets/images/tabs.svg?component";

export default defineComponentMeta({
    type: "Tabs",
    name: "多页签",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TabsSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            activeName: "tab_1",
            style: {
                border: "1px solid #ccc",
            },
        },
        items: [
            {
                type: "TabItem",
                props: {
                    name: "tab_1",
                    title: "叶签1",
                },
            },
            {
                type: "TabItem",
                props: {
                    name: "tab_2",
                    title: "叶签2",
                },
            },
            {
                type: "TabItem",
                props: {
                    name: "tab_3",
                    title: "叶签3",
                },
            },
        ],
    },
    setter: {
        props: {
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "默认选中",
                            labelTips: "设置初始选中的页签项",
                            propsName: "activeName",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "top", label: "上(top)" },
                                    { value: "right", label: "右(right)" },
                                    { value: "bottom", label: "下(bottom)" },
                                    { value: "left", label: "左(left)" },
                                ],
                            },
                            label: "页签位置",
                            propsName: "position",
                            defPropsValue: "top",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "card", label: "卡片(card)" },
                                    { value: "border-card", label: "边框卡片(border-card)" },
                                    { value: "button-card", label: "按钮卡片(button-card)" },
                                ],
                            },
                            label: "页签类型",
                            propsName: "tabStyle",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "新增按钮",
                            labelTips: "是否显示添加按钮，用来添加页签项",
                            propsName: "withAdd",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "关闭按钮",
                            labelTips: "是否显示页签项的关闭按钮，用来删除页签项",
                            propsName: "withClose",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许编辑",
                            labelTips: "是否同时显示添加和删除按钮，与 edit 事件搭配使用",
                            propsName: "editable",
                        },
                        // TODO 自定义快捷操作
                    ],
                },
                {
                    title: "叶签配置",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "small", label: "小(small)" },
                                    { value: "large", label: "大(large)" },
                                ],
                            },
                            label: "页签尺寸",
                            labelTips: "设置 tabs 页签尺寸,该属性可选值为 large 或 small，其中 small 在 tabStyle 为 card 或者 border-card 时生效",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "启用分隔",
                            propsName: "separator",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动撑开",
                            labelTips: "页签项的宽度是否自动撑开",
                            propsName: "stretch",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "溢出隐藏",
                            labelTips: "页签是否在超过 title-width 省略显示，优先级低于 tooltip-config",
                            propsName: "overflowTitle",
                        },
                        {
                            cmp: "StringSetter",
                            label: "最大宽度",
                            labelTips: "当 overflow-title 为 true 时，指定页签标题的最大宽度",
                            propsName: "titleWidth",
                            defPropsValue: "256px",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "配置按钮组",
                                // jsonSchema: buttonGroupData,
                            },
                            label: "溢出配置",
                            labelTips: "设置文字超出提示, object 类型的值参考 tooltip 组件的 Props 配置，如果想使用默认的 title 属性，可设置为 string 类型，值为 title",
                            propsName: "tooltipConfig",
                            defPropsValue: "title",
                        },
                    ],
                },
                {
                    title: "更多按钮",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "启用",
                            labelTips: "设置当页签栏超过一定宽度时是否显示'更多'按钮，若为 true，则当鼠标悬停到按钮上时，将出现下拉框展示超出宽度的页签项",
                            propsName: "showMoreTabs",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "全显页签",
                            labelTips: "'更多'按钮触发的下拉面板是否展示全部页签项，适用于超大数据量的情况",
                            propsName: "moreShowAll",
                        },
                        {
                            cmp: "StringSetter",
                            label: "最大高度",
                            labelTips: "'更多'按钮触发的下拉面板最大高度，超出则显示滚动条，适用于超大数据量的情况",
                            propsName: "panelMaxHeight",
                        },
                        {
                            cmp: "StringSetter",
                            label: "面板宽度",
                            labelTips: "'更多'按钮触发的下拉面板的宽度",
                            propsName: "panelWidth",
                        },
                        {
                            cmp: "StringSetter",
                            label: "指定class",
                            labelTips: "为'更多'下拉页签框添加类名，可用于自定义下拉选项的样式",
                            propsName: "popperClass",
                        },
                    ],
                },
            ],
            // before-close     关闭页签前的回调函数，入参为页签名。如果函数返回false 或 拒绝的Promise，则不关闭页签
            // before-leave     切换页签项之前的钩子，若返回 false 或返回 Promise 且被 reject，则阻止切换； activeName: 即将切换的页签项名称, oldActiveName: 当前页签项名称
            // drop-config      启用页签拖拽功能，配置第三方排序插件，对页签项进行重新排序；需注意：不是通过 v-for 渲染的 tab-item，在拖拽排序后，无法在 tab-drag-end 事件中对其顺序进行保存
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "点击添加按钮",
                            description: "点击'添加'按钮后触发，用于编写增加页签项的逻辑",
                            name: "add",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "点击页签项",
                            description: "点击页签项时触发，tab 被选中时触发； TabItem: 点中页签项的vueComponent对象信息",
                            name: "click",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "tabItem", type: "Component", note: "" },
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击页签项关闭按钮",
                            description: "点击页签项关闭按钮后触发，用于编写删除页签项的逻辑； name: 要删除的页签项name值",
                            name: "close",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "name", type: "string", note: "要删除的页签项name值" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "点击添加或关闭按钮",
                            description: "点击'添加'或'关闭'按钮触发； name：null或删除的tab名称, type：添加或删除字段",
                            name: "edit",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "name", type: "string", note: "页签项name值" },
                                { name: "type", type: "'add' | 'remove'", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "拖动开始",
                            description: "拖动开始时的事件",
                            name: "tabDragStart",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "event", type: "DragEvent", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "拖动中",
                            description: "拖动中的事件",
                            name: "tabDragOver",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "event", type: "DragEvent", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "拖动结束",
                            description: "拖动结束后的事件",
                            name: "tabDragEnd",
                            docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
                            params: [
                                { name: "event", type: "DragEvent", note: "" },
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
    placeholder: {
        default: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    minHeight: "180px",
                    minWidth: "104px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "拖拽“页签项”组件到这里",
        },
    },
    i18n: {},
});
