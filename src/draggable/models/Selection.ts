import { DesignerPanel } from "@/draggable/models/DesignerPanel";

/**
 * 设计器选择组件的信息
 */
class Selection {
    /** 设计器状态数据 */
    readonly designerPanel: DesignerPanel;

    constructor(designerPanel: DesignerPanel) {
        this.designerPanel = designerPanel;
    }
}

export {
    Selection,
}
