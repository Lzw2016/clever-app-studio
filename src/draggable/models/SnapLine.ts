import { DesignerState } from "@/draggable/models/DesignerState";

/**
 * 捕捉线(多选组件时的矩形线条)
 */
class SnapLine {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }
}

export {
    SnapLine,
}
