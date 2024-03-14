<script setup lang="ts">
import { reactive } from "vue";
import { Collapse, CollapseItem, Search, TabItem, Tabs } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ComponentMetaTab } from "@/draggable/types/ComponentMeta";

// 定义组件选项
defineOptions({
    name: 'ComponentPane',
});

// 定义 Props 类型
interface ComponentPaneProps {
    /** 组件叶签信息 */
    tabs: Array<ComponentMetaTab>;
    /** 默认的叶签 */
    defTab?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ComponentPaneProps>(), {});
// state 属性
const state = reactive({
    // 活动的叶签
    activeTab: props.defTab ?? props.tabs[0]?.title,
    // 展开的组件分组
    expandGroups: [] as Array<string>,
});
props.tabs.forEach(tab => {
    tab.groups.forEach(group => {
        if (group.expand !== false) {
            state.expandGroups.push(group.title);
        }
    });
});
</script>

<template>
    <div class="component-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed" style="margin: 8px 12px 16px 12px; ">
            <div class="flex-item-fixed" style="font-size: 16px;font-weight: bold;">组件库</div>
            <div class="flex-item-fill"/>
            <div>
                <FontAwesomeIcon :icon="faTimes" class="component-panel-close"/>
            </div>
        </div>
        <div class="flex-row-container flex-center flex-item-fixed">
            <Search
                class="flex-item-fill"
                style="min-width: 130px;max-width: 240px;margin: 0 16px;"
                placeholder="搜索组件"
                :clearable="true"
            />
        </div>
        <Tabs
            class="flex-item-fill component-tabs flex-column-container"
            :separator="true"
            :active-name="state.activeTab"
        >
            <TabItem
                style="height: 100%;"
                v-for="tab in tabs"
                :key="tab.title"
                :lazy="false"
                :name="tab.title"
                :title="tab.title"
            >
                <Collapse class="component-groups" v-model="state.expandGroups">
                    <CollapseItem
                        v-for="group in tab.groups"
                        :name="group.title"
                        :title="group.title"
                    >
                    </CollapseItem>
                </Collapse>
            </TabItem>
        </Tabs>
    </div>
</template>

<style scoped>
.component-panel {
    height: 100%;
    width: 100%;
    user-select: none;
}

.component-panel-close {
    color: #666666;
    cursor: pointer;
}

.component-panel-close:hover {
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

.component-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
}

.component-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.component-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll .tiny-tabs__nav .tiny-tabs__item:last-child) {
    padding-right: 0;
}

.component-tabs :deep(.tiny-tabs__content) {
    margin: 0;
    flex-grow: 1;
}

.component-groups {
    height: 100%;
    overflow: auto;
    border-bottom: none;
}

.component-groups :deep(.tiny-collapse-item) {
    margin-top: 0;
    border-top: none;
    border-left: none;
    border-right: none;
}
</style>
