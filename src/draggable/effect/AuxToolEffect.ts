import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { designerContent } from "@/draggable/Constant";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";
import { AuxToolPosition } from "@/draggable/types/Designer";

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
            if (event.data.target === this.lastEventTarget) {
                this.lastMouseMoveTime = now;
                return;
            }
            const interval = now - this.lastMouseMoveTime;
            if (interval < this.minHoverChangeTime) return;
            this.lastMouseMoveTime = now;
            requestIdle(() => {
                console.log("hoverDashedEffect MouseMoveEvent");
                const designerState = this.designerEngine.activeDesignerState;
                if (!designerState) return;
                const hover = designerState.hover;
                const target = event.data.target as HTMLElement;
                const nodeAndDesigner = this.getNodeAndDesigner(target);
                if (!nodeAndDesigner) return;
                hover.position = this.getAuxToolPosition(nodeAndDesigner.designer, nodeAndDesigner.node);
                hover.componentMeta = useHtmlExtAttr.componentMeta(nodeAndDesigner.node, this.componentManage);
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
            const target = event.data.target as HTMLElement;
            if (!target?.closest) return;
            const container = target.closest(designerContent);
            if (!container) return;
            const element = target.closest(`[${htmlExtAttr.nodeRef}]`);
            if (!element) return;
            const containerRect = container.getBoundingClientRect()
            const elementRect = element.getBoundingClientRect()
            this.designerEngine.tmp.selection = {
                height: elementRect.height - 2,
                width: elementRect.width - 2,
                top: elementRect.top - containerRect.top + container.scrollTop + 1,
                left: elementRect.left - containerRect.left + 1,
                componentType: useHtmlExtAttr.componentType(element),
            };
        });
    }
}

export {
    AuxToolEffect,
}
