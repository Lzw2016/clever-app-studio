import { WatchCallback, WatchOptions } from "vue";
import { AnyFunction, ComponentInstance, I18N, ModifierGuardsKeys, VueComponent, WrapperAnyFunction } from "@/draggable/types/Base";
import { BaseDirectives, BlockMeta, DesignBlock, DesignNode } from "@/draggable/types/DesignBlock";
import { BlockOperation, BlockOperationById } from "@/draggable/types/BlockOperation";
import { BlockDesignOperation } from "@/draggable/types/BlockDesignOperation";
import { ComponentManage } from "@/draggable/types/ComponentManage";

/** 组件插槽类型(运行时) */
type RuntimeComponentSlotsItem = RuntimeNode | Omit<RuntimeBlock, "meta" | "i18n"> | string;

/** Listener的对象形式(运行时) */
interface RuntimeListener {
    handler: AnyFunction<ComponentInstance>;
    /** 事件修饰符 */
    modifiers?: Array<ModifierGuardsKeys>;
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
    readonly __component: string | VueComponent;
    /** 设计时的占位组件，插槽名对应占位节点，items占位名为“default” */
    readonly __designPlaceholder?: Record<"default" | string, RuntimeNode>;
    /** 组件父组件id */
    readonly __parentId: string;
    /** 组件唯一id */
    readonly id: string;
    /** 组件类型(HtmlTag或vue组件名称，DesignNode配置) */
    readonly type: string;
    /** 当前组件实例的引用名称 */
    readonly ref: string;
    /** 组件属性 */
    readonly props: Record<string, any>;
    /** 原始的 style 属性 */
    __raw_props_style: any;
    /** 原始的 class 属性 */
    __raw_props_class?: string;
    /** 暂存绑定的props值，用于从 unbind 恢复成 bind 状态时，恢复属性值 */
    __tmp_bind_props?: Record<string, string>;
    /** 暂存非绑定的props值，用于从 bind 恢复成 unbind 状态时，恢复属性值 */
    __tmp_unbind_props?: Record<string, any>;
    /** 原始的 style.display 属性 */
    __raw_props_style_display: string;
    /** 监听的事件(原函数) */
    readonly listeners: Record<string, RuntimeListener>;
    /** 监听的事件(已绑定 this 指针的 listeners 函数) */
    __bindListeners?: Record<string, AnyFunction<ComponentInstance>>;
    /** 组件指令 */
    readonly directives: BaseDirectives;
    /** 设计时的组件指令 */
    __designDirectives?: BaseDirectives;
    /** withDirectives应用指令的数量 */
    __directivesCount?: number;
    /** 组件插槽(default插槽其实就是children) */
    readonly slots: Record<string, Array<RuntimeComponentSlotsItem>>;
    /** 子组件集合 */
    readonly items: Array<RuntimeComponentSlotsItem>;
    /** html模版(优先级低于 items) */
    readonly tpl: Array<string>;
    /** 当前渲染节点属性面板活动的叶签 */
    __propsActiveTab?: string;
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
    readonly computed: Record<string, WrapperAnyFunction>;
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
    /** 原始的生命周期函数(errorCaptured) */
    __raw_lifeCycles_errorCaptured?: AnyFunction;
    /** 原始的生命周期函数(unmounted) */
    __raw_lifeCycles_unmounted?: AnyFunction;
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
    /** 组件元信息不存在 */
    componentMetaNotExists = "组件元信息不存在",
    /** 设计时组件不存在 */
    designComponentNotExists = "设计时组件不存在",
}

/** 创建渲染组件的配置 */
interface CreateConfig {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 是否是设计时 */
    isDesigning?: boolean;
}

/**
 * 创建 BlockComponent 时的全局上下文
 */
interface GlobalContext extends CreateConfig {
    /** 当前渲染的顶层 DesignBlock(原始的DesignBlock对象) */
    readonly designBlock: DesignBlock;
    /** 当前 Block 的根级 RuntimeBlock */
    readonly runtimeBlock?: RuntimeBlock;
    /** 当前所有的 Block vue 组件 | RuntimeBlock.ref -> Block vue组件实例 */
    readonly allBlock: Record<string, BlockInstance>;
    /** 所有的 RuntimeNode 对象 | RuntimeNode.id -> RuntimeNode */
    readonly allNode: Record<string, RuntimeNode>;
    /** 所有的 RuntimeNode 与其父节点关系 | RuntimeNode.id -> 所属的RuntimeNode */
    readonly nodeParent: Record<string, RuntimeNode>;
    /** ref属性与id属性的映射 | RuntimeNode.ref -> RuntimeNode.id */
    readonly refId: Record<string, string>;
    /** 渲染节点的ref与所属Block实例的ref之间的映射 | RuntimeNode.ref -> RuntimeBlock.ref */
    readonly nodeRefVueRef: Record<string, string>;
}

/** Block组件类型 */
interface BlockInstance extends ComponentInstance {
    /** 创建 BlockComponent 时的全局上下文对象 */
    readonly globalContext: GlobalContext;
    /** Block支持的操作函数(基于ref属性) */
    readonly ops: BlockOperation;
    /** Block支持的操作函数(基于id属性) */
    readonly opsById: BlockOperationById;
    /** Block设计时支持的操作函数(基于id属性) */
    readonly opsForDesign: BlockDesignOperation;
}

/**
 * 当前调用的上下文，不能在函数间传递这个对象(需要创建)
 */
interface Context {
    /** 前渲染节点所属的 vue 组件实例 */
    readonly instance: ComponentInstance;
    /** 当前渲染节点所属的 RuntimeBlock 对象 */
    readonly block: RuntimeBlock;
    /** 当前渲染节点所属的 RuntimeNode 对象 */
    readonly node: RuntimeNode;
    /** v-for指令的上下文数据 */
    vForData?: Record<string, any>;
    /** 插槽中的 props 数据 */
    slotProps?: Record<string, any>;
}

export type {
    RuntimeComponentSlotsItem,
    RuntimeBlockWatchItem,
    RuntimeListener,
    RuntimeNode,
    RuntimeBlock,
    RuntimeBlockNode,
    CreateConfig,
    GlobalContext,
    BlockInstance,
    Context,
}

export {
    RenderErrType,
}
