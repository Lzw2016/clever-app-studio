import { AbstractCursorEvent } from "@/draggable/events/cursor/AbstractCursorEvent";

/** 鼠标单击事件 */
class MouseClickEvent extends AbstractCursorEvent {
    constructor(event: MouseEvent) {
        super(event);
    }
}

export {
    MouseClickEvent,
}
