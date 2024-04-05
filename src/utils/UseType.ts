import { CSSProperties } from "vue";

/** 异步函数构造器 */
const AsyncFunction = (async () => ({})).constructor;

/**
 * 获取 vue template 中 html 元素的 style 对象
 */
function style(style: CSSProperties): CSSProperties {
    return style ?? {};
}

/**
 * 仅仅是为了类型声明，无任何处理逻辑
 */
function toAny<R = any>(obj: any): R {
    return obj;
}

export {
    AsyncFunction,
    style,
    toAny,
}
