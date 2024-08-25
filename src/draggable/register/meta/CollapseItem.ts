import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CollapseSvg from "@/assets/images/collapse.svg?component";

export default defineComponentMeta({
    type: "CollapseItem",
    name: "折叠面板项",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/collapse",
    icon: createVNode(CollapseSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            name: "collapse_item",
            title: "折叠面板项",
        },
    },
    designDirectives: {
        // "disable-event": {},
    },
    setter: {
        props: {
            formItemProps: {},
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "唯一标志",
                            propsName: "name",
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "图标",
                            labelTips: "自定义icon 图标",
                            propsName: "expandIcon",
                            enableBind: false,
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "面板标题",
                            propsName: "title",
                        },
                        {
                            cmp: "StringSetter",
                            label: "右侧文本",
                            propsName: "titleRight",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
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
    placeholder: {
        default: true,
        // 展开折叠 icon 图标
        // icon
        // 标题
        // title
        // 自定义面板标题右侧内容
        // title-right
    },
    i18n: {},
});
