import { DesignerPanel } from "@/draggable/models/DesignerPanel";

/**
 * 设计器鼠标悬停时的虚线
 */
class HoverDashed {
    /** 设计器状态数据 */
    readonly designerPanel: DesignerPanel;

    constructor(designerPanel: DesignerPanel) {
        this.designerPanel = designerPanel;
    }
}

export {
    HoverDashed,
}
