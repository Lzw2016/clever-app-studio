import { CursorPosition } from "@/draggable/types/Designer";
import { DesignNode } from "@/draggable/types/DesignBlock";
import { EventGroup } from "@/draggable/types/ComponentMeta";

/** 内部指令名称 */
const innerDirectiveNames = {
    inner_show: '__inner_show',
    inner_model: '__inner_model',
};

/** DesignNode/DesignBlock配置的原始值 */
const configRawValueName = "__config_raw_value";

/** 逻辑上的空node id */
const emptyNodeId = "__empty_node_id";

/** 子节点是一种特殊的插槽，名为：default */
const childSlotName = 'default';

/** 默认的占位节点 */
const defPlaceholder: DesignNode = {
    type: "div",
    props: {
        style: {
            height: "100%",
            width: "100%",
            minHeight: "32px",
            fontSize: "12px",
            backgroundColor: "#f0f0f0",
            color: "#a7b1bd",
            border: "1px dotted #a7b1bd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    tpl: "将组件拖拽到这里",
};

/** 物料元素区域 */
const materialItem: string = '.draggable.material-item';
/** 设计器拖拽区域 */
const designerContent: string = '.designer-layout > .flex-item-fill > .designer-content';

/** 定义 DragDropDriver 的可拖拽区域(白名单) */
const draggableArea = [
    materialItem,
];

/** 默认的光标位置 */
const defCursorPosition: CursorPosition = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    topPageX: 0,
    topPageY: 0,
    topClientX: 0,
    topClientY: 0,
};

/** 内置html原生事件 */
const innerEvents: Array<EventGroup> = [
    {
        title: "表单事件",
        disabled: false,
        items: [
            {
                title: "表单提交",
                name: "submit",
            },
            {
                title: "表单重置",
                name: "reset",
            },
            {
                title: "表单字段值变化",
                name: "input",
            },
            {
                title: "表单元素值改变",
                name: "change",
            },
        ],
    },
    {
        title: "鼠标事件",
        disabled: false,
        items: [
            {
                title: "单击",
                description: "鼠标单击事件",
                name: "click",
                params: [
                    {
                        name: "event",
                        type: "MouseEvent",
                        note: "事件对象",
                    },
                ],
                return: "void",
            },
            {
                title: "双击",
                name: "dblclick",
            },
            {
                title: "鼠标按钮按下",
                name: "mousedown",
            },
            {
                title: "鼠标进入元素边界",
                name: "mouseenter",
            },
            {
                title: "鼠标离开元素边界",
                name: "mouseleave",
            },
            {
                title: "鼠标移动到元素上",
                name: "mouseover",
            },
            {
                title: "鼠标从元素上移开",
                name: "mouseout",
            },
            {
                title: "鼠标在元素上移动",
                name: "mousemove",
            },
            {
                title: "鼠标右键打开上下文菜单",
                name: "contextmenu",
            },
        ],
    },
    {
        title: "键盘事件",
        disabled: false,
        items: [
            {
                title: "键盘按键被按下",
                name: "keydown",
            },
            {
                title: "键盘按键被释放",
                name: "keyup",
            },
        ],
    },
    {
        title: "触摸事件",
        disabled: false,
        items: [
            {
                title: "触摸屏幕开始",
                name: "touchstart",
            },
            {
                title: "触摸屏幕移动",
                name: "touchmove",
            },
            {
                title: "触摸屏幕结束",
                name: "touchend",
            },
            {
                title: "触摸操作被取消",
                name: "touchcancel",
            },
        ],
    },
    {
        title: "焦点事件",
        disabled: false,
        items: [
            {
                title: "元素获得焦点",
                name: "focus",
            },
            {
                title: "元素失去焦点",
                name: "blur",
            },
            {
                title: "元素即将获得焦点",
                name: "focusin",
            },
            {
                title: "元素即将失去焦点",
                name: "focusout",
            },
            {
                title: "滚动条滚动",
                name: "scroll",
            },
        ],
    },
];

export {
    innerDirectiveNames,
    configRawValueName,
    emptyNodeId,
    childSlotName,
    defPlaceholder,
    materialItem,
    designerContent,
    draggableArea,
    defCursorPosition,
    innerEvents,
}
