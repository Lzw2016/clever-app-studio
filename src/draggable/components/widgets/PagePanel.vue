<script setup lang="ts">
import localforage from "localforage";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { layer } from "@layui/layer-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tree } from "@opentiny/vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import DemoPages from "@/views/DemoPages";

localforage.config({
    name: 'clever-app-studio',
});

const router = useRouter();

// 定义组件选项
defineOptions({
    name: 'PagePanel',
});

// 自定义事件类型
const emit = defineEmits<{
    /** 关闭当前面板 */
    closePanel: [];
}>();

// 定义 Props 类型
interface PagePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<PagePanelProps>(), {});

interface PageNode {
    id: string;
    label: string;
    data?: any;
    children?: Array<PageNode>;
}

// 定义 State 类型
interface PagePanelState {
    pagesData: Array<PageNode>;
}

// state 属性
const state = reactive<PagePanelState>({
    pagesData: [],
});
// 内部数据
const data = {};
// 页面资源树组件
const pagesTreeRef = ref<InstanceType<typeof Tree> | undefined>();

onMounted(async () => {
    state.pagesData = await loadPagesData();
});

function closePanel() {
    emit("closePanel");
}

async function loadPagesData(): Promise<Array<PageNode>> {
    let pagesData: any = await localforage.getItem("pagesData");
    if (!pagesData) {
        pagesData = [
            {
                id: '001',
                label: '示例页面',
                children: [
                    {
                        id: '001-01',
                        label: '表单页面',
                        data: DemoPages.form01,
                    },
                ],
            },
        ];
        await localforage.setItem("pagesData", pagesData);
    }
    return pagesData;
}

function todo() {
    // TODO 未实现
    pagesTreeRef.value?.closeMenu();
    layer.msg("还未实现", { time: 800 });
}

function openDesignerPanel(data: PageNode, node, vm) {
    if (data.children) return;
    router.push({
        name: 'DesignerPanel',
        params: {
            pageId: data.id,
        },
    });
}
</script>

<template>
    <div class="page-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed page-panel-title">
            <div class="flex-item-fixed page-panel-title-name">功能页面</div>
            <div class="flex-item-fill"/>
            <div class="page-panel-close" @click="closePanel">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill">
            <Tree
                ref="pagesTreeRef"
                node-key="id"
                size="small"
                :data="state.pagesData"
                :show-line="false"
                :default-expand-all="true"
                :highlight-current="true"
                :expand-on-click-node="false"
                :show-contextmenu="true"
                :draggable="false"
                @node-click="openDesignerPanel"
            >
                <template #contextmenu="{ node, data }">
                    <ul class="context-menu">
                        <li @click="todo">新增页面</li>
                        <li @click="todo">新增目录</li>
                        <li @click="todo">编辑</li>
                        <li @click="todo">删除</li>
                    </ul>
                </template>
            </Tree>
        </div>
    </div>
</template>

<style scoped>
.page-panel {
    height: 100%;
    width: 100%;
    user-select: none;
}

.page-panel-title {
    background-color: #efefef;
    padding: 6px 12px;
    border-bottom: 1px solid #e1e1e1;
}

.page-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.page-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
}

.page-panel-close:hover {
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

.context-menu {
    background-color: #fff;
    outline: 1px solid #cecece;
    min-width: 120px;
    color: #3b3b3b;
}

.context-menu li {
    width: 120px;
    padding: 6px 8px;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    color: #3b3b3b;
    cursor: pointer;
    transition: transform 50ms ease;
}

.context-menu li:hover {
    background: #eee;
}
</style>
