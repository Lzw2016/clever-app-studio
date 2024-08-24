import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { tagColor } from "@/draggable/register/JsonSchema";
import TagSvg from "@/assets/images/tag.svg?component";

export default defineComponentMeta({
    type: "Tag",
    name: "标签",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/tag",
    icon: createVNode(TagSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            value: "标签",
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
                            cmp: "StringSetter",
                            label: "标签内容",
                            propsName: "value",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "可关闭",
                            propsName: "closable",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数属性
                        // before-delete (close: () => void) => void 删除前回调函数
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
                                clearable: true,
                                options: [
                                    { value: "success", label: "成功" },
                                    { value: "info", label: "信息" },
                                    { value: "warning", label: "警告" },
                                    { value: "danger", label: "危险" },
                                ],
                            },
                            label: "标签类型",
                            propsName: "type",
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
                        {
                            cmp: "BoolSetter",
                            label: "是否边框",
                            propsName: "hit",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "控制标签文本色和背景色",
                                jsonSchema: tagColor,
                            },
                            label: "标签颜色",
                            labelTips: "控制标签文本色和背景色",
                            propsName: "color",
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
                            title: "点击标签",
                            description: "点击标签时触发的事件",
                            name: "click",
                            params: [
                                { name: "event", type: "Event", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "关闭标签",
                            description: "点击关闭按钮时触发的事件",
                            name: "close",
                            params: [
                                { name: "event", type: "Event", note: "" },
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
        // 标签内容
        // default
    },
    i18n: {},
});
