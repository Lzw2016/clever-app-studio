import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 设计器选择组件的信息
 */
class Selection {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    Selection,
}
