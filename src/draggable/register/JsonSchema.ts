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

export {
    buttonGroupData,
    actionMenuOptions,
    dropdownMenuOptions,
    watermarkFont,
    popoverPopperOptions,
}
