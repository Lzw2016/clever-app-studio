import { Component, ComponentPublicInstance, DefineComponent } from "vue";

// -------------------------------------------------------------------------------------------------------------------
// 参考vue类型定义(vue内部的类型定义，直接复制过来的)
// -------------------------------------------------------------------------------------------------------------------

/** 通用的vue组件实例 */
type ComponentInstance = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any>;

/** 错误处理函数 */
type ErrorCapturedHook<TError = unknown> = (this: ComponentInstance, err: TError, instance: ComponentPublicInstance | null, info: string) => boolean | void;

/** vue组件 */
type VueComponent = Component | DefineComponent;

/**
 * 异步vue组件，
 * 推荐使用 () => import("@/component/Component.vue") 方式，自动切分打包文件
 */
type AsyncVueComponent = (type: string) => Promise<VueComponent>;

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

/** 语言字符串名称 */
type LanguageName = (typeof Language)[keyof typeof Language];

/** 多语言词条 */
type I18N = Partial<Record<LanguageName, Record<string, string>>>;

/** 配置式函数(字符串函数代码) */
interface FunctionConfig {
    /** 是否是异步函数 */
    async?: boolean;
    /** 函数参数名 */
    params?: Array<string> | string;
    /** 函数代码 */
    code: string;
}

/** 通用函数 */
type AnyFunction<T = any, R = any> = (this: T, ...args: any[]) => R;

/** 代码示例 */
interface CodeExample {
    /** 示例标题 */
    title: string;
    /** 详细描述 */
    description?: string;
    /** 示例代码 */
    code: string | Array<string>;
}

/** 变量类型 */
enum VarType {
    Void = 'void',
    Boolean = 'boolean',
    Number = 'number',
    String = 'string',
    Symbol = 'symbol',
    Bigint = 'bigint',
    Object = 'object',
    Array = 'array',
    Date = 'date',
    Function = 'function',
    RegExp = 'regexp',
    Map = 'map',
    Set = 'set',
    Promise = 'promise',
}

/** 变量类型 */
type FunctionVarType = VarType | string;

/** 函数参数信息 */
interface FunctionParamMeta {
    /** 函数参数名称 */
    name: string;
    /** 参数类型 */
    type: FunctionVarType;
    /** 参数描述 */
    note?: string
}

/** 函数元信息 */
interface FunctionMeta {
    /** 简单说明 */
    title: string;
    /** 函数描述 */
    description?: string;
    /** 函数名称 */
    name: string;
    /** 函数参数 */
    params?: Array<FunctionParamMeta>;
    /** 返回值类型 */
    return?: FunctionVarType;
    /** 使用示例(代码片段) */
    examples?: Array<CodeExample>;
}

/** 组件插槽元信息 */
interface ComponentSlotMeta {
    /** 简单说明 */
    title: string;
    /** 插槽描述 */
    description?: string;
    /** 插槽名称 */
    name: string;
    /** 插槽属性 */
    slotProps?: Record<string, Omit<FunctionParamMeta, 'name'>>;
    /** 使用示例(代码片段) */
    examples?: Array<CodeExample>;
}

export type {
    ComponentInstance,
    ErrorCapturedHook,
    VueComponent,
    AsyncVueComponent,
    LanguageName,
    I18N,
    FunctionConfig,
    AnyFunction,
    CodeExample,
    FunctionVarType,
    FunctionParamMeta,
    FunctionMeta,
    ComponentSlotMeta,
}

export {
    Language,
    VarType,
}
