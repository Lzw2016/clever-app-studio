import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import AutoCompleteSvg from "@/assets/images/auto-complete.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "AutoComplete",
    name: "自动完成",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/autocomplete",
    icon: createVNode(AutoCompleteSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            placeholder: "请输入内容",
            fetchSuggestions: function (queryString: string, callback: (suggestions: Array<Record<string, any>>) => void) {
                const datas = [
                    { value: '选项1', data: 'v_1' },
                    { value: '选项2', data: 'v_2' },
                    { value: '选项3', data: 'v_3' },
                    { value: '选项4', data: 'v_4' },
                    { value: '选项5', data: 'v_5' },
                    { value: '选项6', data: 'v_6' },
                ];
                const suggestions = datas.filter(item => !queryString || item.value.includes(queryString));
                callback(suggestions);
            },
        },
    },
    designDirectives: {
        "disable-event": {},
        "clear-draggable-html-attr": {},
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
                            cmp: "StringSetter",
                            label: "占位文本",
                            propsName: "placeholder",
                        },
                        {
                            cmp: "StringSetter",
                            label: "匹配键名",
                            labelTips: "在输入建议对象中，用于显示和匹配输入的键名",
                            propsName: "valueKey",
                            defPropsValue: "value",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 50,
                                unit: "毫秒",
                            },
                            label: "防抖延时",
                            labelTips: "获取输入建议的去抖延时",
                            propsName: "debounce",
                            defPropsValue: 300,
                            disableReRender: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "top", label: "top" },
                                    { value: "top-start", label: "top-start" },
                                    { value: "top-end", label: "top-end" },
                                    { value: "bottom", label: "bottom" },
                                    { value: "bottom-start", label: "bottom-start" },
                                    { value: "bottom-end", label: "bottom-end" },
                                ],
                            },
                            label: "提示位置",
                            labelTips: "弹出层出现的位置",
                            propsName: "placement",
                            defPropsValue: "bottom-start",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动提示",
                            labelTips: "是否在输入框 focus 时显示建议列表",
                            propsName: "triggerOnFocus",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "回车选择",
                            labelTips: "在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件",
                            propsName: "selectWhenUnmatched",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "隐藏加载",
                            labelTips: "是否隐藏远程加载时的加载图标",
                            propsName: "hideLoading",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "突出首项",
                            labelTips: "是否默认突出显示远程搜索建议中的第一项",
                            propsName: "highlightFirstItem",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示模式",
                            propsName: "displayOnly",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "追加body",
                            labelTips: "弹出显示内容是否追加到html的body的末尾位置",
                            propsName: "popperAppendToBody",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数参数
                        // fetch-suggestions    (queryString: string, callback: (suggestions: IAutocompleteSuggestionItem[]) => void) => void
                        // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback 来返回它
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
                            labelTips: "输入框尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
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
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "为下拉弹框添加的 class 类名",
                            propsName: "popperClass",
                            recalcAuxToolPosition: true,
                        },
                    ],
                },
                {
                    title: "html原生属性",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "label属性",
                            labelTips: "等价于原生 input aria-label 属性",
                            propsName: "label",
                        },
                        {
                            cmp: "StringSetter",
                            label: "name属性",
                            labelTips: "原生 input name 属性",
                            propsName: "name",
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
                            title: "选择数据",
                            description: "点击选中建议项时触发，回调参数为 fetch-suggestions 中传入的项",
                            name: "change",
                            params: [
                                { name: "selection", type: "IAutocompleteSuggestionItem", note: "" },
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
        // 输入框后置内容
        // append
        // 下拉列表项插槽，插槽参数: arg: { slotScope: IAutocompleteSuggestionItem }, 其中 slotScope 是 fetch-suggestions 中传入的项
        // default
        // 输入框头部内容
        // prefix
        // 输入框前置内容
        // prepend
        // 输入框尾部内容
        // suffix
    },
    i18n: {},
});
