/**
 * 通用的构造函数
 */
interface AnyConstructor<T = any> {
    new(...args: any[]): T;
}

/**
 * 设计器事件
 */
interface DesignerEvent<Data = any> {
    /** 事件类型 */
    readonly type: string;
    /** 事件数据 */
    data?: Data;
    /** 事件上下文 */
    context?: any;
}

/**
 * 事件订阅函数
 */
type Subscriber<Event extends DesignerEvent = DesignerEvent> = (event: Event) => void;

/** 监听事件的DOM元素(含Window) */
type EventContainer = HTMLElement | Document;

/** 光标拖拽状态 */
enum CursorStatus {
    /** 常规 */
    Normal = 'normal',
    /** 开始拖拽 */
    DragStart = 'drag_start',
    /** 拖拽中 */
    Dragging = 'dragging',
    /** 拖拽结束 */
    DragStop = 'drag_stop',
}

/** 光标位置 */
interface CursorPosition {
    /** 光标位置相对于浏览器窗口左上角的水平坐标(单位像素) */
    clientX: /*     */ number;
    /** 光标位置相对于浏览器窗口左上角的垂直坐标(单位像素) */
    clientY: /*     */ number;
    /** 光标位置与文档左侧边缘的距离，包括文档不可见的部分(单位像素) */
    pageX:  /*      */ number;
    /** 光标位置与文档上侧边缘的距离，包括文档不可见的部分(单位像素) */
    pageY: /*       */ number;
    /** 光标位置相对于最外层(考虑iframe存在的情况)浏览器窗口左上角的水平坐标(单位像素) */
    topClientX: /*  */ number;
    /** 光标位置相对于最外层(考虑iframe存在的情况)浏览器窗口左上角的垂直坐标(单位像素) */
    topClientY: /*  */ number;
    /** 光标位置与最外层(考虑iframe存在的情况)文档左侧边缘的距离，包括文档不可见的部分(单位像素) */
    topPageX: /*    */ number;
    /** 光标位置与最外层(考虑iframe存在的情况)文档上侧边缘的距离，包括文档不可见的部分(单位像素) */
    topPageY: /*    */ number;
}

/** 设计器光标模式 */
enum DesignerCursorMode {
    /** 拖拽 */
    DragDrop = 'dragdrop',
    /** 自由选择 */
    Selection = 'selection',
}

/** 设计器布局类型 */
enum DesignerLayout {
    /** PC端 */
    PC = 'pc',
    /** 移动端 */
    Mobile = 'mobile',
    /** 响应式布局 */
    Responsive = 'responsive',
}

/** 设计器叶签类型 */
enum DesignerTab {
    /** 设计器 */
    Designer = 'Designer',
    /** 源码 */
    Code = 'Code',
    /** 预览 */
    Preview = 'Preview',
}

export type {
    AnyConstructor,
    DesignerEvent,
    Subscriber,
    EventContainer,
    CursorPosition,
}

export {
    CursorStatus,
    DesignerCursorMode,
    DesignerLayout,
    DesignerTab,
}
