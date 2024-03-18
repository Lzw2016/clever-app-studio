<script setup lang="ts">
import lodash from "lodash";
import { markRaw, onMounted, reactive, watch } from "vue";
import { RouteComponent, RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router";
import { Notify, TabItem, Tabs } from "@opentiny/vue"
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import Sortable from "sortablejs";
import { isAsyncFunction } from "@/utils/Typeof";
import PageNotFound from "@/components/PageNotFound.vue";
import PageLoadError from "@/components/PageLoadError.vue";
import { LoadDesignPageMate } from "@/draggable/types/DesignBlock";

// 定义组件选项
defineOptions({
    name: 'WorkspaceTabs',
});

// 定义 Props 类型
interface WorkspaceTabsProps {
    a?: string;
}

interface PageInfo {
    /** 页面路径 */
    path: string;
    /** 页面标题 */
    title: string;
    /** 页面加载状态 */
    loading: boolean;
    /** 最后打开时间 */
    lastActiveTime: number;
    /** 页面组件 */
    component: RouteComponent;
    /** 页面组件属性 */
    props: Record<string, any>;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<WorkspaceTabsProps>(), {});
// state 属性
const state = reactive({
    // 活动的叶签 <path>
    activeTab: "",
    // 所有页面 Map<path, PageInfo>
    pages: new Map<string, PageInfo>(),
});
// 内部数据
const data = {
    // 欢迎页路由名称
    welcomeRoute: 'WelcomePanel',
};
// 当前命中的路由
const route = useRoute();
// 路由控制对象
const router = useRouter();

onMounted(() => {
    showMatchedPage(route);
});
watch(route, newRoute => {
    showMatchedPage(newRoute);
});

// 显示当前匹配的页面(如果是新页面就加载显示)
function showMatchedPage(route: RouteLocationNormalizedLoaded) {
    if (route.matched.length !== 2) return;
    const matched = route.matched[1];
    const { name, components, meta } = matched;
    // 如果第一次打开欢迎页面
    if (name === data.welcomeRoute && state.pages.size <= 0) return;
    const path = route.fullPath;
    state.activeTab = path;
    // 页面已经打开过了
    const page = state.pages.get(path);
    if (page) {
        page.lastActiveTime = Date.now();
        return;
    }
    const component = components?.default;
    if (!component) {
        Notify({ type: 'error', position: 'top-right', title: "页面不存在", message: `不存在的路径: ${path}` });
        return;
    }
    const pageInfo: PageInfo = {
        path: path,
        title: `${meta.title ?? ''}`,
        loading: false,
        lastActiveTime: Date.now(),
        component: markRaw(component),
        props: {
            path: path,
            routeParams: route.params,
        },
    };
    // 加载 DesignerPanel 页面内容
    if (isAsyncFunction(meta.loader)) {
        pageInfo.loading = true;
        const loader: LoadDesignPageMate = meta.loader;
        loader(route.params).then(designPageMate => {
            if (!designPageMate) {
                setPageNotFound(path);
                return;
            }
            const existsPage = state.pages.get(path);
            if (!existsPage) return;
            existsPage.title = designPageMate.title;
            existsPage.loading = false;
            existsPage.props.designPageMate = designPageMate;
        }).catch(err => setPageLoadError(path, err));
    }
    // 新增页面
    state.pages.set(path, pageInfo);
}

// 关闭页面
function closePage(path: string) {
    state.pages.delete(path);
    if (path !== state.activeTab) return;
    if (state.pages.size <= 0) {
        router.push({ name: data.welcomeRoute });
        return;
    }
    const page = lodash.maxBy([...state.pages.values()], page => page.lastActiveTime);
    if (!page) return;
    router.push({ path: page.path });
}

// 点击页面(激活页面)
function clickPage() {
    const page = state.pages.get(state.activeTab);
    if (!page) return;
    page.lastActiveTime = Date.now();
    router.push({ path: page.path });
}

// 设置成“不存在”页面
function setPageNotFound(path: string) {
    const page = state.pages.get(path);
    if (!page) return;
    page.title = "页面不存在";
    page.loading = false;
    page.component = markRaw(PageNotFound);
}

// 设置成“加载失败”页面
function setPageLoadError(path: string, err: Error) {
    const page = state.pages.get(path);
    if (!page) return;
    page.title = "加载失败";
    page.loading = false;
    page.component = markRaw(PageLoadError);
    page.props.error = err;
}
</script>

<template>
    <RouterView v-if="state.pages.size <= 0"/>
    <Tabs
        v-else
        class="workspace-tabs"
        v-model="state.activeTab"
        tab-style="card"
        :drop-config="{ plugin: Sortable }"
        :with-close="true"
        @close="closePage"
        @click="clickPage"
    >
        <TabItem
            v-for="([_, page]) in state.pages"
            :key="page.path"
            :name="page.path"
            :title="page.title"
        >
            <template v-if="page.loading" #title>
                <Skeleton width="60px" height="11px"/>
            </template>
            <div v-if="page.loading" class="workspace-page-loading">
                <ProgressSpinner style="width: 56px; height: 56px;z-index: 1;" strokeWidth="4"/>
                <div style="color: #517ce0;font-size: 14px;margin-top: 4px;z-index: 1;">加载中...</div>
            </div>
            <component v-else :is="page.component" v-bind="page.props"/>
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

.workspace-page-loading {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0000002d;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.workspace-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
}

.workspace-tabs :deep(.tiny-tabs__header .tiny-tabs__item:hover) {
    font-weight: normal;
}

.workspace-tabs :deep(.tiny-tabs__header .tiny-tabs__item.is-active) {
    font-weight: normal;
}

.workspace-tabs :deep(.tiny-tabs__content) {
    overflow: auto;
    margin: 0;
    flex-grow: 1;
    padding: 0;
}

.workspace-tabs :deep(.tiny-tabs__content .tiny-tab-pane.active-item) {
    width: 100%;
    height: 100%;
}
</style>
