import { DesignerState } from "@/draggable/models/DesignerState";

/**
 * 设计器插入组件的信息
 */
class Insertion {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }
}

export {
    Insertion,
}
