import { CSSProperties, WatchCallback, WatchOptions } from "vue";
import { RouteParams } from "vue-router";
import { AnyFunction, ComponentInstance, ErrorCapturedHook, FunctionConfig, HtmlTag, I18N, ModifierGuardsKeys } from "@/draggable/types/Base";

// -------------------------------------------------------------------------------------------------------------------
// 组件
// -------------------------------------------------------------------------------------------------------------------

/** 组件基础属性 */
interface BaseProps {
    /** 组件内联样式 */
    style?: CSSProperties | Partial<Record<keyof CSSProperties, string>> | string;
    /** 组件class样式 */
    class?: string;

    [name: string]: any;
}

/** 组件基础事件 */
interface BaseEvent {
    [name: string]: AnyFunction;
}

/** 指令选项 */
interface DirectivesOptions {
    /** 指令参数 */
    value?: any,
    /** 指令参数 */
    argument?: string,
    /** 指令修饰符 */
    modifiers?: Record<string, boolean>;

    [name: string]: any;
}

/** 组件基础指令 */
interface BaseDirectives {
    /**
     * v-model指令需要绑定的数据属性名，如： <br/>
     * <pre>
     * 1. "formData.name"
     * 2. "val.hits[0]._source.@timestamp"
     * </pre>
     */
    model?: string;
    /**
     * v-show指令，组件的的可见性(表达式，值为boolean)，如： <br/>
     * <pre>
     * 1. "{{ uiCtr.isShow }}"
     * 2. "{{ user.sex === 'f' }}"
     * 3. "{{ orders.amount > 3000 }}"
     * </pre>
     */
    show?: string;
    /**
     * v-if指令，条件性的渲染组件(表达式，值为boolean)，如： <br/>
     * <pre>
     * 1. "{{ uiCtr.isShow }}"
     * 2. "{{ user.sex === 'f' }}"
     * 3. "{{ orders.amount > 3000 }}"
     * </pre>
     */
    if?: string;
    /** v-for指令，基于原始数据多次渲染组件 */
    for?: {
        /**
         * 原始数据表达式，如： <br/>
         * <pre>
         * 1. "{{ formData.cityArray }}"
         * 2. "{{ formData.userInfo }}"
         * 3. "{{ ['张三', '李四', '王五'] }}"
         * </pre>
         */
        data: string;
        /**
         * 子节点的key取值表达式(item对象的属性名)，一般可以不设置，如： <br/>
         * <pre>
         * 1. "{{ uid }}"
         * 2. "{{ bizKey }}"
         * 3. "{{ orderId }}"
         * </pre>
         */
        key?: string,
        /**
         * index 变量名，如： <br/>
         * <pre>
         * 1. "_idx"
         * 2. "_key"
         * 3. "_name"
         * </pre>
         * 当原始数据是数组时，数组的index。 <br/>
         * 当原始数据是对象时，对象的key。 <br/>
         */
        index?: string,
        /**
         * item 变量名，如： <br/>
         * <pre>
         * 1. "_item"
         * 2. "_obj"
         * 3. "_data"
         * </pre>
         * 当原始数据是数组时，数组的item。 <br/>
         * 当原始数据是对象时，对象的value。 <br/>
         */
        item: string;
    };

    /**
     * 自定义指令，类型 DirectivesOptions 格式：
     * <pre>
     * {
     *     // 指令参数
     *     value?: any;
     *     // 指令 arg
     *     argument?: string;
     *     // 指令修饰符
     *     modifiers?: Record<string, boolean>;
     * }
     * </pre>
     */
    [name: string]: any;
}

/** Listener的对象形式 */
interface ListenerFunctionConfig {
    handler: AnyFunction<ComponentInstance> | FunctionConfig | string;
    /** 事件修饰符 */
    modifiers?: Array<ModifierGuardsKeys | string>;
}

/** 组件 listeners(事件监听函数) */
type ComponentListener = AnyFunction<ComponentInstance> | (FunctionConfig & { modifiers?: Array<ModifierGuardsKeys | string>; }) | ListenerFunctionConfig | string;

/** 组件插槽类型 */
type ComponentSlotsItem = DesignNode | Omit<DesignBlock, "meta" | "i18n"> | string;

/** 组件节点 */
interface DesignNode<Props extends BaseProps = BaseProps, Event extends BaseEvent = BaseEvent, Directives extends BaseDirectives = BaseDirectives> {
    // /** 组件唯一id(必须系统自动生成，debug时可以临时手动指定) */
    // id?: string;
    /** 当前items中的node对象的默认配置 */
    defaults?: Omit<DesignNode<Props, Event, Directives>, "ref">;
    /** 组件类型，默认是 Fragment */
    type?: HtmlTag | string;
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

    [name: string]: any;
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
interface DesignBlock<Props extends BaseProps = BaseProps, Event extends BaseEvent = BaseEvent, Directives extends BaseDirectives = BaseDirectives> extends DesignNode<Props, Event, Directives> {
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

/** 设计页面元数据 */
interface DesignPageMate {
    /** 页面标题 */
    title: string;
    /** 设计的页面内容 */
    designBlock: DesignBlock;
}

/** 加载设计页面元数据 */
type LoadDesignPageMate = (params: RouteParams) => Promise<DesignPageMate | void>;

export type {
    BaseProps,
    BaseEvent,
    BaseDirectives,
    ListenerFunctionConfig,
    ComponentListener,
    ComponentSlotsItem,
    DesignNode,
    BlockMeta,
    ComputedFunction,
    ObjectWatchOptionItem,
    WatchOptionItem,
    BlockWatchItem,
    BlockMethod,
    BlockLifeCycles,
    DesignBlock,
    DesignPageMate,
    LoadDesignPageMate,
}
