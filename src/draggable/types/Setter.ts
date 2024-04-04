import { Block } from "@/draggable/BlockFactory";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { Setter } from "@/draggable/types/ComponentMeta";

/** 设置器基本属性 */
interface SetterProps {
    /** block实例对象 */
    blockInstance: Block;
    /** 当前设置的渲染节点集合 */
    nodes: Array<RuntimeNode>;
    /** 被设置的属性名称 */
    propsName?: Setter['propsName'];
    /** 自定义获取属性值逻辑 */
    getPropsValue?: Setter['getPropsValue'];
    /** 应用属性值到组件节点 */
    applyPropsValue?: Setter['applyPropsValue'];
    /** 监听属性值变化逻辑 */
    watchProps?: Setter['watchProps'];
}

interface SetterMethods {

}

interface SetterExpose {
    getValue(): any;

    setValue(value: any): void;
}

export type {
    SetterProps,
    SetterExpose,
}
