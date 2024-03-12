<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { RouterView } from "vue-router";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ComponentPanel from "@/draggable/components/widgets/ComponentPanel.vue";
import { style } from "@/utils/UseType";
import { componentMetaTabs } from "@/ComponentMetaTabs";

// 定义组件选项
defineOptions({
    name: 'StudioLayout',
});

// 定义 Props 类型
interface StudioLayoutProps {
    /** 顶部高度，单位(px) */
    topPanelHeight?: number;
    /** 顶部工具栏高度，单位(px) */
    topToolsHeight?: number;
    /** 底部工具栏高度，单位(px) */
    bottomToolsHeight?: number;
    /** 左侧面板宽度，单位(px) */
    leftPanelSize?: number;
    /** 右侧面板宽度，单位(px) */
    rightPanelSize?: number;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<StudioLayoutProps>(), {
    topPanelHeight: 32,
    topToolsHeight: 22,
    bottomToolsHeight: 22,
    leftPanelSize: 180,
    rightPanelSize: 300,
});

const centerRef = ref<HTMLDivElement | undefined>();
const leftToolRef = ref<HTMLDivElement | undefined>();
const rightToolRef = ref<HTMLDivElement | undefined>();
const state = reactive({
    // 左侧面板宽度，百分比
    leftPanelSize: 0,
    // 右侧面板宽度，百分比
    rightPanelSize: 0,
});

onMounted(() => {
    if (centerRef.value && leftToolRef.value && rightToolRef.value) {
        const width = centerRef.value?.clientWidth - leftToolRef.value?.offsetWidth - rightToolRef.value?.offsetWidth - 2;
        state.leftPanelSize = props.leftPanelSize / width * 100;
        state.rightPanelSize = props.rightPanelSize / width * 100;
        if ((state.leftPanelSize + state.rightPanelSize) > 90) {
            state.leftPanelSize = 15;
            state.rightPanelSize = 30;
        }
    }
});
</script>

<template>
    <div class="studio-layout flex-column-container box-border">
        <div
            class="flex-item-fixed flex-row-container"
            :style="style({ height: props.topPanelHeight })"
        >
            <div class="flex-item-fixed box-border-r" style="width: 128px;">Logo</div>
            <div class="flex-item-fixed box-border-r" style="width: 48px;">功能</div>
            <div class="flex-item-fixed box-border-r" style="width: 48px;">功能</div>
            <div class="flex-item-fill"></div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">用户</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">设置</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">文档</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">语言</div>
        </div>
        <div
            class="flex-item-fixed flex-row-container box-border-t"
            :style="style({ height: props.topToolsHeight })"
        >
            <div class="flex-item-fixed box-border-r" style="width: 128px;">当前叶签信息</div>
            <div class="flex-item-fill"></div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">功能</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">功能</div>
        </div>
        <div
            ref="centerRef"
            class="flex-item-fill flex-row-container box-border"
            :style="style({
                height:  `calc(100% - ${props.topPanelHeight + props.topToolsHeight + props.bottomToolsHeight}px)`,
            })"
        >
            <div ref="leftToolRef" class="flex-item-fixed flex-column-container" style="height: 100%;width: 32px;">
                <div class="flex-item-fixed box-border-b" style="height: 32px">组件</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">大纲</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">页面</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">接口</div>
                <div class="flex-item-fill"></div>
                <div class="flex-item-fixed box-border-t" style="height: 32px">功能</div>
                <div class="flex-item-fixed box-border-t" style="height: 32px">功能</div>
                <div class="flex-item-fixed"></div>
            </div>
            <Splitter v-if="state.leftPanelSize>0" class="flex-item-fill" style="height: 100%;" stateKey="studioSplit" stateStorage="local" :unstyled="false">
                <SplitterPanel class="" style="height: 100%;" :size="state.leftPanelSize">
                    <ComponentPanel :tabs="componentMetaTabs" />
                </SplitterPanel>
                <SplitterPanel class="" style="height: 100%;" :size="100 - state.leftPanelSize - state.rightPanelSize">
                    <TabView class="multi-pages" style="height: 100%;" :scrollable="true" :unstyled="false">
                        <TabPanel :key="'001'" :header="'页面'">
                            <RouterView/>
                        </TabPanel>
                    </TabView>
                </SplitterPanel>
                <SplitterPanel class="" style="height: 100%;" :size="state.rightPanelSize">
                    BBB
                </SplitterPanel>
            </Splitter>
            <div ref="rightToolRef" class="flex-item-fixed flex-column-container" style="height: 100%;width: 32px;">
                <div class="flex-item-fixed box-border-b" style="height: 32px">属性</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">历史</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">数据</div>
                <div class="flex-item-fill"></div>
                <div class="flex-item-fixed box-border-t" style="height: 32px">功能</div>
                <div class="flex-item-fixed box-border-t" style="height: 32px">功能</div>
                <div class="flex-item-fixed"></div>
            </div>
        </div>
        <div class="flex-item-fixed flex-row-container" :style="style({ height: props.bottomToolsHeight })">
            <div class="flex-item-fixed box-border-r" style="width: 48px;">指示1</div>
            <div class="flex-item-fixed box-border-r" style="width: 48px;">指示2</div>
            <div class="flex-item-fill"></div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">状态1</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">状态2</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">设置</div>
        </div>
    </div>
</template>

<style scoped>
.studio-layout {
    height: 100%;
    width: 100%;
    user-select: none;
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
}

.flex-item-fixed {
    flex-shrink: 0;
}

.box-border {
    border: 1px solid #ccc;
}

.box-border-l {
    border-left: 1px solid #ccc;
}

.box-border-r {
    border-right: 1px solid #ccc;
}

.box-border-lr {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.box-border-t {
    border-top: 1px solid #ccc;
}

.box-border-b {
    border-bottom: 1px solid #ccc;
}

.box-border-tb {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
</style>

<style>
.multi-pages.p-tabview > .p-tabview-nav-container {
    height: 36px;
    font-size: 0.90rem;
}

.multi-pages.p-tabview .p-tabview-nav li .p-tabview-nav-link {
    padding: 0.6rem 1rem;
}

.multi-pages.p-tabview > .p-tabview-panels {
    height: calc(100% - 36px);
    overflow: auto;
    padding: 0.6rem 0.75rem 0.75rem 0.75rem;
}
</style>
