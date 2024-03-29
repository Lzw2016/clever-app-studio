import lodash from "lodash";
import { AuxToolPosition, CursorPosition, Direction, NodeToCursorDistance, PointDirection } from "@/draggable/types/Designer";
import { isValidNumber } from "@/utils/Typeof";

// 默认为 inline-block 的html标签
const inlineHtmlTags = new Set([
    'a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button', 'canvas', 'cite', 'code',
    'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'ins', 'kbd', 'label', 'map',
    'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 's', 'samp',
    'select', 'slot', 'small', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'tt',
    'var', 'video', 'wbr', 'input', 'span',
]);

/**
 * 计算 html 元素的外部宽度
 */
function calcElementOuterWidth(innerWidth: number, style: CSSStyleDeclaration) {
    return (
        innerWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth)
    );
}

/**
 * 计算 html 元素是否是行内块
 */
function calcElementIsInlineBlock(element: Element) {
    if (!element) return false;
    const parent = element.parentElement;
    if (!parent) return false;
    const tagName = lodash.lowerCase(element.tagName);
    const parentTagName = parent.tagName;
    const style = getComputedStyle(element);
    const parentStyle = getComputedStyle(parent);
    const isNotFullWidth = () => {
        const innerWidth = element.getBoundingClientRect().width;
        const outerWidth = calcElementOuterWidth(innerWidth, style);
        const parentInnerWidth = parent.getBoundingClientRect().width;
        return outerWidth.toFixed(0) < parentInnerWidth.toFixed(0);
    }
    if (tagName === 'th' || tagName === 'td') {
        if (parentTagName === 'tr') return true;
    }
    if (parentStyle.display === 'flex' && parentStyle.flexDirection === 'row') return true;
    if (parentStyle.display === 'grid') {
        if (isNotFullWidth()) return true;
    }
    if (inlineHtmlTags.has(tagName)) {
        if (style.display === 'block') {
            if (style.float === 'left' || style.float === 'right') {
                if (isNotFullWidth()) return true
            }
            return false;
        }
        return true;
    }
    return false;
}

/**
 * 计算辅助工具的位置
 * @param container 外层容器
 * @param element   内部dom节点
 */
function calcAuxToolPosition(container: Element, element: Element): AuxToolPosition {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return {
        height: elementRect.height - 2,
        width: elementRect.width - 2,
        top: elementRect.top - containerRect.top + container.scrollTop + 1,
        left: elementRect.left - containerRect.left + container.scrollLeft + 1,
        isTop: elementRect.top - containerRect.top < 28,
        isBottom: (containerRect.top + containerRect.height - elementRect.top - elementRect.height) < 28,
    };
}

/**
 * 计算渲染节点与光标的距离
 * @param position  鼠标位置
 * @param element   渲染节点dom
 */
function calcNodeToCursorDistance(position: CursorPosition, element: Element): NodeToCursorDistance {
    const elementRect = element.getBoundingClientRect();
    // 计算四个边的距离
    const top = position.clientY - elementRect.top;
    const bottom = position.clientY - elementRect.top - elementRect.height;
    const left = position.clientX - elementRect.left;
    const right = position.clientX - elementRect.left - elementRect.width;
    const topAbs = Math.abs(top);
    const bottomAbs = Math.abs(bottom);
    const leftAbs = Math.abs(left);
    const rightAbs = Math.abs(right);
    // 光标是否在渲染节点里面
    const vInside = top >= 0 && bottom <= 0;
    const hInside = left >= 0 && right <= 0;
    const bothInside = vInside && hInside && elementRect.width > 0 && elementRect.height > 0;
    let direction: Direction | undefined;
    if (!bothInside) {
        if (top <= 0) {
            direction = Direction.top;
        } else if (bottom >= 0) {
            direction = Direction.bottom;
        } else if (left <= 0) {
            direction = Direction.left;
        } else if (right >= 0) {
            direction = Direction.right;
        }
    }
    const directionDistances = [
        { direction: Direction.top, value: topAbs },
        { direction: Direction.bottom, value: bottomAbs },
        { direction: Direction.left, value: leftAbs },
        { direction: Direction.right, value: rightAbs },
    ];
    if (!direction) {
        direction = lodash.minBy(directionDistances, item => item.value,)!.direction;
    }
    // 处理 rowBlock inlineBlock 逻辑
    const inlineBlock = calcElementIsInlineBlock(element);
    const rowBlock = !inlineBlock;
    if (inlineBlock && [Direction.top, Direction.bottom].includes(direction)) {
        direction = leftAbs >= rightAbs ? Direction.right : Direction.left;
    }
    if (rowBlock && [Direction.left, Direction.right].includes(direction)) {
        direction = topAbs >= bottomAbs ? Direction.bottom : Direction.top;
    }
    // 如果离边框太近优先使用对应的边框
    if (bothInside) {
        const minDistance = lodash.minBy(directionDistances, item => item.value,)!;
        if (minDistance.value <= 10) {
            direction = minDistance.direction;
        }
    }
    // 计算四个点的距离
    const leftTop = Math.abs(calcDistance(position.clientX, position.clientY, elementRect.left, elementRect.top));
    const leftBottom = Math.abs(calcDistance(position.clientX, position.clientY, elementRect.left, elementRect.top + elementRect.height));
    const rightTop = Math.abs(calcDistance(position.clientX, position.clientY, elementRect.left + elementRect.width, elementRect.top));
    const rightBottom = Math.abs(calcDistance(position.clientX, position.clientY, elementRect.left + elementRect.width, elementRect.top + elementRect.height));
    const { point } = lodash.minBy(
        [
            { point: PointDirection.leftTop, value: leftTop },
            { point: PointDirection.leftBottom, value: leftBottom },
            { point: PointDirection.rightTop, value: rightTop },
            { point: PointDirection.rightBottom, value: rightBottom },
        ],
        item => item.value,
    )!;
    return {
        element: element,
        width: elementRect.width,
        height: elementRect.height,
        top: topAbs,
        bottom: bottomAbs,
        left: leftAbs,
        right: rightAbs,
        vInside: vInside,
        hInside: hInside,
        bothInside: bothInside,
        direction: direction,
        leftTop: leftTop,
        leftBottom: leftBottom,
        rightTop: rightTop,
        rightBottom: rightBottom,
        point: point,
        rowBlock: rowBlock,
        inlineBlock: inlineBlock,
    };
}

/**
 * 计算两点之间的距离(x1 - x2)
 */
function calcDistance(x1: number, y1: number, x2: number = 0, y2: number = 0) {
    x2 = x2 ?? 0;
    y2 = y2 ?? 0;
    // 两点之间的距离公式
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * 计算位置增量
 * @param end   结束位置
 * @param start 开始位置
 */
function calcPositionDelta(end: CursorPosition, start?: CursorPosition): CursorPosition {
    const position: any = {};
    for (let key in end) {
        if (isValidNumber(end[key]) && isValidNumber(start?.[key])) {
            position[key] = end[key] - start[key];
        } else {
            position[key] = end[key];
        }
    }
    return position;
}

export {
    calcAuxToolPosition,
    calcNodeToCursorDistance,
    calcDistance,
    calcPositionDelta,
}
