import lodash from "lodash";
import { isNum } from "@/utils/Typeof";

/**
 * 自动应用 style 属性单位
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

export {
    toStyleUnit,
    autoUseStyleUnit,
    toStyleValue,
    validateInputStyleValue,
}
