import { MaterialDependence, MaterialMetaTab } from "@/draggable/types/ComponentMeta";

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
                    "Text", "Button", "ButtonGroup", "Icon", "Link", "Divider", "ActionMenu", "Dropdown",
                ],
            },
            {
                title: "容器(布局)",
                types: [
                    "Layout", "Row", "Col", "Container", "Tabs", "Split",
                ],
            },
            {
                title: "表单",
                types: [
                    "Form",
                    "Input", "InputNumber", "BaseSelect", "Select", "DatePicker", "TimePicker", "DropTimes", "TimeSelect",
                    "Switch", "Checkbox", "CheckboxGroup", "Radio", "RadioGroup", "Slider", "ColorPicker",
                    "FileUpload", "AutoComplete", "Cascader", "Search", "Rate", "Transfer",
                    "TextPopup", "IpAddress",
                ],
            },
            {
                title: "显示",
                types: [
                    "Tree", "Grid", "Image", "QrCode", "Statistic", "Tag", "TagGroup",
                    "Carousel", "Collapse", "UserHead", "Card", "Alert", "Progress",
                    "ScrollText", "Timeline", "CalendarView", "Guide",
                    "Fullscreen", "Wizard", "Milestone", "BulletinBoard", "Crop",
                ],
            },
            {
                title: "容器(功能)",
                types: [
                    "Badge", "Watermark", "PopConfirm", "Popover", "Skeleton", "Tooltip",
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
            // "FloatBar", "FilterPanel",
        ],
    },
];

/** 物料的依赖关系 */
const materialDependence: MaterialDependence = {
    Layout: ["Row", "Col"],
    Tabs: ["TabItem"],
    Form: ["FormItem", "Input", "Row", "Col"],
    Carousel: ["CarouselItem"],
    Collapse: ["CollapseItem"],
};

export {
    materialMetaTabs,
    materialDependence,
}
