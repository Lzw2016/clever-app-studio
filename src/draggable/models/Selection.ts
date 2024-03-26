import { DesignerState } from "@/draggable/models/DesignerState";

/**
 * 设计器选择组件的信息
 */
class Selection {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }
}

export {
    Selection,
}
