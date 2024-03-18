<script setup lang="ts">
import { computed, reactive } from "vue";
import { Collapse, CollapseItem, Search, TabItem, Tabs } from "@opentiny/vue";
import { IconCalendarPlus, IconX } from "@tabler/icons-vue";
import { MaterialMetaTab } from "@/draggable/types/ComponentMeta";

// 定义组件选项
defineOptions({
    name: 'MaterialPanel',
});

// 定义 Props 类型
interface ComponentPaneProps {
    /** 组件叶签信息 */
    tabs: Array<MaterialMetaTab>;
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
    expandGroups: getAllExpandTitles(props.tabs),
});
// 内部数据
const data = {};
// 组件元信息
const componentMetaTabs = computed(() => filterEmptyTabs(props.tabs));

// 获取所有展开的 group title
function getAllExpandTitles(tabs: Array<MaterialMetaTab>): Record<string, Array<string>> {
    const expandGroups: Record<string, Array<string>> = {};
    tabs.forEach(tab => {
        expandGroups[tab.title] = [];
        tab.groups.forEach(group => {
            if (group.expand !== false) {
                expandGroups[tab.title].push(group.title);
            }
        });
    });
    return expandGroups;
}

// 过滤所有空 groups 和 items
function filterEmptyTabs(tabs: Array<MaterialMetaTab>): Array<MaterialMetaTab> {
    const newTabs: Array<MaterialMetaTab> = [];
    tabs.forEach(tab => {
        if (tab.groups.length <= 0) return;
        const newTab: MaterialMetaTab = { ...tab, groups: [] };
        tab.groups.forEach(group => {
            if (group.items.length <= 0) return;
            newTab.groups.push(group);
        });
        newTabs.push(newTab);
    });
    return newTabs;
}
</script>

<template>
    <div class="material-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed material-panel-title">
            <div class="flex-item-fixed material-panel-title-name">组件库</div>
            <div class="flex-item-fill"/>
            <div class="material-panel-close">
                <IconX :size="18"/>
            </div>
        </div>
        <div class="flex-row-container flex-center flex-item-fixed" style="margin-bottom: 4px;">
            <Search
                class="flex-item-fill"
                style="min-width: 130px;max-width: 240px;margin: 0 16px;"
                placeholder="搜索组件"
                :clearable="true"
            />
        </div>
        <Tabs
            class="flex-item-fill material-tabs flex-column-container"
            :separator="true"
            :active-name="state.activeTab"
        >
            <TabItem
                style="height: 100%;"
                v-for="tab in componentMetaTabs"
                :key="tab.title"
                :lazy="false"
                :name="tab.title"
                :title="tab.title"
            >
                <Collapse class="material-groups" v-model="state.expandGroups[tab.title]">
                    <CollapseItem
                        class="material-items"
                        v-for="group in tab.groups"
                        :name="group.title"
                        :title="group.title"
                    >
                        <div
                            class="material-item draggable"
                            v-for="item in group.items"
                            :title="`${item.name}(${item.type})`"
                            :data-component-type="item.type"
                        >
                            <div class="material-item-icon flex-item-fixed">
                                <IconCalendarPlus :size="20"/>
                            </div>
                            <div class="material-item-name flex-item-fill">
                                {{ item.name }}
                            </div>
                        </div>
                    </CollapseItem>
                </Collapse>
            </TabItem>
        </Tabs>
    </div>
</template>

<style scoped>
.material-panel {
    height: 100%;
    width: 100%;
    user-select: none;
}

.material-panel-title {
    background-color: #efefef;
    padding: 8px 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e1e1;
}

.material-panel-title-name {
    font-size: 16px;
    font-weight: bold;
}

.material-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
}

.material-panel-close:hover {
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

.material-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
}

.material-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.material-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll .tiny-tabs__nav .tiny-tabs__item:last-child) {
    padding-right: 0;
}

.material-tabs :deep(.tiny-tabs__content) {
    margin: 0;
    flex-grow: 1;
}

.material-groups {
    height: 100%;
    overflow: auto;
    border-bottom: none;
}

.material-groups :deep(.tiny-collapse-item) {
    margin-top: 0;
    border: none;
}

.material-items :deep(.tiny-collapse-item__header) {
    background-color: #efefef;
    border-radius: 0;
    border: none;
    /*border-right: 1px solid #d9d9d9;*/
    border-bottom: 1px solid #d9d9d9;
}

.material-items :deep(.tiny-collapse-item__content) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.material-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    height: 32px;
    width: calc(50% - 8px);
    min-width: 60px;
    margin: 6px 4px;
    padding: 4px 8px;
    border: 1px solid #edeef0;
    cursor: move;
    transition: box-shadow .2s ease;
}

.material-item:hover {
    border-color: #409eff;
}

.material-item-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #303133;
    margin-right: 5px;
}

.material-item-name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
