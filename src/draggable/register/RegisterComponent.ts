import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件
 */
function registerComponent(componentManage: ComponentManage) {
    // 注册 fontawesome 图标
    componentManage.registerAsyncComponent("FontAwesomeIcon", async () => {
        const { FontAwesomeIcon } = await import("@fortawesome/vue-fontawesome");
        const { library } = await import("@fortawesome/fontawesome-svg-core");
        const { fas } = await import("@fortawesome/free-solid-svg-icons");
        const { far } = await import("@fortawesome/free-regular-svg-icons");
        const { fab } = await import("@fortawesome/free-brands-svg-icons");
        library.add(fas); // 数量: 1953
        library.add(far); // 数量: 257
        library.add(fab); // 数量: 518
        return FontAwesomeIcon;
    });
    // 注册 tabler 图标
    componentManage.batchRegisterComponent(/^TablerIcon\w+$/, async () => {
        const tablerIcons = await import("@tabler/icons-vue");
        for (let name in tablerIcons) {
            if (!name.startsWith("Icon")) {
                continue;
            }
            componentManage.registerComponent(`Tabler${name}`, tablerIcons[name]);
        }
    });
    // 注册 google 图标
    componentManage.registerAsyncComponent("GoogleIcon", () => import("@/components/GoogleIcon.vue").then(module => module.default));
    // 注册自定义原子组件
    componentManage.registerAsyncComponent("Text", () => import("@/draggable/register/components/Text.vue").then(module => module.default));
    componentManage.registerAsyncComponent("Icon", () => import("@/draggable/register/components/Icon.vue").then(module => module.default));
    // opentiny 组件注册
    // "CascaderPanel","DropTimes","Link","Popeditor","PopUpload","CheckboxButton","RadioButton", "ColorSelectPanel",
    const openTinyTypes: Record<string, string> = {
        // 基础
        Button: "Button",
        ButtonGroup: "ButtonGroup",
        Link: "Link",
        Divider: "Divider",
        ActionMenu: "ActionMenu",
        Dropdown: "Dropdown",
        // 容器(布局)
        Layout: "Layout",
        Row: "Row",
        Col: "Col",
        Container: "Container",
        Tabs: "Tabs",
        TabItem: "TabItem",
        Split: "Split",
        // 表单
        Form: "Form",
        FormItem: "FormItem",
        Input: "Input",
        InputNumber: "Numeric",
        Select: "Select",
        BaseSelect: "BaseSelect",
        DatePicker: "DatePicker",
        TimePicker: "TimePicker",
        DropTimes: "DropTimes",
        TimeSelect: "TimeSelect",
        Switch: "Switch",
        Checkbox: "Checkbox",
        CheckboxButton: "CheckboxButton",
        CheckboxGroup: "CheckboxGroup",
        Radio: "Radio",
        RadioButton: "RadioButton",
        RadioGroup: "RadioGroup",
        Slider: "Slider",
        ColorPicker: "ColorPicker",
        ColorSelectPanel: "ColorSelectPanel",
        FileUpload: "FileUpload",
        AutoComplete: "Autocomplete",
        Cascader: "Cascader",
        CascaderPanel: "CascaderPanel",
        Search: "Search",
        Rate: "Rate",
        Transfer: "Transfer",
        TextPopup: "TextPopup",
        IpAddress: "IpAddress",
        // 显示
        Tree: "Tree",
        Grid: "Grid",
        Image: "Image",
        QrCode: "QrCode",
        Statistic: "Statistic",
        Tag: "Tag",
        TagGroup: "TagGroup",
        Carousel: "Carousel",
        CarouselItem: "CarouselItem",
        Collapse: "Collapse",
        CollapseItem: "CollapseItem",
        UserHead: "UserHead",
        Card: "Card",
        Alert: "Alert",
        Progress: "Progress",
        ScrollText: "ScrollText",
        Timeline: "TimeLine",
        CalendarView: "CalendarView",
        Wizard: "Wizard",
        Milestone: "Milestone",
        BulletinBoard: "BulletinBoard",
        Crop: "Crop",
        // 容器(功能)
        Badge: "Badge",
        Watermark: "Watermark",
        PopConfirm: "Popconfirm",
        Popover: "Popover",
        Skeleton: "Skeleton",
        Tooltip: "Tooltip",
        Guide: "Guide",
        Fullscreen: "Fullscreen",
        // 导航
        FallMenu: "FallMenu",
        NavMenu: "NavMenu",
        TreeMenu: "TreeMenu",
        ToggleMenu: "ToggleMenu",
        Steps: "Steps",
        Pager: "Pager",
        Anchor: "Anchor",
        Breadcrumb: "Breadcrumb",
        BreadcrumbItem: "BreadcrumbItem",
        // 扩展
        Loading: "Loading",
        DialogBox: "DialogBox",
        Drawer: "Drawer",
        Modal: "Modal",
        Notify: "Notify",
        //
        FloatBar: "Floatbar",
        FilterPanel: "FilterPanel",
    };
    componentManage.batchRegisterComponent(new RegExp(Object.keys(openTinyTypes).join("|")), async () => {
        const openTiny = await import("@/draggable/register/components/OpenTiny");
        for (let componentName in openTinyTypes) {
            const openTinyName = openTinyTypes[componentName];
            const component = openTiny[openTinyName];
            if (!component) {
                console.warn(`@opentiny/vue中不存在组件：${openTinyName}`);
                continue;
            }
            componentManage.registerComponent(componentName, component);
        }
    });
    // componentManage.registerAsyncComponent("Divider", () => import("@/draggable/register/components/Divider").then(module => module.default));
    // primevue 组件注册
    // componentManage.registerAsyncComponent("Button", () => import("primevue/button").then(module => module.default));
    // componentManage.registerAsyncComponent("InputNumber", () => import("primevue/inputnumber").then(module => module.default));
    // componentManage.registerAsyncComponent("Calendar", () => import("primevue/calendar").then(module => module.default));
    // ant-design-vue 组件注册
    // componentManage.registerAsyncComponent("Avatar", () => import("ant-design-vue/es/avatar").then(module => module.default));
}

export {
    registerComponent,
}
