import { ComponentPublicInstance, VNode } from "vue";
import { ComponentSlotMeta, FunctionInfo, FunctionMeta, I18N, ModifierGuardsKeys, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, BaseProps, ComponentListener, DesignNode } from "@/draggable/types/DesignBlock";
import { BlockInstance, RuntimeListener, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerState } from "@/draggable/models/DesignerState";

/** 监听属性值变化逻辑配置 */
interface WatchPropsConfig<TargetProps = any> {
    /** 监听的属性名 */
    propsNames: Array<string>;

    /**
     * 属性值变化时的回调
     * @param props     目标组件节点的 props 对象
     * @param value     当前属性值
     * @param setter    当前设置器对象
     */
    onChange(props: TargetProps, value: any, setter: SetterInstance): void;

    /** 在侦听器创建时立即触发回调 */
    immediate?: boolean;
    /** 调整回调的刷新时机 */
    flush?: 'pre' | 'post' | 'sync';
    /** 如果源是对象或数组，则强制深度遍历源，以便在深度变更时触发回调 */
    deep?: boolean;
    /** 一次性侦听器 */
    once?: boolean;
}

/** 设置器基本props */
interface SetterProps {
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** block实例对象 */
    blockInstance: BlockInstance;
    /** 当前设置的渲染节点集合 */
    nodes: Array<RuntimeNode>;
    /** 被设置的属性名称 */
    propsName?: string;
    /**
     * 自定义获取属性值逻辑
     * @param props 渲染节点的 props
     * @param node  渲染节点
     */
    getPropsValue?: (props: any, node: RuntimeNode) => any;
    /**
     * 应用属性值到组件节点
     * @param props     渲染节点的 props
     * @param value     设置器当前值
     * @param node      渲染节点
     * @param setter    当前设置器实例
     * @return 返回 false 表示不需要重新渲染 Block
     */
    applyPropsValue?: (props: any, value: any, node: MakeWritable<RuntimeNode>, setter: ComponentPublicInstance) => void | false;
    /** 监听属性值变化逻辑 */
    watchProps?: Array<WatchPropsConfig>;
    /** 更新属性值后不重新渲染block */
    disableReRender?: boolean;
    /** 更新属性后需要重新计算辅助工具的位置 */
    recalcAuxToolPosition?: boolean;
}

/** 设置器基本state */
interface SetterState<Value = any> {
    /** 是否存在多个RuntimeNode，而且都是不同的值 */
    multipleValues: boolean;
    /** 设置器值 */
    value?: Value;
}

/** 设置器暴露属性 */
interface SetterExpose {
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** block实例对象 */
    blockInstance: BlockInstance;
    /** 当前设置的渲染节点集合 */
    nodes: Array<RuntimeNode>;

    /** 获取当前setter值 */
    getValue(): any;

    /** 设置当前setter值 */
    setValue(value: any): void;
}

/** 设置器实例 */
type SetterInstance = ComponentPublicInstance & SetterExpose;

/** 设置器 */
interface Setter<Props extends BaseProps = BaseProps, TargetProps = any> {
    /** 设置器组件实例的引用名称 */
    ref?: string;
    /** 设置器组件 */
    cmp: VueComponent | string;
    /** 设置器组件属性 */
    cmpProps?: Props;
    /** 配置项名称 */
    label?: string;
    /** 配置项名称说明 */
    labelTips?: string;
    /** 被设置的属性名称 */
    propsName?: string;
    /** 启用数据绑定，绑定 propsName 属性，仅当 propsName 存在时有效(默认启用) */
    enableBind?: boolean;
    /** 从组件节点读取属性值 */
    getPropsValue?: SetterProps['getPropsValue'];
    /** 应用属性值到组件节点 */
    applyPropsValue?: SetterProps['applyPropsValue'];
    /** TODO 监听属性值变化逻辑 */
    watchProps?: SetterProps['watchProps'];
    /** TODO 监听设置器的事件 */
    listeners?: Record<keyof Event, ComponentListener>;
    /** 更新属性值后不重新渲染block */
    disableReRender?: boolean;
    /** 更新属性后需要重新计算辅助工具的位置 */
    recalcAuxToolPosition?: boolean;
}

/** 设置器分组 */
interface SetterGroup {
    /** 分组标题 */
    title: "常用" | "风格" | "其它" | string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 设置器集合 */
    items: Array<Setter>;
}

/** 表单的配置 */
interface FormProps {
    /** 行内布局模式 */
    inline?: boolean;
    /** 标签文本是否对齐 */
    labelAlign?: string;
    /** 表单中标签的布局位置 */
    labelPosition?: 'right' | 'left' | 'top' | string;
    /** 表单中标签占位宽度 */
    labelWidth?: string;
    /** 配置文本类型错误类型 */
    messageType?: 'inline' | 'block' | string;
    /** 标签超长是否显示提示 */
    overflowTitle?: string;
    /** 表单内组件的尺寸 */
    size?: 'medium' | 'small' | 'mini' | string;
    /** 表单验证规则 */
    rules?: Record<string, any>;
    /** 校验类型 */
    validateType?: 'tip' | 'text' | string;

    [name: string]: any;
}

/** 表单项的通用配置 */
interface FormItemProps {
    /** 表单中标签占位宽度 */
    labelWidth?: string;
    /** 配置文本类型错误类型 */
    messageType?: 'inline' | 'block' | string;
    /** 是否显示校验错误信息 */
    showMessage?: boolean;
    /** 表单内组件的尺寸 */
    size?: 'medium' | 'small' | 'mini' | string;
    /** 表单项验证规则 */
    rules?: any;
    /** 是否开启校验防抖 */
    validateDebounce?: boolean;
    /** 校验类型 */
    validateType?: 'tip' | 'text' | string;

    [name: string]: any;
}

/** 属性设置器面板 */
interface PropsPanel {
    /** 面板标题 */
    title?: string;
    /** 表单的配置 */
    formProps?: FormProps;
    /** 表单项的通用配置 */
    formItemProps?: FormItemProps;
    /** 是否启用数据绑定(v-model) */
    enableVModel?: boolean;
    /** 设置器分组集合 */
    groups: Array<SetterGroup>;
}

/** 事件信息 */
interface EventInfo extends FunctionMeta {
    /** 是否禁用 */
    disabled?: boolean;
}

/**
 * 设计器事件信息
 */
interface ListenerInfo {
    /** 事件名称 */
    eventName: string;
    /** 函数代码 */
    funInfo?: FunctionInfo;
    /** 事件修饰符 */
    modifiers?: Array<ModifierGuardsKeys>;
    /** 函数元数据 */
    funMeta?: FunctionMeta;
    /** RuntimeNode中原始的listener值 */
    readonly rawListener: RuntimeListener;
}

/** 事件分组 */
interface EventGroup {
    /** 分组标题 */
    title: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 事件元数据集合 */
    items: Array<EventInfo>;
}

/** 内置html原生事件分组 */
type InnerEventGroup = "表单事件" | "鼠标事件" | "键盘事件" | "触摸事件" | "焦点事件" | string;

/** 事件设置器面板 */
interface EventPanel {
    /** 面板标题 */
    title?: string;
    /** 包含的内置html原生事件(true表示包含所有的内置html原生事件) */
    includeInnerEvents?: Array<InnerEventGroup> | true;
    /** 排除的内置html原生事件(优先级比includeInnerEvents高) */
    excludeInnerEvents?: Array<InnerEventGroup>;
    /** 事件分组 */
    groups: Array<EventGroup>;
}

/** 样式设置器props */
interface StyleSetterProps {
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** block实例对象 */
    blockInstance: BlockInstance;
    /** 当前设置的渲染节点集合 */
    nodes: Array<RuntimeNode>;
}

/** 样式设置器state */
interface StyleSetterState {
    /** 样式属性 */
    readonly style: Record<string, any>;
}

/**
 * 组件内置样式(主题)
 */
interface ComponentStyle {
    /** 样式名称 */
    name: string;
    /** 全局样式表名称 */
    class: string;
}

/** 样式设置器面板 */
interface StylePanel {
    /** 面板标题 */
    title?: string;
    /** 组件内置的样式 */
    componentStyles?: Array<ComponentStyle>;
    /** 禁用布局设置 */
    disableLayout?: boolean;
    /** 禁用间距设置 */
    disableSpacing?: boolean;
    /** 禁用尺寸设置 */
    disableSize?: boolean;
    /** 禁用定位设置 */
    disablePosition?: boolean;
    /** 禁用文本设置 */
    disableFont?: boolean;
    /** 禁用边框设置 */
    disableBorder?: boolean;
    /** 禁用效果设置 */
    disableEffect?: boolean;
}

/** 高级设置器面板 */
interface AdvancedPanel {
    /** 面板标题 */
    title?: string;
    /** 禁用v-show指令设置 */
    disableVShow?: boolean;
    /** 禁用v-if指令设置 */
    disableVIf?: boolean;
    /** 禁用v-for指令设置 */
    disableVFor?: boolean;
}

/** 组件元信息 setter */
interface ComponentSetter {
    /** 组件属性设置 */
    props?: PropsPanel;
    /** 组件事件绑定 */
    events?: EventPanel;
    /** 样式设置(内置的固定设置) */
    style?: StylePanel;
    /** vue指令设置(内置的固定设置) */
    advanced?: AdvancedPanel;
}

/** 组件节点默认配置 */
type DefDesignNode = Partial<Omit<DesignNode, 'type' | 'ref'>>;

/** 设计时的组件指令 */
interface DesignDirectives extends BaseDirectives {
    /** 禁用组件内部事件 */
    'disable-event'?: {
        /** 指令参数 */
        value?: {
            /** 递归的最大深度 */
            maxDepth?: number;
            /** 禁用的事件名称，如果未设置就是用默认的事件集合(defDisableEvents)，优先级: enableEvents > disableEvents */
            disableEvents?: string | Array<string>;
            /** 启用的事件名称，优先级: enableEvents > disableEvents  */
            enableEvents?: string | Array<string>;
            /** 阻止默认行为的事件集合 */
            preventDefaultEvents?: Array<string>;
            /** 阻止事件冒泡的事件集合 */
            stopPropagationEvents?: Array<string>;
            /** 自定义禁用事件的实现 Record<事件名, 事件函数> */
            manualEvents?: Record<string, Function>;
        };
    };
    /** 清除组件内部的 HTMLElement 节点上与拖拽的相关的属性 */
    'clear-draggable-html-attr'?: {
        /** 指令参数 */
        value?: {
            /** 递归的最大深度 */
            maxDepth?: number;
        };
    };
    /** 深度递归遍历 VNode 和 Element */
    'deep-traverse-each'?: {
        /** 指令参数 */
        value: {
            /** 递归的最大深度 */
            maxDepth?: number;
            /** 遍历VNode */
            eachVNode?: (rootVNode: VNode, htmlTag: boolean, current: VNode, parent?: VNode) => void;
            /** 遍历Element */
            eachElement?: (rootEl: Element, current: Element, parent?: Element) => void;
        };
    };
}

/** 组件元信息 */
interface ComponentMeta {
    /** 组件类型(唯一值) */
    type: string;
    /** 组件名称 */
    name: string;
    /** 组件介绍描述 */
    description?: string;
    /** 组件图标(支持自定义组件 & FontAwesome图标) */
    icon: VueComponent | string;
    /** 组件版本 */
    version?: string;
    /** 组件文档连接 */
    docLink?: string;
    /** 设计时的组件对象 */
    designComponent?: VueComponent | string;
    /** 默认的组件节点配置 */
    defDesignNode: DefDesignNode;
    /** 设计时的组件指令 */
    designDirectives?: DesignDirectives;
    /** TODO 组件函数 */
    // methods: Array<FunctionMeta>;
    /** TODO 组件插槽元信息 */
    slots: Record<string, Omit<ComponentSlotMeta, 'name'>>;
    /** 组件设计器 */
    setter: ComponentSetter;
    /** 设计时的占位组件，插槽名对应占位节点，items占位名为“default”，配置占位节点值为true表示使用默认的占位组件 */
    placeholder: Record<"default" | string, DesignNode | boolean>;
    /** 多语言词条 */
    i18n?: I18N;
}

/** 物料分组 */
interface MaterialMetaGroup {
    /** 组件分组标题 */
    title: string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 组件类型集合 */
    types: Array<string>
}

/** 物料叶签 */
interface MaterialMetaTab<Group extends MaterialMetaGroup = MaterialMetaGroup> {
    /** 组件叶签标题 */
    title: string;
    /** 组件元信息集合 */
    groups: Array<Group>
}

/** 组件元数据分组 */
interface ComponentMetaGroup extends MaterialMetaGroup {
    /** 组件元信息集合与types顺序一致 */
    metas: Array<ComponentMeta>;
}

/** 组件元数据叶签 */
interface ComponentMetaTab extends MaterialMetaTab<ComponentMetaGroup> {
}

/** 异步获取“组件元信息” */
type AsyncComponentMeta = (type: string) => Promise<ComponentMeta>;

export type {
    SetterProps,
    SetterState,
    SetterExpose,
    SetterInstance,
    WatchPropsConfig,
    Setter,
    FormProps,
    FormItemProps,
    SetterGroup,
    PropsPanel,
    EventInfo,
    ListenerInfo,
    EventGroup,
    InnerEventGroup,
    EventPanel,
    StyleSetterProps,
    StyleSetterState,
    ComponentStyle,
    StylePanel,
    AdvancedPanel,
    ComponentSetter,
    DefDesignNode,
    ComponentMeta,
    MaterialMetaGroup,
    MaterialMetaTab,
    ComponentMetaGroup,
    ComponentMetaTab,
    AsyncComponentMeta,
}
