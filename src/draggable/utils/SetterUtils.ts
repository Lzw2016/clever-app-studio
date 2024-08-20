import lodash from "lodash";
import { computed, markRaw, ref, useAttrs, watch } from "vue";
import { isFunction, isStr, noValue } from "@/utils/Typeof";
import { randomUID } from "@/utils/IDCreate";
import { configRawValueName } from "@/draggable/Constant";
import { ComponentParam } from "@/draggable/types/Base";
import { DesignerState } from "@/draggable/models/DesignerState";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { BlockInstance, RuntimeNode } from "@/draggable/types/RuntimeBlock";

/** 当选中多个节点且节点的同一属性有不同值时的提示文本 */
const multipleValuesText = "存在多个不同值";
/** 强制更新SetterPropsPanel组件 */
const forceUpdatePropsPanel = ref(0);

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

/** setter值转换成ComponentParam */
const toComponentParam: ValueTransform<ComponentParam> = value => {
    const componentParam = value?.[configRawValueName];
    if (componentParam) return markRaw(componentParam);
    return componentParam;
};

/** setter值转换成props bind表达式(不包含“{{”和“}}”) */
const toBindExpContent: ValueTransform<string> = value => {
    if (noValue(value)) return "";
    if (!isStr(value)) return "";
    const bindStr = lodash.trim(value);
    if (bindStr.startsWith("{{") && bindStr.endsWith("}}")) {
        return lodash.trim(bindStr.substring(2, bindStr.length - 2));
    }
    return "";
};

/** setter值使用JSON.stringify序列化成字符串 */
const jsonStringify: ValueTransform<string> = value => {
    if (!value) return "";
    return JSON.stringify(value, null, 4);
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
            // 根据 getPropsValue 取值
            value = getPropsValue(node.props, node);
        } else if (propsName) {
            if (lodash.hasIn(node.props, propsName)) {
                // 根据 propsName 取值
                value = node.props?.[propsName];
            } else {
                // 使用默认值
                value = props.defPropsValue;
            }
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
 * @param setter    设置器组件实例(SetterInstance)
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
        recalcAuxToolPositionDelay,
    } = props;
    let res = false;
    if (!nodes) return res;
    if (!propsName && !isFunction(applyPropsValue)) return res;
    for (let node of nodes) {
        if (applyPropsValue) {
            res = applyPropsValue(node.props, value, node, setter) !== false;
        } else if (propsName && node.props) {
            res = res || node.props[propsName] !== value;
            node.props[propsName] = value;
        }
        if (props.updateVNodeKey && res) node.__design_key = randomUID("__design_key_", 18);
    }
    // 需要重新渲染 block
    if (res) {
        if (props.watchValue) forceUpdatePropsPanel.value++;
        state.multipleValues = false;
        forceUpdateBlock(designerState, blockInstance, nodes, disableReRender, recalcAuxToolPosition, recalcAuxToolPositionDelay);
    }
    return res;
}

/**
 * 强制重新渲染 Block 组件
 * @param designerState                 设计器状态数据
 * @param blockInstance                 block实例对象
 * @param nodes                         当前设置的渲染节点集合
 * @param disableReRender               更新属性值后不重新渲染block
 * @param recalcAuxToolPosition         更新属性后需要重新计算辅助工具的位置
 * @param recalcAuxToolPositionDelay    更新属性后需要重新计算辅助工具的位置的延时时间(默认不延时)
 */
function forceUpdateBlock(designerState: DesignerState, blockInstance: BlockInstance, nodes: Array<RuntimeNode>, disableReRender?: boolean, recalcAuxToolPosition?: boolean, recalcAuxToolPositionDelay?: number) {
    if (!disableReRender) {
        blockInstance.$forceUpdate();
        // console.log("blockInstance $forceUpdate");
        // 重新计算辅助工具的位置(更新属性有可能改变渲染节点的大小和位置)
        if (recalcAuxToolPosition) {
            const recalcFun = () => {
                const nodeIds = nodes.map(node => node.id);
                for (let selection of designerState.selections) {
                    if (selection.nodeId && nodeIds.includes(selection.nodeId)) {
                        selection.recalcAuxToolPosition();
                    }
                }
            };
            blockInstance.$nextTick(() => {
                if ((recalcAuxToolPositionDelay ?? 0) > 0) {
                    setTimeout(recalcFun, recalcAuxToolPositionDelay)
                } else {
                    recalcFun();
                }
            }).finally();
        }
    }
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
 * @param setter    设置器组件实例(SetterInstance)
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
    };
}

/**
 * 更新指令值
 * @param directiveName 指令名称
 * @param value         指令值
 * @param node          渲染节点
 */
function applyDirectivesValue(directiveName: string, value: any, node: RuntimeNode) {
    value = lodash.trim(value);
    let expContent = value;
    if (expContent.startsWith("{{") && expContent.endsWith("}}")) {
        expContent = lodash.trim(expContent.substring(2, expContent.length - 2));
    }
    // console.log(`[${directiveName}=${expContent}]`);
    if (expContent.length > 0) {
        node.directives[directiveName] = value;
        if (node.__designDirectives) node.__designDirectives[directiveName] = value;
    } else {
        delete node.directives[directiveName];
        delete node.__designDirectives?.[directiveName];
    }
}

export type {
    ValueTransform,
}

export {
    multipleValuesText,
    forceUpdatePropsPanel,
    toObj,
    toStr,
    toBool,
    toNumber,
    toComponentParam,
    toBindExpContent,
    jsonStringify,
    getDefState,
    getValue,
    applyValue,
    forceUpdateBlock,
    getInputProps,
    watchNodes,
    getSetterExpose,
    applyDirectivesValue,
}
