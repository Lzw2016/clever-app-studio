import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { transferColumns, transferData, transferFormat, transferPagerOp, transferProps, transferTreeOp } from "@/draggable/register/JsonSchema";
import TransferSvg from "@/assets/images/transfer.svg?component";

export default defineComponentMeta({
    type: "Transfer",
    name: "穿梭框",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/transfer",
    icon: createVNode(TransferSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            data: [
                { key: 1, label: "选项1", disabled: false },
                { key: 2, label: "选项2", disabled: true },
                { key: 3, label: "选项3", disabled: false },
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
                defPropsValue: [],
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义左右穿梭按钮的文案",
                            },
                            label: "穿梭按钮",
                            labelTips: "通过传入一个2值的字符串数组，自定义左右穿梭按钮的文案",
                            propsName: "buttonTexts",
                            defPropsValue: [],
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置穿梭框表格的列配置",
                                jsonSchema: transferColumns,
                            },
                            label: "表格列",
                            labelTips: "在渲染类型为 table 时，设置穿梭框表格的列配置",
                            propsName: "columns",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "左边表格的列配置",
                                jsonSchema: transferColumns,
                            },
                            label: "左表格列",
                            labelTips: "在渲染类型为 table 时，左边表格的列配置,优先级高于 columns",
                            propsName: "leftColumns",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "右边表格的列配置",
                                jsonSchema: transferColumns,
                            },
                            label: "右表格列",
                            labelTips: "在渲染类型为 table 时，右边表格的列配置,优先级高于 columns",
                            propsName: "rightColumns",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置树的相关配置属性",
                                jsonSchema: transferTreeOp,
                            },
                            label: "树配置",
                            labelTips: "在渲染类型为 tree 时，设置树的相关配置属性",
                            propsName: "treeOp",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "左右列表的全量数据源",
                                jsonSchema: transferData,
                            },
                            label: "列表数据",
                            labelTips: "左右列表的全量数据源",
                            propsName: "data",
                            defPropsValue: [],
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "左右列表的全量数据源",
                                jsonSchema: transferFormat,
                            },
                            label: "勾选文案",
                            labelTips: "列表顶部勾选状态文案",
                            propsName: "format",
                            defPropsValue: {
                                noChecked: "${checked}/${total}",
                                hasChecked: "${checked}/${total}",
                            },
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义左右穿梭按钮的文案",
                            },
                            label: "左侧勾选",
                            labelTips: "默认左侧列表的已勾选项的 key 数组",
                            propsName: "leftDefaultChecked",
                            defPropsValue: [],
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义左右穿梭按钮的文案",
                            },
                            label: "右侧勾选",
                            labelTips: "默认右侧列表的已勾选项的 key 数组",
                            propsName: "rightDefaultChecked",
                            defPropsValue: [],
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示分页",
                            labelTips: "在渲染类型为 table 时，设置表格是否显示分页",
                            propsName: "showPager",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置表格的分页配置",
                                jsonSchema: transferPagerOp,
                            },
                            label: "分页配置",
                            labelTips: "在渲染类型为 table 时，设置表格的分页配置",
                            propsName: "pagerOp",
                            defPropsValue: [],
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "数据源的字段别名映射配置",
                                jsonSchema: transferProps,
                            },
                            label: "映射配置",
                            labelTips: "数据源的字段别名映射配置",
                            propsName: "props",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "全部移动",
                            labelTips: "是否显示全部移动按钮",
                            propsName: "showAllBtn",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "original", label: "保持与数据源相同的顺序" },
                                    { value: "push", label: "新加入的元素排在最后" },
                                    { value: "unshift", label: "新加入的元素排在最前" },
                                ],
                            },
                            label: "插入策略",
                            labelTips: "右侧列表元素的插入排序策略",
                            propsName: "targetOrder",
                            defPropsValue: "original",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义列表的标题",
                            },
                            label: "列表标题",
                            labelTips: "自定义列表的标题",
                            propsName: "titles",
                            defPropsValue: [],
                        },
                        {
                            cmp: "BoolSetter",
                            label: "智能禁用",
                            labelTips: "组件初始化状态下未选中时，默认按钮显示禁用状态(左侧)",
                            propsName: "toLeftDisable",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "智能禁用",
                            labelTips: "组件初始化状态下未选中时，默认按钮显示禁用状态(右侧)",
                            propsName: "toRightDisable",
                            defPropsValue: true,
                        },
                        // TODO 函数参数
                        // render 设置左右区域的渲染类型,Table 和 Tree 对象需要从组件包中引入相应的组件变量。该属性值的plugin设置为Table时设置渲染为表格;该属性值的 plugin 设置为Tree渲染为树
                        // drop-config 设置穿梭框列表项可拖拽的参数，参见sortablejs插件
                        // filter-method (query:string, item:object) => boolean 设置穿梭框的搜索过滤函数，仅在默认列表和嵌套表时有效<br> 嵌套树时，请使用treeConfig进行搜索配置
                        // render-content (h: Vue.h, item: any) => vnode 数据项的自定义渲染函数
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
                            cmp: "StringSetter",
                            label: "占位文本",
                            labelTips: "启用搜索时，搜索框占位文本",
                            propsName: "filterPlaceholder",
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
                            title: "右侧列表变化",
                            description: "右侧列表元素变化时触发的事件",
                            name: "change",
                            params: [
                                { name: "value", type: "string[]", note: "穿梭框右侧数据值列表" },
                                { name: "move", type: "string", note: "数据移动方向，是left或者right" },
                                { name: "keyArray", type: "string[]", note: "被移动的数据值列表" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "左侧列表元素选择",
                            description: "左侧列表元素选择时触发的事件",
                            name: "leftCheckChange",
                            params: [
                                { name: "checked", type: "string[]", note: "穿梭框左侧被选中的数据值列表" },
                                { name: "statusChanged", type: "string[]", note: "穿梭框左侧选中状态发生变化的数据值列表" },
                            ],
                            return: VarType.Void,
                        },
                        {
                            title: "右侧列表元素选择",
                            description: "右侧列表元素选择时触发的事件",
                            name: "rightCheckChange",
                            params: [
                                { name: "checked", type: "string[]", note: "穿梭框右侧被选中的数据值列表" },
                                { name: "statusChanged", type: "string[]", note: "穿梭框右侧选中状态发生变化的数据值列表" },
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
        // 穿梭按钮插槽
        // button-panel
        // 数据项的内容插槽，插槽数据上下文为： { option }
        // default
        // 左侧列表底部的内容插槽
        // left-footer
        // 左侧自定义内容插槽
        // left-panel
        // 右侧列表底部的内容插槽
        // right-footer
        // 右侧自定义内容插槽
        // right-panel
    },
    i18n: {},
});
