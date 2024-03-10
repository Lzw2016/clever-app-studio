import { WatchCallback, WatchOptions } from "vue";
import { AnyFunction, ComponentInstance, I18N, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, BlockMeta } from "@/draggable/types/DesignBlock";

/** 组件插槽类型(运行时) */
type RuntimeComponentSlotsItem = RuntimeNode | Omit<RuntimeBlock, "meta" | "i18n"> | string;

/** Listener的对象形式(运行时) */
interface RuntimeListener {
    handler: AnyFunction<ComponentInstance>;
    /** 事件修饰符 */
    modifiers?: Array<string>;
}

/** 组件节点(运行时) */
interface RuntimeNode {
    /** 当前节点是html标签 */
    readonly __htmlTag: boolean;
    /** 组件唯一id */
    readonly id: string;
    /** 组件类型(HtmlTag或vue组件名称，DesignNode配置) */
    readonly type: string;
    /** 组件类型(HtmlTag或vue组件对象) */
    readonly __type: string | VueComponent;
    /** 当前组件实例的引用名称 */
    readonly ref: string;
    /** 组件属性 */
    readonly props: Record<string, any>;
    /** 监听的事件(原函数) */
    readonly listeners: Record<string, RuntimeListener>;
    /** 监听的事件(已绑定 this 指针的 listeners 函数) */
    __bindListeners?: Record<string, AnyFunction<ComponentInstance>>;
    /** 组件指令 */
    readonly directives: BaseDirectives;
    /** 组件插槽(default插槽其实就是children) */
    readonly slots: Record<string, Array<RuntimeComponentSlotsItem>>;
    /** 子组件集合 */
    readonly items: Array<RuntimeComponentSlotsItem>;
    /** html模版(优先级低于 items) */
    readonly tpl: Array<string>;
}

/** 区块 watch(数据监听器)(运行时) */
type ObjectWatchOptionItem = { handler: WatchCallback | string; } & WatchOptions;
type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;
type RuntimeBlockWatchItem = WatchOptionItem | Array<WatchOptionItem>;

/** 区块(运行时) */
interface RuntimeBlock extends RuntimeNode {
    /** 当前 Block 生成的 vue 组件 */
    __blockComponent?: VueComponent;
    /** 是否是Block */
    readonly block: boolean;
    /** 数据 */
    readonly data: Record<string, any>;
    /** 计算数据 */
    readonly computed: Record<string, AnyFunction>;
    // /** 计算数据(已绑定 this 指针的 lifeCycles 函数) */
    // __bindComputed?: Record<string, AnyFunction>;
    /** 数据监听器(数据更改时的回调) */
    readonly watch: Record<string, RuntimeBlockWatchItem>;
    // /** 数据监听器(已绑定 this 指针的 watch 函数) */
    // __bindWatch: Record<string, RuntimeBlockWatchItem>;
    /** 自定义函数 */
    readonly methods: Record<string, AnyFunction>;
    // /** 自定义函数(已绑定 this 指针的 methods 函数) */
    // __bindMethods: Record<string, AnyFunction>;
    /** 生命周期 */
    readonly lifeCycles: Record<string, AnyFunction>;
    // /** 生命周期(已绑定 this 指针的 lifeCycles 函数) */
    // __bindLifeCycles?: Record<string, AnyFunction>;
    /** 元信息 */
    readonly meta?: BlockMeta;
    /** 多语言词条 */
    readonly i18n: I18N;
}

/** 运行时需要渲染的 Block 节点 */
type RuntimeBlockNode = RuntimeComponentSlotsItem | RuntimeBlock;

/** Block渲染失败类型 */
enum RenderErrType {
    /** 创建BlockComponent */
    createBlockComponent = "createBlockComponent",
    /** 深度解析DesignBlock */
    blockDeepTransform = "blockDeepTransform",
    /** 渲染模版 */
    renderTpl = "renderTpl",
    /** 计算node属性 */
    propsTransform = "propsTransform",
    /** 表达式计算 */
    expTransform = "expTransform",
}

export type {
    RuntimeComponentSlotsItem,
    RuntimeBlockWatchItem,
    RuntimeListener,
    RuntimeNode,
    RuntimeBlock,
    RuntimeBlockNode,
}

export {
    RenderErrType,
}
