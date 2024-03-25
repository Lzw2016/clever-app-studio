import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 设计器状态数据
 */
class DesignerPanel {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    DesignerPanel,
}
