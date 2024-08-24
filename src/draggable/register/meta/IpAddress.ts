import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import IpAddressSvg from "@/assets/images/ip-address.svg?component";

export default defineComponentMeta({
    type: "IpAddress",
    name: "IP输入框",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/ip-address",
    icon: createVNode(IpAddressSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {},
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "StringSetter",
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "IPv4", label: "IPv4" },
                                    { value: "IPv6", label: "IPv6" },
                                ],
                            },
                            label: "按钮尺寸",
                            labelTips: "设置 ip 地址输入框的类型",
                            propsName: "type",
                            defPropsValue: "IPv4",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否只读",
                            propsName: "readonly",
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
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "medium", label: "中等" },
                                    { value: "small", label: "小" },
                                    { value: "mini", label: "迷你" },
                                ],
                            },
                            label: "按钮尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "分隔图标",
                            labelTips: "设置 ip 段之间的分隔符，默认图标为 IconDotIpv4",
                            propsName: "delimiter",
                            enableBind: false,
                            recalcAuxToolPosition: true,
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
                            title: "获取焦点",
                            description: "组件获得焦点时触发的回调函数",
                            name: "focus",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "失去焦点",
                            description: "组件失去焦点时触发的回调函数",
                            name: "blur",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "值变更",
                            description: "文本框内容改变后事件",
                            name: "change",
                            params: [
                                { name: "value", type: "string", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "输入事件",
                            description: "文本框内容输入时触发事件",
                            name: "input",
                            params: [
                                { name: "input", type: "InputEvent", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "选中文本内容",
                            description: "文本框内容选中时触发事件",
                            name: "select",
                            params: [
                                { name: "value", type: "string", note: "" },
                                { name: "index", type: "number", note: "" },
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
        // 默认插槽，自定义 ip 段之间的分隔符
        // default
    },
    i18n: {},
});
