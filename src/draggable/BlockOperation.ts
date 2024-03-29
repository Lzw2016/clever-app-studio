import lodash from "lodash";
import { hasValue, isArray, isObj, isStr, noValue } from "@/utils/Typeof";
import { ComponentInstance } from "@/draggable/types/Base";
import { ComponentSlotsItem } from "@/draggable/types/DesignBlock";
import { CreateConfig, RuntimeBlock, RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { blockDeepTransform, deepTraverseNodes } from "@/draggable/utils/BlockPropsTransform";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { childSlotName } from "@/draggable/Constant";

/** 操作选项 */
interface Options {
    /** 操作完成后不重新渲染组件 */
    cancelRender?: boolean;
}

/** 操作选项默认值 */
const defOptions: Options = {
    cancelRender: false,
};

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
    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个子节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param item      增加的节点集合
     * @param options   操作选项
     */
    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddItemById(afterId: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddItemById(parentId: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendItemById(parentId: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的子节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemBeforeById(beforeId: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定的子节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemAfterById(afterId: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定节点的子节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemFirstById(parentId: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定节点的子节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToItemLastById(parentId: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 移动一个节点到指定的子节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemBeforeById(beforeId: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定的子节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemAfterById(afterId: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定节点的子节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemFirstById(parentId: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定节点的子节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToItemLastById(parentId: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量移动节点到指定的插槽节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotBeforeById(beforeId: string, slotName: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定的插槽节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotAfterById(afterId: string, slotName: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotFirstById(parentId: string, slotName: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 批量移动节点到指定节点的插槽节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeIds   需要移动的节点id
     * @param options       操作选项
     */
    moveNodesToSlotLastById(parentId: string, slotName: string, moveNodeIds: Array<string>, options?: Options): boolean;

    /**
     * 移动一个节点到指定的插槽节点前面(基于id属性)
     * @param beforeId      移动的目标位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotBeforeById(beforeId: string, slotName: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定的插槽节点后面(基于id属性)
     * @param afterId       移动的目标位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotAfterById(afterId: string, slotName: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点头部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotFirstById(parentId: string, slotName: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 移动一个节点到指定节点的插槽节点尾部(基于id属性)
     * @param parentId      移动的目标位置，父节点id
     * @param slotName      插槽名
     * @param moveNodeId    需要移动的节点id
     * @param options       操作选项
     */
    moveNodeToSlotLastById(parentId: string, slotName: string, moveNodeId: string, options?: Options): boolean;

    /**
     * 批量删除节点(基于id属性)
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    removeAllById(ids: Array<string>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 删除一个节点(基于id属性)
     * @param id        删除的节点Id
     * @param options   操作选项
     */
    removeById(id: string, options?: Options): RuntimeComponentSlotsItem | undefined;
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
    beforeAddItems(beforeRef: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddItems(afterRef: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个子节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param item          增加的节点集合
     * @param options       操作选项
     */
    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddItem(afterRef: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddItem(parentRef: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendItem(parentRef: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    beforeAddSlots(beforeRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddSlots(afterRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 在插槽子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 在插槽子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): RuntimeComponentSlotsItem | undefined;

    /**
     * 批量删除节点(基于ref属性)
     * @param refs          删除的节点ref集合
     * @param options       操作选项
     */
    removeAll(refs: Array<string>, options?: Options): Array<RuntimeComponentSlotsItem>;

    /**
     * 删除一个节点(基于ref属性)
     * @param ref           删除的节点ref
     * @param options       操作选项
     */
    remove(ref: string, options?: Options): RuntimeComponentSlotsItem | undefined;
}

interface AllBlockOperationProps extends CreateConfig {
    /** 当前的 RuntimeBlock 对象 */
    readonly runtimeBlock: RuntimeBlock;
    /** 当前 RuntimeBlock 对应的 vue 组件实例 */
    readonly instance: ComponentInstance;
    /** 所有的 RuntimeNode 对象 | RuntimeNode.id -> RuntimeNode */
    readonly allNode: Record<string, RuntimeNode>;
    /** 所有的 RuntimeNode 与其父节点关系 | RuntimeNode.id -> 所属的RuntimeNode */
    readonly nodeParent: Record<string, RuntimeNode>;
    /** ref属性与id属性的映射 | RuntimeNode.ref -> RuntimeNode.id */
    readonly refId: Record<string, string>;
    /** 渲染节点的ref与所属Block实例的ref之间的映射 | RuntimeNode.ref -> allBlock.ref */
    readonly nodeRefVueRef: Record<string, string>;
}

/** 插入节点的位置 */
enum InsertPosition {
    before,
    after,
    first,
    last,
}

/**
 * Block支持的操作函数
 */
class AllBlockOperation implements BlockOperation, BlockOperationById {
    private readonly props: Readonly<AllBlockOperationProps>;

    constructor(props: AllBlockOperationProps) {
        this.props = props;
    }

    protected getParentNodeById(id: string): RuntimeNode {
        const parent = this.props.nodeParent[id];
        if (!parent) throw new Error(`Node不存在，id=${id}`);
        return parent;
    }

    protected getParentNode(ref: string): RuntimeNode {
        const id = this.props.refId[ref];
        if (!id) throw new Error(`未找到ref对应的id值，ref=${ref}`);
        return this.getParentNodeById(id);
    }

    protected getNodeById(id: string): RuntimeNode {
        const node = this.props.allNode[id];
        if (!node) throw new Error(`Node不存在，id=${id}`);
        return node;
    }

    protected getNode(ref: string): RuntimeNode {
        const id = this.props.refId[ref];
        if (!id) throw new Error(`未找到ref对应的id值，ref=${ref}`);
        return this.getNodeById(id);
    }

    /**
     * 在node集合中查询指定的node的位置
     * @param arr       node集合
     * @param nodeId    id或ref属性值
     */
    protected findNodeIdx(arr: Array<RuntimeComponentSlotsItem>, nodeId: string): number {
        return arr.findIndex(item => {
            if (!isObj(item) || isArray(item)) return false;
            const child = item as RuntimeNode;
            return child.id === nodeId;
        });
    }

    /**
     * 批量插入节点
     * @param parent        父节点
     * @param slotName      插槽名称(存在表示是节点增加到插槽)
     * @param position      插入位置
     * @param positionId    beforeId or afterId
     * @param nodes         增加的节点集合
     * @param options       操作选项
     */
    protected addNodesById(parent: RuntimeNode, slotName: string, position: InsertPosition, positionId: string | null, nodes: Array<ComponentSlotsItem>, options: Options): Array<RuntimeComponentSlotsItem> {
        nodes = nodes.filter(node => hasValue(node));
        slotName = lodash.trim(slotName ?? "");
        if (nodes.length <= 0) return [];
        const isSlot = slotName !== childSlotName;
        // 获取目标集合
        let targets: Array<RuntimeComponentSlotsItem>;
        if (isSlot) {
            targets = parent.slots[slotName];
            if (!targets) {
                targets = [];
                parent.slots[slotName] = targets;
                // throw new Error(`slot不存在，slotName=${slotName}`);
            }
        } else {
            targets = parent.items;
        }
        // 节点转换
        const runtimeNodes: Array<RuntimeComponentSlotsItem> = [];
        for (let node of nodes) {
            let runtimeNode: RuntimeComponentSlotsItem;
            if (isStr(node)) {
                runtimeNode = node;
            } else {
                // 应用 defaults 属性
                if (parent.__designNode.defaults) lodash.defaultsDeep(node, parent.__designNode.defaults);
                // 深度转换成 RuntimeNode
                runtimeNode = blockDeepTransform(node, this.props, this.props.runtimeBlock, parent);
                if (this.props.isDesigning) runtimeNode.props[htmlExtAttr.slotName] = slotName || childSlotName;
                // 维护属性 allNode nodeParent refId nodeRefVueRef
                deepTraverseNodes(
                    runtimeNode,
                    (current, isSlot, parentNode, currentBlock) => {
                        this.props.allNode[current.id] = current;
                        if (parentNode) this.props.nodeParent[current.id] = parentNode;
                        if (this.props.refId[current.ref]) console.warn(`ref属性重复，ref=${current.ref}`);
                        this.props.refId[current.ref] = current.id;
                        if (currentBlock) this.props.nodeRefVueRef[current.ref] = currentBlock.ref;
                    },
                    isSlot,
                    parent,
                    this.props.runtimeBlock,
                );
            }
            runtimeNodes.push(runtimeNode);
        }
        // 执行插入操作
        if (position === InsertPosition.before) {
            let idx = 0;
            if (positionId) {
                idx = this.findNodeIdx(targets, positionId);
                if (idx < 0) throw new Error(`Node不存在，id=${positionId}`);
            }
            targets.splice(idx, 0, ...runtimeNodes);
        } else if (position === InsertPosition.after) {
            let idx = targets.length - 1;
            if (positionId) {
                idx = this.findNodeIdx(targets, positionId);
                if (idx < 0) throw new Error(`Node不存在，id=${positionId}`);
            }
            targets.splice((idx + 1), 0, ...runtimeNodes);
        } else if (position === InsertPosition.first) {
            targets.splice(0, 0, ...runtimeNodes);
        } else if (position === InsertPosition.last) {
            targets.push(...runtimeNodes);
        } else {
            throw new Error(`参数position值无效，position=${position}`);
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
        // 返回新增的节点
        return runtimeNodes;
    }

    /**
     * 批量插入节点
     * @param parent        父节点
     * @param slotName      插槽名称(存在表示是节点增加到插槽)
     * @param position      插入位置
     * @param positionRef   beforeRef or afterRef
     * @param nodes         增加的节点集合
     * @param options       操作选项
     */
    protected addNodes(parent: RuntimeNode, slotName: string, position: InsertPosition, positionRef: string | null, nodes: Array<ComponentSlotsItem>, options: Options): Array<RuntimeComponentSlotsItem> {
        const positionId = positionRef ? this.props.refId[positionRef] : null;
        if (hasValue(positionRef) && noValue(positionId)) throw new Error(`未找到ref对应的id值，ref=${positionRef}`);
        return this.addNodesById(parent, slotName, position, positionId, nodes, options);
    }

    /**
     * 批量删除节点
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    protected removeNodesById(ids: Array<string>, options: Options): Array<RuntimeComponentSlotsItem> {
        ids = ids.filter(id => hasValue(id));
        if (ids.length <= 0) return [];
        const removeNodes: Array<RuntimeComponentSlotsItem> = [];
        const nodeInSlot: Record<string, boolean> = {};
        for (let id of ids) {
            // 获取父节点
            const parent = this.props.nodeParent[id];
            if (!parent) continue;
            // 删除 items 中的元素
            let idx = this.findNodeIdx(parent.items, id);
            if (idx >= 0) {
                removeNodes.push(...parent.items.splice(idx, 1));
                nodeInSlot[id] = false;
                continue;
            }
            // 删除 slots 中的元素
            for (let name in parent.slots) {
                const slot = parent.slots[name];
                idx = this.findNodeIdx(slot, id);
                if (idx >= 0) {
                    removeNodes.push(...slot.splice(idx, 1));
                    nodeInSlot[id] = true;
                    break;
                }
            }
        }
        // 维护属性 allNode nodeParent refId nodeRefVueRef
        for (let id of ids) {
            const parent = this.props.nodeParent[id];
            const node = this.props.allNode[id];
            if (!node) continue;
            const ids: Array<string> = [node.id];
            const refs: Array<string> = [node.ref];
            const parentIds: Array<string> = [];
            if (node.items.length > 0 || Object.keys(node.slots).length > 0) parentIds.push(node.id);
            deepTraverseNodes(
                node,
                (current, isSlot, parent1, currentBlock) => {
                    ids.push(current.id);
                    refs.push(current.ref);
                    if (current.items.length > 0 || Object.keys(current.slots).length > 0) parentIds.push(current.id);
                },
                nodeInSlot[id],
                parent,
                this.props.runtimeBlock,
            );
            ids.forEach(delId => delete this.props.allNode[delId]);
            refs.forEach(delRef => {
                delete this.props.refId[delRef];
                delete this.props.nodeRefVueRef[delRef];
            });
            parentIds.forEach(delId => delete this.props.nodeParent[delId]);
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
        // 返回删除的节点
        return removeNodes;
    }

    /**
     * 批量删除节点
     * @param refs      删除的节点ref集合
     * @param options   操作选项
     */
    protected removeNodes(refs: Array<string>, options: Options): Array<RuntimeComponentSlotsItem> {
        const ids = refs.map(ref => this.props.refId[ref]).filter(id => hasValue(id));
        return this.removeNodesById(ids, options);
    }

    /**
     * 批量移动节点
     * @param parent        父节点
     * @param slotName      插槽名称(存在表示是节点增加到插槽)
     * @param position      插入位置
     * @param positionId    beforeId or afterId
     * @param nodeIds       移动的节点id
     * @param options       操作选项
     */
    protected moveNodesById(parent: RuntimeNode, slotName: string, position: InsertPosition, positionId: string | null, nodeIds: Array<string>, options: Options): boolean {
        if (!nodeIds || nodeIds.length <= 0) return false;
        if ([InsertPosition.before, InsertPosition.after].includes(position) && (!positionId || !this.props.allNode[positionId])) return false;
        const childrenIds: Set<string> = new Set<string>();
        let moveIds: Array<string> = [];
        for (let id of nodeIds) {
            const runtimeNode = this.props.allNode[id];
            if (!runtimeNode) continue;
            moveIds.push(id);
            deepTraverseNodes(runtimeNode, current => {
                if (nodeIds.includes(current.id)) return;
                childrenIds.add(current.id);
            });
        }
        if (childrenIds.has(parent.id)) return false;
        moveIds = moveIds.filter(id => !childrenIds.has(id));
        if (moveIds.length <= 0) return false;
        // 获取目标集合
        let targets: Array<RuntimeComponentSlotsItem>;
        const isSlot = slotName !== childSlotName;
        if (isSlot) {
            targets = parent.slots[slotName];
            if (!targets) {
                targets = [];
                parent.slots[slotName] = targets;
                // throw new Error(`slot不存在，slotName=${slotName}`);
            }
        } else {
            targets = parent.items;
        }
        // 移动 node
        for (let moveId of moveIds) {
            const node = this.props.allNode[moveId];
            const parentNode = this.props.nodeParent[moveId];
            if (!parentNode) continue;
            // 在父节点删除子节点
            let rmNodes = lodash.remove(parentNode.items, n => n === node);
            if (!rmNodes || rmNodes.length <= 0) {
                for (let name in parentNode.slots) {
                    rmNodes = lodash.remove(parentNode.slots[name], n => n === node);
                    if (rmNodes && rmNodes.length > 0) {
                        break;
                    }
                }
            }
            // 维护节点属性 data-node-parent-id data-slot-name
            node.props[htmlExtAttr.nodeParentId] = parent.id;
            if (this.props.isDesigning) node.props[htmlExtAttr.slotName] = slotName;
        }
        let insertIdx = 0;
        if (InsertPosition.before === position) {
            insertIdx = targets.findIndex(node => isObj(node) && (node as RuntimeNode).id === positionId);
        } else if (InsertPosition.after === position) {
            insertIdx = targets.findIndex(node => isObj(node) && (node as RuntimeNode).id === positionId) + 1;
        } else if (InsertPosition.last === position) {
            insertIdx = targets.length;
        } else if (InsertPosition.first === position) {
            insertIdx = 0;
        }
        if (insertIdx < 0) insertIdx = 0;
        targets.splice(insertIdx, 0, ...moveIds.map(id => this.props.allNode[id]));
        // 维护属性 nodeParent nodeRefVueRef
        const parentBlockRef = this.props.nodeRefVueRef[parent.ref] ?? parent.ref;
        for (let moveId of moveIds) {
            const moveRef = this.props.allNode[moveId].ref;
            delete this.props.nodeParent[moveId];
            this.props.nodeParent[moveId] = parent;
            // 不属于同一个 Block
            if (moveRef !== parentBlockRef) {
                delete this.props.nodeRefVueRef[moveId];
                this.props.nodeRefVueRef[moveId] = parentBlockRef;
            }
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
        return true;
    }

    /**
     * 批量移动节点
     * @param parent        父节点
     * @param slotName      插槽名称(存在表示是节点增加到插槽)
     * @param position      插入位置
     * @param positionRef   beforeRef or afterRef
     * @param nodeRefs      移动的节点ref
     * @param options       操作选项
     */
    protected moveNodes(parent: RuntimeNode, slotName: string, position: InsertPosition, positionRef: string | null, nodeRefs: Array<string>, options: Options): boolean {
        if (!nodeRefs || nodeRefs.length <= 0) return false;
        return this.moveNodesById(parent, slotName, position, positionRef ? this.props.refId[positionRef] : null, nodeRefs.map(ref => this.props.refId[ref]), options);
    }

    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, items, options);
    }

    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, items, options);
    }

    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, null, items, options);
    }

    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, null, items, options);
    }

    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddItemById(afterId: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddItemById(parentId: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendItemById(parentId: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToItemBeforeById(beforeId: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, moveNodeIds, options);
    }

    moveNodesToItemAfterById(afterId: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, moveNodeIds, options);
    }

    moveNodesToItemFirstById(parentId: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, parentId, moveNodeIds, options);
    }

    moveNodesToItemLastById(parentId: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, parentId, moveNodeIds, options);
    }

    moveNodeToItemBeforeById(beforeId: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, [moveNodeId], options);
    }

    moveNodeToItemAfterById(afterId: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, [moveNodeId], options);
    }

    moveNodeToItemFirstById(parentId: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, parentId, [moveNodeId], options);
    }

    moveNodeToItemLastById(parentId: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, parentId, [moveNodeId], options);
    }

    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, items, options);
    }

    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, items, options);
    }

    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, items, options);
    }

    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToSlotBeforeById(beforeId: string, slotName: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, moveNodeIds, options);
    }

    moveNodesToSlotAfterById(afterId: string, slotName: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, moveNodeIds, options);
    }

    moveNodesToSlotFirstById(parentId: string, slotName: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, parentId, moveNodeIds, options);
    }

    moveNodesToSlotLastById(parentId: string, slotName: string, moveNodeIds: Array<string>, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, parentId, moveNodeIds, options);
    }

    moveNodeToSlotBeforeById(beforeId: string, slotName: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, [moveNodeId], options);
    }

    moveNodeToSlotAfterById(afterId: string, slotName: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, [moveNodeId], options);
    }

    moveNodeToSlotFirstById(parentId: string, slotName: string, moveNodeId: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, parentId, [moveNodeId], options);
    }

    moveNodeToSlotLastById(moveNodeId: string, parentId: string, slotName: string, options: Options = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, parentId, [moveNodeId], options);
    }

    removeAllById(ids: Array<string>, options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeNodesById(ids, options);
    }

    removeById(id: string, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.removeNodesById([id], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    beforeAddItems(beforeRef: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, items, options);
    }

    afterAddItems(afterRef: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, items, options);
    }

    firstAddItems(parentRef: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, null, items, options);
    }

    appendItems(parentRef: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, null, items, options);
    }

    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddItem(afterRef: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddItem(parentRef: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendItem(parentRef: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    beforeAddSlots(beforeRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, items, options);
    }

    afterAddSlots(afterRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, items, options);
    }

    firstAddSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, items, options);
    }

    appendSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    removeAll(refs: string[], options: Options = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeNodes(refs, options);
    }

    remove(ref: string, options: Options = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.removeNodes([ref], options);
        if (arr.length <= 0) return;
        return arr[0];
    }
}

export type {
    BlockOperationById,
    BlockOperation,
    AllBlockOperationProps,
}

export {
    InsertPosition,
    AllBlockOperation,
}
