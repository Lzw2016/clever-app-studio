import { DesignerDriver } from "@/draggable/DesignerDriver";
import { designerContent } from "@/draggable/Constant";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";
import { MouseDoubleClickEvent } from "@/draggable/events/cursor/MouseDoubleClickEvent";

/**
 * 封装鼠标点击事件，产生的业务事件：MouseClickEvent、MouseDoubleClickEvent
 */
class MouseClickDriver extends DesignerDriver {
    /** 启动当前 EventDriver 的监听 */
    attach(): void {
        this.addEventListener('click', this.onMouseClick);
        this.addEventListener('dblclick', this.onMouseDoubleClick);
    }

    /** 停止当前 EventDriver 的监听 */
    detach(): void {
        this.removeEventListener('click', this.onMouseClick);
        this.addEventListener('dblclick', this.onMouseDoubleClick);
    }

    onMouseClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target?.closest) return;
        const element = target.closest(designerContent);
        if (!element) return;
        this.eventbus.dispatch(new MouseClickEvent(event));
    }

    onMouseDoubleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target?.closest) return;
        const element = target.closest(designerContent);
        if (!element) return;
        this.eventbus.dispatch(new MouseDoubleClickEvent(event));
    }
}

export {
    MouseClickDriver,
}
