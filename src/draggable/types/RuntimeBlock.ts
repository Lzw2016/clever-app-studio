import {AnyFunction, I18N, VueComponent} from "@/draggable/types/Base";
import {BaseDirectives, BlockMeta, ComponentListener} from "@/draggable/types/Block";

/** 区块(运行时) */
interface RuntimeBlock {
    /** 是否是Block */
    block: boolean;
    /** 组件唯一id */
    id: string;
    /** 组件类型 */
    type: string | VueComponent;
    /** 当前组件实例的引用名称 */
    ref?: string;
    /** 组件属性 */
    props: any;
    /** 监听的事件 */
    listeners: Record<string, ComponentListener>;
    /** 组件指令 */
    directives: BaseDirectives;
    /** 组件插槽(default插槽其实就是children) */
    slots: Record<string, Array<RuntimeBlock | string>> | RuntimeBlock | string;
    /** 子组件集合 */
    items: Array<RuntimeBlock | string> | RuntimeBlock | string;
    /** html模版(优先级低于 items) */
    tpl: Array<string> | string;
    /** 数据 */
    data: Record<string, any>;
    /** 计算数据 */
    computed: Record<string, AnyFunction>;
    /** 数据监听器(数据更改时的回调) */
    watch: Record<string, any>;
    /** 自定义函数 */
    methods: Record<string, AnyFunction>;
    /** 生命周期 */
    lifeCycles: Record<string, AnyFunction>;
    /** 元信息 */
    meta?: BlockMeta;
    /** 多语言词条 */
    i18n: I18N;
}

export type {
    RuntimeBlock,
}
