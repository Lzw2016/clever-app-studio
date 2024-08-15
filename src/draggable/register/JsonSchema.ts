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

export {
    buttonGroupData,
}
