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
 * @param len UID的长度(Math.random()次数)
 */
function randomUID(len?: number): string {
    let str = '', num = Math.max((len || 12), 1);
    while (num--) {
        str += HEX[(Math.random() * 36) | 0];
    }
    return str;
}

export {
    randomUID,
}
