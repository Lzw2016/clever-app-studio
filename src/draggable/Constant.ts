import { CursorPosition } from "@/draggable/types/Designer";
import { DesignNode } from "@/draggable/types/DesignBlock";

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
}
