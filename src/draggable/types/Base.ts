import {Component, ComponentPublicInstance, DefineComponent} from "vue";

// -------------------------------------------------------------------------------------------------------------------
// 参考vue类型定义(vue内部的类型定义，直接复制过来的)
// -------------------------------------------------------------------------------------------------------------------

/** 通用的vue组件实例 */
type ComponentInstance = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any>;

/** 错误处理函数 */
type ErrorCapturedHook<TError = unknown> = (err: TError, instance: ComponentPublicInstance | null, info: string) => boolean | void;

/** vue组件 */
type VueComponent = Component | DefineComponent;

/**
 * 异步vue组件，
 * 推荐使用 () => import("@/component/Component.vue") 方式，自动切分打包文件
 */
type AsyncVueComponent = () => Promise<VueComponent>;

// -------------------------------------------------------------------------------------------------------------------
// 共用类型定义
// -------------------------------------------------------------------------------------------------------------------

/** 国际化(语言) */
enum Language {
    /** 中文 */
    zhCN = 'zh-CN',
    /** 英文 */
    enUS = 'en-US',
}

type LanguageName = (typeof Language)[keyof typeof Language];

/** 多语言词条 */
type I18N = Partial<Record<LanguageName, Record<string, string>>>;

/** 配置式函数(字符串函数代码) */
interface FunctionConfig {
    /** 函数参数名 */
    params?: Array<string> | string;
    /** 函数代码 */
    code: string;
}

/** 通用函数 */
type AnyFunction<R = any> = (...args: any[]) => R;

export type {
    ComponentInstance,
    ErrorCapturedHook,
    VueComponent,
    AsyncVueComponent,
    LanguageName,
    I18N,
    FunctionConfig,
    AnyFunction,
}

export {
    Language,
}
