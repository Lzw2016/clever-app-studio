function getGlobalThis() {
    // 自定义的 globalThisPolyfill 对象
    try {
        if (typeof globalThisPolyfill !== 'undefined') {
            return globalThisPolyfill;
        }
    } catch (e) {
    }
    // 浏览器环境
    try {
        if (typeof self !== 'undefined') {
            return self;
        }
    } catch (e) {
    }
    // Node.js 环境
    try {
        if (typeof global !== 'undefined') {
            return global;
        }
    } catch (e) {
    }
    // 获取当前上下文 this
    return Function('return this')();
}

export const globalThisPolyfill: Window = getGlobalThis();
