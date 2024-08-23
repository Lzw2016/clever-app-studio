import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { inputAutosize } from "@/draggable/register/JsonSchema";
import InputSvg from "@/assets/images/input.svg?component";

export default defineComponentMeta({
    type: "Input",
    name: "文本输入",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/input",
    icon: createVNode(InputSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            placeholder: "请输入",
            type: "text",
        },
    },
    designDirectives: {
        "disable-event": {},
        "clear-draggable-html-attr": {},
    },
    setter: {
        props: {
            formProps: {
                labelWidth: "75px",
            },
            enableVModel: true,
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "text", label: "text(文本)" },
                                    { value: "textarea", label: "textarea(大文本)" },
                                    { value: "password", label: "password(密码)" },
                                    { value: "number", label: "number(数字)" },
                                    { value: "datetime-local", label: "datetime-local(时间)" },
                                    { value: "date", label: "date(日期)" },
                                    { value: "time", label: "time(时间)" },
                                    { value: "button", label: "button(按钮)" },
                                    { value: "checkbox", label: "checkbox(多选)" },
                                    { value: "radio", label: "radio(单选)" },
                                    { value: "range", label: "range(范围)" },
                                    { value: "color", label: "color(颜色)" },
                                    { value: "image", label: "image(图片)" },
                                    { value: "file", label: "file(文件)" },
                                    { value: "email", label: "email" },
                                    { value: "month", label: "month" },
                                    { value: "week", label: "week" },
                                    { value: "tel", label: "tel" },
                                    { value: "url", label: "url" },
                                    { value: "search", label: "search" },
                                    { value: "submit", label: "submit(提交表单)" },
                                    { value: "reset", label: "reset(重置表单)" },
                                    { value: "hidden", label: "hidden(隐藏字段)" },
                                ],
                            },
                            label: "输入框类型",
                            labelTips: "设置 input 框的 type 属性，默认为 'text',可选值 'text'，'textarea' 和其他 原生 input 的 type 值",
                            propsName: "type",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "占位文本",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否只读",
                            propsName: "readonly",
                        },
                        {
                            cmp: "StringSetter",
                            label: "只读内容",
                            labelTips: "设置只读态时的文本内容区，如果没有则会使用 modelVale 的值作为只读文本",
                            propsName: "displayOnlyContent",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示模式",
                            propsName: "displayOnly",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 10,
                            },
                            label: "最大长度",
                            labelTips: "原生属性，最大输入长度",
                            propsName: "maxlength",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示密码",
                            labelTips: "是否显示切换密码图标",
                            propsName: "showPassword",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "输入校验",
                            labelTips: "输入时是否触发表单的校验",
                            propsName: "validateEvent",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动聚焦",
                            labelTips: "原生属性，页面加载时，自动获取焦点",
                            propsName: "autofocus",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "使用掩码",
                            labelTips: "启用掩码功能，只在 disabled 和 display-only 状态下生效",
                            propsName: "mask",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "存储空间",
                            labelTips: "设置 addMemory 方法中，最大能保存条目的数量",
                            propsName: "memorySpace",
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
                            label: "组件大小",
                            labelTips: "输入框尺寸，只在 type!='textarea' 时有效",
                            propsName: "size",
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "头部图标",
                            labelTips: "输入框头部图标",
                            propsName: "prefixIcon",
                            enableBind: false,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "尾部图标",
                            labelTips: "输入框尾部图标",
                            propsName: "suffixIcon",
                            enableBind: false,
                        },
                    ],
                },
                {
                    title: "文本模式属性",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "显示字数",
                            labelTips: "是否显示字数统计，只在 type='text' 或 type='textarea' 时有效",
                            propsName: "counter",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "字数限制",
                            labelTips: "是否显示输入字数统计，只在 type='text' 或 type='textarea' 时有效",
                            propsName: "showWordLimit",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "输入行数",
                            labelTips: "输入框行数，只对 type='textarea' 有效",
                            propsName: "rows",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自适应内容高度",
                                jsonSchema: inputAutosize,
                            },
                            label: "自动高度",
                            labelTips: "自适应内容高度，只对 type='textarea' 有效。可传入对象，如，{ minRows: 2, maxRows: 6 }",
                            propsName: "autosize",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "none", label: "不启用" },
                                    { value: "horizontal", label: "水平缩放" },
                                    { value: "vertical", label: "垂直缩放" },
                                    { value: "both", label: "水平/垂直缩放" },
                                ],
                            },
                            label: "启用缩放",
                            labelTips: "控制是否能被用户缩放",
                            propsName: "resize",
                        },
                        {
                            cmp: "StringSetter",
                            label: "cols宽度",
                            labelTips: "原生属性，设置宽度，在 type='textarea' 时有效",
                            propsName: "cols",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动展开",
                            labelTips: "设置文本域鼠标悬浮展开/收起，只对 type='textarea' 有效，最好搭配 autosize 一起使用",
                            propsName: "hoverExpand",
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "off", label: "不自动完成输入" },
                                    { value: "on", label: "自动完成输入" },
                                    { value: "name", label: "name" },
                                    { value: "email", label: "email" },
                                    { value: "username", label: "username" },
                                    { value: "new-password", label: "new-password" },
                                    { value: "current-password", label: "current-password" },
                                    { value: "one-time-code", label: "one-time-code" },
                                    { value: "organization-title", label: "organization-title" },
                                    { value: "organization", label: "organization" },
                                    { value: "street-address", label: "street-address" },
                                    { value: "country", label: "country" },
                                    { value: "country-name", label: "country-name" },
                                    { value: "postal-code", label: "postal-code" },
                                    { value: "language", label: "language" },
                                    { value: "sex", label: "sex" },
                                    { value: "tel", label: "tel" },
                                    { value: "url", label: "url" },
                                    { value: "photo", label: "photo" },
                                ],
                            },
                            label: "自动完成",
                            labelTips: "html 原生的 autocomplete 属性",
                            propsName: "autocomplete",
                        },
                        {
                            cmp: "StringSetter",
                            label: "label属性",
                            labelTips: "等价于原生 input aria-label 属性",
                            propsName: "label",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 10,
                            },
                            label: "最小值",
                            labelTips: "原生属性，设置最小值",
                            propsName: "min",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 10,
                            },
                            label: "最大值",
                            labelTips: "原生属性，设置最大值",
                            propsName: "max",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "step属性",
                            labelTips: "原生属性，设置输入字段的合法数字间隔",
                            propsName: "step",
                        },
                        {
                            cmp: "StringSetter",
                            label: "name属性",
                            labelTips: "原生 input name 属性",
                            propsName: "name",
                        },
                        {
                            cmp: "StringSetter",
                            label: "form属性",
                            labelTips: "html原生的form属性",
                            propsName: "form",
                        },
                        {
                            cmp: "StringSetter",
                            label: "tabindex",
                            labelTips: "原生属性，输入框的 tabindex",
                            propsName: "tabindex",
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
                            description: "在 Input 获得焦点时触发",
                            name: "focus",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "失去焦点",
                            description: "在 Input 失去焦点时触发",
                            name: "blur",
                            params: [
                                { name: "event", type: "FocusEvent", note: "事件对象" },
                            ],
                            return: "void",
                            examples: [
                                {
                                    title: "",
                                    description: "",
                                    code: [
                                        "function(event) {",
                                        "  Modal.message({",
                                        "    message: '触发 blur 事件',",
                                        "    status: 'info'",
                                        "  })",
                                        "}",
                                    ],
                                },
                            ],
                        },
                        {
                            title: "输入事件",
                            description: "输入值时触发事件",
                            name: "input",
                            params: [
                                { name: "event", type: "InputEvent", note: "事件对象" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "值变更",
                            description: "在 Input 值改变时触发",
                            name: "change",
                            params: [
                                { name: "newVal", type: "number | string | undefined", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "清除值",
                            description: "在点击由 clearable 属性生成的清空按钮时触发",
                            name: "clear",
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
        // append: true,
        // prefix: true,
        // prepend: true,
        // suffix: true,
    },
    i18n: {},
});
