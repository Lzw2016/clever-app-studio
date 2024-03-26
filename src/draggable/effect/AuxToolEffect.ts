import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { designerContent } from "@/draggable/Constant";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { AuxToolPosition } from "@/draggable/types/Designer";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";
import { Selection } from "@/draggable/models/Selection";

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
    }

    protected getNodeAndDesigner(target?: HTMLElement): NodeAndDesigner | undefined {
        if (!target?.closest) return;
        const container = target.closest(designerContent) as HTMLElement;
        if (!container) return;
        const element = target.closest(`[${htmlExtAttr.nodeRef}]`) as HTMLElement;
        if (!element) return;
        return { node: element, designer: container };
    }

    protected getAuxToolPosition(container: Element, element: Element): AuxToolPosition {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        return {
            height: elementRect.height - 2,
            width: elementRect.width - 2,
            top: elementRect.top - containerRect.top + container.scrollTop + 1,
            left: elementRect.left - containerRect.left + container.scrollLeft + 1,
            isTop: elementRect.top - containerRect.top < 40,
            isBottom: (containerRect.top + containerRect.height - elementRect.top - elementRect.height) < 40,
        };
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
                const nodeAndDesigner = this.getNodeAndDesigner(target);
                if (!nodeAndDesigner) return;
                const nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
                if (designerState.selections.some(item => item.nodeId === nodeId)) {
                    hover.clear();
                    return;
                }
                hover.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
                hover.nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
                hover.position = this.getAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
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
            const nodeAndDesigner = this.getNodeAndDesigner(target);
            if (!nodeAndDesigner) return;
            const hover = designerState.hover;
            const selections = designerState.selections;
            const selection = new Selection(designerState);
            selection.nodeId = useHtmlExtAttr.nodeId(nodeAndDesigner.node);
            if (selections.some(item => item.nodeId === selection.nodeId)) {
                return;
            }
            selection.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
            selection.position = this.getAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
            designerState.selections.length = 0;
            selections.push(selection);
            if (hover.nodeId && selections.some(item => item.nodeId === hover.nodeId)) {
                hover.clear();
            }
        });
    }
}

export {
    AuxToolEffect,
}
