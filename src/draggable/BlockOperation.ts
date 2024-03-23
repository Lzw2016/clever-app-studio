import lodash from "lodash";
import { hasValue, isArray, isObj, isStr, noValue } from "@/utils/Typeof";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { ComponentInstance } from "@/draggable/types/Base";
import { ComponentSlotsItem } from "@/draggable/types/DesignBlock";
import { CreateConfig, RuntimeBlock, RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { blockDeepTransform, deepTraverseNodes } from "@/draggable/utils/BlockPropsTransform";

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
    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 批量增加子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 增加一个子节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param item      增加的节点集合
     * @param options   操作选项
     */
    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 增加一个子节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddItemById(afterId: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddItemById(parentId: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendItemById(parentId: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 批量增加插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在插槽子节点的头部批量插入节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在插槽子节点的尾部批量追加节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param items     增加的节点集合
     * @param options   操作选项
     */
    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param beforeId  增加节点的位置，在指定的兄弟节点之前
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 增加一个插槽节点(基于id属性)
     * @param afterId   增加节点的位置，在指定的兄弟节点之后
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在插槽子节点的头部插入一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在插槽子节点的尾部追加一个节点(基于id属性)
     * @param parentId  父节点id
     * @param slotName  插槽名
     * @param item      增加的节点对象
     * @param options   操作选项
     */
    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 批量删除节点(基于id属性)
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    removeAllById(ids: Array<string>, options?: Options): void;

    /**
     * 删除一个节点(基于id属性)
     * @param id        删除的节点Id
     * @param options   操作选项
     */
    removeById(id: string, options?: Options): void;
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
    beforeAddItems(beforeRef: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 批量增加子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddItems(afterRef: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendItems(parentRef: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 增加一个子节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param item          增加的节点集合
     * @param options       操作选项
     */
    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 增加一个子节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddItem(afterRef: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddItem(parentRef: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendItem(parentRef: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    beforeAddSlots(beforeRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 批量增加插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    afterAddSlots(afterRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在插槽子节点的头部批量插入节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    firstAddSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 在插槽子节点的尾部批量追加节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param items         增加的节点集合
     * @param options       操作选项
     */
    appendSlots(parentRef: string, slotName: string, items: Array<ComponentSlotsItem>, options?: Options): void;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param beforeRef     增加节点的位置，在指定的兄弟节点之前
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 增加一个插槽节点(基于ref属性)
     * @param afterRef      增加节点的位置，在指定的兄弟节点之后
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在插槽子节点的头部插入一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 在插槽子节点的尾部追加一个节点(基于ref属性)
     * @param parentRef     父节点ref
     * @param slotName      插槽名
     * @param item          增加的节点对象
     * @param options       操作选项
     */
    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options?: Options): void;

    /**
     * 批量删除节点(基于ref属性)
     * @param refs          删除的节点ref集合
     * @param options       操作选项
     */
    removeAll(refs: Array<string>, options?: Options): void;

    /**
     * 删除一个节点(基于ref属性)
     * @param ref           删除的节点ref
     * @param options       操作选项
     */
    remove(ref: string, options?: Options): void;
}

interface AllBlockOperationProps extends CreateConfig {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 当前的 RuntimeBlock 对象 */
    runtimeBlock: RuntimeBlock;
    /** 当前 RuntimeBlock 对应的 vue 组件实例 */
    instance: ComponentInstance;
    /** 所有的 RuntimeNode 对象 | RuntimeNode.id -> RuntimeNode */
    allNode: Record<string, RuntimeNode>;
    /** 所有的 RuntimeNode 与其父节点关系 | RuntimeNode.id -> 所属的RuntimeNode */
    nodeParent: Record<string, RuntimeNode>;
    /** ref属性与id属性的映射 | RuntimeNode.ref -> RuntimeNode.id */
    refId: Record<string, string>;
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
    protected addNodesById(parent: RuntimeNode, slotName: string | null, position: InsertPosition, positionId: string | null, nodes: Array<ComponentSlotsItem>, options: Options): void {
        nodes = nodes.filter(node => hasValue(node));
        slotName = lodash.trim(slotName ?? "");
        if (nodes.length <= 0) return;
        const isSlot = slotName.length > 0;
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
                runtimeNode = blockDeepTransform(node, this.props, this.props.runtimeBlock);
                // 递归初始化 allNode nodeParent refId
                deepTraverseNodes(
                    runtimeNode,
                    (current, isSlot, parentNode) => {
                        this.props.allNode[current.id] = current;
                        if (parentNode) this.props.nodeParent[current.id] = parentNode;
                        if (this.props.refId[current.ref]) console.warn(`ref属性重复，ref=${current.ref}`);
                        this.props.refId[current.ref] = current.id;
                    },
                    isSlot,
                    parent,
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
    protected addNodes(parent: RuntimeNode, slotName: string | null, position: InsertPosition, positionRef: string | null, nodes: Array<ComponentSlotsItem>, options: Options): void {
        const positionId = positionRef ? this.props.refId[positionRef] : null;
        if (hasValue(positionRef) && noValue(positionId)) throw new Error(`未找到ref对应的id值，ref=${positionRef}`);
        this.addNodesById(parent, slotName, position, positionId, nodes, options);
    }

    /**
     * 批量删除节点
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    protected removeNodesById(ids: Array<string>, options: Options): void {
        ids = ids.filter(id => hasValue(id));
        if (ids.length <= 0) return;
        const nodeInSlot: Record<string, boolean> = {};
        for (let id of ids) {
            // 获取父节点
            const parent = this.props.nodeParent[id];
            if (!parent) continue;
            // 删除 items 中的元素
            let idx = this.findNodeIdx(parent.items, id);
            if (idx >= 0) {
                parent.items.splice(idx, 1);
                nodeInSlot[id] = false;
                continue;
            }
            // 删除 slots 中的元素
            for (let name in parent.slots) {
                const slot = parent.slots[name];
                idx = this.findNodeIdx(slot, id);
                if (idx >= 0) {
                    slot.splice(idx, 1);
                    nodeInSlot[id] = true;
                    break;
                }
            }
        }
        // 维护属性 allNode nodeParent refId
        for (let id of ids) {
            const parent = this.props.nodeParent[id];
            const node = this.props.allNode[id];
            const ids: Array<string> = [node.id];
            const refs: Array<string> = [node.ref];
            const parentIds: Array<string> = [];
            if (node.items.length > 0 || Object.keys(node.slots).length > 0) parentIds.push(node.id);
            deepTraverseNodes(
                node,
                current => {
                    ids.push(current.id);
                    refs.push(current.ref);
                    if (current.items.length > 0 || Object.keys(current.slots).length > 0) parentIds.push(current.id);
                },
                nodeInSlot[id],
                parent,
            );
            ids.forEach(delId => delete this.props.allNode[delId]);
            refs.forEach(delRef => delete this.props.refId[delRef]);
            parentIds.forEach(delId => delete this.props.nodeParent[delId]);
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
    }

    /**
     * 批量删除节点
     * @param refs      删除的节点ref集合
     * @param options   操作选项
     */
    protected removeNodes(refs: Array<string>, options: Options): void {
        const ids = refs.map(ref => this.props.refId[ref]).filter(id => hasValue(id));
        this.removeNodesById(ids, options);
    }

    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(beforeId), null, InsertPosition.before, beforeId, items, options);
    }

    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(afterId), null, InsertPosition.after, afterId, items, options);
    }

    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), null, InsertPosition.first, null, items, options);
    }

    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), null, InsertPosition.last, null, items, options);
    }

    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(beforeId), null, InsertPosition.before, beforeId, [item], options);
    }

    afterAddItemById(afterId: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(afterId), null, InsertPosition.after, afterId, [item], options);
    }

    firstAddItemById(parentId: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), null, InsertPosition.first, null, [item], options);
    }

    appendItemById(parentId: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), null, InsertPosition.last, null, [item], options);
    }

    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, items, options);
    }

    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, items, options);
    }

    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, items, options);
    }

    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, [item], options);
    }

    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, [item], options);
    }

    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, [item], options);
    }

    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, [item], options);
    }

    removeAllById(ids: Array<string>, options: Options = defOptions): void {
        this.removeNodesById(ids, options);
    }

    removeById(id: string, options: Options = defOptions): void {
        this.removeNodesById([id], options);
    }

    beforeAddItems(beforeRef: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getParentNode(beforeRef), null, InsertPosition.before, beforeRef, items, options);
    }

    afterAddItems(afterRef: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getParentNode(afterRef), null, InsertPosition.after, afterRef, items, options);
    }

    firstAddItems(parentRef: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), null, InsertPosition.first, null, items, options);
    }

    appendItems(parentRef: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), null, InsertPosition.last, null, items, options);
    }

    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getParentNode(beforeRef), null, InsertPosition.before, beforeRef, [item], options);
    }

    afterAddItem(afterRef: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getParentNode(afterRef), null, InsertPosition.after, afterRef, [item], options);
    }

    firstAddItem(parentRef: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), null, InsertPosition.first, null, [item], options);
    }

    appendItem(parentRef: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), null, InsertPosition.last, null, [item], options);
    }

    beforeAddSlots(beforeRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, items, options);
    }

    afterAddSlots(afterRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, items, options);
    }

    firstAddSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, items, options);
    }

    appendSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, [item], options);
    }

    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, [item], options);
    }

    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, [item], options);
    }

    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: Options = defOptions): void {
        this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, [item], options);
    }

    removeAll(refs: string[], options: Options = defOptions): void {
        this.removeNodes(refs, options);
    }

    remove(ref: string, options: Options = defOptions): void {
        this.removeNodes([ref], options);
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
