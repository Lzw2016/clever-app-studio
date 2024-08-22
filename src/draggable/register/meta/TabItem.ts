import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabItemSvg from "@/assets/images/tab-item.svg?component";

export default defineComponentMeta({
    type: "TabItem",
    name: "页签项",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tabs",
    icon: createVNode(TabItemSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    disableDragDrop: true,
    defDesignNode: {
        props: {
            style: {},
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
                            label: "页签标题",
                            propsName: "title",
                        },
                        {
                            cmp: "StringSetter",
                            label: "页签项值",
                            propsName: "name",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "关闭按钮",
                            labelTips: "页签项是否展示删除按钮，与 Tabs 的 with-close 取或，只要有一个为true，则此项展示删除按钮",
                            propsName: "withClose",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "禁用页签",
                            labelTips: "设置页签项禁用，设置为 true 则无法点击",
                            propsName: "disabled",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "懒加载",
                            labelTips: "设置本页签项内容是否为懒加载，默认为否",
                            propsName: "lazy",
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
                            title: "页签标题变化",
                            description: "当页签项的 title 值发生变化时触发",
                            name: "tabNavUpdate",
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
        default: {
            type: "div",
            props: {
                style: {
                    height: "300px",
                    width: "100%",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "将组件拖拽到这里",
        },
    },
    i18n: {},
});
