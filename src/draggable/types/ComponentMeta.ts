import { ComponentPublicInstance, VNode } from "vue";
import { ComponentSlotMeta, FunctionMeta, I18N, VueComponent } from "@/draggable/types/Base";
import { BaseDirectives, BaseProps, ComponentListener, DesignNode } from "@/draggable/types/DesignBlock";
import { BlockInstance, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerState } from "@/draggable/models/DesignerState";

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
    /** 自定义获取属性值逻辑 */
    getPropsValue?: (props: any) => any;
    /** 应用属性值到组件节点 */
    applyPropsValue?: (props: any, value: any, setter: ComponentPublicInstance) => void;
    /** 监听属性值变化逻辑 */
    watchProps?: Setter['watchProps'];
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

/** 监听属性值变化逻辑配置 */
interface WatchPropsConfig<TargetProps> {
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

/** 设置器 */
interface Setter<SetterProps extends BaseProps = BaseProps, TargetProps = any> {
    /** 设置器组件实例的引用名称 */
    ref?: string;
    /** 设置器组件 */
    cmp: VueComponent | string;
    /** 设置器组件属性 */
    cmpProps?: SetterProps;
    /** 配置项名称 */
    label?: string;
    /** 配置项名称说明 */
    labelTips?: string;
    /** 被设置的属性名称 */
    propsName?: string;
    /** 启用数据绑定(默认启用) */
    enableBind?: boolean;
    /**
     * 从组件节点读取属性值
     * @param props 目标组件的 props 对象
     */
    getPropsValue?: (props: TargetProps) => any;
    /**
     * 应用属性值到组件节点
     * @param props     目标组件节点的 props 对象
     * @param value     设置器的当前值
     * @param setter    当前设置器对象
     */
    applyPropsValue?: (props: TargetProps, value: any, setter: SetterInstance) => void;
    /** 监听属性值变化逻辑 */
    watchProps?: Array<WatchPropsConfig<TargetProps>>;
    /** 监听设置器的事件 */
    listeners?: Record<keyof Event, ComponentListener>;
    /** 更新属性值后不重新渲染block */
    disableReRender?: boolean;
    /** 更新属性后需要重新计算辅助工具的位置 */
    recalcAuxToolPosition?: boolean;
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

/** 设置器面板 */
interface SetterPanel {
    /** 面板标题 */
    title?: string;
    /** 表单的配置 */
    formProps?: FormProps;
    /** 表单项的通用配置 */
    formItemProps?: FormItemProps;
    /** 设置器分组集合 */
    groups: Array<SetterGroup>;
}

/** 组件元信息 setter */
interface ComponentSetter {
    /** 组件属性设置 */
    props?: SetterPanel;
    /** 组件事件绑定 */
    events?: SetterPanel;
    /** 样式设置(内置的固定设置) */
    style?: SetterPanel;
    /** vue指令设置(内置的固定设置) */
    advanced?: SetterPanel;
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
            /** 禁用的事件名称，如果未设置就是用默认的事件集合(defEvents)，优先级: manualDisable > enableEvents > disableEvents */
            disableEvents?: string | Array<string>;
            /**启用的事件名称，优先级: manualDisable > enableEvents > disableEvents  */
            enableEvents?: string | Array<string>;
            /** 手动禁用事件，优先级: manualDisable > enableEvents > disableEvents */
            manualDisable?: (vnode: VNode) => void;
        };
    };
    /** 禁用组件内部事件 */
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
    /** 组件图标 */
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
    /** 组件事件元信息 */
    events: Record<string, Omit<FunctionMeta, 'name'>>;
    /** 组件插槽元信息 */
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
    SetterPanel,
    ComponentSetter,
    DefDesignNode,
    ComponentMeta,
    MaterialMetaGroup,
    MaterialMetaTab,
    ComponentMetaGroup,
    ComponentMetaTab,
    AsyncComponentMeta,
}
