import { Property } from "csstype";
import { EventContainer } from "@/draggable/types/Designer";
import { EventBus } from "@/draggable/EventBus";
import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 设计器功能模块
 */
abstract class DesignerDriver {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 设计器事件总线 */
    readonly eventbus: EventBus;
    /** 当前模块对应的 HTMLElement 对象 */
    readonly container: EventContainer = window.document;
    /** 当前模块对应的 window 对象 */
    readonly window: Window = window;

    constructor(designerEngine: DesignerEngine, container: EventContainer, window: Window) {
        this.designerEngine = designerEngine;
        this.eventbus = designerEngine.eventbus;
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
        // if (this.container[type] === listener) return;
        // this.container[type] = listener;
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
        this.container.removeEventListener(type, listener, options);
    }

    protected getContainerCursorStyle() {
        if (this.container instanceof Document) {
            return this.container.body.style.cursor;
        }
        return this.container.style.cursor;
    }

    protected setContainerCursorStyle(cursorStyle: Property.Cursor) {
        if (this.container instanceof Document) {
            this.container.body.style.cursor = cursorStyle;
        } else {
            this.container.style.cursor = cursorStyle;
        }
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
type DesignerDriverConstructor = new (designerEngine: DesignerEngine, container: EventContainer, window: Window) => DesignerDriver;

export type {
    DesignerDriverConstructor,
}

export {
    DesignerDriver,
}
