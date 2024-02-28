import {ComponentPublicInstance, WatchCallback, WatchOptions} from "vue";

// -------------------------------------------------------------------------------------------------------------------
// 参考vue类型定义(vue内部的类型定义，直接复制过来的)
// -------------------------------------------------------------------------------------------------------------------

/** 通用的vue组件实例 */
type ComponentInstance = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any>;

/** watch项 */
type ObjectWatchOptionItem = { handler: WatchCallback | string; } & WatchOptions;
type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;
type ComponentWatchOptionItem = WatchOptionItem | WatchOptionItem[];


type ErrorCapturedHook<TError = unknown> = (err: TError, instance: ComponentPublicInstance | null, info: string) => boolean | void;

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

/** 配置式函数(字符串函数代码) */
interface FunctionConfig {
    /** 函数参数名 */
    params?: Array<string> | string;
    /** 函数代码 */
    code: string;
}

export type {
    ComponentInstance,
    ComponentWatchOptionItem,
    ErrorCapturedHook,
    FunctionConfig,
}

export {
    Language,
}
