import { hasValue } from "@/utils/Typeof";
import { requestIdle } from "@/utils/RequestIdle";
import { designerContent } from "@/draggable/Constant";
import { DesignerDriver } from "@/draggable/DesignerDriver";
import { CursorStatus } from "@/draggable/types/Designer";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";

/**
 * 封装鼠标移动事件，产生的业务事件：MouseMoveEvent
 */
class MouseMoveDriver extends DesignerDriver {
    private request?: number = undefined;
    /** 最后一次的 event.data.target 对象 */
    private lastEventTarget: EventTarget | undefined;

    private minTime = 50;
    private lastTime = Date.now();

    // --------------------------------------------------------------------------------------------
    // 生产事件
    // --------------------------------------------------------------------------------------------

    /** 启动当前 EventDriver 的监听 */
    attach() {
        this.addEventListener('mousemove', this.onMouseMove);
    }

    /** 停止当前 EventDriver 的监听 */
    detach() {
        this.removeEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove = (event: MouseEvent) => {
        this.request = requestAnimationFrame(() => {
            if (hasValue(this.request)) cancelAnimationFrame(this.request);
            const mouseMoveEvent = new MouseMoveEvent(event);
            this.eventbus.dispatch(mouseMoveEvent);
        });
    }

    // --------------------------------------------------------------------------------------------
    // 消费事件
    // --------------------------------------------------------------------------------------------

    effect(): void {
        this.handleCursor();
        this.handleTest();
    }

    /**
     * 维护 cursor 状态
     */
    handleCursor() {
        // 鼠标移动
        this.eventbus.subscribe(MouseMoveEvent, event => {
            console.log("handleCursor MouseMoveEvent");
            const cursor = this.designerEngine.cursor;
            if (![CursorStatus.Dragging, CursorStatus.DragStart].includes(cursor.status)) {
                cursor.status = CursorStatus.Normal;
            }
            if (cursor.status === CursorStatus.Dragging) return;
            cursor.position = event.data;
        });
    }

    handleTest() {
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
}

export {
    MouseMoveDriver,
}
