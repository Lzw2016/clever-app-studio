import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 设计器鼠标悬停时的虚线
 */
class HoverDashed {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    HoverDashed,
}
