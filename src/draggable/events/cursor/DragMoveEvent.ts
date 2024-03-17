import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 拖动事件 */
class DragMoveEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(event);
    }
}

export {
    DragMoveEvent,
}
