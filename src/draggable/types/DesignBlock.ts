import { CSSProperties, WatchCallback, WatchOptions } from "vue";
import { AnyFunction, ComponentInstance, ErrorCapturedHook, FunctionConfig, I18N } from "@/draggable/types/Base";

// -------------------------------------------------------------------------------------------------------------------
// 组件
// -------------------------------------------------------------------------------------------------------------------

/** 组件基础属性 */
interface BaseProps {
    /** 组件内联样式 */
    style?: CSSProperties | Partial<Record<keyof CSSProperties, string>>;
    /** 组件class样式 */
    class?: string;

    [name: string]: any;
}

/** 组件基础事件 */
interface BaseEvent {
    [name: string]: AnyFunction;
}

/** 组件基础指令 */
interface BaseDirectives {
    /** 组件的的可见性(表达式，值为boolean) */
    show?: string;
    /** 条件性的渲染组件(表达式，值为boolean) */
    if?: string;
    /** 基于原始数据多次渲染组件 */
    for?: {
        /** 原始数据表达式 */
        data: string;
        /** 子节点的key取值(item对象的属性名) */
        key: string,
        /**
         * index 变量名
         * 当原始数据是数组时，数组的index
         * 当原始数据是对象时，对象的key
         */
        index: string,
        /**
         * item 变量名
         * 当原始数据是数组时，数组的item
         * 当原始数据是对象时，对象的value
         */
        item: string;
    };

    [name: string]: any;
}

/** Listener的对象形式 */
interface ListenerFunctionConfig {
    handler: AnyFunction<ComponentInstance> | FunctionConfig | string;
    /** 事件修饰符 */
    modifiers?: Array<string>;
}

/** 组件 listeners(事件监听函数) */
type ComponentListener = AnyFunction<ComponentInstance> | (FunctionConfig & { modifiers?: Array<string>; }) | ListenerFunctionConfig | string;

/** 组件插槽类型 */
type ComponentSlotsItem = ComponentNode | Omit<DesignBlock, "meta" | "i18n"> | string;

/** 组件节点 */
interface ComponentNode<Props extends BaseProps = BaseProps, Event extends BaseEvent = BaseEvent, Directives extends BaseDirectives = BaseDirectives> {
    /** 组件唯一id */
    id?: string;
    /** 组件类型，默认是 Fragment */
    type?: string;
    /** 当前组件实例的引用名称 */
    ref?: string;
    /** 组件属性 */
    props?: Props;
    /** 监听的事件 */
    listeners?: Record<keyof Event, ComponentListener>;
    /** 组件指令 */
    directives?: Directives;
    /** 组件插槽(default插槽其实就是children) */
    slots?: Record<string, Array<ComponentSlotsItem> | ComponentSlotsItem>;
    /** 子组件集合 */
    items?: Array<ComponentSlotsItem> | ComponentSlotsItem;
    /** html模版(优先级低于 items) */
    tpl?: Array<string> | string;
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

/** 区块 computed(计算数据) */
type ComputedFunction<T = any> = (this: ComponentInstance, oldValue: T, block: ComponentInstance) => T;
type BlockComputed = ComputedFunction | FunctionConfig | string;

/** 区块 watch(数据监听器) */
type ObjectWatchOptionItem = { handler: WatchCallback | string | FunctionConfig; } & WatchOptions;
type WatchOptionItem = string | WatchCallback | FunctionConfig | ObjectWatchOptionItem;
type BlockWatchItem = WatchOptionItem | WatchOptionItem[];

/** 区块 methods(自定义函数) */
type BlockMethod = AnyFunction<ComponentInstance> | FunctionConfig;

/** 常规生命周期函数 */
type LifeCycleFunction = (this: ComponentInstance, block: ComponentInstance) => void;

/** 区块 lifeCycles(生命周期) */
interface BlockLifeCycles {
    /** 区块实例初始化完成之后立即调用 */
    beforeCreate?: LifeCycleFunction | FunctionConfig | string;
    /** 区块实例处理完所有与状态相关的选项后调用 */
    created?: LifeCycleFunction | FunctionConfig | string;
    /** 区块被挂载之前调用 */
    beforeMount?: LifeCycleFunction | FunctionConfig | string;
    /** 区块挂载完成后执行 */
    mounted?: LifeCycleFunction | FunctionConfig | string;
    /** 区块即将因为一个响应式状态变更而更新其 DOM 树之前调用 */
    beforeUpdate?: LifeCycleFunction | FunctionConfig | string;
    /** 区块因为一个响应式状态变更而更新其 DOM 树之后调用 */
    updated?: LifeCycleFunction | FunctionConfig | string;
    /** 区块实例被卸载之前调用 */
    beforeUnmount?: LifeCycleFunction | FunctionConfig | string;
    /** 区块实例被卸载之后调用 */
    unmounted?: LifeCycleFunction | FunctionConfig | string;
    /** 在捕获了后代组件传递的错误时调用 */
    errorCaptured?: ErrorCapturedHook<Error> | FunctionConfig | string;
    /** 若区块实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用 */
    activated?: LifeCycleFunction | FunctionConfig | string;
    /** 若区块实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用 */
    deactivated?: LifeCycleFunction | FunctionConfig | string;
}

/** 区块(设计时) */
interface DesignBlock<Props extends BaseProps = BaseProps, Event extends BaseEvent = BaseEvent, Directives extends BaseDirectives = BaseDirectives> extends ComponentNode<Props, Event, Directives> {
    /** 是否是Block */
    block: boolean;
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
    /** 元信息 */
    meta?: BlockMeta;
    /** 多语言词条 */
    i18n?: I18N;
}

export type {
    BaseProps,
    BaseEvent,
    BaseDirectives,
    ListenerFunctionConfig,
    ComponentListener,
    ComponentSlotsItem,
    ComponentNode,
    BlockMeta,
    ComputedFunction,
    ObjectWatchOptionItem,
    WatchOptionItem,
    BlockWatchItem,
    BlockMethod,
    BlockLifeCycles,
    DesignBlock,
}
