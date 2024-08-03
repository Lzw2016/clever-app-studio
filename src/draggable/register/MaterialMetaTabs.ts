import { MaterialMetaTab } from "@/draggable/types/ComponentMeta";

/** 默认的物料信息 */
const materialMetaTabs: Array<MaterialMetaTab> = [
    // {
    //     title: "常用组件",
    //     groups: [
    //         {
    //             title: "表格",
    //             types: [
    //                 "Button",
    //             ],
    //         },
    //     ],
    // },
    // {
    //     title: "业务组件",
    //     groups: [
    //         {
    //             title: "表格",
    //             types: [
    //                 "Button",
    //             ],
    //         },
    //         {
    //             title: "表单",
    //             types: [
    //                 "Button",
    //             ],
    //         },
    //     ],
    // },
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
];

export {
    materialMetaTabs,
}
