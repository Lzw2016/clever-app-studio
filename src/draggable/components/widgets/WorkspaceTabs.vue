<script setup lang="ts">
import { reactive } from "vue";
import lodash from "lodash";
import Sortable from "sortablejs";
import { TabItem, Tabs } from "@opentiny/vue"


// 定义组件选项
defineOptions({
    name: 'WorkspaceTabs',
});

// 定义 Props 类型
interface WorkspaceTabsProps {
    a?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<WorkspaceTabsProps>(), {});
// state 属性
const state = reactive({
    // Tabs叶签拖拽配置
    dropConfig: {
        plugin: Sortable,
    },
    // 活动的叶签
    activeTab: "页面1",
    // 所有页面
    pages: [
        {
            title: "页面1",
            content: "内容1",
        },
        {
            title: "页面2",
            content: "内容2",
        },
        {
            title: "页面3",
            content: "内容3",
        },
    ],
});
// 内部数据
const data = {};

function closePage(name: string) {
    const closePage = state.pages.find(page => page.title === name);
    if (!closePage) return;
    lodash.pull(state.pages, closePage)
}
</script>

<template>
    <Tabs
        class="workspace-tabs"
        v-model="state.activeTab"
        tab-style="card"
        :drop-config="state.dropConfig"
        :with-close="true"
        @close="closePage"
    >
        <TabItem v-for="item in state.pages" :key="item.title" :name="item.title" :title="item.title">
            {{ item.content }}
            <div style="height: 1300px;"/>
        </TabItem>
    </Tabs>
</template>

<style scoped>
.workspace-tabs {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.workspace-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
}

.workspace-tabs :deep(.tiny-tabs__content) {
    overflow: auto;
    margin: 0;
    flex-grow: 1;
    padding: 2px 4px;
}
</style>
