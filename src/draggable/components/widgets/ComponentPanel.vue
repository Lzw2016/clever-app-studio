<script setup lang="ts">
import { computed, reactive } from "vue";
import { Collapse, CollapseItem, Search, TabItem, Tabs } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
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
    expandGroups: getAllExpandTitles(props.tabs),
});
// 内部数据
const data = {};
// 组件元信息
const componentMetaTabs = computed(() => filterEmptyTabs(props.tabs));


// 获取所有展开的 group title
function getAllExpandTitles(tabs: Array<ComponentMetaTab>): Record<string, Array<string>> {
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
function filterEmptyTabs(tabs: Array<ComponentMetaTab>): Array<ComponentMetaTab> {
    const newTabs: Array<ComponentMetaTab> = [];
    tabs.forEach(tab => {
        if (tab.groups.length <= 0) return;
        const newTab: ComponentMetaTab = { ...tab, groups: [] };
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
                v-for="tab in componentMetaTabs"
                :key="tab.title"
                :lazy="false"
                :name="tab.title"
                :title="tab.title"
            >
                <Collapse class="component-groups" v-model="state.expandGroups[tab.title]">
                    <CollapseItem
                        class="component-items"
                        v-for="group in tab.groups"
                        :name="group.title"
                        :title="group.title"
                    >
                        <div
                            class="component-item"
                            v-for="item in group.items"
                            :title="`${item.name}(${item.type})`"
                        >
                            <div class="component-item-icon flex-item-fixed">
                                <FontAwesomeIcon :icon="faCalendarPlus" fixed-width/>
                            </div>
                            <div class="component-item-name flex-item-fill">
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
    border: none;
}

.component-items :deep(.tiny-collapse-item__header) {
    background-color: #efefef;
    border-radius: 0;
    border: none;
    /*border-right: 1px solid #d9d9d9;*/
    border-bottom: 1px solid #d9d9d9;
}

.component-items :deep(.tiny-collapse-item__content) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.component-item {
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

.component-item:hover {
    border-color: #409eff;
}

.component-item-icon {
    font-size: 18px;
    color: #303133;
    margin-right: 5px;
}

.component-item-name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
