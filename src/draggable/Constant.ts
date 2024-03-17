import { CursorPosition } from "@/draggable/types/Designer";


// /**
//  * 自定义 html 元素属性
//  */
// const htmlAttr = {
//     /**
//      * 鼠标双击支持编辑文本，boolean 类型
//      */
//     editable: "editable",
// };
//
// /**
//  * 使用 htmlAttr 的逻辑
//  */
// const useHtmlAttr = {
//     /**
//      * 支持鼠标双击编辑文本
//      */
//     idEditable(element?: HTMLElement): boolean {
//         if (!element) return false;
//         return `${element[htmlAttr.editable]}` === 'true';
//     },
// }

/** 定义 DragDropDriver 的可拖拽区域(白名单) */
const draggableArea = [
    '.draggable.material-item',
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
    draggableArea,
    defCursorPosition,
}
