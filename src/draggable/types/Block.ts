import {CSSProperties, WatchCallback, WatchOptions} from "vue";
import {ComponentInstance, ErrorCapturedHook, FunctionConfig, Language} from "@/draggable/types/Base";

// -------------------------------------------------------------------------------------------------------------------
// 组件
// -------------------------------------------------------------------------------------------------------------------

/** 组件基础属性 */
interface BaseProps {
    /** 组件内联样式 */
    style?: CSSProperties;
    /** 组件class样式 */
    class?: string;

    [name: string]: any;
}

/** 组件基础事件 */
interface BaseEvent {
    [name: string]: Function;
}

// /** 组件基础指令 */
// interface BaseDirectives {
//     /** 组件的的可见性(表达式，值为boolean) */
//     show?: string;
//     /** 条件性的渲染组件(表达式，值为boolean) */
//     if?: string;
//     /** 条件性的渲染组件(表达式，值为boolean) */
//     once?: string;
//     /** 缓存一个模板的子树(值为: 固定长度的依赖值数组) */
//     memo?: Array<string>;
//
//     [name: string]: any;
// }

/** Bind的对象形式 */
interface BindObject {
    [name: string]: BindObject | string;
}

/** 组件 bind(props的数据绑定) */
type ComponentBind = string | BindObject;

/** 组件 listeners(事件监听函数) */
type ComponentListener = ((...args: any[]) => any) | FunctionConfig | string;

/** 组件节点 */
interface ComponentNode<Props extends BaseProps = BaseProps, Event extends BaseEvent = BaseEvent> {
    /** 组件唯一id */
    id?: string;
    /** 组件类型 */
    type: string;
    /** 当前组件实例的引用名称 */
    ref?: string;
    /** 组件属性 */
    props?: Props;
    /**  */
    bind?: Record<keyof Props, ComponentBind>;
    /** 监听的事件 */
    listeners?: Record<keyof Event, ComponentListener>;
    // /** 组件指令 */
    // directives?: ComponentDirectives;
    // /** 组件插槽 */
    // slots?: Record<string, Array<ComponentNode>>;
    /** 子组件集合 */
    items?: Array<ComponentNode>;
}

// -------------------------------------------------------------------------------------------------------------------
// 区块
// -------------------------------------------------------------------------------------------------------------------

/** 区块 meta(元信息) */
interface BlockMeta {
    /** 区块的标题 */
    title: string,
    /** 区块描述信息 */
    description: string,
    /** 版本 */
    version: string,
    /** 创建时间 */
    createAt: number;
    /** 创建区块的作者 */
    createBy: string;
    /** 更新时间 */
    updateAt?: number;
    /** 最后更新区块的作者 */
    updateBy?: string;

    [name: string]: any;
}

/** 区块 type(实现组件) */
type BlockType = "Block" /*| "PageBlock" | "DialogBlock"*/ | string;

/** 区块 computed(计算数据) */
type ComputedFunction<T = any> = (this: ComponentInstance, oldValue: T, cmp: ComponentInstance) => T;
type BlockComputed = ComputedFunction | FunctionConfig;

/** 区块 watch(数据监听器) */
type ObjectWatchOptionItem = { handler: WatchCallback | string | FunctionConfig; } & WatchOptions;
type WatchOptionItem = string | WatchCallback | FunctionConfig | ObjectWatchOptionItem;
type BlockWatchItem = WatchOptionItem | WatchOptionItem[];

/** 区块 methods(自定义函数) */
type BlockMethod = ((...args: any[]) => any) | FunctionConfig;

/** 区块 lifeCycles(生命周期) */
interface BlockLifeCycles {
    /** 区块实例初始化完成之后立即调用 */
    beforeCreate?: (() => void) | FunctionConfig;
    /** 区块实例处理完所有与状态相关的选项后调用 */
    created?: (() => void) | FunctionConfig;
    /** 区块被挂载之前调用 */
    beforeMount?: (() => void) | FunctionConfig;
    /** 区块挂载完成后执行 */
    mounted?: (() => void) | FunctionConfig;
    /** 区块即将因为一个响应式状态变更而更新其 DOM 树之前调用 */
    beforeUpdate?: (() => void) | FunctionConfig;
    /** 区块因为一个响应式状态变更而更新其 DOM 树之后调用 */
    updated?: (() => void) | FunctionConfig;
    /** 区块实例被卸载之前调用 */
    beforeUnmount?: (() => void) | FunctionConfig;
    /** 区块实例被卸载之后调用 */
    unmounted?: (() => void) | FunctionConfig;
    /** 在捕获了后代组件传递的错误时调用 */
    errorCaptured?: ErrorCapturedHook<Error> | FunctionConfig;
    /** 若区块实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用 */
    activated?: (() => void) | FunctionConfig;
    /** 若区块实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用 */
    deactivated?: (() => void) | FunctionConfig;
}

/** 区块 */
interface BlockDesign<Props extends BaseProps = BaseProps> {
    /** 唯一id */
    id: string;
    /** 元信息 */
    meta?: BlockMeta;
    /** 类型(区块的实现组件) */
    type?: BlockType;
    /** 属性 */
    props?: Props;
    /** 数据 */
    data?: Record<string, any>;
    /** 计算数据 */
    computed?: Record<string, BlockComputed>;
    /** 数据监听器(数据更改时的回调) */
    watch?: Record<string, BlockWatchItem>;
    /** 自定义函数 */
    methods?: Record<string, BlockMethod>;
    /** 生命周期 */
    lifeCycles?: BlockLifeCycles;
    /** 区块的子组件 */
    items?: Array<ComponentNode>;
    /** 多语言词条 */
    i18n?: Record<Language, Record<string, string>>;
}

export type {
    BlockDesign,
}