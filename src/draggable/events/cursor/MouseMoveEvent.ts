import { DesignerEventType } from "@/draggable/types/Designer";
import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 鼠标移动事件 */
class MouseMoveEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(DesignerEventType.MouseMoveEvent, event);
    }
}

export {
    MouseMoveEvent,
}
