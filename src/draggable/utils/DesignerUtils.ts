// import { Property } from "csstype";
import { isValidNumber } from "@/utils/Typeof";
import { CursorPosition } from "@/draggable/types/Designer";

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

// /**
//  * 设置全局光标样式
//  * @param contentWindow Window对象(可能是iframe中的window)
//  * @param cursorStyle   HTML原生 style.cursor 属性值
//  */
// function setCursorStyle(contentWindow: Window, cursorStyle: Property.Cursor): void {
//     const root = contentWindow.document.getElementsByTagName('html')?.[0];
//     const currentRoot = document.getElementsByTagName('html')?.[0];
//     [root, currentRoot].forEach(dom => {
//         if (dom && dom.style.cursor !== cursorStyle) {
//             dom.style.cursor = cursorStyle;
//         }
//     });
// }

export {
    calcDistance,
    calcPositionDelta,
    // setCursorStyle,
}
