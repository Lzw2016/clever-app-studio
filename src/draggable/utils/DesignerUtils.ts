import lodash from "lodash";
import JSON5 from "json5";
import { isVNode, VNode, VNodeChild } from "vue";
import { hasValue, isArray, isFun, isObj, isStr, noValue } from "@/utils/Typeof";
import { childSlotName, configRawValueName } from "@/draggable/Constant";
import { ComponentParam } from "@/draggable/types/Base";
import { RuntimeBlock, RuntimeComponentSlotsItem, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { ComponentMeta, MaterialMetaTab } from "@/draggable/types/ComponentMeta";
import { ComponentSlotsItem, DesignBlock, DesignNode } from "@/draggable/types/DesignBlock";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { toConfigAndFormat } from "@/draggable/utils/FunctionUtils";

/**
 * 定义一个 DesignBlock 对象，仅仅是为了类型声明，无任何处理逻辑
 */
function defineDesignBlock(designBlock: DesignBlock): DesignBlock {
    return designBlock;
}

/**
 * 定义一个 ComponentMeta 对象，仅仅是为了类型声明，无任何处理逻辑
 */
function defineComponentMeta(componentMeta: ComponentMeta): ComponentMeta {
    return componentMeta;
}

/**
 * 递归获取当前 DesignNode 中所有的组件名称(包含html原生标签名)
 */
function getAllTypes(node: DesignNode, allType?: Set<string>): Array<string> {
    if (!allType) allType = new Set<string>();
    if (node.type) {
        node.type = lodash.trim(node.type);
        allType.add(node.type);
    }
    if (node.props) {
        for (let name in node.props) {
            // 组件类型参数
            const value: any = node.props[name];
            if (!value) continue;
            const componentParam = value as ComponentParam;
            if (componentParam.__component_param) {
                allType.add(componentParam.type);
            }
        }
    }
    if (node.slots) {
        for (let name in node.slots) {
            const slot: any = node.slots[name];
            if (isArray(slot)) {
                slot.forEach(item => getAllTypes(item, allType));
            } else if (isObj(slot)) {
                getAllTypes(slot, allType);
            }
        }
    }
    if (node.items) {
        if (isArray(node.items)) {
            node.items.forEach(item => {
                if (isObj(item)) {
                    getAllTypes(item as any, allType);
                }
            });
        } else if (isObj(node.items)) {
            getAllTypes(node.items as any, allType);
        }
    }
    return Array.from(allType);
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
        for (let type of group.types) {
            if (types.includes(type)) continue;
            types.push(type);
        }
    }
    return types;
}

/** 遍历 VNode 的回调函数 */
type TraverseVNode = (current: VNode, parent?: VNode) => void;

/**
 * 深度递归遍历 vnode 节点
 * @param vnode     VNode节点
 * @param callback  遍历VNode的回调函数
 * @param maxDepth  递归的最大深度(默认：8)
 * @param parent    当前VNode的父节点
 * @param currDepth 当前递归的深度
 */
function deepTraverseVNode(vnode: VNode, callback: TraverseVNode, maxDepth: number = 8, parent?: VNode, currDepth?: number) {
    if (noValue(currDepth)) currDepth = 0;
    if (currDepth > maxDepth) return;
    currDepth++;
    if (!isVNode(vnode)) return;
    callback(vnode, parent);
    const children = vnode.children;
    if (!children) return;
    if (isArray(children)) {
        for (let child of children) {
            _deepTraverseChild(child, callback, maxDepth, vnode, currDepth);
        }
    } else if (isObj(children)) {
        const rawSlots = children as Record<string, VNodeChild | string>;
        for (let name in rawSlots) {
            const child = rawSlots[name];
            _deepTraverseChild(child, callback, maxDepth, vnode, currDepth);
        }
    }
}

// deepTraverseNodes 处理 slots 或者 child
function _deepTraverseChild(child: VNodeChild | string, callback: TraverseVNode, maxDepth: number, parent?: VNode, currDepth?: number) {
    if (!child) return;
    if (isVNode(child)) {
        deepTraverseVNode(child, callback, maxDepth, parent, currDepth);
    } else if (isArray(child)) {
        for (let item of child) {
            if (isVNode(item)) deepTraverseVNode(item, callback, maxDepth, parent, currDepth);
        }
    }
}

/** 遍历 RuntimeNode 的回调函数 */
type TraverseRuntimeNode = (current: RuntimeNode, isSlot: boolean, parent?: RuntimeNode, currentBlock?: RuntimeBlock) => void;

/**
 * 深度递归 RuntimeNode 遍历所有的 node(包含slot)
 * @param node          RuntimeNode
 * @param callback      遍历时的回调函数
 * @param isSlot        当前 node 是否时插槽
 * @param parentNode    当前 node 的父节点
 * @param currentBlock  当前的 node 所属的 RuntimeBlock 对象
 */
function deepTraverseRuntimeNode(node: RuntimeNode, callback: TraverseRuntimeNode, isSlot: boolean = false, parentNode?: RuntimeNode, currentBlock?: RuntimeBlock): void {
    const { items, slots } = node;
    callback(node, isSlot, parentNode, currentBlock);
    const runtimeBlock = node as RuntimeBlock;
    const newCurrentBlock = runtimeBlock.block ? runtimeBlock : currentBlock;
    // 递归 slots
    for (let name in slots) {
        const slot = slots[name];
        if (slot.length <= 0) continue;
        _deepRuntimeBlockSlotsOrItems(slot, callback, true, node, newCurrentBlock);
    }
    // 递归 items
    if (items && items.length > 0) {
        _deepRuntimeBlockSlotsOrItems(items, callback, false, node, newCurrentBlock);
    }
}

// deepTraverseRuntimeNode 处理 slots 或者 items
function _deepRuntimeBlockSlotsOrItems(cmpNodes: Array<RuntimeComponentSlotsItem>, callback: TraverseRuntimeNode, isSlot: boolean, parentNode: RuntimeNode, currentBlock?: RuntimeBlock) {
    for (let cmpNode of cmpNodes) {
        const node = cmpNode as RuntimeNode;
        if (isObj(node) && !isArray(node)) {
            deepTraverseRuntimeNode(node, callback, isSlot, parentNode, currentBlock);
        }
    }
}

/** 遍历 DesignNode 的回调函数 */
type TraverseDesignNode = (current: DesignNode, isSlot: boolean, parent?: DesignNode, currentBlock?: DesignBlock) => void;

/**
 * 深度递归 DesignNode 遍历所有的 node(包含slot)
 * @param node          DesignNode
 * @param callback      遍历时的回调函数
 * @param isSlot        当前 node 是否时插槽
 * @param parentNode    当前 node 的父节点
 * @param currentBlock  当前的 node 所属的 DesignBlock 对象
 */
function deepTraverseDesignNode(node: DesignNode, callback: TraverseDesignNode, isSlot: boolean = false, parentNode?: DesignNode, currentBlock?: DesignBlock): void {
    const { items, slots } = node;
    callback(node, isSlot, parentNode, currentBlock);
    const designBlock = node as DesignBlock;
    const newCurrentBlock = designBlock.block ? designBlock : currentBlock;
    // 递归 slots
    if (slots) {
        for (let name in slots) {
            const slot = slots[name];
            if (!isArray(slot)) {
                _deepDesignBlockSlotsOrItems([slot], callback, true, node, newCurrentBlock);
                continue;
            }
            if (slot.length <= 0) continue;
            _deepDesignBlockSlotsOrItems(slot, callback, true, node, newCurrentBlock);
        }
    }
    // 递归 items
    if (items) {
        if (isArray(items)) {
            if (items.length > 0) _deepDesignBlockSlotsOrItems(items, callback, false, node, newCurrentBlock);
        } else {
            _deepDesignBlockSlotsOrItems([items], callback, false, node, newCurrentBlock);
        }
    }
}

// deepTraverseDesignNode 处理 slots 或者 items
function _deepDesignBlockSlotsOrItems(cmpNodes: Array<ComponentSlotsItem>, callback: TraverseDesignNode, isSlot: boolean, parentNode: DesignNode, currentBlock?: DesignBlock) {
    for (let cmpNode of cmpNodes) {
        const node = cmpNode as DesignNode;
        if (isObj(node) && !isArray(node)) {
            deepTraverseDesignNode(node, callback, isSlot, parentNode, currentBlock);
        }
    }
}

interface RuntimeNodeToDesignNodeOps {
    /** 保持RuntimeNode 的 ref属性值 */
    keepRef?: boolean;
}

/**
 * 将 RuntimeNode 转换成 DesignNode
 */
function runtimeNodeToDesignNode(runtimeNode: RuntimeNode, parent?: RuntimeNode, blockNode?: RuntimeBlock, ops?: RuntimeNodeToDesignNodeOps): DesignNode {
    const {
        // __designNode,
        block,
        type,
        ref: runtimeRef,
        props: runtimeProps,
        listeners: runtimeListeners,
        directives: runtimeDirectives,
        slots: runtimeSlots,
        items: runtimeItems,
        tpl: runtimeTpl,
        data: runtimeData,
        computed: runtimeComputed,
        watch: runtimeWatch,
        methods: runtimeMethods,
        lifeCycles: runtimeLifeCycles,
        meta: runtimeMeta,
        i18n: runtimeI18n,
    } = runtimeNode as RuntimeBlock;
    if (block) blockNode = runtimeNode as RuntimeBlock;
    // const {
    //     props: designProps,
    //     slots: designSlots,
    //     items: designItems,
    //     ...designOther
    // } = __designNode as DesignBlock;
    const designNode: DesignNode = { type: type };
    if (ops?.keepRef) designNode.ref = runtimeRef;
    // 处理 props
    if (Object.keys(runtimeProps).length > 0) {
        const props = _propsToDesignNode(lodash.cloneDeep(runtimeProps));
        if (props && Object.keys(props).length > 0) {
            designNode.props = props;
        }
    }
    // 处理 listeners
    if (Object.keys(runtimeListeners).length > 0) {
        const listeners = _listenersToDesignNode(lodash.cloneDeep(runtimeListeners), blockNode);
        if (listeners && Object.keys(listeners).length > 0) {
            designNode.listeners = listeners;
        }
    }
    // 处理 directives
    if (Object.keys(runtimeDirectives).length > 0) {
        const directives = lodash.cloneDeep(runtimeDirectives);
        if (directives && Object.keys(directives).length > 0) {
            designNode.directives = directives;
        }
    }
    // 处理 slots
    if (Object.keys(runtimeSlots).length > 0) {
        designNode.slots = {};
        for (let name in runtimeSlots) {
            const slotArr = runtimeSlots[name];
            if (slotArr.length <= 0) continue;
            const slots = _slotsOrItemsToDesignNode(slotArr, runtimeNode, blockNode, ops);
            if (slots) {
                designNode.slots[name] = slots
            }
        }
        if (Object.keys(designNode.slots).length <= 0) {
            delete designNode.slots;
        }
    }
    // 处理 items
    if (runtimeItems.length > 0) {
        const items = _slotsOrItemsToDesignNode(runtimeItems, runtimeNode, blockNode, ops);
        if (items || (isArray(items) && items.length > 0)) {
            designNode.items = items;
        }
    }
    // 处理 tpl
    if (runtimeTpl) {
        const tpl = _tplToDesignNode(runtimeTpl);
        if (tpl || (isArray(tpl) && tpl.length > 0)) {
            designNode.tpl = tpl;
        }
    }
    // 处理 DesignBlock
    if (block) {
        const designBlock = designNode as DesignBlock;
        designBlock.block = true;
        // 处理 data
        if (Object.keys(runtimeData).length > 0) {
            designBlock.data = lodash.cloneDeep(runtimeData);
        }
        // 处理 computed
        if (Object.keys(runtimeComputed).length > 0) {
            designBlock.computed = lodash.cloneDeep(runtimeComputed);
        }
        // 处理 watch
        if (Object.keys(runtimeWatch).length > 0) {
            designBlock.watch = lodash.cloneDeep(runtimeWatch);
        }
        // 处理 methods
        if (Object.keys(runtimeMethods).length > 0) {
            designBlock.methods = lodash.cloneDeep(runtimeMethods);
        }
        // 处理 lifeCycles
        if (Object.keys(runtimeLifeCycles).length > 0) {
            designBlock.lifeCycles = lodash.cloneDeep<any>(runtimeLifeCycles);
        }
        // 处理 meta
        if (runtimeMeta && Object.keys(runtimeMeta).length > 0) {
            designBlock.meta = lodash.cloneDeep(runtimeMeta);
        }
        // 处理 i18n
        if (Object.keys(runtimeI18n).length > 0) {
            designBlock.i18n = lodash.cloneDeep(runtimeI18n);
        }
    }
    return designNode;
}

// runtimeNodeToDesignNode 处理 slots 或者 items
function _slotsOrItemsToDesignNode(itemsOrSlots: Array<RuntimeComponentSlotsItem>, runtimeNode: RuntimeNode, blockNode?: RuntimeBlock, ops?: RuntimeNodeToDesignNodeOps): Array<ComponentSlotsItem> | ComponentSlotsItem | undefined {
    if (itemsOrSlots.length == 1) {
        return _slotOrItemToDesignNode(itemsOrSlots[0], runtimeNode, blockNode, ops);
    } else if (itemsOrSlots.length > 1) {
        return itemsOrSlots.map(itemOrSlot => _slotOrItemToDesignNode(itemOrSlot, runtimeNode, blockNode, ops)).filter(item => hasValue(item));
    }
}

// runtimeNodeToDesignNode 处理 slot 或者 item
function _slotOrItemToDesignNode(itemOrSlot: RuntimeComponentSlotsItem, runtimeNode: RuntimeNode, blockNode?: RuntimeBlock, ops?: RuntimeNodeToDesignNodeOps): ComponentSlotsItem | undefined {
    if (isStr(itemOrSlot)) {
        return itemOrSlot;
    } else if (isObj(itemOrSlot)) {
        return runtimeNodeToDesignNode(itemOrSlot, runtimeNode, blockNode, ops);
    }
}

// runtimeNodeToDesignNode 处理 tpl
function _tplToDesignNode(tpl: RuntimeNode['tpl']): DesignNode['tpl'] {
    if (!tpl) return;
    if (isStr(tpl)) return tpl;
    if (tpl.length === 1) {
        return tpl[0];
    } else if (tpl.length > 1) {
        return tpl;
    }
}

// runtimeNodeToDesignNode 处理 props
function _propsToDesignNode(props: RuntimeNode['props']): DesignNode['props'] {
    const res: DesignNode['props'] = {};
    for (let key in props) {
        if ([
            htmlExtAttr.componentType,
            htmlExtAttr.nodeId,
            htmlExtAttr.nodeRef,
            htmlExtAttr.nodeParentId,
            htmlExtAttr.placeholderName,
            htmlExtAttr.slotName,
        ].includes(key)) {
            continue;
        }
        let value = props[key];
        // 读取props属性原始值
        if (value?.[configRawValueName]) {
            value = value[configRawValueName];
        }
        // 保存属性
        res[key] = value;
    }
    return res;
}

// runtimeNodeToDesignNode 处理 listeners
function _listenersToDesignNode(listeners: RuntimeNode['listeners'], blockNode?: RuntimeBlock): DesignNode['listeners'] {
    const res: DesignNode['listeners'] = {};
    for (let key in listeners) {
        const { handler, modifiers } = listeners[key];
        let handlerOrFunName: any = handler;
        // 如果不是匿名函数 & RuntimeBlock.methods中存在同名函数
        if (handler.name && !["anonymous"].includes(handler.name) && isFun(blockNode?.methods[handler.name])) {
            handlerOrFunName = handler.name;
        }
        // 保存属性
        if (noValue(modifiers) || modifiers.length <= 0) {
            res[key] = handlerOrFunName;
        } else {
            res[key] = { handler: handlerOrFunName, modifiers };
        }
    }
    return res;
}

interface TreeNode<T = any> {
    /** 节点ID */
    readonly id: string;
    /** 节点标题 */
    readonly label: string;
    /** 子节点 */
    children?: Array<TreeNode>;
    /** 当前节点是否是插槽 */
    readonly isSlot: boolean;
    /** 节点数据 */
    readonly data?: T;
}

/**
 * 将 RuntimeNode 转换成 DesignNode
 */
function runtimeNodeToTreeNode(runtimeNode: RuntimeNode): Array<TreeNode<RuntimeNode>> {
    const rootNodes: Array<TreeNode<RuntimeNode>> = [];
    const flatNodes: Map<string, TreeNode<RuntimeNode>> = new Map<string, TreeNode<RuntimeNode>>();
    deepTraverseRuntimeNode(
        runtimeNode,
        (current, isSlot, parent) => {
            const node: TreeNode<RuntimeNode> = { id: current.id, label: current.type, isSlot: isSlot, data: current };
            flatNodes.set(node.id, node);
            if (!parent) {
                // 不存在父节点(根节点)
                rootNodes.push(node);
                return;
            }
            // 存在父节点
            const parentNode = flatNodes.get(parent.id);
            if (!parentNode) {
                console.error("未知错误: parentNode 不能为空");
                return;
            }
            if (!parentNode.children) parentNode.children = [];
            parentNode.children.push(node);
        },
    );
    return rootNodes;
}

/**
 * 将 DesignNode 对象转换成 json 字符串代码
 */
function designNodeToJsonString(node: DesignNode): string {
    return JSON.stringify(node, _funToString, 4);
}

/**
 * 将 DesignNode 对象转换成 json5 字符串代码
 */
function designNodeToJson5String(node: DesignNode): string {
    return JSON5.stringify(node, _funToString, 4);
}

function _funToString(key: any, value: any): any {
    if (isFun(value)) {
        return Function.prototype.toString.call(value);
    }
    return value;
}

/**
 * 将 DesignNode 对象转换成 js 字符串代码
 */
function designNodeToJsString(node: DesignNode): string {
    // TODO 未实现
    return '';
}

/**
 * 将 DesignNode 及其所有子节点的函数属性值转换成 FunctionConfig 对象(这个方法会改变DesignNode属性值)
 * @param node DesignNode
 */
async function formatDesignNodeFunction(node: DesignNode) {
    const flatNodes: Array<DesignNode> = [];
    deepTraverseDesignNode(node, current => flatNodes.push(current));
    for (let node of flatNodes) {
        await _mapObjToConfigAndFormat(node.listeners);
        const designBlock = node as DesignBlock;
        if (designBlock.block) {
            await _mapObjToConfigAndFormat(designBlock.computed);
            await _mapObjToConfigAndFormat(designBlock.watch);
            await _mapObjToConfigAndFormat(designBlock.methods);
            await _mapObjToConfigAndFormat(designBlock.lifeCycles);
        }
    }
}

async function _mapObjToConfigAndFormat(map?: Record<string, any>) {
    if (!map) return;
    const newMap: Record<string, any> = {};
    for (let key in map) {
        const fun = map[key];
        if (isFun(fun)) {
            const funConfig = await toConfigAndFormat(fun);
            if (funConfig) newMap[key] = funConfig;
        } else if (isArray(fun)) {
            newMap[key] = fun.map(async item => {
                let res: any;
                if (isFun(item)) {
                    res = await toConfigAndFormat(item);
                } else if (isObj(item)) {
                    if (isFun(item.handler)) {
                        const funConfig = await toConfigAndFormat(item.handler);
                        if (funConfig) item.handler = funConfig;
                    }
                }
                return res || item;
            });
        } else if (isObj(fun)) {
            if (isFun(fun.handler)) {
                const funConfig = await toConfigAndFormat(fun.handler);
                if (funConfig) fun.handler = funConfig;
            }
        }
    }
    for (let key in newMap) {
        map[key] = newMap[key];
    }
}


export type  {
    NodePosition,
    TraverseVNode,
    TraverseRuntimeNode,
    RuntimeNodeToDesignNodeOps,
    TreeNode,
}

export {
    defineDesignBlock,
    defineComponentMeta,
    getAllTypes,
    getChildNodePosition,
    getMaterialMetaTabAllTypes,
    deepTraverseVNode,
    deepTraverseRuntimeNode,
    deepTraverseDesignNode,
    runtimeNodeToDesignNode,
    runtimeNodeToTreeNode,
    designNodeToJsonString,
    designNodeToJson5String,
    designNodeToJsString,
    formatDesignNodeFunction,
}
