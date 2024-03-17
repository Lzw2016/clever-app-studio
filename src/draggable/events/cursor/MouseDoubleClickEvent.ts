import { DesignerEventType } from "@/draggable/types/Designer";
import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 鼠标双击事件 */
class MouseDoubleClickEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(DesignerEventType.MouseDoubleClickEvent, event);
    }
}

export {
    MouseDoubleClickEvent,
}
