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
}
