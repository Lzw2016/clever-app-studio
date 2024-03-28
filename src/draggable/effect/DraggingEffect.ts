import lodash from "lodash";
import { isObj } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { DesignNode } from "@/draggable/types/DesignBlock";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";
import { RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { Selection } from "@/draggable/models/Selection";
import { calcAuxToolPosition } from "@/draggable/utils/PositionCalc";

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
            const blockInstance = designerState?.blockInstance;
            if (!insertion || !draggingCmpMetas.existsCmpMeta || !blockInstance) return;
            // 插入新nodes
            const { placeholder, slotName, nodeId, before } = insertion;
            const addNodes = draggingCmpMetas.cmpMetas.map(cmpMeta => {
                const node: DesignNode = {
                    ...(lodash.cloneDeep(cmpMeta.defDesignNode ?? {})),
                    type: cmpMeta.type,
                };
                return node;
            });
            let addItems: Array<RuntimeComponentSlotsItem>;
            if (placeholder) {
                if (slotName === childSlotName) {
                    addItems = blockInstance.blockOpsById.appendItemsById(nodeId, addNodes);
                } else {
                    addItems = blockInstance.blockOpsById.appendSlotsById(nodeId, slotName, addNodes);
                }
            } else if (before) {
                if (slotName === childSlotName) {
                    addItems = blockInstance.blockOpsById.beforeAddItemsById(nodeId, addNodes);
                } else {
                    addItems = blockInstance.blockOpsById.beforeAddSlotsById(nodeId, slotName, addNodes);
                }
            } else {
                if (slotName === childSlotName) {
                    addItems = blockInstance.blockOpsById.afterAddItemsById(nodeId, addNodes);
                } else {
                    addItems = blockInstance.blockOpsById.afterAddSlotsById(nodeId, slotName, addNodes);
                }
            }
            // 清空 cmpMetas
            draggingCmpMetas.cmpMetas = [];
            // 选中新增的节点
            if (designerState.designerContainer) {
                const designerContainer = designerState.designerContainer;
                blockInstance.$nextTick(() => {
                    const addRuntimeNodes = addItems.filter(node => isObj(node)) as Array<RuntimeNode>;
                    for (let node of addRuntimeNodes) {
                        let blockRef = blockInstance.globalContext.nodeRefVueRef[node.ref];
                        if (!blockRef) continue;
                        const block = blockInstance.globalContext.allBlock[blockRef];
                        if (!block) continue;
                        let nodeEl: HTMLElement = block.$refs[node.ref];
                        if (!nodeEl) continue;
                        if (nodeEl['$el']) nodeEl = nodeEl['$el'];
                        const selection = new Selection(designerState);
                        selection.nodeId = node.id;
                        selection.parentId = node.__parentId;
                        selection.componentMeta = this.componentManage.getComponentMeta(node.type);
                        selection.position = calcAuxToolPosition(designerContainer, nodeEl);
                        designerState.selections.length = 0;
                        designerState.selections.push(selection);
                    }
                }).finally();
            }
        }, 100);
    }
}

export {
    DraggingEffect,
}
