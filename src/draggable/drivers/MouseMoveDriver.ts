import { hasValue } from "@/utils/Typeof";
import { DesignerDriver } from "@/draggable/DesignerDriver";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";
import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 封装鼠标移动事件，产生的业务事件：MouseMoveEvent
 */
class MouseMoveDriver extends DesignerDriver {
    private request?: number = undefined;

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

    effect(designerEngine: DesignerEngine): void {

    }
}

export {
    MouseMoveDriver,
}
