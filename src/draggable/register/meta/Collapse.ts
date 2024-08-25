import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CollapseSvg from "@/assets/images/collapse.svg?component";

export default defineComponentMeta({
    type: "Collapse",
    name: "折叠面板",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/collapse",
    icon: createVNode(CollapseSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
        items: [
            {
                type: "CollapseItem",
                props: {
                    name: "item_1",
                    title: "折叠面板项_1",
                },
            },
            {
                type: "CollapseItem",
                props: {
                    name: "item_2",
                    title: "折叠面板项_2",
                },
            },
            {
                type: "CollapseItem",
                props: {
                    name: "item_3",
                    title: "折叠面板项_3",
                },
            },
        ],
    },
    designDirectives: {
        // "disable-event": {},
    },
    setter: {
        props: {
            formItemProps: {
                labelWidth: "70px",
            },
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        // TODO 函数参数
                        // before-close (item: Component, activeNames: string | number | Array) => boolean 阻止折叠面板切换
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "手风琴模式",
                            propsName: "accordion",
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
                            title: "激活面板改变",
                            description: "当前激活面板改变时触发",
                            name: "change",
                            params: [
                                { name: "activeNames", type: "string | number | Array", note: "" },
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
        default: true,
    },
    i18n: {},
});
