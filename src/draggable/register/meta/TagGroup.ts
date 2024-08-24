import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { tagGroupData } from "@/draggable/register/JsonSchema";
import TagGroupSvg from "@/assets/images/tag-group.svg?component";

export default defineComponentMeta({
    type: "TagGroup",
    name: "标签组",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tag-group",
    icon: createVNode(TagGroupSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                { name: "标签1" },
                { name: "标签2", type: "success" },
                { name: "标签3", type: "danger" },
            ],
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
                                title: "控制标签文本色和背景色",
                                jsonSchema: tagGroupData,
                            },
                            label: "标签颜色",
                            labelTips: "控制标签文本色和背景色",
                            propsName: "data",
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
                                clearable: true,
                                options: [
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "dark", label: "暗色(dark)" },
                                    { value: "light", label: "亮色(light)" },
                                    { value: "plain", label: "扁平(plain)" },
                                ],
                            },
                            label: "主题",
                            propsName: "effect",
                            defPropsValue: "light",
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
                            title: "点击单个标签",
                            description: "单个标签的点击事件",
                            name: "itemClick",
                            params: [
                                { name: "event", type: "ITagGroupItemClick", note: "" },
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
