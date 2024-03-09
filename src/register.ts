import { App } from "vue";
import { componentManage } from "@/draggable/BlockFactory";
import { Button, Input } from "@opentiny/vue";
import { iconCalendar, iconSearch } from "@opentiny/vue-icon";
import PrimeVue from "primevue/config";
import Calendar from "primevue/calendar";
import "primevue/resources/themes/aura-light-blue/theme.css";

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
    componentManage.registerComponent("Button", Button);
    componentManage.registerComponent("Input", Input);
    componentManage.registerComponent("IconSearch", iconSearch());
    componentManage.registerComponent("IconCalendar", iconCalendar());
    componentManage.registerComponent("Calendar", Calendar);
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
