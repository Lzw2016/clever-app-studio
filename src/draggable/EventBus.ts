import mitt from "mitt";
import { DesignerEvent, DesignerEventType, Subscriber } from "@/draggable/types/Designer";

/**
 * 设计器事件总线
 */
class EventBus {
    /** 事件总线 */
    private readonly emitter = mitt();

    /**
     * 分发事件(生产事件)
     * @param event 事件对象
     */
    public dispatch<T = any>(event: DesignerEvent<T>): void {
        this.emitter.emit(event.type, event);
    }

    /**
     * 订阅指定的事件(消费事件)
     * @param evenTypes     事件类型
     * @param subscriber    事件订阅函数
     * @return  返回取消订阅函数
     */
    public subscribe<T = any>(evenTypes: DesignerEventType, subscriber: Subscriber<T>): () => void {
        this.emitter.on(evenTypes, subscriber);
        return () => this.emitter.off(evenTypes, subscriber);
    }

    /**
     * 取消指定的订阅函数
     * @param evenTypes     事件类型
     * @param subscriber    事件订阅函数
     */
    public unsubscribe(evenTypes: DesignerEventType, subscriber: Subscriber): void {
        this.emitter.off(evenTypes, subscriber);
    }

    /**
     * 取消指定事件类型的所有订阅函数
     * @param evenTypes 事件类型
     */
    public unsubscribeAll(evenTypes: DesignerEventType): void {
        this.emitter.all.delete(evenTypes);
    }

    /**
     * 清除所有的订阅函数
     */
    public clearAllSubscribe(): void {
        this.emitter.all.clear();
    }
}

export {
    EventBus,
}
