import { DesignerPanel } from "@/draggable/models/DesignerPanel";

/**
 * 设计器插入组件的信息
 */
class Insertion {
    /** 设计器状态数据 */
    readonly designerPanel: DesignerPanel;

    constructor(designerPanel: DesignerPanel) {
        this.designerPanel = designerPanel;
    }
}

export {
    Insertion,
}
