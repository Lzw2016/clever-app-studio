import { CursorPosition } from "@/draggable/types/Designer";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { DefComponentManage } from "@/draggable/models/DefComponentManage";

/** 组件管理器实例 */
const componentManage: ComponentManage = new DefComponentManage();

/** 内部指令名称 */
const innerDirectiveNames = {
    inner_show: '__inner_show',
    inner_model: '__inner_model',
};

/** 物料元素区域 */
const materialItem: string = '.draggable.material-item';

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
    componentManage,
    innerDirectiveNames,
    materialItem,
    draggableArea,
    defCursorPosition,
}
