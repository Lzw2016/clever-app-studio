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
    calcDistance,
}
