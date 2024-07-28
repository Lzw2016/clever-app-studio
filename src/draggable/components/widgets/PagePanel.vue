<script setup lang="ts">
import { reactive } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DesignerEngine } from "@/draggable/DesignerEngine";

// 定义组件选项
defineOptions({
    name: 'PagePanel',
});

// 定义 Props 类型
interface PagePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<PagePanelProps>(), {});

// 定义 State 类型
interface PagePanelState {

}

// state 属性
const state = reactive<PagePanelState>({});
// 内部数据
const data = {};

</script>

<template>
    <div class="page-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed page-panel-title">
            <div class="flex-item-fixed page-panel-title-name">功能页面</div>
            <div class="flex-item-fill"/>
            <div class="page-panel-close">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill">

        </div>
    </div>
</template>

<style scoped>
.page-panel {
    height: 100%;
    width: 100%;
    user-select: none;
}

.page-panel-title {
    background-color: #efefef;
    padding: 6px 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
}

.page-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.page-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
}

.page-panel-close:hover {
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
