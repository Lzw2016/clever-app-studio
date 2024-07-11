import lodash from "lodash";
import { innerEvents } from "@/draggable/Constant";
import { toElementEventName } from "@/draggable/utils/HtmlTag";
import { parseFun } from "@/draggable/utils/FunctionUtils";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { ComponentMeta, EventGroup, EventInfo, EventPanel, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { ComponentManage } from "@/draggable/types/ComponentManage";

/** 获取当前渲染节点支持的事件 */
function getEventGroups(eventPanel: EventPanel, node?: RuntimeNode): Array<EventGroup> {
    const array: Array<EventGroup> = [];
    // 获取所有的事件
    if (eventPanel.groups) array.push(...lodash.cloneDeep(eventPanel.groups));
    const allName = getAllEventName(array);
    const { includeInnerEvents, excludeInnerEvents } = eventPanel;
    let innerGroup: Array<string> = [];
    if (includeInnerEvents === true) {
        innerGroup = innerEvents.map(group => group.title);
    } else if (includeInnerEvents) {
        innerGroup = [...includeInnerEvents];
    }
    if (excludeInnerEvents) {
        innerGroup = innerGroup.filter(group => !excludeInnerEvents.includes(group));
    }
    for (let innerEvent of innerEvents) {
        if (!innerGroup.includes(innerEvent.title)) continue;
        const { title, disabled } = innerEvent;
        const group: EventGroup = { title, disabled, items: [] };
        for (let item of innerEvent.items) {
            if (!allName.has(item.name)) group.items.push(lodash.cloneDeep(item));
        }
        if (group.items.length > 0) {
            array.push(group);
        }
    }
    // 已经监听了的事件，设置成禁用状态
    if (node?.listeners) {
        const listenerEvents: Array<string> = [];
        for (let eventName in node.listeners) {
            listenerEvents.push(toElementEventName(eventName));
        }
        for (let listenerEvent of listenerEvents) {
            array.forEach(group => group.items.forEach(item => {
                item.disabled = listenerEvents.includes(item.name);
            }));
        }
    }
    return array;
}

/** 获取当前渲染节点所有监听的事件 */
function getAllListener(eventGroups: Array<EventGroup>, node?: RuntimeNode): Array<ListenerInfo> {
    if (!node) return [];
    const eventMap = new Map<string, EventInfo>();
    eventGroups.forEach(group => group.items.forEach(item => eventMap.set(item.name, item)));
    const array: Array<ListenerInfo> = [];
    for (let eventName in node.listeners) {
        const listener = node.listeners[eventName];
        if (!listener) continue;
        eventName = toElementEventName(eventName);
        const listenerInfo: ListenerInfo = {
            eventName: eventName,
            funInfo: parseFun(listener.handler),
            modifiers: listener.modifiers,
            funMeta: eventMap.get(eventName),
            rawListener: listener,
        };
        array.push(listenerInfo);
    }
    return array;
}

/** 获取所有的事件名称 */
function getAllEventName(groups: Array<EventGroup>): Set<string> {
    const allName = new Set<string>();
    for (let group of groups) {
        for (let item of group.items) {
            allName.add(item.name);
        }
    }
    return allName;
}

/** 获取 RuntimeNode 对应的 ComponentMeta */
function getNodeComponentMeta(componentManage: ComponentManage, node?: RuntimeNode): ComponentMeta | undefined {
    if (!node) return;
    return componentManage.getComponentMeta(node.type);
}

function getEventTitle(item: ListenerInfo) {
    if (!item.funMeta?.title) return item.eventName;
    return `${item.eventName}-${item.funMeta.title}`;
}

export {
    getEventGroups,
    getAllListener,
    getAllEventName,
    getNodeComponentMeta,
    getEventTitle,
}
