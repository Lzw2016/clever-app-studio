import { globalThisPolyfill } from "@/utils/GlobalThisPolyfill";

interface IIdleDeadline {
    didTimeout: boolean;
    timeRemaining: () => DOMHighResTimeStamp;
}

interface IdleCallbackOptions {
    /** 回调在 timeout 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响 */
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
