import lodash from "lodash";
import { Ref, ref, withModifiers } from "vue";
import { hasValue, isArray, isObj, isStr, noValue } from "@/utils/Typeof";
import { childSlotName, defPlaceholder } from "@/draggable/Constant";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { ComponentInstance } from "@/draggable/types/Base";
import { ComponentSlotsItem, DesignNode } from "@/draggable/types/DesignBlock";
import { CreateConfig, RuntimeBlock, RuntimeComponentSlotsItem, RuntimeListener, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { BindListenerOptions, BlockOperation, BlockOperationById, OpsOptions } from "@/draggable/types/BlockOperation";
import { BlockDesignOperation, DesignOpsOptions } from "@/draggable/types/BlockDesignOperation";
import { deepTraverseRuntimeNode } from "@/draggable/utils/DesignerUtils";
import { blockDeepTransform } from "@/draggable/utils/BlockPropsTransform";
import { toElementEventName, toPropsEventName } from "@/draggable/utils/HtmlTag";

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
    /** 渲染节点的ref与所属Block实例的ref之间的映射 | RuntimeNode.ref -> RuntimeBlock.ref */
    readonly nodeRefVueRef: Record<string, string>;
}

/** 插入节点的位置 */
enum InsertPosition {
    before,
    after,
    first,
    last,
}

/** 操作选项默认值 */
const defOptions: OpsOptions = {
    cancelRender: false,
};

/** 动态绑定事件选项默认值 */
const defBindListenerOptions: BindListenerOptions = {
    cancelRender: false,
    override: false,
};

/** 设计时操作选项默认值 */
const defDesignOpsOptions: DesignOpsOptions = {
    cancelRender: true,
};

/**
 * Block支持的操作函数
 */
class AllBlockOperation implements BlockOperation, BlockOperationById, BlockDesignOperation {
    private readonly props: Readonly<AllBlockOperationProps>;
    readonly nodeChange: Ref<number> = ref<number>(0);

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
    protected addNodesById(parent: RuntimeNode, slotName: string, position: InsertPosition, positionId: string | null, nodes: Array<ComponentSlotsItem>, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
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
                deepTraverseRuntimeNode(
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
        this.nodeChange.value++;
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
    protected addNodes(parent: RuntimeNode, slotName: string, position: InsertPosition, positionRef: string | null, nodes: Array<ComponentSlotsItem>, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
        const positionId = positionRef ? this.props.refId[positionRef] : null;
        if (hasValue(positionRef) && noValue(positionId)) throw new Error(`未找到ref对应的id值，ref=${positionRef}`);
        return this.addNodesById(parent, slotName, position, positionId, nodes, options);
    }

    /**
     * 批量删除节点
     * @param ids       删除的节点id集合
     * @param options   操作选项
     */
    protected removeNodesById(ids: Array<string>, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
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
            const delAllIds: Array<string> = [node.id];
            const refs: Array<string> = [node.ref];
            const parentIds: Array<string> = [];
            if (node.items.length > 0 || Object.keys(node.slots).length > 0) parentIds.push(node.id);
            deepTraverseRuntimeNode(
                node,
                (current) => {
                    delAllIds.push(current.id);
                    refs.push(current.ref);
                    if (current.items.length > 0 || Object.keys(current.slots).length > 0) parentIds.push(current.id);
                },
                nodeInSlot[id],
                parent,
                this.props.runtimeBlock,
            );
            delAllIds.forEach(delId => delete this.props.allNode[delId]);
            refs.forEach(delRef => {
                delete this.props.refId[delRef];
                delete this.props.nodeRefVueRef[delRef];
            });
            parentIds.forEach(delId => delete this.props.nodeParent[delId]);
        }
        this.nodeChange.value++;
        // 重新渲染组件
        if (removeNodes.length > 0 && !options.cancelRender) this.props.instance.$forceUpdate();
        // 返回删除的节点
        return removeNodes;
    }

    /**
     * 批量删除节点
     * @param refs      删除的节点ref集合
     * @param options   操作选项
     */
    protected removeNodes(refs: Array<string>, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
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
    protected moveNodesById(parent: RuntimeNode, slotName: string, position: InsertPosition, positionId: string | null, nodeIds: Array<string>, options: OpsOptions): boolean {
        if (!nodeIds || nodeIds.length <= 0) return false;
        if ([InsertPosition.before, InsertPosition.after].includes(position) && (!positionId || !this.props.allNode[positionId])) return false;
        const childrenIds: Set<string> = new Set<string>();
        let moveIds: Array<string> = [];
        for (let id of nodeIds) {
            const runtimeNode = this.props.allNode[id];
            if (!runtimeNode) continue;
            moveIds.push(id);
            deepTraverseRuntimeNode(runtimeNode, current => {
                if (nodeIds.includes(current.id)) return;
                childrenIds.add(current.id);
            });
        }
        // parent 参数错误
        if (childrenIds.has(parent.id)) return false;
        // positionId 参数错误
        if ([InsertPosition.before, InsertPosition.after].includes(position) && childrenIds.has(positionId!)) return false;
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
        const targetsCopy = [...targets];
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
            // 维护节点属性 __parentId data-node-parent-id data-slot-name
            (node as MakeWritable<RuntimeNode>).__parentId = parent.id;
            node.props[htmlExtAttr.nodeParentId] = parent.id;
            if (this.props.isDesigning) node.props[htmlExtAttr.slotName] = slotName;
        }
        let insertIdx = 0;
        if (InsertPosition.before === position) {
            insertIdx = targets.findIndex(node => isObj(node) && (node as RuntimeNode).id === positionId);
        } else if (InsertPosition.after === position) {
            insertIdx = targets.findIndex(node => isObj(node) && (node as RuntimeNode).id === positionId);
            if (insertIdx >= 0) insertIdx = insertIdx + 1;
        } else if (InsertPosition.last === position) {
            insertIdx = targets.length;
        } else if (InsertPosition.first === position) {
            insertIdx = 0;
        }
        // 参数 nodeIds 中包含了 positionId，导致无法计算 insertIdx
        if (insertIdx < 0) {
            insertIdx = targetsCopy.findIndex(node => isObj(node) && (node as RuntimeNode).id === positionId);
            while (!targets.includes(targetsCopy[insertIdx]) && insertIdx > 0 && insertIdx <= (targetsCopy.length - 1)) {
                if (InsertPosition.before === position) {
                    insertIdx--;
                } else if (InsertPosition.after === position) {
                    insertIdx++;
                } else {
                    insertIdx = 0;
                    break;
                }
            }
            if (insertIdx > 0) insertIdx = targets.findIndex(node => node === targetsCopy[insertIdx]);
            // 修正成功 & position 是 after
            if (insertIdx >= 0 && InsertPosition.after === position) {
                insertIdx = insertIdx + 1;
            }
            // 修正失败，兜底方案
            if (insertIdx < 0) insertIdx = 0;
        }
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
        this.nodeChange.value++;
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
    protected moveNodes(parent: RuntimeNode, slotName: string, position: InsertPosition, positionRef: string | null, nodeRefs: Array<string>, options: OpsOptions): boolean {
        if (!nodeRefs || nodeRefs.length <= 0) return false;
        return this.moveNodesById(parent, slotName, position, positionRef ? this.props.refId[positionRef] : null, nodeRefs.map(ref => this.props.refId[ref]), options);
    }

    /**
     * 移除指定节点的所有子节点
     * @param node      目标节点
     * @param options   操作选项
     */
    protected removeChildrenNode(node: RuntimeNode, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
        const removeNodes: Array<RuntimeComponentSlotsItem> = [];
        const delAllIds: Array<string> = [];
        for (let item of node.items) {
            removeNodes.push(item);
            if (!isObj(item)) continue;
            const node = item as RuntimeNode;
            delAllIds.push(node.id);
        }
        this.removeNodesById(delAllIds, { ...options, cancelRender: true });
        delAllIds.length = 0;
        node.items.length = 0;
        for (let name in node.slots) {
            const slot = node.slots[name];
            for (let item of slot) {
                removeNodes.push(item);
                if (!isObj(item)) continue;
                const node = item as RuntimeNode;
                delAllIds.push(node.id);
            }
            this.removeNodesById(delAllIds, { ...options, cancelRender: true });
            delAllIds.length = 0;
            slot.length = 0;
        }
        this.nodeChange.value++;
        // 重新渲染组件
        if (removeNodes.length > 0 && !options.cancelRender) this.props.instance.$forceUpdate();
        // 返回删除的节点
        return removeNodes;
    }

    /**
     * 移除指定节点的插槽
     * @param node      目标节点
     * @param slotName  插槽名
     * @param options   操作选项
     */
    protected removeSlotNode(node: RuntimeNode, slotName: string, options: OpsOptions): Array<RuntimeComponentSlotsItem> {
        const removeNodes: Array<RuntimeComponentSlotsItem> = [];
        const delAllIds: Array<string> = [];
        const slot = node.slots[slotName];
        for (let item of slot) {
            removeNodes.push(item);
            if (isObj(item)) {
                const node = item as RuntimeNode;
                delAllIds.push(node.id);
            }
        }
        this.removeNodesById(delAllIds, { ...options, cancelRender: true });
        delAllIds.length = 0;
        slot.length = 0;
        this.nodeChange.value++;
        // 重新渲染组件
        if (removeNodes.length > 0 && !options.cancelRender) this.props.instance.$forceUpdate();
        // 返回删除的节点
        return removeNodes;
    }

    /**
     * 动态增加事件监听
     * @param node      目标节点
     * @param event     事件名称
     * @param listener  事件处理函数
     * @param options   操作选项
     */
    protected bindListenerByNode(node: RuntimeNode, event: string, listener: RuntimeListener, options: BindListenerOptions) {
        event = toPropsEventName(event);
        // 判断是否需要覆盖函数
        if (node.listeners[event]?.handler
            && Function.prototype.toString.call(node.listeners[event].handler) === Function.prototype.toString.call(listener.handler)
            && !options.override) {
            return;
        }
        const { instance, runtimeBlock } = this.props;
        // 包装 handler
        let handler = listener.handler.bind(instance);
        if (isArray(listener.modifiers) && listener.modifiers.length > 0) {
            handler = withModifiers(handler, listener.modifiers);
        }
        // 维护“RuntimeNode 与 vue组件实例”对象属性
        node.listeners[event] = listener;
        if (!['anonymous', 'handler'].includes(listener.handler.name)) {
            const method = runtimeBlock.methods[listener.handler.name];
            if (method && !options.override) {
                console.warn(`函数被覆盖，name=${listener.handler.name}`, method);
            }
            runtimeBlock.methods[listener.handler.name] = listener.handler;
            instance[listener.handler.name] = handler;
        }
        // 设置事件监听函数
        if (noValue(node.__bindListeners)) node.__bindListeners = {};
        node.__bindListeners[event] = handler;
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
    }

    /**
     * 移除事件监听器
     * @param node      目标节点
     * @param event     事件名称
     * @param options   操作选项
     */
    protected removeListenerByNode(node: RuntimeNode, event: string, options: BindListenerOptions) {
        const eventOnName = toPropsEventName(event);
        const eventName = toElementEventName(event);
        const { instance, runtimeBlock } = this.props;
        // 移除事件
        for (let name of [eventOnName, eventName]) {
            const listener = node.listeners[name];
            delete node.listeners[name];
            // 维护“RuntimeNode 与 vue组件实例”对象属性
            if (listener && !['anonymous', 'handler'].includes(listener.handler?.name)) {
                delete runtimeBlock.methods[listener.handler.name];
                delete instance[listener.handler.name];
            }
            // 设置事件监听函数
            if (node.__bindListeners) delete node.__bindListeners[name];
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
    }

    getRuntimeNodeById(id: string): RuntimeNode | undefined {
        const node = this.props.allNode[id];
        if (!node) return;
        return node;
    }

    bindListenerById(id: string, event: string, listener: RuntimeListener, options: BindListenerOptions = defBindListenerOptions): boolean {
        const node = this.getRuntimeNodeById(id);
        if (!node) return false;
        this.bindListenerByNode(node, event, listener, options);
        return true;
    }

    removeListenerById(id: string, event: string, options: OpsOptions = defOptions): boolean {
        const node = this.getRuntimeNodeById(id);
        if (!node) return false;
        this.removeListenerByNode(node, event, options);
        return true;
    }

    beforeAddItemsById(beforeId: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, items, options);
    }

    afterAddItemsById(afterId: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, items, options);
    }

    firstAddItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, null, items, options);
    }

    appendItemsById(parentId: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, null, items, options);
    }

    beforeAddItemById(beforeId: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddItemById(afterId: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddItemById(parentId: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendItemById(parentId: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToItemBeforeById(beforeId: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, moveNodeIds, options);
    }

    moveNodesToItemAfterById(afterId: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, moveNodeIds, options);
    }

    moveNodesToItemFirstById(parentId: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, parentId, moveNodeIds, options);
    }

    moveNodesToItemLastById(parentId: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, parentId, moveNodeIds, options);
    }

    moveNodeToItemBeforeById(beforeId: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), childSlotName, InsertPosition.before, beforeId, [moveNodeId], options);
    }

    moveNodeToItemAfterById(afterId: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), childSlotName, InsertPosition.after, afterId, [moveNodeId], options);
    }

    moveNodeToItemFirstById(parentId: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.first, parentId, [moveNodeId], options);
    }

    moveNodeToItemLastById(parentId: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), childSlotName, InsertPosition.last, parentId, [moveNodeId], options);
    }

    beforeAddSlotsById(beforeId: string, slotName: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, items, options);
    }

    afterAddSlotsById(afterId: string, slotName: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, items, options);
    }

    firstAddSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, items, options);
    }

    appendSlotsById(parentId: string, slotName: string, items: Array<ComponentSlotsItem>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlotById(beforeId: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddSlotById(afterId: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendSlotById(parentId: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToSlotBeforeById(beforeId: string, slotName: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, moveNodeIds, options);
    }

    moveNodesToSlotAfterById(afterId: string, slotName: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, moveNodeIds, options);
    }

    moveNodesToSlotFirstById(parentId: string, slotName: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, parentId, moveNodeIds, options);
    }

    moveNodesToSlotLastById(parentId: string, slotName: string, moveNodeIds: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, parentId, moveNodeIds, options);
    }

    moveNodeToSlotBeforeById(beforeId: string, slotName: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(beforeId), slotName, InsertPosition.before, beforeId, [moveNodeId], options);
    }

    moveNodeToSlotAfterById(afterId: string, slotName: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getParentNodeById(afterId), slotName, InsertPosition.after, afterId, [moveNodeId], options);
    }

    moveNodeToSlotFirstById(parentId: string, slotName: string, moveNodeId: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.first, parentId, [moveNodeId], options);
    }

    moveNodeToSlotLastById(moveNodeId: string, parentId: string, slotName: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodesById(this.getNodeById(parentId), slotName, InsertPosition.last, parentId, [moveNodeId], options);
    }

    removeAllById(ids: Array<string>, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeNodesById(ids, options);
    }

    removeById(id: string, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.removeNodesById([id], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    removeChildrenById(id: string, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeChildrenNode(this.getNodeById(id), options);
    }

    removeSlotById(id: string, slotName: string, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeSlotNode(this.getNodeById(id), slotName, options);
    }

    bindListener(ref: string, event: string, listener: RuntimeListener, options: BindListenerOptions = defBindListenerOptions): boolean {
        const node = this.getRuntimeNode(ref);
        if (!node) return false;
        this.bindListenerByNode(node, event, listener, options);
        return true;
    }

    removeListener(ref: string, event: string, options: OpsOptions = defOptions): boolean {
        const node = this.getRuntimeNode(ref);
        if (!node) return false;
        this.removeListenerByNode(node, event, options);
        return true;
    }

    getRuntimeNode(ref: string): RuntimeNode | undefined {
        const id = this.props.refId[ref];
        if (!id) return;
        return this.getNodeById(id);
    }

    beforeAddItems(beforeRef: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, items, options);
    }

    afterAddItems(afterRef: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, items, options);
    }

    firstAddItems(parentRef: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, null, items, options);
    }

    appendItems(parentRef: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, null, items, options);
    }

    beforeAddItem(beforeRef: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddItem(afterRef: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddItem(parentRef: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendItem(parentRef: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToItemBefore(beforeRef: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, moveNodeRefs, options);
    }

    moveNodesToItemAfter(afterRef: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, moveNodeRefs, options);
    }

    moveNodesToItemFirst(parentRef: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, parentRef, moveNodeRefs, options);
    }

    moveNodesToItemLast(parentRef: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, parentRef, moveNodeRefs, options);
    }

    moveNodeToItemBefore(beforeRef: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(beforeRef), childSlotName, InsertPosition.before, beforeRef, [moveNodeRef], options);
    }

    moveNodeToItemAfter(afterRef: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(afterRef), childSlotName, InsertPosition.after, afterRef, [moveNodeRef], options);
    }

    moveNodeToItemFirst(parentRef: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), childSlotName, InsertPosition.first, parentRef, [moveNodeRef], options);
    }

    moveNodeToItemLast(parentRef: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), childSlotName, InsertPosition.last, parentRef, [moveNodeRef], options);
    }

    beforeAddSlots(beforeRef: string, slotName: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, items, options);
    }

    afterAddSlots(afterRef: string, slotName: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, items, options);
    }

    firstAddSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, items, options);
    }

    appendSlots(parentRef: string, slotName: string, items: ComponentSlotsItem[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, items, options);
    }

    beforeAddSlot(beforeRef: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    afterAddSlot(afterRef: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    firstAddSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), slotName, InsertPosition.first, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    appendSlot(parentRef: string, slotName: string, item: ComponentSlotsItem, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.addNodes(this.getNode(parentRef), slotName, InsertPosition.last, null, [item], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    moveNodesToSlotBefore(beforeRef: string, slotName: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, moveNodeRefs, options);
    }

    moveNodesToSlotAfter(afterRef: string, slotName: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, moveNodeRefs, options);
    }

    moveNodesToSlotFirst(parentRef: string, slotName: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), slotName, InsertPosition.first, parentRef, moveNodeRefs, options);
    }

    moveNodesToSlotLast(parentRef: string, slotName: string, moveNodeRefs: Array<string>, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), slotName, InsertPosition.last, parentRef, moveNodeRefs, options);
    }

    moveNodeToSlotBefore(beforeRef: string, slotName: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(beforeRef), slotName, InsertPosition.before, beforeRef, [moveNodeRef], options);
    }

    moveNodeToSlotAfter(afterRef: string, slotName: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getParentNode(afterRef), slotName, InsertPosition.after, afterRef, [moveNodeRef], options);
    }

    moveNodeToSlotFirst(parentRef: string, slotName: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), slotName, InsertPosition.first, parentRef, [moveNodeRef], options);
    }

    moveNodeToSlotLast(parentRef: string, slotName: string, moveNodeRef: string, options: OpsOptions = defOptions): boolean {
        return this.moveNodes(this.getNode(parentRef), slotName, InsertPosition.last, parentRef, [moveNodeRef], options);
    }

    removeAll(refs: string[], options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeNodes(refs, options);
    }

    remove(ref: string, options: OpsOptions = defOptions): RuntimeComponentSlotsItem | undefined {
        const arr = this.removeNodes([ref], options);
        if (arr.length <= 0) return;
        return arr[0];
    }

    removeChildren(ref: string, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeChildrenNode(this.getNode(ref), options);
    }

    removeSlot(ref: string, slotName: string, options: OpsOptions = defOptions): Array<RuntimeComponentSlotsItem> {
        return this.removeSlotNode(this.getNode(ref), slotName, options);
    }

    updateNodeRef(currRef: string, newRef: string, options: OpsOptions = defOptions): boolean {
        if (!newRef || lodash.trim(newRef).length <= 0) return false;
        // nodeRefVueRef nodeRefVueRef nodeRefVueRef
        if (this.props.refId[newRef]) return false;
        const id = this.props.refId[currRef];
        if (!id) return false;
        const node = this.props.allNode[id];
        if (!node) return false;
        (node as any).ref = newRef;
        node.props[htmlExtAttr.nodeRef] = newRef;
        delete this.props.refId[currRef];
        this.props.refId[newRef] = node.id;
        const blockRef = this.props.nodeRefVueRef[currRef];
        if (blockRef) {
            delete this.props.nodeRefVueRef[currRef];
            this.props.nodeRefVueRef[newRef] = blockRef;
        }
        for (let ref in this.props.nodeRefVueRef) {
            const blockRef = this.props.nodeRefVueRef[ref];
            if (blockRef === currRef) {
                this.props.nodeRefVueRef[ref] = newRef;
            }
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
        return true;
    }

    removePlaceholder(id: string, slotName: string, options: DesignOpsOptions = defDesignOpsOptions): void {
        if (!this.props.isDesigning) throw new Error("removePlaceholder 只能在设计时调用");
        const node = this.props.allNode[id];
        if (!node?.__designPlaceholder) return;
        delete node.__designPlaceholder[slotName];
        if (slotName === childSlotName) {
            this.removeChildrenById(id, { cancelRender: true });
        } else {
            this.removeSlotNode(node, slotName, { cancelRender: true });
        }
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
    }

    setPlaceholder(id: string, slotName: string, placeholder: ComponentSlotsItem = defPlaceholder, options: DesignOpsOptions = defDesignOpsOptions): void {
        if (!this.props.isDesigning) throw new Error("setPlaceholder 只能在设计时调用");
        if (!placeholder) return;
        const node = this.props.allNode[id];
        if (!node) return;
        const writableNode = node as MakeWritable<RuntimeNode>;
        const newPlaceholder = lodash.cloneDeep(placeholder) as DesignNode;
        if (!newPlaceholder.props) newPlaceholder.props = {};
        newPlaceholder.props[htmlExtAttr.placeholderName] = slotName;
        if (!writableNode.__designPlaceholder) writableNode.__designPlaceholder = {};
        writableNode.__designPlaceholder[slotName] = blockDeepTransform(
            newPlaceholder,
            { componentManage: this.props.componentManage, isDesigning: true },
            this.props.runtimeBlock,
            node,
        );
        // 重新渲染组件
        if (!options.cancelRender) this.props.instance.$forceUpdate();
    }
}

export {
    InsertPosition,
    AllBlockOperation,
}
