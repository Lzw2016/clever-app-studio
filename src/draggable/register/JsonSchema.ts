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

export {
    buttonGroupData,
    actionMenuOptions,
    dropdownMenuOptions,
}
