<script setup lang="ts">
import { computed, reactive } from "vue";
import { Grid, GridColumn, Option, OptionGroup, Select } from '@opentiny/vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCode, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { EventGroup, EventInfo, EventPanel, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { ShowEventEditorDialogEvent } from "@/draggable/events/designer/ShowEventEditorDialogEvent";
import { RemoveListenerEvent } from "@/draggable/events/designer/RemoveListenerEvent";
import { AddListenerEvent } from "@/draggable/events/designer/AddListenerEvent";
import { addNodeListener, getAllListener, getEventGroups, getEventTitle } from "@/draggable/utils/EventUtils";

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
    /** 强制组件更新的响应式变量 */
    forceUpdateForEvent: number;
}

// state 属性
const state = reactive<SetterEventPanelState>({
    forceUpdateForEvent: 0,
});
// 内部数据
const data = {};
// 当前选择组件支持的事件分组
const eventGroups = computed<Array<EventGroup>>(() => {
    // 读取“响应式变量”值
    state.forceUpdateForEvent;
    return getEventGroups(props.eventPanel, props.designerState.selectNode);
});
// 所有的事件监听器
const allListener = computed<Array<ListenerInfo>>(() => {
    // 读取“响应式变量”值
    state.forceUpdateForEvent;
    return getAllListener(eventGroups.value, props.designerState.selectNode);
});

function showEventEditorDialog(listenerInfo: ListenerInfo) {
    const eventName = listenerInfo.eventName;
    const nodeId = props.designerState.selectNode?.id;
    props.designerState.events.showEventEditorDialog = new ShowEventEditorDialogEvent({
        nodeId,
        eventName,
    });
}

function removeListener(listenerInfo: ListenerInfo) {
    const node = props.designerState.selectNode;
    const blockInstance = props.designerState.blockInstance;
    if (!node || !blockInstance) return;
    blockInstance.ops.removeListener(node.ref, listenerInfo.eventName);
    props.designerState.events.removeListener = new RemoveListenerEvent({
        nodeId: node.id,
        eventName: listenerInfo.eventName,
    });
}

function addListener(eventInfo: EventInfo) {
    const node = props.designerState.selectNode;
    const blockInstance = props.designerState.blockInstance;
    if (!node || !blockInstance) return;
    addNodeListener(node.ref, eventInfo, blockInstance.ops);
    props.designerState.events.addListener = new AddListenerEvent({
        nodeId: node.id,
        eventInfo: eventInfo,
    });
}

function recalcAllListener() {
    state.forceUpdateForEvent++;
}

interface SetterEventPanelExpose {
    /** 当 RuntimeNode 事件发生变化时，重新计算 allListener、selectListener 等属性 */
    recalcAllListener(): void;
}

defineExpose<SetterEventPanelExpose>({
    recalcAllListener,
});
</script>

<template>
    <div class="event-panel flex-column-container" v-if="props.designerState.singleSelection && eventGroups.length>0">
        <div class="event-tools flex-item-fixed">
            <Select
                popper-class="unmax-height"
                :filterable="false"
                :top-create="false"
                :is-drop-inherit-width="true"
                :drop-style="{
                    height: '500px',
                    'min-height': '500px'
                }"
            >
                <template #reference>
                    <div class="event-add">新增事件</div>
                </template>
                <OptionGroup v-for="group in eventGroups" :key="group.title" :label="group.title" :disabled="group.disabled ?? false">
                    <Option v-for="item in group.items" :key="item.name" :value="item.name" :disabled="item.disabled ?? false" @click="addListener(item)">
                        <div class="event-title">
                            {{ item.name }}-{{ item.title }}
                        </div>
                        <!-- {{ item.disabled ? '(已监听)' : '' }} -->
                    </Option>
                </OptionGroup>
            </Select>
        </div>
        <div class="event-binds flex-item-fill">
            <Grid
                height="auto"
                :resizable="false"
                :fit="true"
                :auto-resize="true"
                :stripe="true"
                :border="false"
                size="mini"
                :data="allListener"
            >
                <GridColumn type="index" title="#" :width="30"/>
                <GridColumn field="event" title="已绑定事件" width="auto">
                    <template #default="data">
                        <div class="event-bind-title">
                            {{ getEventTitle(data.row) }}
                        </div>
                        <span class="event-binds-name" @click="showEventEditorDialog(data.row)">
                            {{ data.row.funInfo?.name ?? '[anonymous]' }}
                        </span>
                    </template>
                </GridColumn>
                <GridColumn field="action" title="操作" :width="65" :align="'center'">
                    <template #default="data">
                        <span class="event-binds-action" title="编辑代码" @click="showEventEditorDialog(data.row)">
                            <FontAwesomeIcon :icon="faCode"/>
                        </span>
                        <span class="event-binds-action" title="删除" @click="removeListener(data.row)">
                            <FontAwesomeIcon :icon="faTrashCan"/>
                        </span>
                    </template>
                </GridColumn>
            </Grid>
        </div>
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

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: auto;
}

.flex-item-fixed {
    flex-shrink: 0;
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
    overflow: hidden;
    box-sizing: border-box;
    border-top: 1px solid #dfe1e6;
}

.event-binds-name {
    color: #1476ff;
    cursor: pointer;
}

.event-bind-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.event-binds-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: 4px;
    color: #252b3a;
    cursor: pointer;
}

.event-binds-action:hover {
    color: #5E7CE0;
}

.event-binds-action:last-child {
    margin-right: 0;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */
.event-modal :deep(.tiny-modal__box .tiny-modal__body .tiny-modal__content) {
    padding: 8px 0 16px 0;
}
</style>
