import lodash from "lodash";
import { isArray, isObj, noValue } from "@/utils/Typeof";

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

/**
 * addEventListener参数事件名“xxx”转换成vue组件属性事件名“onXxx”
 * @param name addEventListener参数事件名
 */
function toPropsEventName(name: string) {
    if (noValue(name)) name = "";
    name = name.trim();
    if (!name.startsWith("on")) {
        if (name.length > 1) {
            name = `on${name[0].toUpperCase()}${name.substring(1)}`;
        } else {
            name = `on${name[0].toUpperCase()}`;
        }
    }
    return name;
}

/**
 * vue组件属性事件名“onXxx”转换成addEventListener参数事件名“xxx”
 * @param name vue组件属性事件名
 */
function toElementEventName(name: string) {
    if (noValue(name)) name = "";
    name = name.trim();
    if (name.startsWith("on")) {
        name = name.substring(2);
        if (name.length > 1) {
            name = `${name[0].toLowerCase()}${name.substring(1)}`;
        }
    }
    return name;
}

/**
 * HTML 标签匹配
 * 1. /^....$/
 *      从开头到结尾匹配整个字符串，这里表示字符串必须以"<"开头而且必须以">"结尾
 * 2. <(\w+)
 *      <       匹配左尖括号，表示HTML标签的起始
 *      (\w+)   匹配一个或多个"字母、数字、下划线"，这代表HTML标签名，并将其捕获为第一组匹配项
 * 3. ((\s+[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s]+))?)+\s*|\s*)
 *      \s+[\w-]+       匹配一个或多个空白字符后面跟着一个或多个"字母、数字、下划线、中划线"，这代表属性名
 *      (?:\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s]+))?
 *          这部分是非捕获组，格式：(?:...)，用于匹配属性值。它首先查找等于号（=），然后是可能为空的空白字符。接着匹配三种可能的属性值类型:
 *          "[^"]*"     匹配双引号包围的任意非双引号字符序列
 *          '[^']*'     匹配单引号包围的任意非单引号字符序列
 *          [^'">\s]+   匹配非引号、右尖括号、空白字符之外的任何字符序列
 *          这个非捕获组可以出现一次或多次(+)，并且整体可能前后都有空白字符
 *          这个大括号内的部分捕获了整个属性部分作为第二组匹配项
 * 4. >
 *      匹配右尖括号，表示HTML标签的结束
 * 5. ([\s\S]*?)
 *      [\s\S]*?    懒惰匹配任意数量的空白字符和非空白字符，这代表标签内的文本内容（innerHTML）。
 *      ()          这部分内容被捕获为第三组匹配项
 * 6. <\/\1>
 *      <\/     匹配左尖括号和正斜杠，表示HTML标签的结束起始部分
 *      \1      这是一个反向引用，它引用了前面第一组捕获的内容，即标签名。这意味着它会匹配与开始标签相同名字的结束标签
 */
const htmlFragmentPattern = /^<(\w+)((\s+[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s]+))?)+\s*|\s*)>([\s\S]*?)<\/\1>$/;
/**
 * HTML 标签中的属性名及其对应的属性值匹配
 * 1. ([\w-]+)
 *      匹配一个或多个"字母、数字、下划线"，这代表HTML标签名，并将其捕获为第一组匹配项
 * 2. (?:\s*=\s*)
 *      是非捕获组，格式：(?:...)
 *      \s*     匹配任意数量的空白字符
 *      =       匹配等号，这是属性名和属性值之间的分隔符
 * 3. (?:"([^"]*)"|'([^']*)'|([^'">\s]+))
 *      这部分也是非捕获组，但它内部包含了三个捕获组，分别用于捕获不同类型的属性值
 *      "(.*?)"         匹配双引号包围的任意非双引号字符序列，并将其捕获为第二组捕获（\2）
 *      '([^']*)'       匹配单引号包围的任意非单引号字符序列，并将其捕获为第三组捕获（\3）
 *      ([^'">\s]+)     匹配非引号、右尖括号、空白字符之外的任何字符序列，并将其捕获为第四组捕获（\4）。
 * 4. ?
 *      这个问号表示前面的整个非捕获组（属性值部分）是可选的，也就是说，这个正则表达式可以匹配那些不包含属性值的属性，如仅仅只有属性名的情况
 * 5. /g
 *      这是正则表达式的标志，表示全局搜索，意味着它将在目标字符串中查找所有匹配项，而不仅仅只返回第一个匹配结果
 */
const htmlAttrPattern = /([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^'">\s]+)))?/g;

interface HtmlInfo {
    /** 整个html片段是否只有一个完整的html标签，没有其它多余的东西 */
    onlyOne: boolean;
    /** html标签名 */
    tagName: string;
    /** 属性名和属性值 */
    attrs: Record<string, any>;
    /** html标签内部的文本 */
    innerHTML: string;
}

/**
 * 解析html片段
 */
function parseHtml(htmlFragment: string): HtmlInfo {
    const htmlInfo: HtmlInfo = {
        onlyOne: false,
        tagName: "",
        attrs: {},
        innerHTML: "",
    };
    htmlFragment = lodash.trim(htmlFragment);
    const match = htmlFragment.match(htmlFragmentPattern);
    if (!match) return htmlInfo;
    const [, tagName, attrsString, , innerHTML] = match;
    htmlInfo.onlyOne = true;
    htmlInfo.tagName = tagName;
    htmlInfo.innerHTML = innerHTML;
    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = htmlAttrPattern.exec(attrsString)) !== null) {
        const [, attrName, doubleQuotedValue, singleQuotedValue, unquotedValue] = attrMatch;
        htmlInfo.attrs[attrName] = doubleQuotedValue || singleQuotedValue || unquotedValue || true;
    }
    return htmlInfo;
}

/**
 * 判断指定对象是否是html dom节点
 */
function isHtmlNode(obj: any): boolean {
    return !isArray(obj) && isObj(obj) && obj.nodeType === Node.ELEMENT_NODE;
}

/** 遍历 Element 的回调函数 */
type TraverseVNode = (current: Element, parent?: Element) => void;

/**
 * 深度递归遍历 element 节点
 * @param element   Element节点
 * @param callback  遍历Element的回调函数
 * @param maxDepth  递归的最大深度(默认：8)
 * @param parent    当前Element的父节点
 * @param currDepth 当前递归的深度
 */
function deepTraverseElement(element: Element, callback: TraverseVNode, maxDepth: number = 8, parent?: Element, currDepth?: number) {
    if (noValue(currDepth)) currDepth = 0;
    if (currDepth > maxDepth) return;
    currDepth++;
    if (!isHtmlNode(element)) return;
    callback(element, parent);
    const children = element.children;
    if (!children) return;
    for (let idx = 0; idx < children.length; idx++) {
        const child = children[idx];
        if (!isHtmlNode(child)) continue;
        deepTraverseElement(child, callback, maxDepth, element, currDepth);
    }
}

export {
    isHtmlTag,
    toPropsEventName,
    toElementEventName,
    parseHtml,
    isHtmlNode,
    deepTraverseElement,
}
