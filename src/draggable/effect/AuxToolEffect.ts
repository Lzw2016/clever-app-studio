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
        const element = target.closest(`[${htmlExtAttr.nodeRef}]`) as HTMLElement;
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
                console.log("hoverDashedEffect MouseMoveEvent");
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
            console.log("selectionEffect MouseClickEvent");
            const designerState = this.designerEngine.activeDesignerState;
            if (!designerState) return;
            const target = event.data.target as HTMLElement;
            const nodeAndDesigner = this.getNodeAndDesigner(designerState, target);
            if (!nodeAndDesigner) return;
            const hover = designerState.hover;
            const selections = designerState.selections;
            const selection = new Selection(designerState);
            selection.nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
            if (selections.some(item => item.nodeId === selection.nodeId)) {
                return;
            }
            selection.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
            selection.position = calcAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
            designerState.selections.length = 0;
            selections.push(selection);
            if (hover.nodeId && selections.some(item => item.nodeId === hover.nodeId)) {
                hover.clear();
            }
        });
    }

    insertionEffect() {
        // 拖动中
        this.eventbus.subscribe(DragMoveEvent, event => {
            console.log("insertionEffect DragMoveEvent");
            const draggingCmpMetas = this.designerEngine.draggingCmpMetas;
            if (!draggingCmpMetas.existsCmpMeta) return;
            let target = event.data.target as Element | null;
            if (!target) return;
            requestIdle(() => {
                const designerState = this.designerEngine.activeDesignerState;
                if (!designerState?.designerContainer) return;
                const designerBlock = designerState.designerBlock;
                if (!designerBlock) return;
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
                // 查找当前容器组件中所有 items 和 slots 位置渲染的节点
                const nodes = containerNode.querySelectorAll(`[${htmlExtAttr.nodeParentId}=${containerId}]`);
                const distances: Array<NodeToCursorDistance> = [];
                nodes.forEach(node => distances.push(calcNodeToCursorDistance(event.data, node)));
                if (distances.length <= 0) {
                    // TODO 覆盖整个 containerNode
                    // console.log("@@@@###")
                    return;
                }
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
                this.designerEngine.insertion.clear();
                this.designerEngine.insertion.distance = minDistance;
                this.designerEngine.insertion.position = calcAuxToolPosition(designerState.designerContainer, minDistance.element);
                this.designerEngine.insertion.containerId = containerId;
                this.designerEngine.insertion.slotName = useHtmlExtAttr.slotName(minDistance.element);
                this.designerEngine.insertion.nodeId = useHtmlExtAttr.nodeId(minDistance.element);
                // console.log("minDistance", minDistance, distances)
            });
        });
    }
}

export {
    AuxToolEffect,
}
