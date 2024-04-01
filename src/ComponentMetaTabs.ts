import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { componentManage } from "@/draggable/Constant";


function createComponentMeta(cfg: Partial<ComponentMeta>): ComponentMeta {
    return {
        type: cfg.type!,
        designComponent: "",
        name: cfg.name!,
        description: "",
        version: "0.0.1",
        docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/button",
        icon: cfg.icon!,
        defDesignNode: cfg.defDesignNode ?? {},
        events: {},
        slots: {},
        setter: {
            props: {
                title: "",
                groups: [
                    {
                        title: "常规",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "数据绑定",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "数据源",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            events: {
                title: "",
                groups: [
                    {
                        title: "组件事件",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "HTML事件",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            style: {
                title: "",
                groups: [
                    {
                        title: "布局",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "间距",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "尺寸",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "定位",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "文本",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "背景",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "边框",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "效果",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            advanced: {
                title: "",
                groups: [
                    {
                        title: "指令",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "权限",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
        },
        placeholder: cfg.placeholder ?? {},
        i18n: {},
    };
}

const componentMeta = createComponentMeta({
    type: "Button",
    name: "按钮",
    icon: "",
    defDesignNode: {
        props: {
            text: "按钮",
        },
    },
});

componentManage.registerComponentMeta(componentMeta);
componentManage.registerComponentMeta(createComponentMeta({
    type: "ButtonGroup",
    name: "按钮组",
    icon: "",
    defDesignNode: {
        props: {
            data: [
                { text: '按钮1', value: 'v_1' },
                { text: '按钮2', value: 'v_2' },
                { text: '按钮3', value: 'v_3' },
            ],
        },
    },
}));
componentManage.registerComponentMeta(createComponentMeta({
    type: "Cascader",
    name: "级联选择",
    icon: "",
    defDesignNode: {
        props: {
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'anzhuang',
                            label: '安装',
                            children: [
                                {
                                    value: 'xiangmudengji',
                                    label: '项目登记'
                                },
                                {
                                    value: 'huanjingzhunbei',
                                    label: '环境准备'
                                },
                                {
                                    value: 'anzhuangcli',
                                    label: '安装 CLI'
                                },
                                {
                                    value: 'chuangjianxiangmu',
                                    label: '创建项目'
                                }
                            ]
                        },
                        {
                            value: 'kaifa',
                            label: '开发',
                            children: [
                                {
                                    value: 'yinruzujian',
                                    label: '引入组件'
                                },
                                {
                                    value: 'monishuju',
                                    label: '模拟数据'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'zujian',
                    label: '组件',
                    children: [
                        {
                            value: 'basic',
                            label: '框架风格',
                            children: [
                                {
                                    value: 'layout',
                                    label: 'Layout 布局'
                                },
                                {
                                    value: 'color',
                                    label: 'Color 色彩'
                                },
                                {
                                    value: 'font',
                                    label: 'Font 字体'
                                },
                                {
                                    value: 'icon',
                                    label: 'Icon 图标'
                                }
                            ]
                        },
                        {
                            value: 'form',
                            label: '表单组件',
                            children: [
                                {
                                    value: 'radio',
                                    label: 'Radio 单选框'
                                },
                                {
                                    value: 'checkbox',
                                    label: 'Checkbox 多选框'
                                },
                                {
                                    value: 'input',
                                    label: 'Input 输入框'
                                },
                                {
                                    value: 'number',
                                    label: 'Numeric 计数器'
                                },
                                {
                                    value: 'select',
                                    label: 'Select 选择器'
                                },
                                {
                                    value: 'cascader',
                                    label: 'Cascader 级联选择器'
                                },
                                {
                                    value: 'switch',
                                    label: 'Switch 开关'
                                },
                                {
                                    value: 'slider',
                                    label: 'Slider 滑块'
                                },
                                {
                                    value: 'time-picker',
                                    label: 'TimePicker 时间选择器'
                                },
                                {
                                    value: 'date-picker',
                                    label: 'DatePicker 日期选择器'
                                },
                                {
                                    value: 'form',
                                    label: 'Form 表单'
                                }
                            ]
                        },
                        {
                            value: 'data',
                            label: '数据组件',
                            children: [
                                {
                                    value: 'tree',
                                    label: 'Tree 树形控件'
                                },
                                {
                                    value: 'pager',
                                    label: 'Pager 分页'
                                }
                            ]
                        },
                        {
                            value: 'notice',
                            label: '提示组件',
                            children: [
                                {
                                    value: 'alert',
                                    label: 'Alert 警告'
                                },
                                {
                                    value: 'loading',
                                    label: 'Loading 加载'
                                }
                            ]
                        },
                        {
                            value: 'navigation',
                            label: '导航组件',
                            children: [
                                {
                                    value: 'menu',
                                    label: 'NavMenu 导航菜单'
                                },
                                {
                                    value: 'tabs',
                                    label: 'Tabs 标签页'
                                },
                                {
                                    value: 'breadcrumb',
                                    label: 'Breadcrumb 面包屑'
                                },
                                {
                                    value: 'steps',
                                    label: 'Steps 步骤条'
                                }
                            ]
                        },
                        {
                            value: 'others',
                            label: '其他组件',
                            children: [
                                {
                                    value: 'rate',
                                    label: 'Rate 评分'
                                },
                                {
                                    value: 'tag',
                                    label: 'Tag 标签'
                                },
                                {
                                    value: 'usercontact',
                                    label: 'UserContact 联系人'
                                },
                                {
                                    value: 'slidebar',
                                    label: 'SlideBar 滚动块'
                                }
                            ]
                        }
                    ]
                }
            ],
        },
    },
}));
componentManage.registerComponentMeta(createComponentMeta({
    type: "div",
    name: "[div]容器",
    icon: "",
    defDesignNode: {
        props: {
            style: {
                width: "auto",
                height: "auto",
                border: "1px solid #d6336c",
                margin: "4px",
            },
        },
    },
    placeholder: {
        default: true,
        // default: {
        //     type: "div",
        //     props: {
        //         style: {
        //             height: "100%",
        //             width: "100%",
        //             minHeight: "32px",
        //             fontSize: "12px",
        //             backgroundColor: "#f0f0f0",
        //             color: "#a7b1bd",
        //             border: "1px dotted #a7b1bd",
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //         },
        //     },
        //     tpl: "将组件拖拽到这里",
        // },
    },
}));
componentManage.registerComponentMeta(createComponentMeta({
    type: "span",
    name: "[span]",
    icon: "",
    defDesignNode: {
        props: {
            style: {
                display: 'inline-block',
                width: "80px",
                height: "40px",
                border: "1px solid #ae3ec9",
                margin: "4px",
            },
        },
        tpl: "新span",
    },
}));

export {
    componentMeta,
}
