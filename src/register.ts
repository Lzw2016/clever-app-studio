import { App } from "vue";
import PrimeVue, { PrimeVueConfiguration } from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import { Language, primeVueLocale } from "@/i18n";
import { componentManage } from "@/draggable/Constant";

/**
 * 配置组件库
 */
function useComponent(app: App) {
    // 配置 PrimeVue 组件库
    app.use(PrimeVue, {
        unstyled: false,
        locale: primeVueLocale[Language.zhCN],
    } as PrimeVueConfiguration);
    // switchLocale(Language.zhCN);
}

/**
 * 注册组件
 */
function registerComponent() {
    // 注册成全局对象
    window['componentManage'] = componentManage;
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
    // componentManage.registerAsyncComponent("OpenTiny", () => import("@/components/OpenTiny"));
    // primevue 组件注册
    componentManage.registerAsyncComponent("Button", () => import("primevue/button").then(module => module.default));
    componentManage.registerAsyncComponent("InputNumber", () => import("primevue/inputnumber").then(module => module.default));
    componentManage.registerAsyncComponent("Calendar", () => import("primevue/calendar").then(module => module.default));
    // ant-design-vue 组件注册
    componentManage.registerAsyncComponent("Avatar", () => import("ant-design-vue/es/avatar").then(module => module.default));
}

/**
 * 注册组件元信息
 */
function registerComponentMeta() {
}

export {
    useComponent,
    registerComponent,
    registerComponentMeta,
}
