import { EventContainer } from "@/draggable/types/Designer";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerModule } from "@/draggable/DesignerModule";

/**
 * 设计器内部业务事件生产者
 */
abstract class DesignerDriver extends DesignerModule {
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

    /**
     * 启动当前 DesignerDriver 开始监听 HTMLElement 事件
     */
    abstract attach(): void;

    /**
     * 停止当前 DesignerDriver 监听 HTMLElement 事件
     */
    abstract detach(): void;
}

/** DesignerDriver 构造函数 */
type DesignerDriverConstructor = new (designerEngine: DesignerEngine, container: EventContainer, window: Window) => DesignerDriver;

export type {
    DesignerDriverConstructor,
}

export {
    DesignerDriver,
}
