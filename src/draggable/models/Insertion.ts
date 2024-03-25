import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 设计器插入组件的信息
 */
class Insertion {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    Insertion,
}
