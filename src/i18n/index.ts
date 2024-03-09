import { createI18n } from "vue-i18n";
import TinyLocale from "@opentiny/vue-locale";
import type { InitI18nOption } from "@opentiny/vue-locale/src/vue3";

/** 初始i18n */
function initI18n(locale: string = "zhCN") {
    const option: InitI18nOption = {
        i18n: { locale: locale },
        createI18n: createI18n,
        messages: {
            zhCN: {},
            enUS: {},
        },
    };
    return TinyLocale.initI18n(option);
}

export default initI18n;
