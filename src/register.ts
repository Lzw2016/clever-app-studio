import { App } from "vue";
import PrimeVue, { PrimeVueConfiguration } from "primevue/config";
import "primevue/resources/themes/aura-light-blue/theme.css";
import { Language, primeVueLocale } from "@/i18n";

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


export {
    useComponent,
}
