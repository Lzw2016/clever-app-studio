import lodash from "lodash";
import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { designerContent } from "@/draggable/Constant";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { calcAuxToolPosition, calcNodeToCursorDistance } from "@/draggable/utils/PositionCalc";
import { existsPlaceholder } from "@/draggable/utils/ComponentMetaUtils";
import { NodeToCursorDistance, PointDirection } from "@/draggable/types/Designer";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";
import { DesignerState } from "@/draggable/models/DesignerState";
import { Selection } from "@/draggable/models/Selection";
import { DragMoveEvent } from "@/draggable/events/cursor/DragMoveEvent";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";

interface NodeAndDesigner {
    /** 渲染节点dom */
    node: HTMLElement;
    /** 设计器容器dom */
    designer: HTMLElement;
}

/**
 * 设计器辅助功能
 */
class AuxToolEffect extends DesignerEffect {
    /** hover变化一次的最小时间间隔 */
    private readonly minHoverChangeTime = 50;
    /** 最后一次的 event.data.target 对象 */
    private lastEventTarget: EventTarget | undefined;
    /** 最后一次鼠标移动事件事件 */
    private lastMouseMoveTime = Date.now();

    effect(): void {
        this.hoverDashedEffect();
        this.selectionEffect();
        this.insertionEffect();
    }

    protected getNodeAndDesigner(designerState: DesignerState, target?: HTMLElement): NodeAndDesigner | undefined {
        if (!target?.closest) return;
        let container: HTMLElement | undefined = designerState.designerContainer;
        if (!container) container = target.closest(designerContent) as HTMLElement;
        if (!container) return;
        const element = target.closest(`[${htmlExtAttr.nodeRef}]:not([${htmlExtAttr.placeholderName}])`) as HTMLElement;
        if (!element) return;
        return { node: element, designer: container };
    }

    protected getVerticalDistance(distance: NodeToCursorDistance) {
        if (distance.vInside) return -1;
        return Math.min(distance.top, distance.bottom);
    }

    protected getHorizontalDistance(distance: NodeToCursorDistance) {
        if (distance.hInside) return -1;
        return Math.min(distance.left, distance.right);
    }

    protected setInsertion(designerState: DesignerState, containerId: string, distance: NodeToCursorDistance, placeholder: string = "") {
        let designerContainer = designerState.designerContainer as Element | null;
        if (!designerContainer) designerContainer = distance.element.closest(designerContent);
        if (!designerContainer) return;
        this.designerEngine.insertion.clear();
        this.designerEngine.insertion.distance = distance;
        this.designerEngine.insertion.position = calcAuxToolPosition(designerContainer, distance.element);
        this.designerEngine.insertion.containerId = containerId;
        if (lodash.trim(placeholder).length <= 0) {
            this.designerEngine.insertion.slotName = useHtmlExtAttr.slotName(distance.element);
            this.designerEngine.insertion.nodeId = useHtmlExtAttr.nodeId(distance.element);
        } else {
            this.designerEngine.insertion.slotName = placeholder;
            this.designerEngine.insertion.nodeId = containerId;
            this.designerEngine.insertion.placeholder = true;
        }
    }

    /**
     * 设计器鼠标悬停时的虚线
     */
    hoverDashedEffect() {
        // 鼠标移动
        this.eventbus.subscribe(MouseMoveEvent, event => {
            const now = Date.now();
            // target dom 没有变
            if (event.data.target === this.lastEventTarget) {
                this.lastMouseMoveTime = now;
                return;
            }
            const interval = now - this.lastMouseMoveTime;
            if (interval < this.minHoverChangeTime) return;
            this.lastMouseMoveTime = now;
            // 在浏览器空闲时期计算
            requestIdle(() => {
                // console.log("hoverDashedEffect MouseMoveEvent");
                const designerState = this.designerEngine.activeDesignerState;
                if (!designerState) return;
                const hover = designerState.hover;
                const target = event.data.target as HTMLElement;
                const nodeAndDesigner = this.getNodeAndDesigner(designerState, target);
                if (!nodeAndDesigner) return;
                const nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
                if (designerState.selections.some(item => item.nodeId === nodeId)) {
                    hover.clear();
                    return;
                }
                hover.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
                hover.nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
                hover.position = calcAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
                this.lastEventTarget = event.data.target;
            });
        });
    }

    /**
     * 设计器选择组件的信息
     */
    selectionEffect() {
        // 鼠标单击
        this.eventbus.subscribe(MouseClickEvent, event => {
            // console.log("selectionEffect MouseClickEvent");
            const designerState = this.designerEngine.activeDesignerState;
            if (!designerState) return;
            const target = event.data.target as HTMLElement;
            const nodeAndDesigner = this.getNodeAndDesigner(designerState, target);
            if (!nodeAndDesigner) return;
            const hover = designerState.hover;
            const selections = designerState.selections;
            const selection = new Selection(designerState);
            selection.nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
            selection.parentId = useHtmlExtAttr.nodeParentId(nodeAndDesigner.node);
            if (selections.some(item => item.nodeId === selection.nodeId)) {
                return;
            }
            selection.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
            selection.position = calcAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
            selections.length = 0;
            selections.push(selection);
            if (hover.nodeId && selections.some(item => item.nodeId === hover.nodeId)) {
                hover.clear();
            }
        });
    }

    /**
     * 设计器插入组件的信息
     */
    insertionEffect() {
        // 拖动中
        this.eventbus.subscribe(DragMoveEvent, event => {
            // console.log("insertionEffect DragMoveEvent");
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            if (!draggingCmpMetas.existsCmpMeta) return;
            let target = event.data.target as Element | null;
            if (!target) return;
            requestIdle(() => {
                // 光标不在 designerContent 区域内直接返回
                if (!target?.closest || !target.closest(designerContent)) {
                    this.designerEngine.insertion.clear();
                    return;
                }
                const designerState = this.designerEngine.activeDesignerState;
                if (!designerState?.designerContainer) return;
                const designerBlock = designerState.blockInstance;
                if (!designerBlock) return;
                // event.data.target 属于 placeholder
                const placeholder = useHtmlExtAttr.placeholderName(target);
                if (placeholder) {
                    // 覆盖整个 containerNode
                    const distance = calcNodeToCursorDistance(event.data, event.data.target as Element);
                    const nodeParentId = useHtmlExtAttr.nodeParentId(distance.element);
                    if (nodeParentId) {
                        this.setInsertion(designerState, nodeParentId, distance, placeholder);
                        return;
                    }
                }
                // 找出离当前鼠标位置最近的容器组件
                let containerNode: Element | null = null;
                let containerId: string | undefined;
                while (true) {
                    if (!target) return;
                    containerNode = target.closest(`[${htmlExtAttr.nodeId}]`);
                    if (!containerNode) return;
                    containerId = useHtmlExtAttr.nodeId(containerNode);
                    if (!containerId) return;
                    const runtimeNode = designerBlock.globalContext.allNode[containerId];
                    if (!runtimeNode) return;
                    const isContainer = existsPlaceholder(runtimeNode.__designPlaceholder);
                    if (isContainer) {
                        break;
                    } else {
                        if (target === containerNode) {
                            target = containerNode.parentElement;
                        } else {
                            target = containerNode;
                        }
                    }
                }
                if (!containerNode || !containerId) return;
                // event.data.target 就是渲染容器节点本身
                if (containerNode === event.data.target) {
                    const distance = calcNodeToCursorDistance(event.data, containerNode);
                    const minDistance = Math.min(distance.top, distance.bottom, distance.left, distance.right);
                    if (minDistance <= 12) {
                        const nodeParentId = useHtmlExtAttr.nodeParentId(distance.element);
                        if (nodeParentId) {
                            this.setInsertion(designerState, nodeParentId, distance);
                            return;
                        }
                    }
                }
                // 查找当前容器组件中所有 items 和 slots 位置渲染的节点
                const nodes = containerNode.querySelectorAll(`[${htmlExtAttr.nodeParentId}=${containerId}]`);
                const distances: Array<NodeToCursorDistance> = [];
                nodes.forEach(node => distances.push(calcNodeToCursorDistance(event.data, node)));
                if (distances.length <= 0) return;
                const minVertical = lodash.min(distances.map(distance => this.getVerticalDistance(distance)))!;
                const verticalDistances = distances.filter(distance => this.getVerticalDistance(distance) <= minVertical);
                const minHorizontal = lodash.min(verticalDistances.map(distance => this.getHorizontalDistance(distance)))!;
                const horizontalDistances = verticalDistances.filter(distance => this.getHorizontalDistance(distance) <= minHorizontal);
                const minDistance = lodash.minBy(horizontalDistances, distance => {
                    if (distance.bothInside) return -1;
                    if (distance.point === PointDirection.leftTop) return distance.leftTop;
                    if (distance.point === PointDirection.leftBottom) return distance.leftBottom;
                    if (distance.point === PointDirection.rightTop) return distance.rightTop;
                    if (distance.point === PointDirection.rightBottom) return distance.rightBottom;
                    return Number.MAX_VALUE;
                })!;
                // 计算结果赋值
                this.setInsertion(designerState, containerId, minDistance);
            });
        });
        // 拖拽结束
        this.eventbus.subscribe(DragStopEvent, event => {
            const insertion = this.designerEngine.insertion;
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            if (insertion.distance) {
                draggingCmpMetas.insertion = {
                    distance: insertion.distance,
                    position: insertion.position!,
                    containerId: insertion.containerId!,
                    slotName: insertion.slotName!,
                    nodeId: insertion.nodeId!,
                    placeholder: insertion.placeholder!,
                    before: insertion.isBefore(),
                };
            }
            requestIdle(() => insertion.clear());
        });
    }
}

export {
    AuxToolEffect,
}
