import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { searchTypes, searchTypeValue } from "@/draggable/register/JsonSchema";
import SearchSvg from "@/assets/images/search.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Search",
    name: "搜索",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/search",
    icon: createVNode(SearchSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            placeholder: "请输入关键词",
            searchTypes: [
                { text: '找伙伴', value: 1 },
                { text: '找订单', value: 2 },
                { text: '找文档', value: 3 },
            ],
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
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "搜索选项列表配置",
                                jsonSchema: searchTypes,
                            },
                            label: "搜索选项",
                            labelTips: "搜索类型的选项列表",
                            propsName: "searchTypes",
                            defPropsValue: [],
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "搜索选项列表配置",
                                jsonSchema: searchTypeValue,
                            },
                            label: "默认选项",
                            labelTips: "搜索类型的默认值。默认为搜索类型的第一项",
                            propsName: "typeValue",
                            defPropsValue: {},
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "回车搜索",
                            labelTips: "是否在按下键盘 Enter 键时触发 search 事件",
                            propsName: "isEnterSearch",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "最大输入",
                            labelTips: "input 框的原生属性，限制最大输入字符数",
                            propsName: "maxlength",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "mini模式",
                            labelTips: "是否为迷你模式，配置为 true 时，默认显示为一个带图标的圆形按钮，点击后展开",
                            propsName: "mini",
                            updateVNodeKey: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "透明模式",
                            labelTips: "是否为透明模式，此模式一般用在带有背景的场景",
                            propsName: "transparent",
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
                            title: "值变更",
                            description: "输入完成时触发的回调函数； value 为搜索类型，input 为当前输入值",
                            name: "change",
                            params: [
                                { name: "value", type: "ITypeValue", note: "" },
                                { name: "input", type: "string", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "清除值",
                            description: "清空值触发的回调函数",
                            name: "clear",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "输入事件",
                            description: "输入实时触发的回调函数； input 为当前输入值，value 为搜索类型",
                            name: "input",
                            params: [
                                { name: "input", type: "string", note: "" },
                                { name: "value", type: "ITypeValue", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "搜索事件",
                            description: "展开模式下，点击搜索按钮时触发的回调函数； value 为搜索类型，input 为当前输入值",
                            name: "search",
                            params: [
                                { name: "value", type: "ITypeValue", note: "" },
                                { name: "input", type: "string", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "切换类型",
                            description: "切换类型时触发的回调函数； value 为搜索类型",
                            name: "select",
                            params: [
                                { name: "value", type: "ITypeValue", note: "" },
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
        // 搜索的弹出列表插槽
        // poplist
        // 左侧插槽
        // prefix
        // 默认搜索类型插槽
        // text
    },
    i18n: {},
});
