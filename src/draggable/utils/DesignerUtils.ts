import { isObj } from "@/utils/Typeof";
import { childSlotName } from "@/draggable/Constant";
import { RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { ComponentMeta, MaterialMetaTab } from "@/draggable/types/ComponentMeta";

/**
 * 定义一个 ComponentMeta 对象，仅仅是为了类型声明，无任何处理逻辑
 */
function defineComponentMeta(componentMeta: ComponentMeta): ComponentMeta {
    return componentMeta;
}

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
 * 获取所有的组件类型
 */
function getMaterialMetaTabAllTypes(materialMetaTab: MaterialMetaTab): Array<string> {
    const types: Array<string> = [];
    const { groups } = materialMetaTab;
    for (let group of groups) {
        const { items } = group;
        for (let item of items) {
            const { type } = item;
            if (types.includes(type)) continue;
            types.push(type);
        }
    }
    return types;
}


export type  {
    NodePosition,
}

export {
    defineComponentMeta,
    getChildNodePosition,
    getMaterialMetaTabAllTypes,
}
