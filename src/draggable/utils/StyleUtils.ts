import lodash from "lodash";
import { parseStringStyle } from "@vue/shared";
import { hasValue, isArray, isNum, isObj, isStr } from "@/utils/Typeof";

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

export {
    toStyleUnit,
    unStyleUnit,
    autoUseStyleUnit,
    toStyleValue,
    validateInputStyleValue,
    toObjectStyle,
    toInlineStyle,
    importantStyle,
}
