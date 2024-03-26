import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { designerContent } from "@/draggable/Constant";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";

/**
 * 设计器辅助功能
 */
class AuxToolEffect extends DesignerEffect {
    /** 最后一次的 event.data.target 对象 */
    private lastEventTarget: EventTarget | undefined;

    private minTime = 50;
    private lastTime = Date.now();

    effect(): void {
        this.hoverDashedEffect();
        this.selectionEffect();
    }

    /**
     * 设计器鼠标悬停时的虚线
     */
    hoverDashedEffect() {
        // 鼠标移动
        this.eventbus.subscribe(MouseMoveEvent, event => {
            const now = Date.now();
            if (event.data.target === this.lastEventTarget) {
                this.lastTime = now;
                return;
            }
            const interval = now - this.lastTime;
            if (interval < this.minTime) return;
            this.lastTime = now;
            requestIdle(params => {
                console.log("handleTest MouseMoveEvent");
                const target = event.data.target as HTMLElement;
                if (!target?.closest) return;
                const container = target.closest(designerContent);
                if (!container) return;
                const element = target.closest(`[${htmlExtAttr.nodeRef}]`);
                if (!element) return;
                const containerRect = container.getBoundingClientRect()
                const elementRect = element.getBoundingClientRect()
                this.designerEngine.tmp.position = {
                    height: elementRect.height - 2,
                    width: elementRect.width - 2,
                    top: elementRect.top - containerRect.top + 1,
                    left: elementRect.left - containerRect.left + 1,
                    componentType: useHtmlExtAttr.componentType(element),
                };
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
            console.log(" MouseClickEvent");
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
                top: elementRect.top - containerRect.top + 1,
                left: elementRect.left - containerRect.left + 1,
                componentType: useHtmlExtAttr.componentType(element),
            };
        });
    }
}

export {
    AuxToolEffect,
}
