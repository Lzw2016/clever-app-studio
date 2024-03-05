import { globalThisPolyfill } from "@/utils/GlobalThisPolyfill";

interface IIdleDeadline {
    didTimeout: boolean;
    timeRemaining: () => DOMHighResTimeStamp;
}

interface IdleCallbackOptions {
    timeout?: number;
}

/**
 * 将指定的函数将在浏览器空闲时期被调用
 * @param callback  将指定的函数
 * @param options   超时等选项
 */
function requestIdle(callback: (params: IIdleDeadline) => void, options?: IdleCallbackOptions): number {
    return globalThisPolyfill['requestIdleCallback'](callback, options);
}

/**
 * 取消 requestIdle 中的函数调用
 * @param id requestIdle返回的ID
 */
function cancelIdle(id: number) {
    globalThisPolyfill['cancelIdleCallback'](id);
}

export type {
    IIdleDeadline,
    IdleCallbackOptions,
}

export {
    requestIdle,
    cancelIdle,
}
