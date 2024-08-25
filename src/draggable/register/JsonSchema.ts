import type { JSONSchema7 } from "json-schema";

const buttonGroupData: JSONSchema7 = {
    type: "array",
    description: "按钮组数据",
    items: {
        type: "object",
        description: "按钮配置",
        // required: ["text", "value"],
        properties: {
            text: {
                type: "string",
                description: "按钮文本",
            },
            value: {
                type: ["string", "number"],
                description: "选中的值",
            },
            disabled: {
                type: "boolean",
                description: "是否禁用",
            },
            tip: {
                type: "string",
                description: "按钮文本",
            },
            sup: {
                type: "object",
                description: "按钮悬浮提示",
                properties: {
                    text: {
                        type: "string",
                        description: "角标文本",
                    },
                    class: {
                        type: "string",
                        description: "角标的自定义class",
                    },
                    slot: {
                        type: "string",
                        description: "自定义插槽名称",
                    },
                    icon: {
                        type: "object",
                        description: "传入图标组件",
                    },
                },
            },
        },
    },
};

const actionMenuOptions: JSONSchema7 = {
    type: "array",
    description: "菜单项列表的数据",
    items: {
        $ref: "#/definitions/ItemData",
    },
    definitions: {
        ItemData: {
            type: "object",
            description: "菜单配置",
            properties: {
                label: {
                    type: "string",
                    description: "菜单项文本",
                },
                // icon: {
                //     type: "Component",
                //     description: "菜单项图标",
                // },
                disabled: {
                    type: "boolean",
                    description: "是否禁用",
                },
                divided: {
                    type: "boolean",
                    description: "是否显示分割线",
                },
                children: {
                    type: "array",
                    description: "子菜单数组",
                    items: {
                        $ref: "#/definitions/ItemData",
                    }
                },
            },
        },
    },
};

const dropdownMenuOptions: JSONSchema7 = {
    type: "object",
    description: "下拉菜单配置",
    properties: {
        options: {
            type: "array",
            description: "菜单数组",
            items: {
                type: "object",
                description: "菜单项配置",
                properties: {
                    label: {
                        type: "string",
                        description: "菜单项文本",
                    },
                    disabled: {
                        type: "boolean",
                        description: "是否禁用",
                    },
                    divided: {
                        type: "boolean",
                        description: "是否显示分割线",
                    },
                },
            },
        },
        textField: {
            type: "string",
            description: "显示文本字段",
        },
        popperClass: {
            type: "string",
            description: "下拉菜单列表样式",
        },
        placement: {
            enum: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'],
            description: "下拉菜单位置",
        },
    },
};

const watermarkFont: JSONSchema7 = {
    type: "object",
    description: "水印字体配置",
    properties: {
        color: {
            type: "string",
            description: "字体颜色",
        },
        fontSize: {
            type: "string",
            description: "字体大小",
        },
        fontWeight: {
            type: "string",
            description: "字宽",
        },
        fontFamily: {
            type: "string",
            description: "字体名",
        },
        fontStyle: {
            type: "string",
            description: "字体样式",
        },
    },
};

const popoverPopperOptions: JSONSchema7 = {
    type: "object",
    description: "弹出层参数",
    properties: {
        bubbling: {
            type: "boolean",
            description: "是否监听元素所有上级有滚动元素的scroll事件，监听到则更新popper的位置。用于解决某些弹出层位置在页面滚动时，位置不正确的场景，默认false",
        },
        followReferenceHide: {
            type: "boolean",
            description: "当触发源隐藏时，自动隐藏弹出层，默认true",
        },
        removeOnDestroy: {
            type: "boolean",
            description: "弹出层消失后，是否移除弹出层的DOM元素，默认false",
        },
        updateHiddenPopperOnScroll: {
            type: "boolean",
            description: "滚动过程中是否更新隐藏的弹出层位置",
        },
        boundariesElement: {
            type: "string",
            enum: ["viewport", "body"],
            description: "滚动过程中,弹出层的碰撞边界。 默认值为：'viewport'",
        },
        ignoreBoundaries: {
            type: "boolean",
            description: "忽略边界判断，弹出的位置始终是设置的 placement 值",
        },
        scrollParent: {
            description: "指定滚动的父节点，优化级最高。 默认为null",
        },
    },
};

const formRulesDefinitions: JSONSchema7["definitions"] = {
    FormTrigger: {
        enum: ["change", "blur"],
    },
    FormItemRules: {
        type: "object",
        properties: {
            required: {
                type: "boolean",
                description: "是否必填",
            },
            message: {
                type: "string",
                description: "校验错误的提示",
            },
            type: {
                enum: [
                    "date",
                    "dateTime",
                    "float",
                    "array",
                    "string",
                    "number",
                    "url",
                    "time",
                    "email",
                    "object",
                    "boolean",
                    "enum",
                ],
                description: "内置的类型校验",
            },
            trigger: {
                oneOf: [
                    {
                        $ref: "#/definitions/FormTrigger",
                    },
                    {
                        type: "array",
                        items: {
                            $ref: "#/definitions/FormTrigger",
                        }
                    },
                ],
                description: "校验触发时机， 默认为 ['change', 'blur'] 两种场景都触发，如果仅在主动调用校验方式时触发，可设置为空数组 []",
            },
            validator: {
                type: "array",
                items: {
                    type: "string",
                },
                description: "同步检验函数，调用回调传递错误信息。",
            },
            asyncValidator: {
                type: "array",
                items: {
                    type: "string",
                },
                description: "异步校验函数，resolve则表示校验成功，reject表示校验失败。",
            },
        },
    },
};

const formRules: JSONSchema7 = {
    type: "object",
    description: "表单验证规则",
    patternProperties: {
        "^.+$": {
            oneOf: [
                {
                    $ref: "#/definitions/FormItemRules",
                },
                {
                    type: "array",
                    items: {
                        $ref: "#/definitions/FormItemRules",
                    },
                },
            ],
        }
    },
    definitions: formRulesDefinitions,
};

const formRule: JSONSchema7 = {
    description: "表单验证规则",
    oneOf: [
        {
            $ref: "#/definitions/FormItemRules",
        },
        {
            type: "array",
            items: {
                $ref: "#/definitions/FormItemRules",
            },
        },
    ],
    definitions: formRulesDefinitions,
};

const inputAutosize: JSONSchema7 = {
    description: "自适应内容高度",
    oneOf: [
        {
            type: "boolean",
            description: "自适应高度",
        },
        {
            type: "object",
            properties: {
                minRows: {
                    type: "integer",
                    description: "最小行数",
                    minimum: 1,
                },
                maxRows: {
                    type: "integer",
                    description: "最大行数",
                    minimum: 1,
                },
            }
        },
    ],
};

const numericFormat: JSONSchema7 = {
    type: "object",
    description: "数字格式化置项",
    properties: {
        fraction: {
            type: "integer",
            description: "保留小数位数",
        },
        rounding: {
            type: "integer",
            minimum: 0,
            maximum: 9,
            description: "舍入点，0-9之间的数字，如配置为7时则为6舍7入，默认为5（四舍五入）;配置为0或>9将会进行截取",
        },
        prefix: {
            type: "string",
            description: "前置标识",
        },
        groupSize: {
            type: "integer",
            description: "整数部分分组间隔，即第一个分组位数",
        },
        secondaryGroupSize: {
            type: "integer",
            description: "整数部分第二级分组间隔，不设置或为0时 自动取groupSize",
        },
        groupSeparator: {
            type: "string",
            description: "整数部分分组分隔符",
        },
        decimalSeparator: {
            type: "string",
            description: "小数点符号",
        },
        fractionGroupSize: {
            type: "integer",
            description: "小数部分分组间隔",
        },
        fractionGroupSeparator: {
            type: "string",
            description: "小数分组分隔符",
        },
        suffix: {
            type: "string",
            description: "后置标识",
        },
    },
};

const selectCacheOp: JSONSchema7 = {
    type: "object",
    description: "选择器本地缓存配置",
    properties: {
        key: {
            type: "string",
            description: "本地缓存的唯一 key 值",
        },
        sortBy: {
            enum: ["frequency", "time"],
            description: "排序的字段，默认 frequency (频次)",
        },
        sort: {
            enum: ["desc", "asc"],
            description: "排序方式，默认 desc (降序)",
        },
        dataKey: {
            type: "string",
            description: "数据中的唯一标识的 key 名称,默认 value",
        },
        highlightClass: {
            type: "string",
            description: "个性化高亮 class 名称，默认：memorize-highlight",
        },
        highlightNum: {
            type: "string",
            description: "高亮个性化的条数,默认：Infinity",
        },
        cacheNum: {
            type: "integer",
            description: "存储个性化的条数,默认：Infinity",
        },
        serialize: {
            type: "array",
            description: "本地存储序列化方法,默认：JSON.stringify",
            items: {
                type: "string",
            },
        },
        deserialize: {
            type: "array",
            description: "本地存储序反列化方法，默认：JSON.parse",
            items: {
                type: "string",
            },
        },
    },
};

const selectTreeOp: JSONSchema7 = {
    type: "object",
    description: "下拉树配置",
    properties: {
        data: {
            type: "array",
            description: "树数据",
            items: {
                $ref: "#/definitions/TreeNode",
            },
        },
    },
    definitions: {
        TreeNode: {
            type: "object",
            description: "下拉树节点",
            properties: {
                id: {
                    type: ["string", "integer"],
                    description: "树节点唯一标识",
                },
                label: {
                    type: "string",
                    description: "表格列配置",
                },
                children: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/TreeNode",
                    },
                },
            },
        },
    },
};

const selectGridOp: JSONSchema7 = {
    type: "object",
    description: "下拉表格配置",
    properties: {
        columns: {
            type: "array",
            description: "表格列配置",
            // items: {}, TODO 列配置，用法同 Grid
        },
        data: {
            type: "array",
            description: "表格数据配置",
            // items: {}, TODO 表格数据，用法同 Grid
        },
    },
};

const selectOptions: JSONSchema7 = {
    type: "array",
    description: "选项列表配置",
    items: {
        type: "object",
        description: "列表项配置",
        properties: {
            value: {
                type: ["string", "integer"],
                description: "选项值",
            },
            label: {
                type: "string",
                description: "选项文本",
            },
            disabled: {
                type: "boolean",
                description: "是否禁用",
            },
            icon: {
                type: "object",
                description: "选项图标",
            },
            required: {
                type: "boolean",
                description: "是否必须",
            },
        },
    },
};

const datePickerStep: JSONSchema7 = {
    type: "object",
    description: "配置时、分、秒的步长",
    properties: {
        hour: {
            type: "integer",
            description: "配置小时的步长",
        },
        minute: {
            type: "integer",
            description: "配置分钟的步长",
        },
        second: {
            type: "integer",
            description: "配置秒钟的步长",
        },
    },
};

const datePickerOptions: JSONSchema7 = {
    type: "object",
    description: "配置部分禁用、快捷选项等",
    properties: {
        firstDayOfWeek: {
            type: "integer",
            description: "每周的第一天是星期几，默认值是7，也就是星期天",
            minimum: 1,
            maximum: 7,
        },
        disabledDate: {
            type: "array",
            description: "实现部分禁用，此时只能选择一部分日期。(time: Date) => boolean",
            items: {
                type: "string",
            },
        },
        onPick: {
            type: "array",
            description: "选中日期后执行的回调，需要与 daterange 或 datetimerange 类型配合使用才生效。(range: { minDate: Date, maxDate: Date }) => void",
            items: {
                type: "string",
            },
        },
        shortcuts: {
            type: "array",
            description: "快捷选项",
            items: {
                type: "object",
                properties: {
                    text: {
                        type: "string",
                    },
                    onPick: {
                        type: "array",
                        description: "(picker: { $emit: (type: string, date: Date) => void }) => void",
                        items: {
                            type: "string",
                        },
                    },
                    type: {
                        enum: ["startFrom", "EndAt"],
                    },
                    startDate: {
                        type: "string",
                        description: "Date",
                    },
                    endDate: {
                        type: "string",
                        description: "Date",
                    },
                },
            },
        },
    },
};

const timePickerOptions: JSONSchema7 = {
    type: "object",
    description: "配置可选的时间范围、下拉框中显示的格式",
    properties: {
        selectableRange: {
            type: "string",
            description: "可选的时间范围",
        },
        format: {
            type: "string",
            description: "下拉框中显示的格式",
        },
    },
};

const checkboxDefinitions: JSONSchema7["definitions"] = {
    CheckboxGroupOptions: {
        type: "object",
        description: "组件配置",
        properties: {
            label: {
                type: "string",
                description: "选中时对应的值",
            },
            text: {
                type: "string",
                description: "描述文本",
            },
            disabled: {
                type: "boolean",
                description: "是否禁用",
            },
            checked: {
                type: "boolean",
                description: "是否默认选中",
            },
            events: {
                type: "object",
                description: "事件",
                properties: {
                    click: {
                        type: "array",
                        description: "点击事件。(e: Event) => void",
                        items: {
                            type: "string",
                        },
                    },
                    change: {
                        type: "array",
                        description: "change事件。(e: Event) => void",
                        items: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
};

const checkboxButtonEvents: JSONSchema7 = {
    type: "object",
    description: "组件配置",
    $ref: "#/definitions/CheckboxGroupOptions",
    definitions: checkboxDefinitions,
};

const checkboxGroupOptions: JSONSchema7 = {
    type: "array",
    description: "checkbox-group 子项配置列表",
    items: {
        $ref: "#/definitions/CheckboxGroupOptions",
    },
    definitions: checkboxDefinitions,
};

const radioGroupOptions: JSONSchema7 = {
    type: "array",
    description: "checkbox-group 子项配置列表",
    items: {
        $ref: "#/definitions/RadioGroupOptions",
    },
    definitions: {
        RadioGroupOptions: {
            type: "object",
            properties: {
                label: {
                    type: "string",
                    description: "选中时对应的值",
                },
                text: {
                    type: "string",
                    description: "描述文本",
                },
                events: {
                    type: "object",
                    description: "事件",
                    properties: {
                        click: {
                            type: "array",
                            description: "点击事件。(e: Event) => void",
                            items: {
                                type: "string",
                            },
                        },
                        change: {
                            type: "array",
                            description: "change事件。(e: Event) => void",
                            items: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
    },
};

const sliderMarks: JSONSchema7 = {
    type: "object",
    description: "设置滑杆的刻度值",
    properties: {
        "^[0-9]+$": {
            type: "string",
            description: "刻度名",
        },
    },
};

const fileUploadEncryptConfig: JSONSchema7 = {
    type: "object",
    description: "设置水印和加密弹窗",
    properties: {
        enabled: {
            type: "boolean",
            description: "是否开启设置，默认关闭",
        },
        encrypt: {
            type: "boolean",
            description: "是否加密，默认否",
        },
        watermark: {
            type: "string",
            description: "水印文字，默认为空",
        },
    },
};

const fileUploadFileList: JSONSchema7 = {
    type: "array",
    description: "设置水印和加密弹窗",
    items: {
        type: "object",
        description: "文件信息",
        properties: {
            name: {
                type: "string",
                description: "文件名",
            },
            url: {
                type: "string",
                description: "文件url 例如：'https://xxx.cdn.com/xxx.jpg'",
            },
        },
    },
};

const fileUploadThumbOption: JSONSchema7 = {
    type: "object",
    description: "文件列表的显示类型为 thumb 时的相关配置",
    properties: {
        width: {
            type: "integer",
            description: "弹窗宽度，默认270",
        },
        showDownload: {
            type: "boolean",
            description: "是否显示下载按钮，默认false",
        },
        showDel: {
            type: "boolean",
            description: "是否显示删除按钮，布尔false",
        },
        showTooltip: {
            type: "boolean",
            description: "文件名超出隐藏显示时是否启用tip，默认false",
        },
        popperClass: {
            type: "string",
            description: "弹窗列表自定义类名",
        },
        downloadFile: {
            type: "array",
            description: "点击下载按钮执行函数。(file) => void",
            items: {
                type: "string",
            },
        },
        icon: {
            oneOf: [
                {
                    type: "string",
                },
                {
                    type: "object",
                },
            ],
            description: "列表结果前 icon ，默认为 'icon-attachment'",
        },
    },
};

const cascaderDefinitions: JSONSchema7["definitions"] = {
    CascaderPanelNodeValue: {
        type: ["string", "number"],
    },
    CascaderPanelData: {
        type: "object",
        description: "数据项",
        properties: {
            value: {
                $ref: "#/definitions/CascaderPanelNodeValue",
                description: "选项值",
            },
            label: {
                type: "string",
                description: "选项显示文本",
            },
            children: {
                type: "array",
                description: "子数据项",
                items: {
                    $ref: "#/definitions/CascaderPanelData",
                },
            },
            leaf: {
                type: "boolean",
                description: "是否叶子节点",
            },
            "^.+$": {
                description: "其它属性",
            },
        },
    },
    CascaderPanelConfig: {
        type: "object",
        properties: {
            emitPath: {
                type: "string",
            },
            expandTrigger: {
                enum: ["click", "hover"],
            },
            hoverThreshold: {
                type: "number",
            },
            checkStrictly: {
                type: "boolean",
            },
            multiple: {
                type: "boolean",
            },
            lazy: {
                type: "boolean",
            },
            lazyLoad: {
                type: "array",
                items: {
                    type: "string",
                },
                description: "(node: ICascaderPanelNode, resolve: (dataList: ICascaderPanelData[]) => void) => void",
            },
            value: {
                type: "string",
            },
            label: {
                type: "string",
            },
            children: {
                type: "string",
            },
            disabled: {
                type: "string",
            },
            leaf: {
                type: "string",
            },
        },
    },
    CascaderPanelNode: {
        type: "object",
        properties: {
            parent: {
                $ref: "#/definitions/CascaderPanelNode",
            },
            level: {
                type: "number",
            },
            data: {
                $ref: "#/definitions/CascaderPanelData",
            },
            config: {
                $ref: "#/definitions/CascaderPanelConfig",
            },
            uid: {
                type: "number",
            },
            value: {
                $ref: "#/definitions/CascaderPanelNodeValue",
            },
            label: {
                type: "string",
            },
            pathNodes: {
                type: "array",
            },
            path: {
                type: "array",
                items: {
                    $ref: "#/definitions/CascaderPanelNodeValue",
                },
            },
            pathLabels: {
                type: "array",
                items: {
                    type: "string",
                },
            },
            loaded: {
                type: "boolean",
            },
            loading: {
                type: "boolean",
            },
            hasChildren: {
                type: "boolean",
            },
            children: {
                type: "array",
            },
            checked: {
                type: "boolean",
            },
            indeterminate: {
                type: "boolean",
            },
            root: {
                type: "boolean",
            },
        },
    },
};

const cascaderOptions: JSONSchema7 = {
    type: "array",
    description: "可选项数据源",
    items: {
        $ref: "#/definitions/CascaderPanelData",
    },
    definitions: cascaderDefinitions,
};

const cascaderProps: JSONSchema7 = {
    $ref: "#/definitions/CascaderPanelConfig",
    description: "级联选择器选项配置",
    definitions: cascaderDefinitions,
};

const searchDefinitions: JSONSchema7["definitions"] = {
    TypeValue: {
        type: "object",
        description: "搜索类型项",
        properties: {
            text: {
                type: "string",
                description: "选项显示文本",
            },
            value: {
                type: ["number", "string"],
                description: "选项值",
            },
        },
    },
};

const searchTypes: JSONSchema7 = {
    type: "array",
    description: "搜索类型的选项列表",
    items: {
        $ref: "#/definitions/TypeValue",
    },
    definitions: searchDefinitions,
};

const searchTypeValue: JSONSchema7 = {
    $ref: "#/definitions/TypeValue",
    description: "搜索类型项",
    definitions: searchDefinitions,
};

const gridDefinitions: JSONSchema7["definitions"] = {
    ColumnConfig: {},
}

const transferColumns: JSONSchema7 = {
    // TODO transferColumns
};

const transferTreeOp: JSONSchema7 = {
    // TODO transferTreeOp
};

const transferData: JSONSchema7 = {
    // TODO transferData
};

const transferFormat: JSONSchema7 = {
    // TODO transferData
};

const transferPagerOp: JSONSchema7 = {
    // TODO transferPagerOp
};

const transferProps: JSONSchema7 = {
    // TODO transferProps
};

const statisticTitle: JSONSchema7 = {
    type: "object",
    description: "",
    properties: {
        value: {
            type: "string",
            description: "标题文本",
        },
        position: {
            enum: ["top", "bottom"],
            description: "标题位置，取值：top | bottom",
        },
    },
};

const tagColor: JSONSchema7 = {
    description: "控制标签文本色和背景色",
    anyOf: [
        {
            $ref: "#/definitions/EnumColor",
        },
        {
            $ref: "#/definitions/Color",
        },
        {
            type: "array",
            description: "若为数组则第一个值设置背景色，第二个设置文本色",
            items: {
                anyOf: [
                    {
                        $ref: "#/definitions/EnumColor",
                    },
                    {
                        $ref: "#/definitions/Color",
                    },
                ],
            },
        },
    ],
    definitions: {
        EnumColor: {
            enum: ["red", "orange", "green", "blue", "purple", "brown", "grey"],
            description: "内置颜色",
        },
        Color: {
            type: "string",
            description: "css颜色",
        },
    },
};

const tagGroupData: JSONSchema7 = {
    type: "array",
    description: "标签组数据",
    items: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "标签文本",
            },
            type: {
                enum: ["success", "info", "warning", "danger"],
                description: "标签类型",
            },
        },
    },
};

const cardOptions: JSONSchema7 = {
    type: "array",
    description: "操作按钮配置",
    items: {
        type: "object",
        description: "按钮配置",
        properties: {
            text: {
                type: "string",
                description: "按钮文本",
            },
            icon: {
                description: "按钮图标",
            },
            disabled: {
                type: "boolean",
                description: "是否禁用",
            },
        },
    },
};

const progressColor: JSONSchema7 = {
    type: "array",
    description: "进度条背景色",
    items: {
        type: "object",
        description: "进度颜色",
        properties: {
            color: {
                type: "string",
                description: "当前进度的颜色",
            },
            percentage: {
                type: "number",
                description: "进度条进度",
            },
        },
    },
};

const timelineData: JSONSchema7 = {
    type: "array",
    description: "节点数据",
    items: {
        type: "object",
        description: "节点数据项",
        properties: {
            time: {
                type: "string",
                description: "节点时间",
            },
            name: {
                type: "string",
                description: "节点名称",
            },
            activeColor: {
                anyOf: [
                    {
                        enum: ["success", "warning", "error"],
                    },
                    {
                        type: "string",
                    },
                ],
                description: "活动节点颜色",
            },
            error: {
                type: "boolean",
                description: "是否异常状态",
            },
            type: {
                description: "节点类型",
            },
        },
    },
};

const timelineEvents: JSONSchema7 = {
    type: "array",
    description: "日程事件",
    items: {
        type: "object",
        description: "日程项",
        properties: {
            title: {
                type: "string",
                description: "日程标题",
            },
            content: {
                type: "string",
                description: "日程内容",
            },
            start: {
                type: "string",
                description: "日程开始时间",
            },
            end: {
                type: "string",
                description: "日程结束时间",
            },
            theme: {
                type: "string",
                description: "日程主题",
            },
        },
    },
};

const wizardData: JSONSchema7 = {
    // TODO wizardData
};

const milestoneData: JSONSchema7 = {
    // TODO milestoneData
};

const milestonesStatus: JSONSchema7 = {
    // TODO milestonesStatus
};

const bulletinBoardData: JSONSchema7 = {
    // TODO bulletinBoardData
};

export {
    buttonGroupData,
    actionMenuOptions,
    dropdownMenuOptions,
    watermarkFont,
    popoverPopperOptions,
    formRules,
    formRule,
    inputAutosize,
    numericFormat,
    selectCacheOp,
    selectTreeOp,
    selectGridOp,
    selectOptions,
    datePickerStep,
    datePickerOptions,
    timePickerOptions,
    checkboxButtonEvents,
    checkboxGroupOptions,
    radioGroupOptions,
    sliderMarks,
    fileUploadEncryptConfig,
    fileUploadFileList,
    fileUploadThumbOption,
    cascaderOptions,
    cascaderProps,
    searchTypes,
    searchTypeValue,
    transferColumns,
    transferTreeOp,
    transferData,
    transferFormat,
    transferPagerOp,
    transferProps,
    statisticTitle,
    tagColor,
    tagGroupData,
    cardOptions,
    progressColor,
    timelineData,
    timelineEvents,
    wizardData,
    milestoneData,
    milestonesStatus,
    bulletinBoardData,
}
