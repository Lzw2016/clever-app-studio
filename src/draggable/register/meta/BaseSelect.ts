import { createVNode } from "vue";
import { BaseSelect } from "@opentiny/vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { createBaseWrapper } from "@/draggable/utils/ComponentWrapper";
import { selectCacheOp, selectOptions } from "@/draggable/register/JsonSchema";
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
            enableVModel: true,
            modelValueSetter: {},
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "占位文本",
                            propsName: "placeholder",
                            defPropsValue: "请选择",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "清除按钮",
                            propsName: "clearable",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "选项列表配置",
                                jsonSchema: selectOptions,
                            },
                            label: "列表配置",
                            labelTips: "选项列表配置，使用后不需要再配置 tiny-option",
                            propsName: "options",
                        },
                        {
                            cmp: "StringSetter",
                            label: "显示字段",
                            propsName: "textField",
                            defPropsValue: "label",
                        },
                        {
                            cmp: "StringSetter",
                            label: "值字段",
                            propsName: "valueField",
                            defPropsValue: "value",
                        },
                        {
                            cmp: "StringSetter",
                            label: "选项key",
                            propsName: "valueKey",
                            labelTips: "作为 value 唯一标识的键名，绑定值为对象类型时必填",
                            defPropsValue: "value",
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
                                    { value: "left", label: "left" },
                                    { value: "left-start", label: "left-start" },
                                    { value: "left-end", label: "left-end" },
                                    { value: "right", label: "right" },
                                    { value: "right-start", label: "right-start" },
                                    { value: "right-end", label: "right-end" },
                                ],
                            },
                            label: "下拉位置",
                            labelTips: "下拉弹框相对于触发源的弹出位置",
                            propsName: "placement",
                            defPropsValue: "bottom-start",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动清空",
                            labelTips: "是否自动清空无法在 options 中找到匹配项的值",
                            propsName: "clearNoMatchValue",
                        },
                        {
                            cmp: "StringSetter",
                            label: "空提示",
                            labelTips: "选项列表为空时显示的文本，也可以使用 empty 插槽设置",
                            propsName: "noDataText",
                            defPropsValue: "暂无相关数据",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "空图片",
                            labelTips: "是否显示空数据图片",
                            propsName: "showEmptyImage",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许复制",
                            labelTips: "输入框中的标签是否可通过鼠标选中复制",
                            propsName: "tagSelectable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许新增",
                            labelTips: "是否允许创建新条目，需配合 filterable 使用。若搜索字段不在选项列表中，可创建为新的选项",
                            propsName: "allowCreate",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "新增按钮",
                            labelTips: "是否显示下拉框顶部新增按钮，点击按钮会抛出一个 top-create-click 事件，可以在事件中自定义一些行为",
                            propsName: "topCreate",
                        },
                        {
                            cmp: "StringSetter",
                            label: "全部文本",
                            labelTips: "当下拉中显示全部时，自定义全部的显示文本。不指定时，则默认显示'全部'",
                            propsName: "allText",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "本地缓存配置",
                                jsonSchema: selectCacheOp,
                            },
                            label: "本地缓存",
                            labelTips: "启用本地缓存已选项的功能配置（根据用户点击选择的次数、最后时间继续存储排序)",
                            propsName: "cacheOp",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "回车选择",
                            labelTips: "是否启用按 Enter 键选择第一个匹配项的功能。需配合 filterable 或 remote 使用",
                            propsName: "defaultFirstOption",
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
                        // TODO 自定义函数
                        // filter-method (query: string) => void 自定义过滤方法
                    ],
                },
                {
                    title: "搜索",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "远程搜索",
                            propsName: "remote",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "启用搜索",
                            labelTips: "是否启用下拉面板搜索",
                            propsName: "searchable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许搜索",
                            propsName: "filterable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加载状态",
                            labelTips: "是否加载中，适用于远程搜索场景",
                            propsName: "loading",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "加载文本",
                            labelTips: "远程加载时显示的文本",
                            propsName: "loadingText",
                            defPropsValue: "加载中",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许复制",
                            labelTips: "是否允许复制输入框的内容，适用单选可搜索场景",
                            propsName: "allowCopy",
                        },
                        {
                            cmp: "StringSetter",
                            label: "无果提示",
                            labelTips: "搜索条件无匹配时显示的文本，也可以使用 empty 插槽设置",
                            propsName: "noMatchText",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "保留搜索",
                            labelTips: "多选可搜索时，是否在选中一个选项后仍然保留当前的搜索关键词",
                            propsName: "reserveKeyword",
                        },
                        // TODO 自定义函数
                        // remote-method (query:string) => void 远程搜索的方法
                    ],
                },
                {
                    title: "多选",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "允许多选",
                            labelTips: "是否允许选择多个选项",
                            propsName: "multiple",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "允许全选",
                            labelTips: "是否展示 “全选” 选项",
                            propsName: "showAlloption",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "多选上限",
                            labelTips: "多选时最多可选择的个数，默认为 0 不限制",
                            propsName: "multipleLimit",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "多选文本",
                            labelTips: "是否展示多选框开启多选限制选择数量时，选中条数和限制总条数的占比的文字提示。 该属性的优先级大于 show-proportion 属性",
                            propsName: "showLimitText",
                        },
                        {
                            cmp: "NumberSetter",
                            label: "多选提示",
                            labelTips: "是否展示多选框选中条数和总条数的占比的文字提示",
                            propsName: "showProportion",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "展开全部",
                            labelTips: "点击可展开或收起显示不全的选项。仅用于多选",
                            propsName: "clickExpend",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "折叠显示",
                            labelTips: "是否将多个标签折叠显示。仅适用多选",
                            propsName: "collapseTags",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "一键复制",
                            labelTips: "是否启用一键复制的功能。点击复制按钮一键复制所有标签的文本内容并以逗号分隔，仅适用于多选",
                            propsName: "copyable",
                        },
                        {
                            cmp: "StringSetter",
                            label: "复制隔符",
                            labelTips: "自定义复制文本的分隔符，需结合 copyable 属性使用",
                            propsName: "textSplit",
                            defPropsValue: ",",
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
                            labelTips: "标签类型，仅多选适用。使用 aurora 主题时设置该属性为 info",
                            propsName: "tagType",
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
                            label: "自动撑开",
                            labelTips: "下拉弹框的宽度是否跟输入框保持一致。默认超出输入框宽度时由内容撑开",
                            propsName: "isDropInheritWidth",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "最大行数",
                            labelTips: "多行默认最大显示行数，超出后选项自动隐藏",
                            propsName: "maxVisibleRows",
                            defPropsValue: 1,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                            },
                            label: "下拉图标",
                            propsName: "dropdownIcon",
                            enableBind: false,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "input", label: "输入框" },
                                    { value: "underline", label: "下划线输入" },
                                ],
                            },
                            label: "组件风格",
                            propsName: "inputBoxType",
                            defPropsValue: "input",
                        },
                        {
                            cmp: "StringSetter",
                            label: "下拉class",
                            labelTips: "自定义下拉框的类名，用于自定义样式",
                            propsName: "popperClass",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "选项样式",
                            labelTips: "自定义下拉选项样式",
                            propsName: "dropdownStyle",
                            recalcAuxToolPosition: true,
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
                            labelTips: "输入框的原生 autocomplete 属性",
                            propsName: "autocomplete",
                            defPropsValue: "off",
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
                            description: "组件的值变化时触发的回调函数",
                            name: "change",
                            params: [
                                { name: "value", type: "string | number | Array | undefined", note: "" },
                                { name: "list", type: "IOption[] | ITreeNode[]", note: "" },
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
                        {
                            title: "标签移除事件",
                            description: "监听多选时移除标签事件",
                            name: "removeTag",
                            params: [
                                { name: "tag", type: "string | number", note: "" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "顶部新增按钮点击",
                            description: "监听顶部新增按钮点击事件，同 top-create 属性一起使用",
                            name: "topCreateClick",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "下拉弹框显示状态变化",
                            description: "监听下拉弹框的显示隐藏状态",
                            name: "visibleChange",
                            params: [
                                { name: "status", type: "boolean", note: "" },
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
