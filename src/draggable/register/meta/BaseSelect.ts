import { createVNode } from "vue";
import { BaseSelect } from "@opentiny/vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { createBaseWrapper } from "@/draggable/utils/ComponentWrapper";
import BaseSelectSvg from "@/assets/images/select.svg?component";

export default defineComponentMeta({
    type: "BaseSelect",
    name: "基础选择器",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/base-select",
    icon: createVNode(BaseSelectSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    designComponent: createBaseWrapper(
        "span",
        {
            style: {
                display: "inline-block",
            },
        },
        BaseSelect,
    ),
    defDesignNode: {
        props: {
            options: [
                { value: 'v_1', label: '选项1' },
                { value: 'v_2', label: '选项2' },
                { value: 'v_3', label: '选项3' },
            ],
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
                    items: [],
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
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "获取焦点",
                            description: "组件获得焦点时触发的回调函数",
                            name: "focus",
                            params: [
                                { name: "event", type: "FocusEvent", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "失去焦点",
                            description: "组件失去焦点时触发的回调函数",
                            name: "blur",
                            params: [
                                { name: "event", type: "FocusEvent", note: "" },
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
        // 选项默认插槽
        // default
        // 空数据插槽
        // empty
        // 下拉弹框底部插槽
        // footer
        // 下拉面板插槽
        // panel
        // 输入框前缀插槽
        // prefix
        // 触发源插槽
        // reference
    },
    i18n: {},
});
