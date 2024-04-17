<script setup lang="ts">
import { computed, reactive } from "vue";
import { Collapse, CollapseItem } from "@opentiny/vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import LayoutStyle from "@/draggable/components/widgets/style/LayoutStyle.vue";

// 定义组件选项
defineOptions({
    name: 'SetterStylePanel',
});

// 定义 Props 类型
interface SetterStylePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterStylePanelProps>(), {});

// 定义 State 类型
interface SetterStylePanelState {

}

// state 属性
const state = reactive<SetterStylePanelState>({});
// 内部数据
// const data = {};
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterState);


</script>

<template>
    <Collapse v-if="setterState" class="settings-groups" v-model="setterState.expandGroups['style']">
        <CollapseItem class="settings-items" name="布局" title="布局">
            <LayoutStyle/>
        </CollapseItem>
    </Collapse>
    <div v-else>

    </div>
</template>

<style scoped>
.settings-groups {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
    min-height: 80px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-groups :deep(.tiny-collapse-item) {
    margin-top: 0;
    border: none;
}

.settings-items :deep(.tiny-collapse-item__header) {
    background-color: #efefef;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.settings-items :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    padding: 8px 4px 8px 12px;
}

.settings-items:last-child :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    border-bottom: none;
}

.settings-items :deep(.tiny-form-item) {
    margin-bottom: 12px;
}

.settings-items :deep(.tiny-form-item:last-child) {
    margin-bottom: 0;
}

.settings-items :deep(.tiny-form-item .tiny-form-item__label) {
    font-size: 12px;
}
</style>
