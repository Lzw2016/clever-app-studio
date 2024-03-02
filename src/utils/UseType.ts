import {CSSProperties} from "vue";

/** 异步函数构造器 */
const AsyncFunction = (async () => ({})).constructor;

/**
 * 获取 vue template 中 html 元素的 style 对象
 */
function style(style: CSSProperties): CSSProperties {
    return style ?? {};
}

export {
    AsyncFunction,
    style,
}
