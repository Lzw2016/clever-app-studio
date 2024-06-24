<script setup lang="ts">
import { computed, reactive } from "vue";
import { Grid, GridColumn, Option, OptionGroup, Select } from '@opentiny/vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCode, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { innerEvents } from "@/draggable/Constant";
import { toElementEventName } from "@/draggable/utils/HtmlTag";
import { parseFun } from "@/draggable/utils/Utils";
import { EventGroup, EventInfo, EventPanel, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";

// 定义组件选项
defineOptions({
    name: 'SetterEventPanel',
});

// 定义 Props 类型
interface SetterEventPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 事件设置器面板 */
    eventPanel: EventPanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterEventPanelProps>(), {});

// 定义 State 类型
interface SetterEventPanelState {
    value1?: string;
}

// state 属性
const state = reactive<SetterEventPanelState>({
    value1: undefined,
});
// 内部数据
const data = {};
// 当前选择组件支持的事件分组
const eventGroups = computed<Array<EventGroup>>(() => getEventGroups(props.eventPanel));
// 所有的事件监听器
const allListener = computed<Array<ListenerInfo>>(() => getAllListener(eventGroups.value, props.designerState.selectNode));

function getEventTitle(event) {
    // event
}

function getEventGroups(eventPanel: EventPanel): Array<EventGroup> {
    const array: Array<EventGroup> = [];
    // 获取所有的事件
    if (eventPanel.groups) array.push(...eventPanel.groups);
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
        const group: EventGroup = { ...innerEvent, items: [] };
        for (let item of innerEvent.items) {
            if (!allName.has(item.name)) group.items.push(item);
        }
        if (group.items.length > 0) {
            array.push(group);
        }
    }
    // 已经监听了的事件，设置成禁用状态

    return array;
}

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
        };
        array.push(listenerInfo);
    }
    return array;
}

function getAllEventName(groups: Array<EventGroup>): Set<string> {
    const allName = new Set<string>();
    for (let group of groups) {
        for (let item of group.items) {
            allName.add(item.name);
        }
    }
    return allName;
}
</script>

<template>
    <div class="event-panel" v-if="props.designerState.singleSelection && eventGroups.length>0">
        <div class="event-tools">
            <Select
                :filterable="false"
                :top-create="false"
                :is-drop-inherit-width="true"
                :drop-style="{
                    height: '500px',
                    'min-height': '500px',
                }"
            >
                <template #reference>
                    <div class="event-add">新增事件</div>
                </template>
                <OptionGroup v-for="group in eventGroups" :key="group.title" :label="group.title" :disabled="group.disabled ?? false">
                    <Option v-for="item in group.items" :key="item.name" :value="item.name" :disabled="item.disabled ?? false">
                        <div class="event-title">
                            {{ item.name }}-{{ item.title }}
                        </div>
                    </Option>
                </OptionGroup>
            </Select>
        </div>
        <Grid
            class="event-binds"
            :resizable="false"
            :fit="true"
            :auto-resize="true"
            :stripe="true"
            :border="true"
            size="mini"
            :data="allListener"
        >
            <GridColumn type="index" title="#" :width="30"/>
            <GridColumn field="event" title="已绑定事件" width="auto">
                <template #default="data">
                    <div>
                        {{ data.row.eventName }}-{{ data.row.funMeta?.title }}
                    </div>
                    <div class="event-binds-name">
                        {{ data.row.funInfo?.name }}
                    </div>
                </template>
            </GridColumn>
            <GridColumn field="action" title="操作" :width="65" :align="'center'">
                <template #default="data">
                    <span class="event-binds-action" title="编辑代码">
                        <FontAwesomeIcon :icon="faCode"/>
                    </span>
                    <span class="event-binds-action" title="删除">
                        <FontAwesomeIcon :icon="faTrashCan"/>
                    </span>
                </template>
            </GridColumn>
        </Grid>
    </div>
    <div class="event-panel-none" v-else-if="eventGroups.length<=0">
        组件未配置事件
    </div>
    <div class="event-panel-none" v-else>
        已选中多个节点
    </div>
</template>

<style scoped>
.event-panel {
    width: 100%;
    height: 100%;
}

.event-panel-none {
    width: 100%;
    height: 100%;
    margin-top: 32px;
    text-align: center;
}

.event-tools {
    margin: 12px 8px 16px 8px;
}

.event-add {
    border: 1px dashed #181818;
    padding: 4px 8px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
}

.event-add:hover {
    border-color: #5E7CE0;
    color: #5E7CE0;
}

.event-title {
    max-width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.event-binds {
    padding: 0 4px 8px 4px;
}

.event-binds-name {
    color: #1476ff;
    cursor: pointer;
}

.event-binds-action {
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 8px;
}

.event-binds-action:hover {
    color: #5E7CE0;
}

.event-binds-action:last-child {
    margin-right: 0;
}
</style>
