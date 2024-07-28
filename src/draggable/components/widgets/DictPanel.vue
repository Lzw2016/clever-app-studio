<script setup lang="ts">
import { reactive } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DesignerEngine } from "@/draggable/DesignerEngine";

// 定义组件选项
defineOptions({
    name: 'DictPanel',
});

// 定义 Props 类型
interface DictPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<DictPanelProps>(), {});

// 定义 State 类型
interface DictPanelState {

}

// state 属性
const state = reactive<DictPanelState>({});
// 内部数据
const data = {};

</script>

<template>
    <div class="dict-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed dict-panel-title">
            <div class="flex-item-fixed dict-panel-title-name">数据字典</div>
            <div class="flex-item-fill"/>
            <div class="dict-panel-close">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill">

        </div>
    </div>
</template>

<style scoped>
.dict-panel {
    height: 100%;
    width: 100%;
    user-select: none;
}

.dict-panel-title {
    background-color: #efefef;
    padding: 6px 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
}

.dict-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.dict-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
}

.dict-panel-close:hover {
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
