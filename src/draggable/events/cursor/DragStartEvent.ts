import { DesignerEventType } from "@/draggable/types/Designer";
import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 开始拖动事件 */
class DragStartEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(DesignerEventType.DragStartEvent, event);
    }
}

export {
    DragStartEvent,
}
