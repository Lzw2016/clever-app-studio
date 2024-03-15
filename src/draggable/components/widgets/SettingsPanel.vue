<script setup lang="ts">
import { computed, reactive } from "vue";
import { Collapse, CollapseItem, TabItem, Tabs } from "@opentiny/vue";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ComponentMeta, SetterGroup } from "@/draggable/types/ComponentMeta";
// 定义组件选项
defineOptions({
    name: 'SettingsPanel',
});

// 定义 Props 类型
interface SettingsPanelProps {
    /** 组件元信息 */
    componentMeta: ComponentMeta;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SettingsPanelProps>(), {});
// state 属性
const state = reactive({
    // 活动的叶签
    activeTab: "props",
    // 展开的组件分组
    expandGroups: getAllExpandTitles(props.componentMeta),
});
// 内部数据
const data = {
    setterTabs: {
        props: "属性",
        events: "事件",
        style: "样式",
        advanced: "高级",
    },
};
const componentMeta = computed(() => filterEmptyMeta(props.componentMeta))

// 获取所有展开的 group title
function getAllExpandTitles(meta: ComponentMeta): Record<string, Array<string>> {
    const expandGroups: Record<string, Array<string>> = {};
    const getExpands = (groups: Array<SetterGroup>) => {
        const expands: Array<string> = [];
        groups.forEach(group => {
            if (group.expand !== false) {
                expands.push(group.title);
            }
        });
        return expands;
    };
    expandGroups.props = getExpands(meta.setter.props.groups);
    expandGroups.events = getExpands(meta.setter.events.groups);
    expandGroups.style = getExpands(meta.setter.style.groups);
    expandGroups.advanced = getExpands(meta.setter.advanced.groups);
    return expandGroups;
}

// 过滤所有空 props events style advanced 中的 items
function filterEmptyMeta(meta: ComponentMeta): ComponentMeta {
    const newMeta = { ...meta };
    newMeta.setter.props.groups = meta.setter.props.groups.filter(group => group.items.length > 0);
    newMeta.setter.events.groups = meta.setter.events.groups.filter(group => group.items.length > 0);
    newMeta.setter.style.groups = meta.setter.style.groups.filter(group => group.items.length > 0);
    newMeta.setter.advanced.groups = meta.setter.advanced.groups.filter(group => group.items.length > 0);
    return meta;
}
</script>

<template>
    <div class="component-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed component-panel-title">
            <div class="flex-item-fixed component-panel-title-name">组件配置</div>
            <div class="flex-item-fill"/>
            <div>
                <FontAwesomeIcon :icon="faTimes" class="component-panel-close"/>
            </div>
        </div>
        <div class="flex-row-container flex-center flex-item-fixed">
        </div>
        <Tabs
            class="flex-item-fill component-tabs flex-column-container"
            :active-name="state.activeTab"
            tab-style="button-card"
        >
            <TabItem
                style="height: 100%;"
                v-for="(setter, name) in componentMeta.setter"
                :key="name"
                :lazy="false"
                :name="name"
                :title="setter.title || data.setterTabs[name]"
            >
                <Collapse class="component-groups" v-model="state.expandGroups[name]">
                    <CollapseItem
                        class="component-items"
                        v-for="group in setter.groups"
                        :name="group.title"
                        :title="group.title"
                    >
                        <div class="component-item flex-item-fixed" v-for="item in group.items">
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

.component-panel-title {
    background-color: #efefef;
    padding: 8px 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e1e1;
}

.component-panel-title-name {
    font-size: 16px;
    font-weight: bold;
}

.component-panel-close {
    color: #666666;
    cursor: pointer;
    font-weight: normal;
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
    margin-bottom: 16px;
}

.component-tabs :deep(.tiny-tabs__nav .tiny-tabs__item .tiny-tabs__item__title) {
    padding: 0 12px;
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
    border-top: none;
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
    border-bottom: 1px solid #d9d9d9;
}

.component-items :deep(.tiny-collapse-item__content) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.component-item {
    height: 32px;
}
</style>
