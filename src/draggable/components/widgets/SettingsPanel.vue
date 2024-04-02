<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { Collapse, CollapseItem, TabItem, Tabs } from "@opentiny/vue";
import { IconX } from "@tabler/icons-vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

// 定义组件选项
defineOptions({
    name: 'SettingsPanel',
});

// 定义 Props 类型
interface SettingsPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SettingsPanelProps>(), {});
// state 属性
const state = reactive({});
// 内部数据
const data = {
    setterTabs: {
        props: "属性",
        events: "事件",
        style: "样式",
        advanced: "高级",
    },
};
// 当前活动的设计器状态数据
const designerState = computed(() => props.designerEngine.activeDesignerState);
// 当前选中的 ComponentMeta
const selectedComponentMeta = computed(() => {
    const meta = designerState.value?.selectedComponentMeta;
    if (meta) return filterEmptyMeta(meta);
});
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterState);
// 重新计算expandGroups(展开的组件分组)
watch(() => selectedComponentMeta.value, () => setterState.value?.recalcExpandGroups());

// 过滤所有空 props events style advanced 中的 items
function filterEmptyMeta(meta: ComponentMeta): ComponentMeta {
    const newMeta = { ...meta };
    if (meta.setter.props && newMeta.setter.props) newMeta.setter.props.groups = meta.setter.props.groups.filter(group => group.items.length > 0);
    if (meta.setter.events && newMeta.setter.events) newMeta.setter.events.groups = meta.setter.events.groups.filter(group => group.items.length > 0);
    if (meta.setter.style && newMeta.setter.style) newMeta.setter.style.groups = meta.setter.style.groups.filter(group => group.items.length > 0);
    if (meta.setter.advanced && newMeta.setter.advanced) newMeta.setter.advanced.groups = meta.setter.advanced.groups.filter(group => group.items.length > 0);
    return meta;
}
</script>

<template>
    <div class="settings-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed settings-panel-title">
            <div class="flex-item-fixed settings-panel-title-name">组件配置</div>
            <div class="flex-item-fill"/>
            <div class="settings-panel-close">
                <IconX :size="18"/>
            </div>
        </div>
        <div v-if="!selectedComponentMeta" class="settings-panel flex-column-container">
            <div class="flex-item-fill settings-panel-empty">请在左侧画布选中节点</div>
        </div>
        <div v-if="selectedComponentMeta" class="flex-row-container flex-center flex-item-fixed">
        </div>
        <Tabs
            v-if="selectedComponentMeta && setterState"
            class="flex-item-fill settings-tabs flex-column-container"
            :active-name="setterState.activeTab"
            tab-style="button-card"
        >
            <TabItem
                style="height: 100%;"
                v-for="(setter, name) in selectedComponentMeta.setter"
                :key="name"
                :lazy="false"
                :name="name"
                :title="setter?.title || data.setterTabs[name] || name"
            >
                <Collapse v-if="setter" class="settings-groups" v-model="setterState.expandGroups[name]">
                    <CollapseItem
                        class="settings-items"
                        v-for="group in setter.groups"
                        :name="group.title"
                        :title="group.title"
                    >
                        <div class="settings-item flex-item-fixed" v-for="item in group.items">
                        </div>
                    </CollapseItem>
                </Collapse>
            </TabItem>
        </Tabs>
    </div>
</template>

<style scoped>
.settings-panel {
    height: 100%;
    width: 100%;
}

.settings-panel-empty {
    text-align: center;
    margin-top: 48px;
    font-size: 12px;
    color: #808080;
}

.settings-panel-title {
    background-color: #efefef;
    padding: 8px 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e1e1;
}

.settings-panel-title-name {
    font-size: 16px;
    font-weight: bold;
}

.settings-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
}

.settings-panel-close:hover {
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

.flex-center {
    align-items: center;
    justify-content: center;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
    margin-bottom: 16px;
}

.settings-tabs :deep(.tiny-tabs__nav .tiny-tabs__item .tiny-tabs__item__title) {
    padding: 0 12px;
}

.settings-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.settings-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll .tiny-tabs__nav .tiny-tabs__item:last-child) {
    padding-right: 0;
}

.settings-tabs :deep(.tiny-tabs__content) {
    margin: 0;
    flex-grow: 1;
    border-top: 1px solid #d9d9d9;
}

.settings-groups {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
}

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

.settings-items :deep(.tiny-collapse-item__content) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.settings-items:last-child :deep(.tiny-collapse-item__content) {
    border-bottom: none;
}

.settings-item {
    height: 32px;
}
</style>
