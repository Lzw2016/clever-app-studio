import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件
 */
function registerComponent(componentManage: ComponentManage) {
    // 注册 fortawesome 图标
    // componentManage.registerAsyncComponent("FontAwesomeIcon", async () => {
    //     const { FontAwesomeIcon } = await import("@fortawesome/vue-fontawesome");
    //     const { library } = await import("@fortawesome/fontawesome-svg-core");
    //     const { fas } = await import("@fortawesome/free-solid-svg-icons");
    //     const { far } = await import("@fortawesome/free-regular-svg-icons");
    //     const { fab } = await import("@fortawesome/free-brands-svg-icons");
    //     library.add(fas); // 数量: 1953
    //     library.add(far); // 数量: 257
    //     library.add(fab); // 数量: 518
    //     return FontAwesomeIcon;
    // });
    // 注册 tabler 图标
    // componentManage.batchRegisterComponent(/^TablerIcon\w+$/, async () => {
    //     const TablerIcons = await import("@tabler/icons-vue");
    //     for (let name in TablerIcons) {
    //         if (!name.startsWith("Icon")) {
    //             continue;
    //         }
    //         componentManage.registerComponent(`Tabler${name}`, TablerIcons[name]);
    //     }
    // });
    // 注册 google 图标
    // componentManage.registerAsyncComponent("GoogleIcon", () => import("@/components/GoogleIcon.vue").then(module => module.default));
    // opentiny 组件注册
    const openTinyTypes = [
        "Button", "ButtonGroup", "Cascader",
    ];
    componentManage.batchRegisterComponent(new RegExp(openTinyTypes.join("|")), async () => {
        const openTiny = await import("@/draggable/components/material/OpenTiny");
        for (let type of openTinyTypes) {
            const component = openTiny[type];
            if (component) componentManage.registerComponent(type, component);
        }
    });
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
