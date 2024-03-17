/**
 * 设计器事件类型
 */
enum DesignerEventType {
    /** 开始拖动事件 */
    DragStartEvent = "drag:start",
    /** 拖动事件 */
    DragMoveEvent = "drag:move",
    /** 停止拖动事件 */
    DragStopEvent = "drag:stop",
    /** 鼠标单击事件 */
    MouseClickEvent = "mouse:click",
    /** 鼠标双击事件 */
    MouseDoubleClickEvent = "mouse:dblclick",
    /** 鼠标移动事件 */
    MouseMoveEvent = "mouse:move",
    /** 按键按下事件 */
    KeyDownEvent = "key:down",
    /** 按键释放事件 */
    KeyUpEvent = "key:up",
}

/**
 * 设计器事件
 */
interface DesignerEvent<Data = any> {
    /** 事件类型 */
    readonly type: DesignerEventType;
    /** 事件数据 */
    data?: Data;
    /** 事件上下文 */
    context?: any;
}

/**
 * 事件订阅函数
 */
type Subscriber<Data = any> = (event: DesignerEvent<Data>) => void;

/** 监听事件的DOM元素(含Window) */
type EventContainer = HTMLElement | Document;

// /** 设计器页面类型 */
// enum ScreenType {
//     /** PC端 */
//     PC = 'PC',
//     /** 手机端 */
//     Mobile = 'Mobile',
//     // Responsive = 'Responsive',
//     // Sketch = 'Sketch',
// }

export type {
    DesignerEvent,
    Subscriber,
    EventContainer,
}

export {
    DesignerEventType,
}
