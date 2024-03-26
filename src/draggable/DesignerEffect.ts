import { DesignerEngine } from "@/draggable/DesignerEngine";
import { EventContainer } from "@/draggable/types/Designer";
import { DesignerModule } from "@/draggable/DesignerModule";

/**
 * 设计器内部业务事件消费者
 */
abstract class DesignerEffect extends DesignerModule {
    /**
     * 消费 EventBus 中的事件
     */
    abstract effect(): void;
}

/** DesignerEffect 构造函数 */
type DesignerEffectConstructor = new (designerEngine: DesignerEngine, container: EventContainer, window: Window) => DesignerEffect;

export type {
    DesignerEffectConstructor,
}

export {
    DesignerEffect,
}
