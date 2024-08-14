import { ComponentSlotsItem } from "@/draggable/types/DesignBlock";

/** 设计时操作选项 */
interface DesignOpsOptions {
    /** 操作完成后不重新渲染组件 */
    cancelRender?: boolean;
}

/**
 * Block设计时支持的操作函数(基于id属性)
 */
interface BlockDesignOperation {
    /**
     * 移除设计时的占位组件
     * @param id        节点id
     * @param slotName  占位插槽名
     * @param options   操作选项
     */
    removePlaceholder(id: string, slotName: string, options?: DesignOpsOptions): void;

    /**
     * 设置设计时的占位组件
     * @param id            节点id
     * @param slotName      占位插槽名
     * @param placeholder   占位的渲染节点
     * @param options       操作选项
     */
    setPlaceholder(id: string, slotName: string, placeholder?: ComponentSlotsItem, options?: DesignOpsOptions): void;
}

export type {
    DesignOpsOptions,
    BlockDesignOperation,
}
