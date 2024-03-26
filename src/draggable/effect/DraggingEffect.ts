import { DesignerEffect } from "@/draggable/DesignerEffect";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";

/**
 * 设计器拖拽功能
 */
class DraggingEffect extends DesignerEffect {
    effect(): void {
        this.draggingCmpMetasEffect();
    }

    /**
     * 维护正在拖拽的组件的元信息
     */
    draggingCmpMetasEffect() {
        // 开始拖动
        this.eventbus.subscribe(DragStartEvent, event => {
            console.log("handleDraggingCmpMetas DragStartEvent");
            const componentMeta = event.data.componentMeta as ComponentMeta;
            if (!componentMeta) return;
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            draggingCmpMetas.cmpMetas = [componentMeta];
        });
        // 拖拽结束
        this.eventbus.subscribe(DragStopEvent, event => {
            console.log("handleDraggingCmpMetas DragStopEvent");
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            draggingCmpMetas.cmpMetas = [];
        });
    }
}

export {
    DraggingEffect,
}
