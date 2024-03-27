import { AuxToolPosition, CursorPosition, NodeToCursorDistance } from "@/draggable/types/Designer";

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
    const top = position.clientY - elementRect.top;
    const bottom = position.clientY - elementRect.top - elementRect.height;
    const left = position.clientX - elementRect.left;
    const right = position.clientX - elementRect.left - elementRect.width;
    return {
        element: element,
        width: elementRect.width,
        height: elementRect.height,
        top: Math.abs(top),
        bottom: Math.abs(bottom),
        left: Math.abs(left),
        right: Math.abs(right),
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
