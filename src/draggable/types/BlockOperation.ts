import { ComponentSlotsItem } from "@/draggable/types/DesignBlock";
import { RuntimeComponentSlotsItem } from "@/draggable/types/RuntimeBlock";

/** 操作选项 */
interface OpsOptions {
    /** 操作完成后不重新渲染组件 */
    cancelRender?: boolean;
}

/**
 * Block支持的操作函数(基于id属性)
 */
interface BlockOperationById {
    /**
     * 批量增加子节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个子节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param item      增加的节点集合
     * @param options   操作选项
     */
    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddItemById(afterId: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddItemById(parentId: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendItemById(parentId: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的子节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemBeforeById(beforeId: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定的子节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemAfterById(afterId: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的子节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemFirstById(parentId: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的子节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemLastById(parentId: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的子节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemBeforeById(beforeId: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的子节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemAfterById(afterId: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的子节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemFirstById(parentId: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的子节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemLastById(parentId: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的插槽节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotBeforeById(beforeId: string, slotName: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定的插槽节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotAfterById(afterId: string, slotName: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotFirstById(parentId: string, slotName: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotLastById(parentId: string, slotName: string, moveNodeIds: Array<string>, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的插槽节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotBeforeById(beforeId: string, slotName: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的插槽节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotAfterById(afterId: string, slotName: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotFirstById(parentId: string, slotName: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotLastById(parentId: string, slotName: string, moveNodeId: string, options?: OpsOptions): boolean;

    /**
     * 批量删除节点(基于id属性)
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    removeAllById(ids: Array<string>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 删除一个节点(基于id属性)
     * @param id        删除的节点Id
     * @param options   操作选项
     */
    removeById(id: string, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 移除指定节点的所有子节点
     * @param id        节点Id
     * @param options   操作选项
     */
    removeChildrenById(id: string, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;
}

/**
 * Block支持的操作函数(基于ref属性)
 */
interface BlockOperation {
    /**
     * 批量增加子节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    beforeAddItems(beforeRef: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddItems(afterRef: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个子节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param item          增加的节点集合
     * @param options       操作选项
     */
    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddItem(afterRef: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddItem(parentRef: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendItem(parentRef: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的子节点前面(基于ref属性)
     * @param beforeRef     移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToItemBefore(beforeRef: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定的子节点后面(基于ref属性)
     * @param afterRef      移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToItemAfter(afterRef: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的子节点头部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToItemFirst(parentRef: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的子节点尾部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToItemLast(parentRef: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的子节点前面(基于ref属性)
     * @param beforeRef     移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToItemBefore(beforeRef: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的子节点后面(基于ref属性)
     * @param afterRef      移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToItemAfter(afterRef: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的子节点头部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToItemFirst(parentRef: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的子节点尾部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToItemLast(parentRef: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    beforeAddSlots(beforeRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddSlots(afterRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的插槽节点前面(基于ref属性)
     * @param beforeRef     移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToSlotBefore(beforeRef: string, slotName: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定的插槽节点后面(基于ref属性)
     * @param afterRef      移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToSlotAfter(afterRef: string, slotName: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点头部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param slotName      插槽名
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToSlotFirst(parentRef: string, slotName: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点尾部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param slotName      插槽名
     * @param moveNodeRefs  需要移动的节点ref
     * @param options       操作选项
     */
    moveNodesToSlotLast(parentRef: string, slotName: string, moveNodeRefs: Array<string>, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的插槽节点前面(基于ref属性)
     * @param beforeRef     移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToSlotBefore(beforeRef: string, slotName: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定的插槽节点后面(基于ref属性)
     * @param afterRef      移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToSlotAfter(afterRef: string, slotName: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点头部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param slotName      插槽名
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToSlotFirst(parentRef: string, slotName: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点尾部(基于ref属性)
     * @param parentRef     移动的目标位置，父节点ref
     * @param slotName      插槽名
     * @param moveNodeRef   需要移动的节点ref
     * @param options       操作选项
     */
    moveNodeToSlotLast(parentRef: string, slotName: string, moveNodeRef: string, options?: OpsOptions): boolean;

    /**
     * 批量删除节点(基于ref属性)
     * @param refs          删除的节点ref集合
     * @param options       操作选项
     */
    removeAll(refs: Array<string>, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;

    /**
     * 删除一个节点(基于ref属性)
     * @param ref           删除的节点ref
     * @param options       操作选项
     */
    remove(ref: string, options?: OpsOptions): RuntimeComponentSlotsItem | undefined;

    /**
     * 移除指定节点的所有子节点
     * @param ref       节点ref
     * @param options   操作选项
     */
    removeChildren(ref: string, options?: OpsOptions): Array<RuntimeComponentSlotsItem>;
}

export type {
    OpsOptions,
    BlockOperationById,
    BlockOperation,
}
