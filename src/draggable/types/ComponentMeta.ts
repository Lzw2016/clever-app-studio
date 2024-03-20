import { ComponentInstance, ComponentSlotMeta, FunctionMeta, I18N, VueComponent } from "@/draggable/types/Base";
import { BaseProps, ComponentListener, DesignNode } from "@/draggable/types/DesignBlock";

/** 物料元信息 */
interface MaterialMeta {
    /** 组件类型(唯一值) */
    type: string;
    /** 组件名称 */
    name: string;
    /** 组件介绍描述 */
    description?: string;
    /** 组件图标 */
    icon: VueComponent | string;
    /** 组件版本 */
    version?: string;
    /** 组件文档连接 */
    docLink?: string;
}

/** 组件节点默认配置 */
type DefDesignNode = Partial<Omit<DesignNode, 'type' | 'ref'>>

/** 组件schema */
interface ComponentSchema {
    /** 组件事件元信息 */
    events: Record<string, Omit<FunctionMeta, 'name'>>;
    /** 组件插槽元信息 */
    slots: Record<string, Omit<ComponentSlotMeta, 'name'>>;
}

/** 监听属性值变化逻辑配置 */
interface WatchPropsConfig<TargetProps> {
    /** 监听的属性名 */
    propsNames: Array<string>;

    /**
     * 属性值变化时的回调
     * @param props     目标组件的 props 对象
     * @param value     当前属性值
     * @param oldValue  之前的属性值
     * @param setter    当前设置器对象
     */
    onChange(props: TargetProps, value: any, oldValue: any, setter: ComponentInstance): void;

    /** 在侦听器创建时立即触发回调 */
    immediate?: boolean;
    /** 调整回调的刷新时机 */
    flush?: 'pre' | 'post' | 'sync';
    /** 如果源是对象或数组，则强制深度遍历源，以便在深度变更时触发回调 */
    deep?: boolean;
    /** 一次性侦听器 */
    once?: boolean;
}

/** 设置器 */
interface Setter<SetterProps extends BaseProps = BaseProps, TargetProps = any> {
    /** 设置器组件 */
    cmp: VueComponent | string;
    /** 设置器组件实例的引用名称 */
    ref?: string;
    /** 设置器组件属性 */
    cmpProps?: SetterProps;
    /** 被设置的属性名称 */
    propsName?: string;
    /**
     * 自定义设置属性值逻辑
     * @param props     目标组件的 props 对象
     * @param value     设置器的当前值
     * @param name      设置器的 propsName 配置
     * @param setter    当前设置器对象
     */
    setProps?: (props: TargetProps, value: any, name: string, setter: ComponentInstance) => void;
    /**
     * 自定义获取属性值逻辑
     * @param props 目标组件的 props 对象
     * @param name  设置器的当前值
     */
    getProps?: (props: TargetProps, name: string) => any;
    /** 监听属性值变化逻辑 */
    watchProps?: Array<WatchPropsConfig<TargetProps>>;
    /** 监听设置器的事件 */
    listeners?: Record<keyof Event, ComponentListener>;
}

/** 设置器分组 */
interface SetterGroup {
    /** 分组标题 */
    title: string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 设置器集合 */
    items: Array<Setter>;
}

/** 设置器面板 */
interface SetterPanel {
    /** 面板标题 */
    title?: string;
    /** 设置器分组集合 */
    groups: Array<SetterGroup>;
}

/** 组件元信息 setter */
interface ComponentSetter {
    /** 组件属性设置 */
    props: SetterPanel;
    /** 组件事件绑定 */
    events: SetterPanel;
    /** 样式设置(内置的固定设置) */
    style: SetterPanel;
    /** vue指令设置(内置的固定设置) */
    advanced: SetterPanel;
}

/** 组件元信息 */
interface ComponentMeta extends MaterialMeta {
    /** 设计时的组件对象 */
    designComponent?: VueComponent | string;
    /** 默认的组件节点配置 */
    defDesignNode: DefDesignNode;
    /** 组件Schema(定义的事件、插槽等) */
    schema: ComponentSchema;
    /** 组件设计器 */
    setter: ComponentSetter;
    /** 多语言词条 */
    i18n?: I18N;
}

/** 物料分组 */
interface MaterialMetaGroup {
    /** 组件分组标题 */
    title: string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 组件元信息集合 */
    items: Array<MaterialMeta>
}

/** 物料叶签 */
interface MaterialMetaTab {
    /** 组件叶签标题 */
    title: string;
    /** 组件元信息集合 */
    groups: Array<MaterialMetaGroup>
}

/** 异步获取“组件元信息” */
type AsyncComponentMeta = (type: string) => Promise<ComponentMeta>;

export type {
    DefDesignNode,
    ComponentSchema,
    WatchPropsConfig,
    Setter,
    SetterGroup,
    SetterPanel,
    ComponentSetter,
    ComponentMeta,
    MaterialMetaGroup,
    MaterialMetaTab,
    AsyncComponentMeta,
}
