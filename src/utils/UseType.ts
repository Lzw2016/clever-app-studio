import {CSSProperties} from "vue";

/**
 * 获取 vue template 中 html 元素的 style 对象
 */
function style(style: CSSProperties): CSSProperties {
    return style ?? {};
}

export {
    style,
}
