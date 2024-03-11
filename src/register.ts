import { App } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import { componentManage } from "@/draggable/BlockFactory";

// const FaSolidIcons = await import("@fortawesome/free-solid-svg-icons");
// const icon: FaIcon = FaSolidIcons[key];
// interface FaIcon {
//     /** 图标前缀 */
//     prefix: "fas" | string;
//     /** 图标名称，如："weight-scale"、"window-minimize" */
//     iconName: string;
//     /** 图标内容 */
//     icon: Array<any>;
// }

/**
 * 配置组件库
 */
function useComponent(app: App) {
    // 配置 PrimeVue 组件库
    app.use(PrimeVue, { unstyled: false });
}

/**
 * 注册组件
 */
function registerComponent() {
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
    componentManage.registerAsyncComponent("Button", () => import("primevue/button").then(module => module.default));
    componentManage.registerAsyncComponent("InputNumber", () => import("primevue/inputnumber").then(module => module.default));
    componentManage.registerAsyncComponent("Calendar", () => import("primevue/calendar").then(module => module.default));
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
