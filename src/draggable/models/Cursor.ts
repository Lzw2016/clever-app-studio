import { computed, ComputedRef, Ref, ref } from "vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { CursorPosition, CursorStatus } from "@/draggable/types/Designer";
import { defCursorPosition } from "@/draggable/Constant";
import { calcPositionDelta } from "@/draggable/utils/DesignerUtils";

/**
 * 设计器光标信息
 */
class Cursor {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 光标拖拽状态 */
    protected readonly _status: Ref<CursorStatus> = ref<CursorStatus>(CursorStatus.Normal);
    /** 光标位置 */
    protected readonly _position: Ref<CursorPosition> = ref<CursorPosition>(defCursorPosition);
    /** 拖动开始位置 */
    protected readonly _dragStartPosition: Ref<CursorPosition | undefined> = ref<CursorPosition | undefined>();
    /** 拖拽结束位置 */
    protected readonly _dragEndPosition: Ref<CursorPosition | undefined> = ref<CursorPosition | undefined>();
    /** 拖动的增量(遇上一次的光标位置比较) */
    protected readonly _dragAtomDelta: Ref<CursorPosition> = ref<CursorPosition>(defCursorPosition);
    /** 拖拽起点到当前位置的增量 */
    protected readonly _dragStartToCurrentDelta: ComputedRef<CursorPosition> = computed<CursorPosition>(() => {
        // “拖动开始位置”为 null
        if (!this._dragStartPosition.value) return defCursorPosition;
        // 当前是“拖动中”
        if (this._status.value === CursorStatus.Dragging) return defCursorPosition;
        // 计算“拖拽起点”到“当前位置”的增量
        return calcPositionDelta(this._position.value, this._dragStartPosition.value);
    });
    /** 拖拽起点到终点位置的增量 */
    protected readonly _dragStartToEndDelta: ComputedRef<CursorPosition> = computed<CursorPosition>(() => {
        // “拖动开始位置”为 null
        if (!this._dragStartPosition.value || !this._dragEndPosition.value) return defCursorPosition;
        // 计算“拖拽起点”到“拖拽结束”的增量
        return calcPositionDelta(this._dragStartPosition.value, this._dragEndPosition.value);
    });

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }

    /** 光标状态 */
    get status() {
        return this._status.value;
    };

    /** 光标状态 */
    set status(status: CursorStatus) {
        this._status.value = status;
    }

    /** 光标位置 */
    get position() {
        return this._position.value;
    };

    /** 光标位置 */
    set position(position: CursorPosition) {
        this._dragAtomDelta.value = calcPositionDelta(this._position.value, position);
        this._position.value = { ...position };
    }

    /** 拖动开始位置 */
    get dragStartPosition() {
        return this._dragStartPosition.value;
    };

    /** 拖动开始位置 */
    set dragStartPosition(position: CursorPosition | undefined) {
        this._dragStartPosition.value = position ? { ...position } : undefined;
    }

    /** 拖拽结束位置 */
    get dragEndPosition() {
        return this._dragEndPosition.value;
    };

    /** 拖拽结束位置 */
    set dragEndPosition(position: CursorPosition | undefined) {
        this._dragEndPosition.value = position ? { ...position } : undefined;
    }

    /** 拖动的增量(遇上一次的光标位置比较) */
    get dragAtomDelta() {
        return this._dragAtomDelta.value;
    }

    /** 拖拽起点到当前位置的增量 */
    get dragStartToCurrentDelta() {
        return this._dragStartToCurrentDelta.value;
    }

    /** 拖拽起点到终点位置的增量 */
    get dragStartToEndDelta() {
        return this._dragStartToEndDelta.value;
    }
}

export {
    Cursor,
}
