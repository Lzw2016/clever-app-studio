import lodash from "lodash";
import { childSlotName } from "@/draggable/Constant";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { DesignNode } from "@/draggable/types/DesignBlock";
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
            // console.log("handleDraggingCmpMetas DragStartEvent");
            const componentMeta = event.data.componentMeta as ComponentMeta;
            if (!componentMeta) return;
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            draggingCmpMetas.cmpMetas = [componentMeta];
        });
        // 拖拽结束
        this.eventbus.subscribe(DragStopEvent, event => {
            // console.log("draggingCmpMetasEffect DragStopEvent");
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            const designerState = this.designerEngine.activeDesignerState;
            const insertion = draggingCmpMetas.insertion;
            if (!insertion || !draggingCmpMetas.existsCmpMeta || !designerState?.blockInstance) return;
            // 插入新nodes
            const { placeholder, slotName, nodeId, before } = insertion;
            const addNodes = draggingCmpMetas.cmpMetas.map(cmpMeta => {
                const node: DesignNode = {
                    ...(lodash.cloneDeep(cmpMeta.defDesignNode ?? {})),
                    type: cmpMeta.type,
                };
                return node;
            });
            if (placeholder) {
                if (slotName === childSlotName) {
                    designerState.blockInstance.blockOpsById.appendItemsById(nodeId, addNodes);
                } else {
                    designerState.blockInstance.blockOpsById.appendSlotsById(nodeId, slotName, addNodes);
                }
            } else if (before) {
                if (slotName === childSlotName) {
                    designerState.blockInstance.blockOpsById.beforeAddItemsById(nodeId, addNodes);
                } else {
                    designerState.blockInstance.blockOpsById.beforeAddSlotsById(nodeId, slotName, addNodes);
                }
            } else {
                if (slotName === childSlotName) {
                    designerState.blockInstance.blockOpsById.afterAddItemsById(nodeId, addNodes);
                } else {
                    designerState.blockInstance.blockOpsById.afterAddSlotsById(nodeId, slotName, addNodes);
                }
            }
            // 清空 cmpMetas
            draggingCmpMetas.cmpMetas = [];
        }, 100);
    }
}

export {
    DraggingEffect,
}
