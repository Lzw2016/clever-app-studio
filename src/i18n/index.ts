// import { createI18n } from "vue-i18n";
import { usePrimeVue } from "primevue/config";
import PrimeVueZhCN from "./primevue/zh-CN.json";

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

/**
 * 初始化i18n
 */
function initI18n(locale: string = "zhCN") {
    // const option: InitI18nOption = {
    //     i18n: { locale: locale },
    //     createI18n: createI18n,
    //     messages: {
    //         zhCN: {},
    //         enUS: {},
    //     },
    // };
    // return TinyLocale.initI18n(option);
}

// 设置 PrimeVue 的语言
function setPrimeVueLocale(locale: Language) {
    const primevue = usePrimeVue();
    primevue.config.locale = primeVueLocale[locale];
}

/**
 * 切换语言
 * @param locale 语言类型，如：“zhCN”、“”、“”、“”、“”
 */
function switchLocale(locale: Language = Language.zhCN) {
    setPrimeVueLocale(locale);
}

export type {
    LanguageName,
    I18N,
}

export {
    Language,
    primeVueLocale,
    initI18n,
    switchLocale,
};
