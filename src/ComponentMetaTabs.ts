import { ComponentMetaTab } from "@/draggable/types/ComponentMeta";

const componentMetaTabs: Array<ComponentMetaTab> = [
    {
        title: "常用组件",
        groups: [
            {
                title: "通用",
                expand: true,
                items: [],
            },
            {
                title: "容器布局",
                expand: true,
                items: [],
            },
            {
                title: "表单输入",
                expand: true,
                items: [],
            },
            {
                title: "数据展示",
                expand: true,
                items: [],
            },
            {
                title: "反馈",
                expand: true,
                items: [],
            },
        ],
    },
    {
        title: "业务组件",
        groups: [],
    },
    {
        title: "原子组件",
        groups: [],
    },
];

export {
    componentMetaTabs,
}
