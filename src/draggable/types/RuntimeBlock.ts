import { WatchCallback, WatchOptions } from "vue";
import { AnyFunction, ComponentInstance, I18N, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, BlockMeta, DesignNode } from "@/draggable/types/DesignBlock";

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
    /** 对应的 DesignNode 对象 */
    readonly __designNode: DesignNode;
    /** 渲染节点存在错误(组件未注册、加载组件失败、属性配置错误等) */
    __error?: Error;
    /** 错误类型 */
    __errorType?: RenderErrType;
    /** 当前节点是不是html标签 */
    readonly __htmlTag: boolean;
    /** 组件类型(HtmlTag或vue组件对象) */
    readonly __component?: string | VueComponent;
    /** 组件唯一id */
    readonly id: string;
    /** 组件类型(HtmlTag或vue组件名称，DesignNode配置) */
    readonly type: string;
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
    /** 未知的错误 */
    unknown = "未知的错误",
    /** 渲染的组件不存在 */
    componentNotExists = "渲染的组件不存在",
    /** 创建Block组件错误 */
    createBlockComponent = "创建Block组件错误",
    /** 解析methods错误 */
    methodsTransform = "解析methods错误",
    /** 解析lifeCycles错误 */
    lifeCyclesTransform = "解析lifeCycles错误",
    /** 解析computed错误 */
    computedTransform = "解析computed错误",
    /** 解析watch错误 */
    watchTransform = "解析watch错误",
    /** 解析listeners错误 */
    listenersTransform = "解析listeners错误",
    /** 递归解析DesignBlock错误 */
    blockDeepTransform = "递归解析DesignBlock错误",
    /** 渲染模版错误 */
    renderTpl = "渲染模版错误",
    /** 计算props错误 */
    propsTransform = "计算Props错误",
    /** 计算表达式错误 */
    expTransform = "计算表达式错误",
    /** 渲染节点定义错误 */
    nodeDefine = "渲染节点定义错误",
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
