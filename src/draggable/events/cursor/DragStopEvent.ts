import { DesignerEventType } from "@/draggable/types/Designer";
import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 拖拽结束事件 */
class DragStopEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(DesignerEventType.DragStopEvent, event);
    }
}

export {
    DragStopEvent,
}
