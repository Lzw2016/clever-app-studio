import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件元信息
 */
function registerComponentMeta(componentManage: ComponentManage) {
    // HTML
    componentManage.registerAsyncComponentMeta("div", () => import("@/draggable/register/meta/div").then(module => module.default));
    componentManage.registerAsyncComponentMeta("span", () => import("@/draggable/register/meta/span").then(module => module.default));
    componentManage.registerAsyncComponentMeta("a", () => import("@/draggable/register/meta/a").then(module => module.default));
    componentManage.registerAsyncComponentMeta("br", () => import("@/draggable/register/meta/br").then(module => module.default));
    componentManage.registerAsyncComponentMeta("hr", () => import("@/draggable/register/meta/hr").then(module => module.default));
    // 基础
    componentManage.registerAsyncComponentMeta("Button", () => import("@/draggable/register/meta/Button").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ButtonGroup", () => import("@/draggable/register/meta/ButtonGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Icon", () => import("@/draggable/register/meta/Icon").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Link", () => import("@/draggable/register/meta/Link").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Divider", () => import("@/draggable/register/meta/Divider").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ActionMenu", () => import("@/draggable/register/meta/ActionMenu").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Dropdown", () => import("@/draggable/register/meta/Dropdown").then(module => module.default));
    // 容器
    componentManage.registerAsyncComponentMeta("Layout", () => import("@/draggable/register/meta/Layout").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Container", () => import("@/draggable/register/meta/Container").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Tabs", () => import("@/draggable/register/meta/Tabs").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Split", () => import("@/draggable/register/meta/Split").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Badge", () => import("@/draggable/register/meta/Badge").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Watermark", () => import("@/draggable/register/meta/Watermark").then(module => module.default));
    componentManage.registerAsyncComponentMeta("PopConfirm", () => import("@/draggable/register/meta/PopConfirm").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Popover", () => import("@/draggable/register/meta/Popover").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Skeleton", () => import("@/draggable/register/meta/Skeleton").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Tooltip", () => import("@/draggable/register/meta/Tooltip").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Form", () => import("@/draggable/register/meta/Form").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Input", () => import("@/draggable/register/meta/Input").then(module => module.default));
    componentManage.registerAsyncComponentMeta("InputNumber", () => import("@/draggable/register/meta/InputNumber").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Select", () => import("@/draggable/register/meta/Select").then(module => module.default));
    componentManage.registerAsyncComponentMeta("DatePicker", () => import("@/draggable/register/meta/DatePicker").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TimePicker", () => import("@/draggable/register/meta/TimePicker").then(module => module.default));
    componentManage.registerAsyncComponentMeta("DropTimes", () => import("@/draggable/register/meta/DropTimes").then(module => module.default));
    componentManage.registerAsyncComponentMeta("TimeSelect", () => import("@/draggable/register/meta/TimeSelect").then(module => module.default));


    componentManage.registerAsyncComponentMeta("Cascader", () => import("@/draggable/register/meta/Cascader").then(module => module.default));
}

export {
    registerComponentMeta,
}
