import lodash from "lodash";
import { computed, markRaw, useAttrs, watch } from "vue";
import { isFunction, noValue } from "@/utils/Typeof";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";

/** 当选中多个节点且节点的同一属性有不同值时的提示文本 */
const multipleValuesText = "存在多个不同值";

/** setter值转换函数 */
type ValueTransform<T = any> = (value: any) => T | undefined;

/** setter值转换成object */
const toObj: ValueTransform = value => {
    if (noValue(value)) return;
    return markRaw(value);
};

/** setter值转换成string */
const toStr: ValueTransform<string> = value => {
    // if (noValue(value)) return;
    return lodash.toString(value);
};

/** setter值转换成boolean */
const toBool: ValueTransform<boolean> = value => {
    // if (noValue(value)) return;
    return !!value;
};

/** setter值转换成number */
const toNumber: ValueTransform<number> = value => {
    if (noValue(value)) return;
    value = lodash.toNumber(value);
    if (value === Infinity || isNaN(value)) {
        value = undefined;
    }
    return value;
};

/**
 * 获取 state 默认值
 */
function getDefState(): SetterState {
    return {
        multipleValues: false,
        value: undefined,
    };
}

/**
 * 获取setter值
 * @param props         设置器组件 props 属性
 * @param state         设置器组件 state 属性
 * @param transform     setter值转换函数
 */
function getValue<R = any>(props: SetterProps, state: SetterState, transform?: ValueTransform<R>): R {
    let value = _doGetValue(props, state);
    if (isFunction(transform)) {
        value = transform(value);
    }
    return value;
}

function _doGetValue(props: SetterProps, state: SetterState, transform?: ValueTransform): any {
    const { nodes, propsName, getPropsValue } = props;
    if (!nodes) return;
    if (!propsName && !isFunction(getPropsValue)) return;
    const values = new Set<any>();
    for (let node of nodes) {
        let value = undefined;
        if (getPropsValue) {
            value = getPropsValue(node.props, node);
        } else if (propsName) {
            value = node.props?.[propsName];
        }
        if (isFunction(transform)) value = transform(value);
        if (noValue(value)) value = undefined;
        values.add(value);
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
        state.value = undefined;
        return;
    }
}

/**
 * 应用setter值到组件节点
 * @param props     设置器组件 props 属性
 * @param state     设置器组件 state 属性
 * @param setter    设置器内部组件实例(ComponentPublicInstance)
 * @param value     应用的setter值
 */
function applyValue<T = any>(props: SetterProps, state: SetterState, setter: any, value: T): boolean {
    const {
        designerState,
        blockInstance,
        nodes,
        propsName,
        applyPropsValue,
        disableReRender,
        recalcAuxToolPosition,
    } = props;
    let res = false;
    if (!nodes) return res;
    if (!propsName && !isFunction(applyPropsValue)) return res;
    for (let node of nodes) {
        if (applyPropsValue) {
            res = true;
            applyPropsValue(node.props, value, node, setter);
        } else if (propsName && node.props) {
            res = res || node.props[propsName] !== value;
            node.props[propsName] = value;
        }
    }
    // 需要重新渲染 block
    if (res) {
        state.multipleValues = false;
        if (!disableReRender) {
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
    }
    return res;
}

/**
 * 获取设置器内部组件的属性，动态处理属性：title、placeholder
 * @param state 设置器组件 state 属性
 */
function getInputProps(state: SetterState) {
    const attrs = useAttrs();
    return computed(() => {
        const obj: any = {
            placeholder: "请输入",
            ...attrs,
        };
        if (state.multipleValues) {
            if (!obj.title) obj.title = multipleValuesText;
            obj.placeholder = multipleValuesText;
        }
        return obj;
    });
}

/**
 * 监听选中的节点变化
 * @param props     设置器组件 props 属性
 * @param state     设置器组件 state 属性
 * @param transform setter值转换函数
 */
function watchNodes(props: SetterProps, state: SetterState, transform?: ValueTransform) {
    watch(() => props.nodes, () => {
        state.value = getValue(props, state, transform);
        // console.log("watchNodes state", state);
    });
}

/**
 * 定义设置器组件公开内容
 * @param props     设置器组件 props 属性
 * @param state     设置器组件 state 属性
 * @param setter    设置器内部组件实例(ComponentPublicInstance)
 * @param transform setter值转换函数
 */
function getSetterExpose<T = any>(props: SetterProps, state: SetterState, setter: any, transform?: ValueTransform<T>): SetterExpose {
    return {
        designerState: props.designerState,
        blockInstance: props.blockInstance,
        nodes: props.nodes,
        getValue: () => state.value,
        setValue: value => {
            if (isFunction(transform)) value = transform(value);
            state.value = value;
            applyValue(props, state, setter, value);
        },
        // 隐藏组件
        //
    };
}

export type {
    ValueTransform,
}

export {
    multipleValuesText,
    toObj,
    toStr,
    toBool,
    toNumber,
    getDefState,
    getValue,
    applyValue,
    getInputProps,
    watchNodes,
    getSetterExpose,
}
