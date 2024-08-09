<script setup lang="ts">
import { computed, reactive } from "vue";
import { Collapse, CollapseItem, Loading, Notify, Search, TabItem, Tabs } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ComponentMeta, ComponentMetaTab, MaterialMetaTab } from "@/draggable/types/ComponentMeta";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { getComponentIcon } from "@/draggable/utils/ComponentMetaUtils";
import { getMaterialMetaTabAllTypes } from "@/draggable/utils/DesignerUtils";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'MaterialPanel',
});

// 自定义事件类型
const emit = defineEmits<{
    /** 关闭当前面板 */
    closePanel: [];
}>();

// 定义 Props 类型
interface ComponentPaneProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 组件叶签信息 */
    tabs: Array<MaterialMetaTab>;
    /** 默认的叶签 */
    defTab?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ComponentPaneProps>(), {});
// state 属性
const state = reactive({
    /** 所有的组件及其元数据是否已经加载 */
    allTypesLoaded: false,
    // 活动的叶签
    activeTab: props.defTab ?? props.tabs[0]?.title,
    // 展开的组件分组
    expandGroups: getAllExpandTitles(props.tabs),
});
// 内部数据
const data = {
    allTypes: getAllTypes(),
};
// 组件元信息
const componentMetaTabs = computed<Array<ComponentMetaTab>>(() => {
    if (state.allTypesLoaded) {
        return filterEmptyTabs(props.tabs);
    }
    return [];
});
// 加载所有的组件及其元数据
loadAllTypes(data.allTypes);

// 获取所有的物料组件类型
function getAllTypes() {
    const allTypes: Array<string> = [];
    for (let tab of props.tabs) {
        const types = getMaterialMetaTabAllTypes(tab);
        for (let type of types) {
            if (allTypes.includes(type)) continue;
            allTypes.push(type);
        }
    }
    return allTypes;
}

// 加载所有的组件及其元数据
function loadAllTypes(allTypes: Array<string>) {
    Promise.all([
        props.designerEngine.componentManage.loadAsyncComponentMeta(allTypes),
        props.designerEngine.componentManage.loadAsyncComponent(allTypes.filter(type => !isHtmlTag(type))),
    ]).catch(reason => {
        Notify({ type: 'error', position: 'top-right', title: "加载元数据失败", message: `加载组件元数据失败：${reason}` });
        console.error(reason);
    }).finally(() => state.allTypesLoaded = true);
}

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
function filterEmptyTabs(tabs: Array<MaterialMetaTab>): Array<ComponentMetaTab> {
    const componentManage = props.designerEngine.componentManage;
    const newTabs: Array<ComponentMetaTab> = [];
    for (let tab of tabs) {
        if (tab.groups.length <= 0) continue;
        const newTab: ComponentMetaTab = { ...tab, groups: [] };
        for (let group of tab.groups) {
            const metas: Array<ComponentMeta> = [];
            group.types.map(type => componentManage.getComponentMeta(type)).forEach(meta => {
                if (meta) metas.push(meta);
            });
            const types = metas.map(meta => meta.type);
            if (types.length > 0) newTab.groups.push({ ...group, types: types, metas: metas });
        }
        if (tab.groups.length > 0) newTabs.push(newTab);
    }
    return newTabs;
}

function closePanel() {
    emit("closePanel");
}
</script>

<template>
    <div class="material-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed material-panel-title">
            <div class="flex-item-fixed material-panel-title-name">组件物料</div>
            <div class="flex-item-fill"/>
            <div class="material-panel-close" @click="closePanel">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
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
            v-loading="!state.allTypesLoaded"
            tiny-loading__text="加载中..."
            tiny-loading__background="rgba(0, 0, 0, 0.25)"
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
                            v-for="meta in group.metas"
                            :title="`${meta.name}(${meta.type})`"
                            :data-component-type="meta.type"
                        >
                            <div class="material-item-icon flex-item-fixed">
                                <component :is="getComponentIcon(meta.icon, props.designerEngine.componentManage)"/>
                            </div>
                            <div class="material-item-name flex-item-fill">
                                {{ meta.name }}
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
    padding: 6px 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
}

.material-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.material-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
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

.material-items:last-child :deep(.tiny-collapse-item__content) {
    border-bottom: none;
}

.material-item {
    box-sizing: border-box;
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
    border: 1px solid #dedede;
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
    margin-right: 2px;
    width: 24px;
}

.material-item-name {
    display: flex;
    align-items: center;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
