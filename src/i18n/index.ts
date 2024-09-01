import { createI18n } from "vue-i18n";
import TinyLocale from "@opentiny/vue-locale";
import type { InitI18nOption } from "@opentiny/vue-locale/src/vue3";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

/** 国际化(语言) */
enum Language {
    /** 中文 */
    zhCN = 'zhCN',
    /** 英文 */
    enUS = 'enUS',
}

/** 语言字符串名称 */
type LanguageName = typeof Language[keyof typeof Language];

/** 多语言词条 */
type I18N = Partial<Record<LanguageName, Record<string, any>>>;

/** 语言类型与框架映射 */
const LanguageMapping: Record<LanguageName, { dayjs: string, tiny: string }> = {
    zhCN: {
        dayjs: "zh-cn",
        tiny: "zhCN",
    },
    enUS: {
        dayjs: "en",
        tiny: "enUS",
    },
};

/**
 * 初始化i18n
 */
function initI18n(locale: Language = Language.zhCN) {
    const language = LanguageMapping[locale];
    dayjs.locale(language.dayjs);
    const option: InitI18nOption = {
        i18n: { locale: language.tiny },
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
 * @param locale 语言类型
 */
function switchLocale(locale: Language = Language.zhCN) {
    const language = LanguageMapping[locale];
    dayjs.locale(language.dayjs);

}

export type {
    LanguageName,
    I18N,
}

export {
    Language,
    LanguageMapping,
    initI18n,
    switchLocale,
};
