import { MaterialMetaTab } from "@/draggable/types/ComponentMeta";

/** 默认的物料信息 */
const materialMetaTabs: Array<MaterialMetaTab> = [
    {
        title: "常用组件",
        groups: [
            {
                title: "通用",
                types: [
                    "div", "span", "Button", "Input",
                ],
            },
            {
                title: "容器布局",
                types: [],
            },
            {
                title: "表单输入",
                types: [],
            },
            {
                title: "数据展示",
                types: [],
            },
            {
                title: "反馈",
                types: [],
            },
        ],
    },
    {
        title: "业务组件",
        groups: [
            {
                title: "表格",
                types: [
                    "Button",
                ],
            },
            {
                title: "表单",
                types: [
                    "Button",
                ],
            },
        ],
    },
    // {
    //     title: "原子组件",
    //     groups: [
    //         {
    //             title: "基础",
    //             types: [
    //                 "Button", "ButtonGroup", "FloatButton", "ActionMenu", "Icon", "Link", "Typography",
    //             ],
    //         },
    //         {
    //             title: "布局",
    //             types: [
    //                 "Row", "Flex", "Grid", "Layout", "Split", "Space", "Divider",
    //             ],
    //         },
    //         {
    //             title: "容器",
    //             types: [
    //                 "Card", "Collapse", "Modal", "Drawer", "Tabs",
    //             ],
    //         },
    //         {
    //             title: "导航",
    //             types: [
    //                 "Breadcrumb", "Menu", "FallMenu", "NavMenu", "TreeMenu", "Dropdown", "Steps",
    //                 "BackTop", "FloatBar", "Anchor", "PageHeader", "Pagination",
    //             ],
    //         },
    //         {
    //             title: "表单",
    //             types: [
    //                 "Form", "Input", "Textarea", "InputNumber", "Checkbox", "CheckboxGroup", "Radio",
    //                 "RadioGroup", "Select", "Cascader", "TreeSelect", "DatePicker", "TimePicker",
    //                 "TimeSelect", "Switch", "Upload", "Slider", "Rate", "ColorPicker", "AutoComplete",
    //                 "Transfer", "IpAddress", "Mentions", "Search", "Captcha",
    //             ],
    //         },
    //         {
    //             title: "数据",
    //             types: [
    //                 "List", "Table", "Tree", "Descriptions", "Empty", "Image", "Carousel", "Avatar",
    //                 "Badge", "Calendar", "Timeline", "Tag", "TagGroup", "Progress", "Ellipsis",
    //                 "TimeAgo", "Statistic", "QRCode", "Countdown", "Highlight",
    //             ],
    //         },
    //         {
    //             title: "反馈",
    //             types: [
    //                 "Alert", "Message", "Notification", "Toast", "Tooltip", "Popover", "PopConfirm",
    //                 "Spin", "Skeleton", "NProgress", "Tour", "Result", "ScrollText",
    //             ],
    //         },
    //         {
    //             title: "图表",
    //             types: [],
    //         },
    //         {
    //             title: "其它",
    //             types: [
    //                 "Contextmenu", "Video", "Watermark", "FullScreen", "Affix", "Segmented", "GradientText", "Code",
    //             ],
    //         },
    //     ],
    // },
];

export {
    materialMetaTabs,
}
