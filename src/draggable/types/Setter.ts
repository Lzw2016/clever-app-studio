import { ComponentPublicInstance } from "vue";
import { BlockInstance, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { Setter } from "@/draggable/types/ComponentMeta";

/** 设置器基本props */
interface SetterProps {
    /** block实例对象 */
    blockInstance: BlockInstance;
    /** 当前设置的渲染节点集合 */
    nodes: Array<RuntimeNode>;
    /** 被设置的属性名称 */
    propsName?: string;
    /** 自定义获取属性值逻辑 */
    getPropsValue?: (props: any) => any;
    /** 应用属性值到组件节点 */
    applyPropsValue?: (props: any, value: any, oldValue: any, setter: ComponentPublicInstance) => void;
    /** 监听属性值变化逻辑 */
    watchProps?: Setter['watchProps'];
}

/** 设置器基本state */
interface SetterState<Value = any> {
    /** 是否存在多个RuntimeNode，而且都是不同的值 */
    multipleValues: boolean;
    /** 设置器值 */
    value?: Value;
}

export type {
    SetterProps,
    SetterState,
}
