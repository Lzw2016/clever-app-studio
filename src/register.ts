import { App } from "vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import { componentManage } from "@/draggable/BlockFactory";

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
    componentManage.registerAsyncComponent("Button", () => import("@opentiny/vue-button").then(module => module.default));
    componentManage.registerAsyncComponent("Input", () => import("@opentiny/vue-input").then(module => module.default));
    // import("@opentiny/vue-icon").then(icons => {
    //     for (let iconName in icons) {
    //         const icon = icons[iconName];
    //         if (typeof icon === 'function') {
    //             componentManage.registerComponent(iconName, icon());
    //         }
    //     }
    // });
    componentManage.registerAsyncComponent("IconSearch", () => import("@opentiny/vue-icon/lib/search.js").then(module => module.default()));
    componentManage.registerAsyncComponent("IconCalendar", () => import("@opentiny/vue-icon/lib/calendar.js").then(module => module.default()));
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
