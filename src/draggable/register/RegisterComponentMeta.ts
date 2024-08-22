import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件元信息
 */
function registerComponentMeta(componentManage: ComponentManage) {
    // HTML
    componentManage.registerAsyncComponentMeta("div", () => import("@/draggable/register/meta/div").then(module => module.default));
    componentManage.registerAsyncComponentMeta("span", () => import("@/draggable/register/meta/span").then(module => module.default));
    componentManage.registerAsyncComponentMeta("a", () => import("@/draggable/register/meta/a").then(module => module.default));
    componentManage.registerAsyncComponentMeta("p", () => import("@/draggable/register/meta/p").then(module => module.default));
    componentManage.registerAsyncComponentMeta("br", () => import("@/draggable/register/meta/br").then(module => module.default));
    componentManage.registerAsyncComponentMeta("hr", () => import("@/draggable/register/meta/hr").then(module => module.default));
    // 基础
    componentManage.registerAsyncComponentMeta("Text", () => import("@/draggable/register/meta/Text").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Button", () => import("@/draggable/register/meta/Button").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ButtonGroup", () => import("@/draggable/register/meta/ButtonGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Icon", () => import("@/draggable/register/meta/Icon").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Link", () => import("@/draggable/register/meta/Link").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Divider", () => import("@/draggable/register/meta/Divider").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ActionMenu", () => import("@/draggable/register/meta/ActionMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Dropdown", () => import("@/draggable/register/meta/Dropdown").then(module => module.default));
    // 容器(布局)
    componentManage.registerAsyncComponentMeta("Layout", () => import("@/draggable/register/meta/Layout").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Row", () => import("@/draggable/register/meta/Row").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Col", () => import("@/draggable/register/meta/Col").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Container", () => import("@/draggable/register/meta/Container").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Tabs", () => import("@/draggable/register/meta/Tabs").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TabItem", () => import("@/draggable/register/meta/TabItem").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Split", () => import("@/draggable/register/meta/Split").then(module => module.default));
    // 容器(功能)
    componentManage.registerAsyncComponentMeta("Badge", () => import("@/draggable/register/meta/Badge").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Watermark", () => import("@/draggable/register/meta/Watermark").then(module => module.default));
    componentManage.registerAsyncComponentMeta("PopConfirm", () => import("@/draggable/register/meta/PopConfirm").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Popover", () => import("@/draggable/register/meta/Popover").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Skeleton", () => import("@/draggable/register/meta/Skeleton").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Tooltip", () => import("@/draggable/register/meta/Tooltip").then(module => module.default));
    // 表单
    componentManage.registerAsyncComponentMeta("Form", () => import("@/draggable/register/meta/Form").then(module => module.default));
    componentManage.registerAsyncComponentMeta("FormItem", () => import("@/draggable/register/meta/FormItem").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Input", () => import("@/draggable/register/meta/Input").then(module => module.default));
    componentManage.registerAsyncComponentMeta("InputNumber", () => import("@/draggable/register/meta/InputNumber").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Select", () => import("@/draggable/register/meta/Select").then(module => module.default));
    componentManage.registerAsyncComponentMeta("DatePicker", () => import("@/draggable/register/meta/DatePicker").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TimePicker", () => import("@/draggable/register/meta/TimePicker").then(module => module.default));
    componentManage.registerAsyncComponentMeta("DropTimes", () => import("@/draggable/register/meta/DropTimes").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TimeSelect", () => import("@/draggable/register/meta/TimeSelect").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Switch", () => import("@/draggable/register/meta/Switch").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Checkbox", () => import("@/draggable/register/meta/Checkbox").then(module => module.default));
    componentManage.registerAsyncComponentMeta("CheckboxButton", () => import("@/draggable/register/meta/CheckboxButton").then(module => module.default));
    componentManage.registerAsyncComponentMeta("CheckboxGroup", () => import("@/draggable/register/meta/CheckboxGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Radio", () => import("@/draggable/register/meta/Radio").then(module => module.default));
    componentManage.registerAsyncComponentMeta("RadioButton", () => import("@/draggable/register/meta/RadioButton").then(module => module.default));
    componentManage.registerAsyncComponentMeta("RadioGroup", () => import("@/draggable/register/meta/RadioGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Slider", () => import("@/draggable/register/meta/Slider").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ColorPicker", () => import("@/draggable/register/meta/ColorPicker").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ColorSelectPanel", () => import("@/draggable/register/meta/ColorSelectPanel").then(module => module.default));
    componentManage.registerAsyncComponentMeta("FileUpload", () => import("@/draggable/register/meta/FileUpload").then(module => module.default));
    componentManage.registerAsyncComponentMeta("AutoComplete", () => import("@/draggable/register/meta/AutoComplete").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Cascader", () => import("@/draggable/register/meta/Cascader").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Search", () => import("@/draggable/register/meta/Search").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Rate", () => import("@/draggable/register/meta/Rate").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Transfer", () => import("@/draggable/register/meta/Transfer").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TextPopup", () => import("@/draggable/register/meta/TextPopup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("IpAddress", () => import("@/draggable/register/meta/IpAddress").then(module => module.default));
    // 显示
    componentManage.registerAsyncComponentMeta("Tree", () => import("@/draggable/register/meta/Tree").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Grid", () => import("@/draggable/register/meta/Grid").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Image", () => import("@/draggable/register/meta/Image").then(module => module.default));
    componentManage.registerAsyncComponentMeta("QrCode", () => import("@/draggable/register/meta/QrCode").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Statistic", () => import("@/draggable/register/meta/Statistic").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Tag", () => import("@/draggable/register/meta/Tag").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TagGroup", () => import("@/draggable/register/meta/TagGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Carousel", () => import("@/draggable/register/meta/Carousel").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Collapse", () => import("@/draggable/register/meta/Collapse").then(module => module.default));
    componentManage.registerAsyncComponentMeta("UserHead", () => import("@/draggable/register/meta/UserHead").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Card", () => import("@/draggable/register/meta/Card").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Alert", () => import("@/draggable/register/meta/Alert").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Progress", () => import("@/draggable/register/meta/Progress").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ScrollText", () => import("@/draggable/register/meta/ScrollText").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Timeline", () => import("@/draggable/register/meta/Timeline").then(module => module.default));
    componentManage.registerAsyncComponentMeta("CalendarView", () => import("@/draggable/register/meta/CalendarView").then(module => module.default));
    componentManage.registerAsyncComponentMeta("FloatBar", () => import("@/draggable/register/meta/FloatBar").then(module => module.default));
    componentManage.registerAsyncComponentMeta("FilterPanel", () => import("@/draggable/register/meta/FilterPanel").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Guide", () => import("@/draggable/register/meta/Guide").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Fullscreen", () => import("@/draggable/register/meta/Fullscreen").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Wizard", () => import("@/draggable/register/meta/Wizard").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Milestone", () => import("@/draggable/register/meta/Milestone").then(module => module.default));
    componentManage.registerAsyncComponentMeta("BulletinBoard", () => import("@/draggable/register/meta/BulletinBoard").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Crop", () => import("@/draggable/register/meta/Crop").then(module => module.default));
    // 导航
    componentManage.registerAsyncComponentMeta("FallMenu", () => import("@/draggable/register/meta/FallMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("NavMenu", () => import("@/draggable/register/meta/NavMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TreeMenu", () => import("@/draggable/register/meta/TreeMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ToggleMenu", () => import("@/draggable/register/meta/ToggleMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Steps", () => import("@/draggable/register/meta/Steps").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Pager", () => import("@/draggable/register/meta/Pager").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Anchor", () => import("@/draggable/register/meta/Anchor").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Breadcrumb", () => import("@/draggable/register/meta/Breadcrumb").then(module => module.default));
    // 扩展
    componentManage.registerAsyncComponentMeta("Slot", () => import("@/draggable/register/meta/Slot").then(module => module.default));
    componentManage.registerAsyncComponentMeta("InfiniteScroll", () => import("@/draggable/register/meta/InfiniteScroll").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Loading", () => import("@/draggable/register/meta/Loading").then(module => module.default));
    componentManage.registerAsyncComponentMeta("DialogBox", () => import("@/draggable/register/meta/DialogBox").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Drawer", () => import("@/draggable/register/meta/Drawer").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Modal", () => import("@/draggable/register/meta/Modal").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Notify", () => import("@/draggable/register/meta/Notify").then(module => module.default));
}

export {
    registerComponentMeta,
}
