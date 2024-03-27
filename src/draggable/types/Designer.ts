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

/**
 * html元素矩形。
 * 视口左上角距离，不随页面滚动而改变。
 */
interface ElementRect {
    /** “html元素左上角”离“视口左上角”垂直方向的距离(像素) */
    top: number;
    /** “html元素左上角”离“视口左上角”水平方向的距离(像素) */
    left: number;
    /** html元素宽(像素) */
    width: number;
    /** html元素高(像素) */
    height: number;
}

/** 辅助工具的位置 */
interface AuxToolPosition extends ElementRect {
    /** 是否在容器顶部 */
    isTop: boolean;
    /** 是否在容器底部 */
    isBottom: boolean;
}

/** 渲染节点与光标的距离信息 */
interface NodeToCursorDistance {
    /** 渲染节点的dom */
    element: Element;
    /** html元素宽(像素) */
    width: number;
    /** html元素高(像素) */
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    /** 光标是否在渲染节点里面 */
    inside: boolean;
    /** 渲染节点是否是行级块(独占一行) */
    rowBlock: boolean;
    /** 渲染节点是否是内联块(独占一行) */
    inlineBlock: boolean;
}

enum Direction {
    top,
    bottom,
    left,
    right,
}

export type {
    AnyConstructor,
    DesignerEvent,
    Subscriber,
    EventContainer,
    CursorPosition,
    ElementRect,
    AuxToolPosition,
    NodeToCursorDistance,
}

export {
    CursorStatus,
    DesignerCursorMode,
    DesignerLayout,
    DesignerTab,
    Direction,
}
