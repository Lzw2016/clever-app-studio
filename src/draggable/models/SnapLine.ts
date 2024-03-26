import { DesignerPanel } from "@/draggable/models/DesignerPanel";

/**
 * 捕捉线(多选组件时的矩形线条)
 */
class SnapLine {
    /** 设计器状态数据 */
    readonly designerPanel: DesignerPanel;

    constructor(designerPanel: DesignerPanel) {
        this.designerPanel = designerPanel;
    }
}

export {
    SnapLine,
}
