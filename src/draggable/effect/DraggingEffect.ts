import lodash from "lodash";
import { hasValue, isObj } from "@/utils/Typeof";
import { childSlotName, emptyNodeId } from "@/draggable/Constant";
import { calcAuxToolPosition } from "@/draggable/utils/PositionCalc";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { DesignNode } from "@/draggable/types/DesignBlock";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";
import { RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { Selection } from "@/draggable/models/Selection";

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
            const componentMetas = event.data.componentMetas as Map<string, ComponentMeta>;
            if (componentMetas.size <= 0) return;
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            draggingCmpMetas.cmpMetas = [];
            draggingCmpMetas.nodeIds = [];
            componentMetas.forEach((meta, nodeId) => {
                draggingCmpMetas.cmpMetas.push(meta);
                draggingCmpMetas.nodeIds.push(nodeId);
            });
        });
        // 拖拽结束
        this.eventbus.subscribe(DragStopEvent, event => {
            // console.log("draggingCmpMetasEffect DragStopEvent");
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            const designerState = this.designerEngine.activeDesignerState;
            const insertion = draggingCmpMetas.insertion;
            const blockInstance = designerState?.blockInstance;
            if (!insertion || !draggingCmpMetas.existsCmpMeta || !blockInstance) return;
            // 更新设计器渲染节点
            const { placeholder, slotName, nodeId, before } = insertion;
            let selectionNodes: Array<RuntimeComponentSlotsItem>;
            const moveNodeIds = draggingCmpMetas.nodeIds.filter(id => id !== emptyNodeId);
            if (moveNodeIds.length > 0) {
                selectionNodes = moveNodeIds.map(id => blockInstance.globalContext.allNode[id]).filter(node => hasValue(node));
                // 移动节点
                if (placeholder) {
                    if (slotName === childSlotName) {
                        blockInstance.blockOpsById.moveNodesToItemFirstById(nodeId, moveNodeIds);
                    } else {
                        blockInstance.blockOpsById.moveNodesToSlotFirstById(nodeId, slotName, moveNodeIds);
                    }
                } else if (before) {
                    if (slotName === childSlotName) {
                        blockInstance.blockOpsById.moveNodesToItemBeforeById(nodeId, moveNodeIds);
                    } else {
                        blockInstance.blockOpsById.moveNodesToSlotBeforeById(nodeId, slotName, moveNodeIds);
                    }
                } else {
                    if (slotName === childSlotName) {
                        blockInstance.blockOpsById.moveNodesToItemAfterById(nodeId, moveNodeIds);
                    } else {
                        blockInstance.blockOpsById.moveNodesToSlotAfterById(nodeId, slotName, moveNodeIds);
                    }
                }
            } else {
                // 插入新nodes
                const addNodes = draggingCmpMetas.cmpMetas.map(cmpMeta => {
                    const node: DesignNode = {
                        ...(lodash.cloneDeep(cmpMeta.defDesignNode ?? {})),
                        type: cmpMeta.type,
                    };
                    return node;
                });
                if (placeholder) {
                    if (slotName === childSlotName) {
                        selectionNodes = blockInstance.blockOpsById.appendItemsById(nodeId, addNodes);
                    } else {
                        selectionNodes = blockInstance.blockOpsById.appendSlotsById(nodeId, slotName, addNodes);
                    }
                } else if (before) {
                    if (slotName === childSlotName) {
                        selectionNodes = blockInstance.blockOpsById.beforeAddItemsById(nodeId, addNodes);
                    } else {
                        selectionNodes = blockInstance.blockOpsById.beforeAddSlotsById(nodeId, slotName, addNodes);
                    }
                } else {
                    if (slotName === childSlotName) {
                        selectionNodes = blockInstance.blockOpsById.afterAddItemsById(nodeId, addNodes);
                    } else {
                        selectionNodes = blockInstance.blockOpsById.afterAddSlotsById(nodeId, slotName, addNodes);
                    }
                }
            }
            // 清空 cmpMetas
            draggingCmpMetas.cmpMetas = [];
            // 选中新增的节点
            if (designerState.designerContainer) {
                const designerContainer = designerState.designerContainer;
                blockInstance.$nextTick(() => {
                    const addRuntimeNodes = selectionNodes.filter(node => isObj(node)) as Array<RuntimeNode>;
                    for (let node of addRuntimeNodes) {
                        let blockRef = blockInstance.globalContext.nodeRefVueRef[node.ref] ?? node.ref;
                        if (!blockRef) continue;
                        const block = blockInstance.globalContext.allBlock[blockRef];
                        if (!block) continue;
                        let nodeEl = block.$refs[node.ref];
                        if (!nodeEl) continue;
                        if (nodeEl.$el) nodeEl = nodeEl.$el as any;
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
