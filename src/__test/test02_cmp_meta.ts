import {ComponentMeta} from "@/draggable/types/ComponentMeta";

function defineComponentMeta(meta: ComponentMeta) {
    return meta;
}

const componentMeta = defineComponentMeta({
    type: "Input",
    component: "[Input]",
    // 设计时显示的组件
    designComponent: "[DesignInput]",
    name: "文本输入",
    description: "单行文本输入",
    version: "0.0.1",
    icon: "input",

    // 组件配置设置器
    setter: {
        // 组件属性设置
        props: {
            title: "属性",
            groups: [
                {
                    title: "常规",
                    items: [
                        {
                            // setter 组件
                            cmp: "TextSetter",
                            // setter 组件属性
                            cmpProps: {
                                label: "设置后置标签",
                                length: 30,
                            },
                            // 设置更新的属性值
                            propsName: "addonAfter",
                            defValue: "",
                            // 自定义控制如何更新属性
                            setProp: function (props: any, value: string) {
                            },
                            // 自定义控制如何显示属性
                            getProp: function (props: any): any {
                                return {};
                            },
                            // 属性变化，更新当前组件
                            propsChange: [
                                {
                                    propsNames: [],
                                    onChange: function (props: any, value: any, oldValue: any, cmpInstance: 'Component') {
                                    },
                                },
                            ],
                        },
                        {
                            cmp: "TextSetter",
                            cmpProps: {
                                label: "设置后置标签",
                                length: 30,
                            },
                            setProp: function (props: any, value: string) {
                            },
                        },
                    ],
                },
                {
                    title: "高级",
                    items: [],
                },
                {
                    title: "数据源",
                    items: [],
                },
            ],
        },
        // 组件事件绑定
        events: {
            title: "事件",
            groups: [],
        },
        // 样式设置(内置的固定设置)
        style: {
            title: "样式",
            // 参考 https://lowcode-engine.cn/demo/demo-basic-antd/index.html
            groups: [
                // 布局
                // 文字
                // 背景
                // 位置
                // 边框
            ],
        },
        // vue指令设置(内置的固定设置)
        advanced: {
            title: "高级",
            // 权限
            // 循环
            groups: [],
        },
    },

    // 默认值
    defNode: {
        props: {},
        events: {},
        directives: {},
    },

    i18n: {
        "zh-CN": {},
    },
});
