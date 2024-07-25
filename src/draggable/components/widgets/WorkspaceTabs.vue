<script setup lang="ts">
import lodash from "lodash";
import { computed, markRaw, onMounted, reactive, watch } from "vue";
import { RouteComponent, RouteLocationNormalizedLoaded, RouteParamsGeneric, RouterView, useRoute, useRouter } from "vue-router";
import { Loading, Notify, TabItem, Tabs } from "@opentiny/vue"
import Sortable from "sortablejs";
import { isAsyncFunction } from "@/utils/Typeof";
import PageNotFound from "@/components/PageNotFound.vue";
import PageLoadError from "@/components/PageLoadError.vue";
import { DesignPageMate, LoadDesignPageMate } from "@/draggable/types/DesignBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";

const vLoading = Loading.directive;
const tabDropPlugin = Sortable;

// 定义组件选项
defineOptions({
    name: 'WorkspaceTabs',
});

// 定义 Props 类型
interface WorkspaceTabsProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
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
    props: {
        /** 路由 fullPath */
        path: string;
        /** 路由参数 */
        routeParams: RouteParamsGeneric;
        /** 错误信息 */
        error?: Error;
        /** 设计器引擎 */
        designerEngine?: any;
        /** 设计器状态数据 */
        designerState?: any;
        /** 设计页面元数据 */
        designPageMate?: DesignPageMate;
        // [key: string]: any;
    };
}

// 读取组件 props 属性
const props = withDefaults(defineProps<WorkspaceTabsProps>(), {});
// state 属性
const state = reactive({
    // 活动的叶签 <fullPath>
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
// 当前是 WelcomeRoute
const isWelcomeRoute = computed(() => route.matched?.[1].name === data.welcomeRoute);

onMounted(() => {
    showMatchedPage(route);
});
watch(route, newRoute => {
    showMatchedPage(newRoute);
});
// 切换 activeDesignerPath
watch(
    () => state.activeTab,
    fullPath => props.designerEngine.activeDesignerPath = fullPath,
);

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
        title: lodash.toString(meta.title || '加载中...'),
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
        pageInfo.props.designerEngine = props.designerEngine;
        pageInfo.props.designerState = props.designerEngine.addDesignerState(pageInfo.path);
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
            existsPage.props.designPageMate = markRaw(designPageMate);
        }).catch(err => setPageLoadError(path, err));
    }
    // 新增页面
    state.pages.set(path, pageInfo);
}

// 关闭页面
function closePage(path: string) {
    state.pages.delete(path);
    props.designerEngine.delDesignerState(path);
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
    <RouterView v-if="isWelcomeRoute && state.pages.size <= 0"/>
    <Tabs
        v-else
        class="workspace-tabs"
        v-model="state.activeTab"
        tab-style="card"
        :drop-config="{ plugin: tabDropPlugin }"
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
            <!-- <template v-if="page.loading" #title>加载中...</template>-->
            <!-- <Skeleton :loading="page.loading" :animated="true" :rows="8"/>-->
            <component
                v-loading="page.loading"
                tiny-loading__text="加载中..."
                tiny-loading__background="rgba(0, 0, 0, 0.25)"
                :class="{ 'workspace-page-loading': page.loading }"
                :is="page.component"
                v-bind="page.props"
            />
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
