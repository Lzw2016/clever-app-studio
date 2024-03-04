/** 所有的html标签 */
const htmlTags = [
    // 主根元素 文档元数据 分区根元素
    'html', 'base', 'head', 'link', 'meta', 'style', 'title', 'body',
    // 内容分区
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'main', 'nav', 'section',
    // 文本内容
    'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'menu', 'ol', 'p', 'pre', 'ul',
    // 内联文本语义
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    // 图片和多媒体
    'area', 'audio', 'img', 'map', 'track', 'video',
    // 内嵌内容
    'embed', 'iframe', 'object', 'picture', 'portal', 'source',
    // SVG 和 MathML
    'svg', 'math',
    // 脚本
    'canvas', 'noscript', 'script',
    // 编辑标识
    'del', 'ins',
    // 表格内容
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
    // 表单
    'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea',
    // 交互元素
    'details', 'dialog', 'summary',
    // Web 组件
    'slot', 'template',
];

/** 判断字符串是否是HTML标签 */
function isHtmlTag(htmlTag: string): boolean {
    return htmlTags.includes(htmlTag);
}

export {
    isHtmlTag,
}
