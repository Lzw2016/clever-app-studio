import { Component, ComponentInternalInstance, ComponentPublicInstance, DefineComponent } from "vue";
import { I18N, Language, LanguageName } from "@/i18n";
import { BaseProps } from "@/draggable/types/DesignBlock";

// -------------------------------------------------------------------------------------------------------------------
// 参考vue类型定义(vue内部的类型定义，直接复制过来的)
// -------------------------------------------------------------------------------------------------------------------

// /** 通用的vue组件实例 */
// type ComponentInstance = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any>;

/** 自定义的 vue 组件实例类型 */
interface ComponentInstance {
    $: ComponentInternalInstance;
    $data: any;
    $props: Record<string, any>;
    $attrs: Record<string, any>;
    $refs: Record<string, HTMLElement & ComponentInstance>;
    $slots: Record<string, any>;
    $root: ComponentInstance;
    $parent: ComponentInstance;
    $emit: ComponentPublicInstance['$emit'];
    $el: HTMLElement;
    $options: ComponentPublicInstance['$options'];
    $forceUpdate: ComponentPublicInstance['$forceUpdate'];
    $nextTick: ComponentPublicInstance['$nextTick'];
    $watch: ComponentPublicInstance['$watch'];

    [name: string]: any;
}

/** 错误处理函数 */
type ErrorCapturedHook<TError = unknown> = (this: ComponentInstance, err: TError, instance: ComponentPublicInstance | null, info: string) => boolean | void;

/** vue组件 */
type VueComponent = Component | DefineComponent;

/**
 * 异步vue组件，
 * 推荐使用 () => import("@/component/Component.vue") 方式，自动切分打包文件
 */
type AsyncVueComponent = (type: string) => Promise<VueComponent>;

/** html标签 */
type HtmlTag = 'address' | 'article' | 'aside' | 'footer' | 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'main' | 'nav' | 'section'
    | 'blockquote' | 'dd' | 'div' | 'dl' | 'dt' | 'figcaption' | 'figure' | 'hr' | 'li' | 'menu' | 'ol' | 'p' | 'pre' | 'ul'
    | 'a' | 'abbr' | 'b' | 'bdi' | 'bdo' | 'br' | 'cite' | 'code' | 'data' | 'dfn' | 'em' | 'i' | 'kbd' | 'mark' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'small' | 'span' | 'strong' | 'sub' | 'sup' | 'time' | 'u' | 'var' | 'wbr'
    | 'area' | 'audio' | 'img' | 'map' | 'track' | 'video'
    | 'embed' | 'iframe' | 'object' | 'picture' | 'portal' | 'source'
    | 'svg' | 'math'
    | 'canvas' | 'noscript' | 'script'
    | 'del' | 'ins'
    | 'caption' | 'col' | 'colgroup' | 'table' | 'tbody' | 'td' | 'tfoot' | 'th' | 'thead' | 'tr'
    | 'button' | 'datalist' | 'fieldset' | 'form' | 'input' | 'label' | 'legend' | 'meter' | 'optgroup' | 'option' | 'output' | 'progress' | 'select' | 'textarea'
    | 'details' | 'dialog' | 'summary'
    | 'slot' | 'template';

// -------------------------------------------------------------------------------------------------------------------
// 共用类型定义
// -------------------------------------------------------------------------------------------------------------------

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
type ParamVarType = VarType | string;

/** 函数参数信息 */
interface ParamMeta {
    /** 函数参数名称 */
    name: string;
    /** 参数类型 */
    type: ParamVarType;
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
    params?: Array<ParamMeta>;
    /** 返回值类型 */
    return?: ParamVarType;
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
    slotProps?: Record<string, Omit<ParamMeta, 'name'>>;
    /** 使用示例(代码片段) */
    examples?: Array<CodeExample>;
}

/** 组件参数对象(简单的组件参数) */
interface ComponentParam {
    /** 组件参数对象标识 */
    __component_param: true;
    /** 组件类型或html标签 */
    type: HtmlTag | string;
    /** 组件属性 */
    props?: BaseProps;
    /** 子节点 */
    children?: Array<any>;
    /** 是否转换成函数形式 */
    isFunction?: boolean;

    [name: string]: any;
}

/** 函数参数对象 */
interface FunctionParam extends FunctionConfig {
    /** 组件参数对象标识 */
    __function_param: true;
}

export type {
    ComponentInstance,
    ErrorCapturedHook,
    VueComponent,
    AsyncVueComponent,
    HtmlTag,
    LanguageName,
    I18N,
    FunctionConfig,
    AnyFunction,
    CodeExample,
    ParamVarType,
    ParamMeta,
    FunctionMeta,
    ComponentSlotMeta,
    ComponentParam,
    FunctionParam,
}

export {
    Language,
    VarType,
}
