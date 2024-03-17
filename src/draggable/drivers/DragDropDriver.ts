import { noValue } from "@/utils/Typeof";
import { calcDistance } from "@/draggable/utils/DesignerUtils";
import { DesignerDriver } from "@/draggable/DesignerDriver";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { CursorStatus } from "@/draggable/types/Designer";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragMoveEvent } from "@/draggable/events/cursor/DragMoveEvent";
import { requestIdle } from "@/utils/RequestIdle";

interface GlobalDragDropState {
    /** 是否在拖拽中 */
    dragging: boolean,
    /** 拖拽开始的时间戳 */
    startDragTime?: number,
    /** 开始拖拽时触发的事件 */
    startEvent?: MouseEvent,
    /** 拖拽中的事件 */
    moveEvent?: MouseEvent | DragEvent,
}

/**
 * 鼠标拖拽操作的事件处理，参考：https://juejin.cn/post/7188149937883283512
 * 产生的业务事件：DragStartEvent、DragMoveEvent、DragStopEvent
 */
class DragDropDriver extends DesignerDriver {
    private readonly globalState: GlobalDragDropState = this.initGlobalState();

    protected initGlobalState(): GlobalDragDropState {
        return {
            dragging: false,
            startDragTime: undefined,
            startEvent: undefined,
            moveEvent: undefined,
        };
    }

    // --------------------------------------------------------------------------------------------
    // 生产事件
    // --------------------------------------------------------------------------------------------

    attach(): void {
        // 监听鼠标按下事件
        this.addEventListener('mousedown', this.onMouseDown, true);
    }

    detach(): void {
        // 取消所有的事件监听
        this.removeEventListener('mousedown', this.onMouseDown, true);
        this.removeEventListener('mouseup', this.onMouseUp);
        this.removeEventListener('mousemove', this.onMouseMove);
        this.removeEventListener('mousemove', this.onDistanceChange);
        this.removeEventListener('dragstart', this.onStartDrag);
        this.removeEventListener('dragend', this.onMouseUp);
        this.removeEventListener('dragover', this.onMouseMove);
        this.removeEventListener('contextmenu', this.preventDefault, true);
    }

    /** 阻止事件的默认动作 */
    preventDefault = (event: MouseEvent) => {
        event.preventDefault();
    }

    /**
     * 鼠标按下事件，拖拽开始准备
     */
    onMouseDown = (event: MouseEvent) => {
        // 如果 未按下鼠标左键 或者 按下了Control键 或者 win键(mac中是Command键)，就直接返回
        if (event.button !== 0 || event.ctrlKey || event.metaKey) {
            return;
        }
        const target = event.target as HTMLElement;
        // 如果点击的不是拖拽区域也直接返回
        if (target?.closest) {
            const parentSelectors = ['.monaco-editor'];
            const existsParent = parentSelectors.some(selector => target.closest(selector));
            if (existsParent) {
                return;
            }
        }
        // 设置拖拽状态
        this.globalState.startEvent = event;
        this.globalState.dragging = false;
        this.globalState.startDragTime = Date.now();
        // 主要依靠鼠标事件实现拖拽效果 | mouseup-鼠标弹起(停止拖拽处理) | mousemove-鼠标移动(开始拖拽处理)
        this.addEventListener('mouseup', this.onMouseUp);
        this.addEventListener('mousemove', this.onDistanceChange);
        // 为了兼容html原生的拖拽事件 | dragend-拖放操作结束(停止拖拽处理) | dragstart-开始拖动(开始拖拽处理)
        this.addEventListener('dragend', this.onMouseUp);
        this.addEventListener('dragstart', this.onStartDrag);
    }

    /**
     * 鼠标弹起事件，停止拖拽处理
     */
    onMouseUp = (event: MouseEvent) => {
        // 如果还在拖拽状态就分发拖拽结束事件
        if (this.globalState.dragging) {
            const dragStopEvent = new DragStopEvent(event);
            this.eventbus.dispatch(dragStopEvent);
        }
        // 取消事件监听
        this.removeEventListener('mouseup', this.onMouseUp);
        this.removeEventListener('mousedown', this.onMouseDown);
        this.removeEventListener('mousemove', this.onMouseMove);
        this.removeEventListener('mousemove', this.onDistanceChange);
        this.removeEventListener('dragover', this.onMouseMove);
        this.removeEventListener('contextmenu', this.preventDefault, true);
        // 设置停止拖拽
        this.globalState.dragging = false
    }

    /**
     * 鼠标移动，开始拖拽处理
     */
    onDistanceChange = (event: MouseEvent) => {
        const startDragTime = this.globalState.startDragTime;
        const startEvent = this.globalState.startEvent;
        // 没有对应的状态值，直接返回
        if (noValue(startDragTime) || noValue(startEvent)) return;
        // 技术移动的距离和时间
        const distance = calcDistance(event.pageX, event.pageY, startEvent.pageX, startEvent.pageY);
        const timeDelta = Date.now() - startDragTime;
        // 如果是：事件对象不同、两次触发事件超过10毫秒、鼠标移动超过了4个像素，才执行逻辑
        if (event !== startEvent && timeDelta > 10 && distance > 4) {
            // 先停止 onDistanceChange 的监听
            this.removeEventListener('mousemove', this.onDistanceChange);
            // 触发开始拖拽事件
            this.onStartDrag(event);
        }
    }

    /**
     * 鼠标移动中 或者 拖拽中，触发开始拖拽事件
     */
    onStartDrag = (event: MouseEvent | DragEvent) => {
        // 如果已经在拖拽中了，直接返回
        if (this.globalState.dragging) return;
        // 设置开始拖拽事件
        this.globalState.startEvent = this.globalState.startEvent || event;
        // 阻止用户打开右键菜单
        this.addEventListener('contextmenu', this.preventDefault, true);
        // 主要依靠鼠标事件实现拖拽效果 | mousemove-鼠标移动时(分发拖拽中事件)
        this.addEventListener('mousemove', this.onMouseMove);
        // 为了兼容html原生的拖拽事件 | dragover-被拖进一个有效的放置目标时(分发拖拽中事件)
        this.addEventListener('dragover', this.onMouseMove);
        // 分发开始拖拽事件
        const dragStartEvent = new DragStartEvent(this.globalState.startEvent);
        this.eventbus.dispatch(dragStartEvent);
        this.globalState.dragging = true;
    }

    /**
     * 鼠标移动中 或者 拖拽中，分发自定义的拖拽事件
     */
    onMouseMove = (event: MouseEvent | DragEvent) => {
        // 位置相对于上次未变化，直接返回
        if (event.clientX === this.globalState.moveEvent?.clientX && event.clientY === this.globalState.moveEvent?.clientY) {
            return;
        }
        // 分发拖拽中事件
        const dragMoveEvent = new DragMoveEvent(event);
        this.eventbus.dispatch(dragMoveEvent);
        // 设置拖拽中事件对象
        this.globalState.moveEvent = event;
    }

    // --------------------------------------------------------------------------------------------
    // 消费事件
    // --------------------------------------------------------------------------------------------

    effect(designerEngine: DesignerEngine): void {
        /**
         * 开始拖动
         */
        this.eventbus.subscribe(DragStartEvent, event => {
            const cursor = designerEngine.cursor;
            cursor.status = CursorStatus.DragStart;
            cursor.dragStartPosition = event.data;
        });
        /**
         * 拖动中
         */
        this.eventbus.subscribe(DragMoveEvent, event => {
            const cursor = designerEngine.cursor;
            cursor.status = CursorStatus.Dragging;
            cursor.position = event.data;
        });
        /**
         * 拖拽结束
         */
        this.eventbus.subscribe(DragStopEvent, event => {
            const cursor = designerEngine.cursor;
            cursor.status = CursorStatus.DragStop;
            cursor.dragEndPosition = event.data;
            cursor.dragStartPosition = undefined;
            requestIdle(() => cursor.status = CursorStatus.Normal);
        });
    }
}

export {
    DragDropDriver,
}
