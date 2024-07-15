function getHex(): string {
    let idx = 36, hex = '';
    while (idx--) {
        hex += idx.toString(36);
    }
    return hex;
}

const HEX = getHex();

/**
 * 基于 Math.random() 生产随机的 UID
 * @param prefix    自定义UID前缀
 * @param len       UID的长度(Math.random()次数)
 */
function randomUID(prefix?: string, len?: number): string {
    let str = '', num = Math.max((len || 12), 1);
    while (num--) {
        str += HEX[(Math.random() * 36) | 0];
    }
    return (prefix ?? "") + str;
}

let vnodeCount = 0;

/**
 * 生成新的 VNode ID
 * @param prefix 自定义ID前缀
 */
function createVNodeID(prefix: string = "node") {
    return `${prefix}_${vnodeCount++}`;
}

let refCount = 0;

/**
 * 生成新的 ref ID
 * @param prefix 自定义ID前缀
 */
function createRefID(prefix: string = "ref") {
    return `${prefix}_${refCount++}`;
}

export {
    randomUID,
    createVNodeID,
    createRefID,
}
