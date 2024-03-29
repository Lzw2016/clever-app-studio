import { noValue } from "@/utils/Typeof";
import { emptyNodeId, materialItem } from "@/draggable/Constant";
import { calcDistance } from "@/draggable/utils/PositionCalc";
import { DesignerDriver } from "@/draggable/DesignerDriver";
import { DragStopEvent } from "@/draggable/events/cursor/DragStopEvent";
import { DragStartEvent } from "@/draggable/events/cursor/DragStartEvent";
import { DragMoveEvent } from "@/draggable/events/cursor/DragMoveEvent";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

interface DragState {
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
    private readonly dragState: DragState = this.initGlobalState();
    /** 正在拖拽的组件元信息集合 Map<nodeId, ComponentMeta> */
    private componentMetas: Map<string, ComponentMeta> = new Map<string, ComponentMeta>();

    protected initGlobalState(): DragState {
        return {
            dragging: false,
            startDragTime: undefined,
            startEvent: undefined,
            moveEvent: undefined,
        };
    }

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
        if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
        const target = event.target as HTMLElement;
        if (!target?.closest) return;
        // 如果点击的不是拖拽区域也直接返回
        // const existsParent = draggableArea.some(selector => target.closest(selector));
        // if (!existsParent) {
        //     return;
        // }
        this.componentMetas.clear();
        // 拖拽物料组件
        let element = target.closest(materialItem);
        let componentMeta = useHtmlExtAttr.componentMeta(element, this.componentManage);
        if (componentMeta) {
            // 拖拽物料组件
            this.componentMetas.set(emptyNodeId, componentMeta);
        } else {
            element = target.closest(`[${htmlExtAttr.componentType}]`);
            if (element && element.parentElement && useHtmlExtAttr.placeholderName(element)) {
                element = element.parentElement.closest(`[${htmlExtAttr.componentType}]`);
            }
            const nodeId = useHtmlExtAttr.nodeId(element);
            componentMeta = useHtmlExtAttr.componentMeta(element, this.componentManage);
            const selections = this.designerEngine.activeDesignerState?.selections;
            if (componentMeta && selections && selections.some(selection => nodeId === selection.nodeId)) {
                // 拖拽选中的渲染节点
                selections.forEach(selection => {
                    if (selection.nodeId && selection.componentMeta) {
                        this.componentMetas.set(selection.nodeId, selection.componentMeta);
                    }
                });
            } else if (nodeId && componentMeta) {
                // 拖拽渲染节点
                this.componentMetas.set(nodeId, componentMeta);
            }
        }
        if (this.componentMetas.size <= 0) return;
        // 设置拖拽状态
        this.dragState.startEvent = event;
        this.dragState.dragging = false;
        this.dragState.startDragTime = Date.now();
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
        if (this.dragState.dragging) {
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
        this.dragState.dragging = false
    }

    /**
     * 鼠标移动，开始拖拽处理
     */
    onDistanceChange = (event: MouseEvent) => {
        const startDragTime = this.dragState.startDragTime;
        const startEvent = this.dragState.startEvent;
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
        if (this.dragState.dragging) return;
        // 设置开始拖拽事件
        this.dragState.startEvent = this.dragState.startEvent || event;
        // 阻止用户打开右键菜单
        this.addEventListener('contextmenu', this.preventDefault, true);
        // 主要依靠鼠标事件实现拖拽效果 | mousemove-鼠标移动时(分发拖拽中事件)
        this.addEventListener('mousemove', this.onMouseMove);
        // 为了兼容html原生的拖拽事件 | dragover-被拖进一个有效的放置目标时(分发拖拽中事件)
        this.addEventListener('dragover', this.onMouseMove);
        // 分发开始拖拽事件
        const dragStartEvent = new DragStartEvent(this.dragState.startEvent);
        // 正在拖拽的组件元信息
        dragStartEvent.data.componentMetas = this.componentMetas;
        this.eventbus.dispatch(dragStartEvent);
        this.dragState.dragging = true;
    }

    /**
     * 鼠标移动中 或者 拖拽中，分发自定义的拖拽事件
     */
    onMouseMove = (event: MouseEvent | DragEvent) => {
        // 位置相对于上次未变化，直接返回
        if (event.clientX === this.dragState.moveEvent?.clientX && event.clientY === this.dragState.moveEvent?.clientY) {
            return;
        }
        // 分发拖拽中事件
        const dragMoveEvent = new DragMoveEvent(event);
        this.eventbus.dispatch(dragMoveEvent);
        // 设置拖拽中事件对象
        this.dragState.moveEvent = event;
    }
}

export {
    DragDropDriver,
}
