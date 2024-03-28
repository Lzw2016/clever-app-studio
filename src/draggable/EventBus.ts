import mitt from "mitt";
import lodash from "lodash";
import { AnyConstructor, DesignerEvent, PrioritySubscriber, Subscriber } from "@/draggable/types/Designer";

/**
 * 设计器事件总线
 */
class EventBus {
    /** 事件总线 */
    private readonly emitter = mitt();
    /** 事件订阅函数 */
    private readonly subscribes: Map<string, Array<PrioritySubscriber>> = new Map<string, Array<PrioritySubscriber>>();
    /** 已开始监听 */
    private started = false;

    /**
     * 分发事件(生产事件)
     * @param event 事件对象
     */
    public dispatch<T = any>(event: DesignerEvent<T>): void {
        this.emitter.emit(event['constructor'].name, event);
    }

    /** 开始监听事件(仅针对优先级事件) */
    public startListening() {
        this.started = true;
        this.subscribes.forEach((arr, name) => {
            arr = lodash.sortBy(arr, item => item.priority);
            for (let subscribe of arr) {
                this.emitter.on(name, subscribe.fun);
            }
        });
        this.subscribes.clear();
    }

    /**
     * 订阅指定的事件(消费事件)
     * @param eventClass 事件构造函数(事件类型)
     * @param subscriber 事件订阅函数
     * @param priority  优先级，默认：0(越小越优先)
     * @return  返回取消订阅函数
     */
    public subscribe<Event extends DesignerEvent>(eventClass: AnyConstructor<Event>, subscriber: Subscriber<InstanceType<AnyConstructor<Event>>>, priority: number = 0): () => void {
        if (this.started) {
            this.emitter.on(eventClass.name, subscriber);
        } else {
            let arr = this.subscribes.get(eventClass.name);
            if (!arr) {
                arr = [];
                this.subscribes.set(eventClass.name, arr);
            }
            arr.push({ priority, fun: subscriber });
        }
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
     * 清除所有的订阅函数，并结束监听事件
     */
    public clearAllSubscribe(): void {
        this.emitter.all.clear();
        this.subscribes.clear();
        this.started = false;
    }
}

export {
    EventBus,
}
