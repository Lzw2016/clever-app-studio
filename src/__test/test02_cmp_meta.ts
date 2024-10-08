// noinspection HtmlUnknownAttribute

import { ComponentMeta } from "@/draggable/types/ComponentMeta";

function defineComponentMeta(meta: ComponentMeta) {
    return meta;
}

const componentMeta = defineComponentMeta({
    type: "Input",
    // 设计时显示的组件
    designComponent: "[DesignInput]",
    name: "文本输入",
    description: "单行文本输入",
    version: "0.0.1",
    docLink: "",
    icon: "input",
    defDesignNode: {
        props: {},
        listeners: {},
        directives: {},
        slots: {},
        items: [],
    },
    // slots: {
    //     icon: {
    //         title: "标题插槽",
    //         description: "面板的自定义标题模板。",
    //         slotProps: {
    //             value: {
    //                 type: "object",
    //                 note: "组件的值",
    //             },
    //             suggestions: {
    //                 type: "object",
    //                 note: "显示选项",
    //             },
    //         },
    //         examples: [
    //             {
    //                 title: "简单使用",
    //                 description: "自定义标题",
    //                 code: [
    //                     '<template v-slot:header="slotProps">',
    //                     '    <div class="flex align-options-center">',
    //                     '        当前值 {{ slotProps.value }}',
    //                     '    </div>',
    //                     '</template>',
    //                 ],
    //             },
    //         ],
    //     },
    // },
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
                            // 自定义控制如何更新属性
                            applyPropsValue: function (props: any, value: string) {
                            },
                            // 自定义控制如何显示属性
                            getPropsValue: function (props: any): any {
                                return {};
                            },
                        },
                        {
                            cmp: "TextSetter",
                            cmpProps: {
                                label: "设置后置标签",
                                length: 30,
                            },
                            // setProp: function (props: any, value: string) {
                            // },
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
            componentStyles: [
                { name: "紧凑", class: "customize compact" },
                { name: "绚丽", class: "gorgeous" },
            ],
            // 参考 https://lowcode-engine.cn/demo/demo-basic-antd/index.html
            disableSize: true,
        },
        // vue指令设置(内置的固定设置)
        advanced: {
            title: "高级",
        },
    },
    placeholder: {
        icon: {
            type: "div",
            props: {
                style: {
                    minWidth: "150px",
                    minHeight: "30px",
                },
            },
            tpl: "将组件拖拽到这里",
        },
        default: true,
    },
    i18n: {
        "zhCN": {},
    },
});
