import lodash from "lodash";
import { isObj } from "@/utils/Typeof";
import { createRefID, createVNodeID } from "@/utils/IDCreate";
import { childSlotName } from "@/draggable/Constant";
import { deepTraverseNodes } from "@/draggable/utils/BlockPropsTransform";
import { RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";

interface NodePosition {
    /** 子节点所插槽名 */
    slotName: string;
    /** 子节点是否在items中 */
    isItems: boolean;
    /** 子节点所在数组 */
    arr: Array<RuntimeComponentSlotsItem>;
    /** 子节点在数组中的位置 */
    idx: number;
}

/**
 * 查找子节点在其父节点中的所在位置信息
 * @param node      父节点
 * @param childId   子节点id
 */
function getChildNodePosition(node: RuntimeNode, childId?: string): NodePosition | undefined {
    if (!childId) return;
    let slotName: string | undefined;
    let arr: Array<RuntimeComponentSlotsItem> = [];
    let idx = node.items.findIndex(node => isObj(node) && (node as RuntimeNode).id === childId);
    if (idx >= 0) {
        slotName = childSlotName;
        arr = node.items;
    } else {
        for (let name in node.slots) {
            const slot = node.slots[name];
            idx = slot.findIndex(node => isObj(node) && (node as RuntimeNode).id === childId);
            if (idx >= 0) {
                slotName = name;
                arr = slot;
                break;
            }
        }
    }
    if (idx < 0) return;
    return {
        slotName: slotName!,
        isItems: slotName === childSlotName,
        arr: arr,
        idx: idx,
    };
}

/**
 * 深度克隆 渲染节点 TODO 自己递归实现
 * @param runtimeNode
 * @param parentNode
 */
function cloneDeepRuntimeNode(runtimeNode: RuntimeNode, parentNode?: RuntimeNode): RuntimeNode {
    const newNode = lodash.cloneDeep(runtimeNode);
    deepTraverseNodes(
        newNode,
        (current, isSlot, parent) => {
            const curr = current as MakeWritable<RuntimeNode>;
            curr.id = createVNodeID();
            curr.ref = createRefID();
            if (parent) curr.__parentId = parent.id;
            curr.props[htmlExtAttr.nodeId] = curr.id;
            curr.props[htmlExtAttr.nodeRef] = curr.ref;
            curr.props[htmlExtAttr.nodeParentId] = curr.__parentId;
            curr.props[htmlExtAttr.slotName] = 'default';
        },
        false,
        parentNode,
    );
    return newNode;
}

export type  {
    NodePosition,
}

export {
    getChildNodePosition,
    cloneDeepRuntimeNode,
}
