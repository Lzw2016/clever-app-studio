import mitt from "mitt";
import { AnyConstructor, DesignerEvent, Subscriber } from "@/draggable/types/Designer";

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
        this.emitter.emit(event['constructor'].name, event);
    }

    /**
     * 订阅指定的事件(消费事件)
     * @param eventClass 事件构造函数(事件类型)
     * @param subscriber 事件订阅函数
     * @return  返回取消订阅函数
     */
    public subscribe<Event extends DesignerEvent>(eventClass: AnyConstructor<Event>, subscriber: Subscriber<InstanceType<AnyConstructor<Event>>>): () => void {
        this.emitter.on(eventClass.name, subscriber);
        return () => this.emitter.off(eventClass.name, subscriber);
    }

    /**
     * 取消指定的订阅函数
     * @param eventClass 事件构造函数(事件类型)
     * @param subscriber 事件订阅函数
     */
    public unsubscribe(eventClass: AnyConstructor, subscriber: Subscriber): void {
        this.emitter.off(eventClass.name, subscriber);
    }

    /**
     * 取消指定事件类型的所有订阅函数
     * @param eventClass 事件构造函数(事件类型)
     */
    public unsubscribeAll(eventClass: AnyConstructor): void {
        this.emitter.all.delete(eventClass.name);
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
