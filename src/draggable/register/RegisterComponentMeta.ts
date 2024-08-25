import { AsyncComponentMeta, ComponentMeta } from "@/draggable/types/ComponentMeta";
import { ComponentManage } from "@/draggable/types/ComponentManage";

let componentMetas: Record<string, ComponentMeta>;

async function loadComponentMetas(): Promise<Record<string, ComponentMeta>> {
    if (!componentMetas) componentMetas = await import("@/draggable/register/meta");
    return componentMetas;
}

const loadComponentMeta: AsyncComponentMeta = async type => (await loadComponentMetas())[type];

/**
 * 注册组件元信息
 */
function registerComponentMeta(componentManage: ComponentManage) {
    // HTML
    componentManage.registerAsyncComponentMeta("div", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("span", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("a", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("p", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("br", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("hr", loadComponentMeta);
    // 基础
    componentManage.registerAsyncComponentMeta("Text", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Button", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ButtonGroup", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Icon", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Link", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Divider", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ActionMenu", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Dropdown", loadComponentMeta);
    // 容器(布局)
    componentManage.registerAsyncComponentMeta("Layout", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Row", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Col", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Container", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Tabs", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TabItem", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Split", loadComponentMeta);
    // 容器(功能)
    componentManage.registerAsyncComponentMeta("Badge", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Watermark", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("PopConfirm", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Popover", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Skeleton", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Tooltip", loadComponentMeta);
    // 表单
    componentManage.registerAsyncComponentMeta("Form", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("FormItem", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Input", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("InputNumber", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("BaseSelect", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Select", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("DatePicker", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TimePicker", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("DropTimes", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TimeSelect", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Switch", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Checkbox", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("CheckboxButton", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("CheckboxGroup", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Radio", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("RadioButton", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("RadioGroup", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Slider", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ColorPicker", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ColorSelectPanel", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("FileUpload", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("AutoComplete", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Cascader", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Search", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Rate", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Transfer", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TextPopup", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("IpAddress", loadComponentMeta);
    // 显示
    componentManage.registerAsyncComponentMeta("Tree", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Grid", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Image", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("QrCode", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Statistic", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Tag", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TagGroup", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Carousel", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("CarouselItem", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Collapse", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("CollapseItem", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("UserHead", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Card", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Alert", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Progress", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ScrollText", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Timeline", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("CalendarView", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("FloatBar", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("FilterPanel", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Guide", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Fullscreen", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Wizard", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Milestone", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("BulletinBoard", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Crop", loadComponentMeta);
    // 导航
    componentManage.registerAsyncComponentMeta("FallMenu", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("NavMenu", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("TreeMenu", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("ToggleMenu", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Steps", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Pager", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Anchor", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Breadcrumb", loadComponentMeta);
    // 扩展
    componentManage.registerAsyncComponentMeta("Slot", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("InfiniteScroll", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Loading", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("DialogBox", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Drawer", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Modal", loadComponentMeta);
    componentManage.registerAsyncComponentMeta("Notify", loadComponentMeta);
}

export {
    registerComponentMeta,
}
