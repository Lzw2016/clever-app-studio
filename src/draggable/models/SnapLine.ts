import { DesignerEngine } from "@/draggable/DesignerEngine";

/**
 * 捕捉线(多选组件时的矩形线条)
 */
class SnapLine {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    SnapLine,
}
