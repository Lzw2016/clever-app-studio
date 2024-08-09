<script setup lang="ts">
import { reactive } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DesignerEngine } from "@/draggable/DesignerEngine";

// 定义组件选项
defineOptions({
    name: 'HistoryPanel',
});

// 自定义事件类型
const emit = defineEmits<{
    /** 关闭当前面板 */
    closePanel: [];
}>();

// 定义 Props 类型
interface HistoryPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<HistoryPanelProps>(), {});

// 定义 State 类型
interface HistoryPanelState {

}

// state 属性
const state = reactive<HistoryPanelState>({});
// 内部数据
const data = {};

function closePanel() {
    emit("closePanel");
}
</script>

<template>
    <div class="history-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed history-panel-title">
            <div class="flex-item-fixed history-panel-title-name">修改历史</div>
            <div class="flex-item-fill"/>
            <div class="history-panel-close" @click="closePanel">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill">

        </div>
    </div>
</template>

<style scoped>
.history-panel {
    height: 100%;
    width: 100%;
}

.history-panel-title {
    background-color: #efefef;
    padding: 6px 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
}

.history-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.history-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
}

.history-panel-close:hover {
    color: #333333;
}

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.flex-item-fixed {
    flex-shrink: 0;
}
</style>
