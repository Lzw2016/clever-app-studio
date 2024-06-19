<script setup lang="ts">
import { computed, reactive } from "vue";
import { Grid, GridColumn, Option, OptionGroup, Select } from '@opentiny/vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCode, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { EventGroup, EventPanel } from "@/draggable/types/ComponentMeta";
import { innerEvents } from "@/draggable/Constant";

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

const eventGroups = computed<Array<EventGroup>>(() => {
    const events = (props.eventPanel.groups ? [...props.eventPanel.groups] : []);
    events.push(...innerEvents);
    return events;
});

function getEventTitle(event) {
    // event
}

function getEventGroups(eventPanel: EventPanel): Array<EventGroup> {
    return [];
}
</script>

<template>
    <div class="event-panel" v-if="eventGroups.length>0">
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
            :data="[
                {event: 'a'},
                {event: 'b'},
                {event: 'c'},
                {event: 'c'},
                {event: 'c'},
                {event: 'c'},
                {event: 'c'},
            ]"
        >
            <GridColumn type="index" title="#" :width="30"/>
            <GridColumn field="event" title="已绑定事件" width="auto">
                <template #default="data">
                    <!--{{data.row.event}}={{data.row.event}}-->
                    <div>
                        click-鼠标单击事件
                    </div>
                    <div class="event-binds-name">
                        setAlignItems
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
    <div v-else class="event-panel-none">
        组件未配置事件
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
