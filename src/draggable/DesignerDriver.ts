import { EventContainer } from "@/draggable/types/Designer";
import { EventBus } from "@/draggable/EventBus";

/**
 * 设计器功能模块
 */
abstract class DesignerDriver {
    /** 设计器事件总线 */
    readonly eventbus: EventBus;
    /** 当前模块对应的 HTMLElement 对象 */
    readonly container: EventContainer = window.document;
    /** 当前模块对应的 window 对象 */
    readonly window: Window = window;

    protected constructor(eventbus: EventBus, container: EventContainer, window: Window) {
        this.eventbus = eventbus;
        this.container = container;
        this.window = window;
    }

    protected addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    protected addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    /**
     * 监听 container 的 HTMLElement 事件
     * @param type      HTMLElement 事件类型
     * @param listener  HTMLElement 事件执行函数
     * @param options   事件选项
     */
    protected addEventListener(type: any, listener: any, options?: any): void {
        this.container.addEventListener(type, listener, options);
    }

    protected removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    protected removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    /**
     * 取消 container 的 HTMLElement 事件监听
     * @param type      HTMLElement 事件类型
     * @param listener  HTMLElement 事件执行函数
     * @param options   事件选项
     */
    protected removeEventListener(type: any, listener: any, options?: any): void {
        this.container.addEventListener(type, listener, options);
    }

    /**
     * 启动当前 DesignerDriver 开始监听 HTMLElement 事件
     */
    abstract attach(): void;

    /**
     * 停止当前 DesignerDriver 监听 HTMLElement 事件
     */
    abstract detach(): void;

    /**
     * 消费 EventBus 中的事件
     */
    abstract effect(): void;
}

/** DesignerDriver 构造函数 */
type DesignerDriverConstructor = new (eventbus: EventBus, container: EventContainer, window: Window) => DesignerDriver;

export type {
    DesignerDriverConstructor,
}

export {
    DesignerDriver,
}