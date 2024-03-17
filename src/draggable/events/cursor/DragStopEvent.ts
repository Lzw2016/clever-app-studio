import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 拖拽结束事件 */
class DragStopEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(event);
    }
}

export {
    DragStopEvent,
}
