import {WatchCallback, WatchOptions} from "vue";
import {AnyFunction, I18N, VueComponent} from "@/draggable/types/Base";
import {BaseDirectives, BlockMeta} from "@/draggable/types/DesignBlock";

/** 组件插槽类型(运行时) */
type RuntimeComponentSlotsItem = RuntimeComponentNode | Omit<RuntimeBlock, "meta" | "i18n"> | string;

/** 组件节点(运行时) */
interface RuntimeComponentNode {
    /** 组件唯一id */
    id: string;
    /** 组件类型 */
    type: string | VueComponent;
    /** 当前组件实例的引用名称 */
    ref?: string;
    /** 组件属性 */
    props: Record<string, any>;
    /** 监听的事件 */
    listeners: Record<string, AnyFunction>;
    /** 组件指令 */
    directives: BaseDirectives;
    /** 组件插槽(default插槽其实就是children) */
    slots: Record<string, Array<RuntimeComponentSlotsItem>>;
    /** 子组件集合 */
    items: Array<RuntimeComponentSlotsItem>;
    /** html模版(优先级低于 items) */
    tpl: Array<string>;
}

/** 区块 watch(数据监听器)(运行时) */
type ObjectWatchOptionItem = { handler: WatchCallback | string; } & WatchOptions;
type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;
type RuntimeBlockWatchItem = WatchOptionItem | Array<WatchOptionItem>;

/** 区块(运行时) */
interface RuntimeBlock extends RuntimeComponentNode {
    // /** 设计时的 Block 对象 */
    // __designBlock: BlockDesign;
    /** 是否是Block */
    block: boolean;
    /** 数据 */
    data: Record<string, any>;
    /** 计算数据 */
    computed: Record<string, AnyFunction>;
    /** 数据监听器(数据更改时的回调) */
    watch: Record<string, RuntimeBlockWatchItem>;
    /** 自定义函数 */
    methods: Record<string, AnyFunction>;
    /** 生命周期 */
    lifeCycles: Record<string, AnyFunction>;
    /** 元信息 */
    meta?: BlockMeta;
    /** 多语言词条 */
    i18n: I18N;
}

/** 运行时需要渲染的 Block 节点 */
type RuntimeBlockNode = RuntimeComponentSlotsItem | RuntimeBlock;

export type {
    RuntimeComponentSlotsItem,
    RuntimeBlockWatchItem,
    RuntimeComponentNode,
    RuntimeBlock,
    RuntimeBlockNode,
}
