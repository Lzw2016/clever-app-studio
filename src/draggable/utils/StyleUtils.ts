import lodash from "lodash";
import { parseStringStyle } from "@vue/shared";
import { hasValue, isArray, isFunction, isNum, isObj, isStr, noValue } from "@/utils/Typeof";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { ValueTransform } from "@/draggable/utils/SetterUtils";

/**
 * 调用 applyStyle 的防抖时间
 */
const applyStyleDebounceTime = 350;

/** 获取style属性值 */
type GetStyleValue = (style: Record<string, any>) => any;

function getStylePropertyValue(style: Record<string, any>, styleProperty: string): any {
    return style[styleProperty];
}

/**
 * 获取 state 默认值
 */
function getDefState(): StyleSetterState {
    return {
        style: {},
    };
}

interface GetStyleOptions<R = any> {
    /** 样式值转换函数 */
    transform?: ValueTransform<R>;
    /** 更新multipleValues值 */
    multipleValuesUpdate?: (multipleValues: boolean) => void;
}

/**
 * 获取 style property 值
 * @param props         样式设置器 props 属性
 * @param state         样式设置器 state 属性
 * @param styleProperty 样式属性名
 * @param options       扩展选项
 */
function getStyle<R = any>(props: StyleSetterProps, state: StyleSetterState, styleProperty: string, options?: GetStyleOptions<R>): R {
    let value = _doGetStyle(
        props,
        state,
        style => getStylePropertyValue(style, styleProperty),
        { multipleValuesUpdate: options?.multipleValuesUpdate },
    );
    if (isFunction(options?.transform)) value = options.transform(value);
    return value;
}

function _doGetStyle(props: StyleSetterProps, state: StyleSetterState, getPropsValue: GetStyleValue, options?: GetStyleOptions): any {
    const { nodes } = props;
    if (!nodes) return;
    if (!isFunction(getPropsValue)) return;
    const values = new Set<any>();
    for (let node of nodes) {
        let value = undefined;
        const style = toObjectStyle(node.props?.style);
        if (hasValue(style)) value = getPropsValue(style);
        if (isFunction(options?.transform)) value = options.transform(value);
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
    } else if (isFunction(options?.multipleValuesUpdate)) {
        options.multipleValuesUpdate(true);
        return;
    }
}

interface ApplyStyleOptions {
    /** 样式值转换函数 */
    transform?: ValueTransform;
    /** 更新样式值后不重新渲染block */
    disableReRender?: boolean;
    /** 更新样式后不需要重新计算辅助工具的位置 */
    cancelCalcAuxToolPosition?: boolean;
    /** 更新multipleValues值 */
    multipleValuesUpdate?: (multipleValues: boolean) => void;
}

/**
 * 应用 style property 值到组件节点
 * @param props         样式设置器 props 属性
 * @param state         样式设置器 state 属性
 * @param styleProperty 样式属性名
 * @param value         应用的setter值
 * @param options       扩展选项
 */
function applyStyle<T = any, R = any>(props: StyleSetterProps, state: StyleSetterState, styleProperty: string, value: T, options?: ApplyStyleOptions): boolean {
    const {
        designerState,
        blockInstance,
        nodes,
    } = props;
    console.log("applyStyle styleProperty", `${styleProperty}=${value}`);
    let res = false;
    if (!nodes) return res;
    if (isFunction(options?.transform)) value = options?.transform(value);
    for (let node of nodes) {
        if (!node.__raw_props_style) node.__raw_props_style = toObjectStyle(node.props.style);
        const style: Record<string, any> = node.props.style ?? {};
        node.props.style = { ...node.__raw_props_style, ...style };
        if (noValue(value)) {
            res = res || hasValue(node.props.style[styleProperty]);
            delete node.props.style[styleProperty];
        } else {
            res = res || node.props.style[styleProperty] !== value;
            node.props.style[styleProperty] = value;
        }
    }
    // 需要重新渲染 block
    if (res) {
        if (isFunction(options?.multipleValuesUpdate)) options?.multipleValuesUpdate(false);
        if (!options?.disableReRender) {
            blockInstance.$forceUpdate();
            console.log("applyStyle $forceUpdate");
            // 重新计算辅助工具的位置(更新属性有可能改变渲染节点的大小和位置)
            if (!options?.cancelCalcAuxToolPosition) {
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
 * 自动补全 style 属性单位
 * @param value style属性值
 * @param unit  style属性单位默认是“px”
 */
function toStyleUnit(value: any, unit: string = "px"): string | undefined {
    // 直接是数字类型
    if (isNum(value)) {
        return `${value}${unit}`;
    }
    value = lodash.trim(value);
    // 不存在
    if (value.length <= 0) {
        return;
    }
    // 是字符串数字类型
    if (/^\d+(\.\d+)?$/.test(value)) {
        return value + unit;
    }
    // 返回原值
    return value;
}

/**
 * 移除 style 属性单位
 * @param value style属性值
 * @param unit  style属性单位默认是“px”
 */
function unStyleUnit(value: any, unit: string = "px"): string | undefined {
    if (!isStr(value)) return value;
    if (!value.endsWith(unit)) return value;
    return value.substring(0, value.length - 2);
}

/**
 * 自动应用 style 属性单位
 * @param style     style属性对象名
 * @param property  style属性名
 * @param value     style属性值
 * @param unit      style属性单位默认是“px”
 */
function autoUseStyleUnit(style: any, property: string, value: any, unit: string = "px") {
    if (!style) return;
    value = toStyleUnit(value, unit);
    if (value) {
        style[property] = value;
    } else {
        delete style[property];
    }
}

/**
 * 处理文本输入框的值成符合规则的style属性值
 * @param event         input事件
 * @param useAuto       是否允许使用“auto”值
 * @param usePercentage 是否允许使用“%”值
 */
function toStyleValue(event: Event, useAuto: boolean = true, usePercentage: boolean = true): string | undefined {
    if (!event.target) return;
    let value: string = event.target["value"] ?? "";
    // 百分值(%)处理
    let percentage = "";
    if (usePercentage && value.endsWith("%")) {
        value = value.substring(0, value.length - 1);
        percentage = "%";
    }
    let styleValue: string | undefined;
    if (value.length <= 0) {
        styleValue = "";
    } else if (useAuto && value.toLowerCase() === "a") {
        // 输入 a 表示 auto
        styleValue = "auto";
    } else if (useAuto && value === "aut") {
        // 删除 auto
        styleValue = undefined;
    } else if (useAuto && value.startsWith("auto") && value.length > 4) {
        // auto后面接着输入
        value = value.substring(4);
        const num = lodash.toNumber(value);
        styleValue = lodash.isFinite(num) ? value : "auto";
    } else {
        // 输入的是
        styleValue = value;
    }
    styleValue = lodash.trim(styleValue);
    // 保证输入“数字”或者“auto”
    if (![undefined, "", "auto"].includes(styleValue) && !lodash.isFinite(lodash.toNumber(styleValue))) {
        const match = value.match(/\d+(\.\d+)?/);
        if (match && match[0]) {
            styleValue = match[0];
        } else {
            styleValue = undefined;
        }
    }
    // 空值处理
    if (["0", ""].includes(styleValue!)) {
        styleValue = undefined;
    }
    // 百分值(%)处理
    if (usePercentage && styleValue) {
        styleValue = styleValue + percentage;
    }
    return styleValue;
}

/**
 * 处理文本输入框的值成符合规则的style属性值
 *
 * @param style         style属性对象名
 * @param property      style属性名
 * @param event         input事件
 * @param useAuto       是否允许使用“auto”值
 * @param usePercentage 是否允许使用“%”值
 */
function validateInputStyleValue(style: any, property: string, event: Event, useAuto: boolean = true, usePercentage: boolean = true) {
    if (!style) return;
    if (!event.target) return;
    const styleValue = toStyleValue(event, useAuto, usePercentage);
    // 更新数据
    style[property] = styleValue;
    event.target["value"] = styleValue ?? "";
}

/**
 * 把内联样式转成对象样式(对象样式属性是小写驼峰)
 * @param inlineStyle 内联样式(字符串样式或者中划线命名的样式属性名)
 */
function toObjectStyle(inlineStyle: string | Record<string, any>): Record<string, any> {
    if (!inlineStyle) return {};
    let style: Record<string, any> | undefined;
    if (isStr(inlineStyle)) {
        try {
            style = parseStringStyle(inlineStyle);
        } catch (err) {
            console.error(`无效的style字符串: "${inlineStyle}"`);
            console.error(err);
        }
    } else if (isObj(inlineStyle) && !isArray(inlineStyle)) {
        style = inlineStyle;
    }
    if (!style) style = {};
    const res: Record<string, any> = {};
    for (let key in style) {
        const newKey = key.replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
        res[newKey] = style[key];
    }
    return res;
}

/**
 * 把对象样式转成内联样式(内联样式属性是中划线命名)
 * @param style 对象样式(对象样式属性是小写驼峰)
 */
function toInlineStyle(style: Record<string, any>): Record<string, any> {
    if (!style) return {};
    const res: Record<string, any> = {};
    if (isObj(style) && !isArray(style)) {
        for (let key in style) {
            const newKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            res[newKey] = style[key];
        }
    }
    return res;
}

/**
 * 给 style 对象属性加上 “!important”
 * @param style 对象样式
 */
function importantStyle(style: Record<string, any>): Record<string, any> {
    if (!style) return {};
    const res: Record<string, any> = {};
    if (isObj(style) && !isArray(style)) {
        for (let key in style) {
            let value = style[key];
            if (hasValue(value) && lodash.trim(value as string).length > 0) {
                value = `${value} !important`;
            }
            res[key] = value;
        }
    }
    return res;
}

export type {
    GetStyleValue,
    GetStyleOptions,
    ApplyStyleOptions,
}

export {
    applyStyleDebounceTime,
    getStylePropertyValue,
    getDefState,
    getStyle,
    applyStyle,
    toStyleUnit,
    unStyleUnit,
    autoUseStyleUnit,
    toStyleValue,
    validateInputStyleValue,
    toObjectStyle,
    toInlineStyle,
    importantStyle,
}
