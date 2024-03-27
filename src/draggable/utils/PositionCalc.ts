import { AuxToolPosition, CursorPosition, Direction, NodeToCursorDistance, PointDirection } from "@/draggable/types/Designer";
import lodash from "lodash";

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
        isTop: elementRect.top - containerRect.top < 40,
        isBottom: (containerRect.top + containerRect.height - elementRect.top - elementRect.height) < 40,
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
    const { direction } = lodash.minBy(
        [
            { direction: Direction.top, value: Math.abs(top) },
            { direction: Direction.bottom, value: Math.abs(bottom) },
            { direction: Direction.left, value: Math.abs(left) },
            { direction: Direction.right, value: Math.abs(right) },
        ],
        item => item.value,
    )!;
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
        top: Math.abs(top),
        bottom: Math.abs(bottom),
        left: Math.abs(left),
        right: Math.abs(right),
        direction: direction,
        leftTop: leftTop,
        leftBottom: leftBottom,
        rightTop: rightTop,
        rightBottom: rightBottom,
        point: point,
        inside: top >= 0 && bottom <= 0 && left >= 0 && right <= 0 && elementRect.width > 0 && elementRect.height > 0,
        rowBlock: true,
        inlineBlock: true,
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

export {
    calcAuxToolPosition,
    calcNodeToCursorDistance,
    calcDistance,
}
