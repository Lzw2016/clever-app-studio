import { ComponentPublicInstance, Ref } from "vue";
import { isFunction } from "@/utils/Typeof";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";

type ValueTransform<T> = (value: any) => T;

function getValue<R = any>(props: SetterProps, state: SetterState, transform?: ValueTransform<R>): R {
    let value = _doGetValue(props, state);
    if (isFunction(transform)) {
        value = transform(value);
    }
    return value;
}

function _doGetValue(props: SetterProps, state: SetterState): any {
    const { nodes, propsName, getPropsValue } = props;
    if (!nodes) return;
    if (!propsName && !isFunction(getPropsValue)) return;
    const values = new Set<any>();
    for (let node of nodes) {
        if (getPropsValue) {
            values.add(getPropsValue(node.props));
        } else if (propsName) {
            values.add(node.props?.[propsName]);
        } else {
            values.add(undefined);
        }
        if (values.size > 1) {
            break;
        }
    }
    if (values.size <= 0) {
        return;
    } else if (values.size === 1) {
        return values.values().next().value;
    } else {
        state.multipleValues = true;
        return;
    }
}

function applyValue<T = any>(props: SetterProps, state: SetterState, setter: Ref<ComponentPublicInstance | any>, value: T, oldValue: T | undefined): boolean {
    const {
        designerState,
        blockInstance,
        nodes,
        propsName,
        applyPropsValue,
        recalcAuxToolPosition,
    } = props;
    let res = false;
    if (!nodes) return res;
    if (!propsName && !isFunction(applyPropsValue)) return res;
    for (let node of nodes) {
        if (applyPropsValue) {
            applyPropsValue(node.props, value, oldValue, setter.value);
            res = true;
        } else if (propsName && node.props) {
            node.props[propsName] = value;
            res = true;
        }
    }
    // 需要重新渲染 block
    if (res) {
        state.multipleValues = false;
        blockInstance.$forceUpdate();
        // 重新计算辅助工具的位置(更新属性有可能改变渲染节点的大小和位置)
        if (recalcAuxToolPosition) {
            blockInstance.$nextTick(() => {
                const nodeIds = nodes.map(node => node.id);
                for (let selection of designerState.selections) {
                    if (selection.nodeId && nodeIds.includes(selection.nodeId)) {
                        selection.recalcAuxToolPosition();
                    }
                }
            }).finally();
        }
    }
    return res;
}

function getSetterExpose<T = any>(props: SetterProps, state: SetterState, transform?: ValueTransform<T>): SetterExpose {
    return {
        designerState: props.designerState,
        blockInstance: props.blockInstance,
        nodes: props.nodes,
        getValue: () => state.value,
        setValue: value => {
            if (isFunction(transform)) value = transform(value);
            state.value = value;
        },
    };
}

export {
    getValue,
    applyValue,
    getSetterExpose,
}
