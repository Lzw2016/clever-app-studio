<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
// import Splitter from "primevue/splitter";
// import SplitterPanel from "primevue/splitterpanel";
// import TabView from "primevue/tabview";
// import TabPanel from "primevue/tabpanel";
import { style } from "@/utils/UseType";
import SplitPane from "@/components/SplitPane.vue";

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
    leftPanelSplit: -1,
    // 右侧面板宽度，百分比
    rightPanelSplit: -1,
});

onMounted(() => {
    if (centerRef.value && leftToolRef.value && rightToolRef.value) {
        const width = centerRef.value?.clientWidth - leftToolRef.value?.offsetWidth - rightToolRef.value?.offsetWidth - 2;
        state.rightPanelSplit = props.rightPanelSize / width;
        state.leftPanelSplit = props.leftPanelSize / width;
        if ((state.leftPanelSplit + state.rightPanelSplit) > 0.9) {
            state.leftPanelSplit = 0.15;
            state.rightPanelSplit = 0.30;
        }
        state.rightPanelSplit = 1 - state.rightPanelSplit;
    }
});

function rightPanelMoving(event: MouseEvent) {

}

function moving(event: MouseEvent) {
    console.log("event", event);
}

watch(() => state.rightPanelSplit, (value, oldValue, onCleanup) => {
    console.log("value, oldValue", value, oldValue)
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
            <SplitPane
                class="flex-item-fill box-border-lr"
                style="height: 100%;"
                layout="V"
                fixed-pane="two"
                :fixed-pane-min-size="150"
                :fixed-pane-max-size="600"
                :fixed-pane-def-size="300"
                :two-collapse="true"
                def-collapsed="two"
            >
                <template #onePane="slotProps">
                    <SplitPane
                        v-bind="slotProps"
                        style="height: 100%;"
                        layout="H"
                        :fixed-pane-min-size="150"
                        :fixed-pane-max-size="600"
                        :fixed-pane-def-size="300"
                        :one-collapse="true"
                    >
                        <template #onePane="slotProps">
                            <div v-bind="slotProps" style="overflow: auto;">
                                <div style="height: 300px;">1</div>
                                <div style="height: 300px;">2</div>
                                <div style="height: 300px;">3</div>
                                <div style="height: 300px;">4</div>
                                <div style="height: 300px;">5</div>
                            </div>
                        </template>
                        <template #twoPane="slotProps">
                            <SplitPane
                                v-bind="slotProps"
                                style="height: 100%;"
                                layout="H"
                                fixed-pane="two"
                                :fixed-pane-min-size="150"
                                :fixed-pane-max-size="600"
                                :fixed-pane-def-size="300"
                                :two-collapse="true"
                            >
                                <template #onePane="slotProps">
                                    <div v-bind="slotProps" style="overflow: auto;">
                                        <div style="height: 300px;">1</div>
                                        <div style="height: 300px;">2</div>
                                        <div style="height: 300px;">3</div>
                                        <div style="height: 300px;">4</div>
                                        <div style="height: 300px;">5</div>
                                    </div>
                                </template>
                                <template #twoPane="slotProps">
                                    <div v-bind="slotProps" style="overflow: auto;">
                                        <div style="height: 300px;">1</div>
                                        <div style="height: 300px;">2</div>
                                        <div style="height: 300px;">3</div>
                                        <div style="height: 300px;">4</div>
                                        <div style="height: 300px;">5</div>
                                    </div>
                                </template>
                            </SplitPane>
                        </template>
                    </SplitPane>
                </template>
                <template #twoPane="slotProps">
                    <div v-bind="slotProps" style="overflow: auto;">
                        <div style="height: 300px;">1</div>
                        <div style="height: 300px;">2</div>
                        <div style="height: 300px;">3</div>
                        <div style="height: 300px;">4</div>
                        <div style="height: 300px;">5</div>
                    </div>
                </template>
            </SplitPane>
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
    overflow: hidden;
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
