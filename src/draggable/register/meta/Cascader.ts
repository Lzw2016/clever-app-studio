import lodash from "lodash";
import { createVNode } from "vue";
import { hasValue } from "@/utils/Typeof";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { cascaderOptions, cascaderProps } from "@/draggable/register/JsonSchema";
import CascaderSvg from "@/assets/images/cascader.svg?component";

// noinspection DuplicatedCode
function applyPropsValue(propName: string, props: any, value: any) {
    value = lodash.trim(value);
    if (value.length <= 0) {
        // undefined
        value = undefined;
    } else {
        const num = lodash.toNumber(value);
        // number
        if (!isNaN(num)) {
            value = num;
        } else {
            // string
        }
    }
    if (hasValue(value)) {
        props[propName] = value;
    } else {
        delete props[propName];
    }
}

export default defineComponentMeta({
    type: "Cascader",
    name: "级联选择",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/cascader",
    icon: createVNode(CascaderSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            options: [
                {
                    value: 'v_1',
                    label: '选项_1',
                    children: [
                        { value: 'v_1_1', label: '选项_1_1' },
                        { value: 'v_1_2', label: '选项_1_2' },
                        { value: 'v_1_3', label: '选项_1_3' },
                    ],
                },
                {
                    value: 'v_2',
                    label: '选项_2',
                    children: [
                        { value: 'v_2_1', label: '选项_2_1' },
                        { value: 'v_2_2', label: '选项_2_2' },
                        { value: 'v_2_3', label: '选项_2_3' },
                    ],
                },
                {
                    value: 'v_3',
                    label: '选项_3',
                    children: [
                        { value: 'v_3_1', label: '选项_3_1' },
                        { value: 'v_3_2', label: '选项_3_2' },
                        { value: 'v_3_3', label: '选项_3_3' },
                    ],
                },
            ],
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "StringSetter",
                applyPropsValue: (props, value) => applyPropsValue("modelValue", props, value),
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
                                title: "选项列表配置",
                                jsonSchema: cascaderOptions,
                            },
                            label: "列表配置",
                            labelTips: "选项列表配置，使用后不需要再配置 tiny-option",
                            propsName: "options",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "级联选择器选项配置",
                                jsonSchema: cascaderProps,
                            },
                            label: "配置选项",
                            labelTips: "配置选项，具体见 ICascaderPanelConfig 表",
                            propsName: "props",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "完整路径",
                            labelTips: "输入框中是否显示选中值的完整路径",
                            propsName: "showAllLevels",
                            defPropsValue: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "选项分隔",
                            propsName: "separator",
                            defPropsValue: "/",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "filter", label: "过滤器模式(filter)" },
                                ],
                            },
                            label: "组件模式",
                            labelTips: "设置输入的shape='filter',切换至过滤器模式",
                            propsName: "shape",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "字段标题",
                            labelTips: "shape='filter' 时生效，可传入 label 显示标题",
                            propsName: "label",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "透明背景",
                            labelTips: "shape='filter' 时生效，设置过滤器模式背景为透明",
                            propsName: "blank",
                        },
                        {
                            cmp: "StringSetter",
                            label: "提示信息",
                            labelTips: "shape='filter' 时生效，可传入 tip 显示提示信息",
                            propsName: "tip",
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
                        // TODO 函数属性
                        // before-filter (value: string) => boolean | Promise 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选
                        // filter-method (node: ICascaderPanelNode, keyword: string) => boolean 自定义搜索逻辑，第一个参数是节点 node，第二个参数是搜索关键词 keyword，通过返回布尔值表示是否命中
                    ],
                },
                {
                    title: "搜索",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "允许搜索",
                            propsName: "filterable",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 50,
                                unit: "毫秒",
                            },
                            label: "防抖延时",
                            labelTips: "搜索关键词输入的去抖延迟，单位毫秒",
                            propsName: "debounce",
                            defPropsValue: 300,
                            disableReRender: true,
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
                            labelTips: "输入框尺寸",
                            propsName: "size",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "多选折叠",
                            labelTips: "多选模式下是否折叠 Tag",
                            propsName: "collapseTags",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉样式",
                            labelTips: "为下拉弹框添加的 class 类名",
                            propsName: "popperClass",
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
                            description: "当选中节点变化时触发",
                            name: "change",
                            params: [
                                { name: "value", type: "ICascaderPanelNodePropValue", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "展开节点变化",
                            description: "当展开节点发生变化时触发",
                            name: "expandChange",
                            params: [
                                { name: "value", type: "ICascaderPanelNodeValue[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "标签移除事件",
                            description: "在多选模式下移除Tag时触发",
                            name: "removeTag",
                            params: [
                                { name: "removeValue:", type: "ICascaderPanelNodeValue[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "下拉弹框显示状态变化",
                            description: "监听下拉弹框的显示隐藏状态",
                            name: "visibleChange",
                            params: [
                                { name: "visible", type: "boolean", note: "" },
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
        // 自定义备选项的节点内容，参数为 { node: ICascaderPanelNode, data: ICascaderPanelData }，分别为当前节点的 Node 对象和数据
        // default
        // 无匹配选项时的内容
        // empty
        // 通过 <code>no-data</code> 插槽设置没有数据时显示的内容
        // no-data
    },
    i18n: {},
});
