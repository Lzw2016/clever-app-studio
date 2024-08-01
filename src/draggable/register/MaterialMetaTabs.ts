import { MaterialMetaTab } from "@/draggable/types/ComponentMeta";

/** 默认的物料信息 */
const materialMetaTabs: Array<MaterialMetaTab> = [
    {
        title: "常用组件",
        groups: [
            {
                title: "表格",
                types: [
                    "Button",
                ],
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
    {
        title: "原子组件",
        groups: [
            {
                title: "Html元素",
                types: [
                    "div", "span", "a", "p", "br", "hr",
                ],
            },
            {
                title: "基础",
                types: [
                    "Button", "ButtonGroup", "Icon", "Link", "Divider", "ActionMenu", "Dropdown",
                ],
            },
            {
                title: "容器",
                types: [
                    "Layout", "Container", "Tabs", "Split", // "Form",
                    "Badge", "Watermark", "PopConfirm", "Popover", "Skeleton", "Tooltip",
                ],
            },
            {
                title: "表单",
                types: [
                    "Form", "FormItem",
                    "Input", "InputNumber", "Select", "DatePicker", "TimePicker", "DropTimes", "TimeSelect",
                    "Switch", "Checkbox", "CheckboxGroup", "Radio", "RadioGroup", "Slider", "ColorPicker", "FileUpload",
                    "AutoComplete", "Cascader", "Search", "Rate", "Transfer", "TextPopup", "IpAddress",
                ],
            },
            {
                title: "显示",
                types: [
                    "Tree", "Grid", "Image", "QrCode", "Statistic", "Tag", "TagGroup",
                    "Carousel", "Collapse", "UserHead", "Card", "Alert", "Progress",
                    "ScrollText", "Timeline", "CalendarView", "FloatBar", "FilterPanel",
                    "Guide", "Fullscreen", "Wizard", "Milestone", "BulletinBoard", "Crop",
                ],
            },
            {
                title: "导航",
                types: [
                    "FallMenu", "NavMenu", "TreeMenu", "ToggleMenu", "Steps", "Pager", "Anchor", "Breadcrumb",
                ],
            },
            {
                title: "扩展",
                types: [
                    "Slot", "InfiniteScroll", "Loading", "DialogBox", "Drawer", "Modal", "Notify",
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
    //                 "TimeSelect", "Switch", "FileUpload", "Slider", "Rate", "ColorPicker", "AutoComplete",
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
