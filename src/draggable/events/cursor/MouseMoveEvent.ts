import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 鼠标移动事件 */
class MouseMoveEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(event);
    }
}

export {
    MouseMoveEvent,
}
