import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEffect } from "@/draggable/DesignerEffect";
import { CursorStatus } from "@/draggable/types/Designer";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragMoveEvent } from "@/draggable/events/cursor/DragMoveEvent";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";
import { MouseMoveEvent } from "@/draggable/events/cursor/MouseMoveEvent";

/**
 * 维护 cursor 状态
 */
class CursorEffect extends DesignerEffect {
    /** 原始的鼠标指针样式 */
    private originalCursor: string = "";

    effect(): void {
        this.dragDropCursor();
        this.mouseMoveCursor();
    }

    /**
     * 拖拽时的 cursor 状态
     */
    dragDropCursor() {
        // 开始拖动
        this.eventbus.subscribe(DragStartEvent, event => {
            console.log("dragDropCursor DragStartEvent");
            this.originalCursor = this.getContainerCursorStyle();
            const cursor = this.designerEngine.cursor;
            cursor.status = CursorStatus.DragStart;
            cursor.dragStartPosition = event.data;
        });
        // 拖动中
        this.eventbus.subscribe(DragMoveEvent, event => {
            console.log("dragDropCursor DragMoveEvent");
            const cursor = this.designerEngine.cursor;
            cursor.status = CursorStatus.Dragging;
            cursor.position = event.data;
            requestIdle(() => {
                this.setContainerCursorStyle('move');
                // const element = document.elementFromPoint(event.data.topClientX, event.data.topClientY);
                // console.log("element", element);
            });
        });
        // 拖拽结束
        this.eventbus.subscribe(DragStopEvent, event => {
            console.log("dragDropCursor DragStopEvent");
            const cursor = this.designerEngine.cursor;
            cursor.status = CursorStatus.DragStop;
            cursor.dragEndPosition = event.data;
            cursor.dragStartPosition = undefined;
            cursor.status = CursorStatus.Normal;
            requestIdle(() => this.setContainerCursorStyle(this.originalCursor));
        });
    }

    /**
     * 鼠标移动时的 cursor 状态
     */
    mouseMoveCursor() {
        // 鼠标移动
        this.eventbus.subscribe(MouseMoveEvent, event => {
            console.log("mouseMoveCursor MouseMoveEvent");
            const cursor = this.designerEngine.cursor;
            if (![CursorStatus.Dragging, CursorStatus.DragStart].includes(cursor.status)) {
                cursor.status = CursorStatus.Normal;
            }
            if (cursor.status === CursorStatus.Dragging) return;
            cursor.position = event.data;
        });
    }
}

export {
    CursorEffect,
}
