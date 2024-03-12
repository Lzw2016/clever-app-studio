import { createI18n } from "vue-i18n";
import TinyLocale from "@opentiny/vue-locale";
import type { InitI18nOption } from "@opentiny/vue-locale/src/vue3";
import { usePrimeVue } from "primevue/config";
import PrimeVueZhCN from "./primevue/zh-CN.json";
import AntDesignZhCN from 'ant-design-vue/es/locale/zh_CN';
// import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// dayjs.locale('zh-cn');

/** 国际化(语言) */
enum Language {
    /** 中文 */
    zhCN = 'zh-CN',
    /** 英文 */
    enUS = 'en-US',
}

/** 语言字符串名称 */
type LanguageName = (typeof Language)[keyof typeof Language];

/** 多语言词条 */
type I18N = Partial<Record<LanguageName, Record<string, any>>>;

// primevue的多语言，文件下载地址：https://github.com/primefaces/primelocale
const primeVueLocale: Partial<Record<LanguageName, any>> = {
    "zh-CN": PrimeVueZhCN["zh-CN"],
};

// ant-design-vue的多语言 https://antdv.com/docs/vue/i18n-cn
const antDesignLocale: Partial<Record<LanguageName, any>> = {
    "zh-CN": AntDesignZhCN,
};

/**
 * 初始化i18n
 */
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

/**
 * 切换语言
 * @param locale 语言类型，如：“zhCN”、“”、“”、“”、“”
 */
function switchLocale(locale: Language = Language.zhCN) {
    // 设置 PrimeVue 的语言
    const primevue = usePrimeVue();
    primevue.config.locale = primeVueLocale[locale];
}

export type {
    LanguageName,
    I18N,
}

export {
    Language,
    primeVueLocale,
    antDesignLocale,
    initI18n,
    switchLocale,
};
