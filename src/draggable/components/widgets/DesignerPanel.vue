<script setup lang="ts">
import { computed, CSSProperties, onMounted, reactive, ref } from "vue";
import { RouteParams, useRoute } from "vue-router";
import { useResizeObserver } from '@vueuse/core'
import { IconArrowBackUp, IconArrowForwardUp, IconArrowsMove, IconClick, IconCode, IconDeviceLaptop, IconDeviceMobile, IconDevices, IconPalette, IconPlayerPlay } from "@tabler/icons-vue";
import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerCursorMode, DesignerLayout, DesignerTab } from "@/draggable/types/Designer";
import { DesignPageMate } from "@/draggable/types/DesignBlock";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import AuxTool from "@/draggable/components/widgets/AuxTool.vue";
import { designerTest } from "@/views/DesignerTest";
import { DesignerState } from "@/draggable/models/DesignerState";

// 定义组件选项
defineOptions({
    name: 'DesignerPanel',
});

// 定义 Props 类型
interface DesignerPanelProps {
    /** 路由全路径 */
    path: string;
    /** 路由参数 */
    routeParams: RouteParams;
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计页面元数据 */
    designPageMate?: DesignPageMate;
    /** 设计器状态数据 */
    designerState: DesignerState;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<DesignerPanelProps>(), {});

// 定义 State 类型
interface DesignerPanelState {
    /** 设计时Block样式 */
    designerBlockStyle: CSSProperties;
    /** 设计器光标模式 */
    cursorMode: DesignerCursorMode;
    /** 设计器布局类型 */
    layout: DesignerLayout;
    /** 当前活动页 */
    activeTab: DesignerTab;
}

// state 属性
const state = reactive<DesignerPanelState>({
    designerBlockStyle: {},
    cursorMode: DesignerCursorMode.DragDrop,
    layout: DesignerLayout.PC,
    activeTab: DesignerTab.Designer,
});
// 内部数据
const data = {
    designerContainerLastHide: false,
};
// 撤销
const canRevoke = computed(() => true);
// 反撤销
const canBackRevoke = computed(() => false);
// 拖拽
const isDragDropCursor = computed(() => state.cursorMode === DesignerCursorMode.DragDrop);
// 自由选择
const isSelectionCursor = computed(() => state.cursorMode === DesignerCursorMode.Selection);
// PC布局
const isPCLayout = computed(() => state.layout === DesignerLayout.PC);
// 移动端布局
const isMobileLayout = computed(() => state.layout === DesignerLayout.Mobile);
// 响应式布局
const isResponsiveLayout = computed(() => state.layout === DesignerLayout.Responsive);
// 设计器
const isDesignerTab = computed(() => state.activeTab === DesignerTab.Designer);
// 源码
const isCodeTab = computed(() => state.activeTab === DesignerTab.Code);
// 预览
const isPreviewTab = computed(() => state.activeTab === DesignerTab.Preview);
// 设计器容器
const designerContainer = ref<HTMLDivElement | undefined>();
// 设计器组件实例
const designerBlockInstance = ref<InstanceType<typeof RuntimeBlock> | undefined>();
// 拖拽辅助工具实例
const auxTool = ref<InstanceType<typeof AuxTool> | undefined>();

// 初始化 DesignerState 属性
props.designerState.designerContainer = designerContainer;
props.designerState.designerBlockInstance = designerBlockInstance;

// 当前命中的路由
const route = useRoute();

// 组件加载
onMounted(() => {
    calcDesignerBlockStyle();
});
// 设计器容器大小变化时
useResizeObserver(designerContainer, entries => {
    const entry = entries[0];
    // designerContainer 被隐藏了
    if (entry.contentRect.width <= 20 || entry.contentRect.height <= 20) {
        data.designerContainerLastHide = true;
        return;
    }
    // designerContainer 上一次是隐藏状态
    if (data.designerContainerLastHide) {
        data.designerContainerLastHide = false;
        return;
    }
    recalcAuxToolPosition();
    requestIdle(() => {
        auxTool.value?.$nextTick(() => calcDesignerBlockStyle());
    });
});

// 计算设计器组件的样式
function calcDesignerBlockStyle() {
    if (!designerContainer.value || !designerBlockInstance.value) return;
    if (designerContainer.value.scrollWidth > designerContainer.value.clientWidth || designerContainer.value.scrollHeight > designerContainer.value.clientHeight) {
        state.designerBlockStyle = {
            width: 'unset',
            height: 'unset',
        };
    } else {
        state.designerBlockStyle = {
            width: '100%',
            height: '100%',
        };
    }
}

// 重新计算辅助工具的位置
function recalcAuxToolPosition() {
    props.designerState.hover.recalcAuxToolPosition();
    props.designerState.selections.forEach(selection => selection.recalcAuxToolPosition());
}
</script>

<template>
    <div class="designer-layout flex-column-container">
        <div class="flex-item-fixed flex-row-container designer-tool box-border-b">
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-disabled': !canRevoke}"
                title="撤销"
            >
                <IconArrowBackUp :size="22" stroke-width="1.5"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-disabled': !canBackRevoke}"
                title="反撤销"
            >
                <IconArrowForwardUp :size="22" stroke-width="1.5"/>
            </div>
            <div style="width: 16px;"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isDragDropCursor}"
                title="拖拽"
                @click="state.cursorMode=DesignerCursorMode.DragDrop"
            >
                <IconArrowsMove :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-active': isSelectionCursor}"
                title="自由选择"
                @click="state.cursorMode=DesignerCursorMode.Selection"
            >
                <IconClick :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div style="width: 16px;"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isPCLayout}"
                title="PC布局"
                @click="state.layout=DesignerLayout.PC"
            >
                <IconDeviceLaptop :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isMobileLayout}"
                title="移动端布局"
                @click="state.layout=DesignerLayout.Mobile"
            >
                <IconDeviceMobile :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-active': isResponsiveLayout}"
                title="响应式布局"
                @click="state.layout=DesignerLayout.Responsive"
            >
                <IconDevices :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div class="flex-item-fill"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isDesignerTab}"
                title="设计器"
                @click="state.activeTab=DesignerTab.Designer"
            >
                <IconPalette :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isCodeTab}"
                title="源码"
                @click="state.activeTab=DesignerTab.Code"
            >
                <IconCode :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-active': isPreviewTab}"
                title="预览"
                @click="state.activeTab=DesignerTab.Preview"
            >
                <IconPlayerPlay :size="22" stroke-width="1.5" viewBox="-1 -1 26 26"/>
            </div>
        </div>
        <div class="flex-item-fill">
            <div v-if="isDesignerTab" ref="designerContainer" class="designer-content">
                <RuntimeBlock ref="designerBlockInstance" :block="designerTest" :is-designing="true" :style="state.designerBlockStyle"/>
                <AuxTool ref="auxTool" :designer-engine="props.designerEngine" :designerState="props.designerState"/>
            </div>
            <div v-else-if="isCodeTab" class="designer-content">
                源码
            </div>
            <div v-else-if="isPreviewTab" class="designer-content">
                预览
            </div>
        </div>
    </div>
</template>

<style scoped>
.designer-layout {
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

.box-border-b {
    border-bottom: 1px solid #ccc;
}

.designer-tool {
    height: 32px;
    align-items: center;
    background-color: #eeeeee;
    padding: 4px 12px;
}

.designer-tool-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    cursor: pointer;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    border-right: none;
}

.designer-tool-button-last {
    border-right: 1px solid #d9d9d9;
}

.designer-tool-button:hover {
    color: #333;
}

.designer-tool-button-disabled {
    color: #b8b8b8;
    background-color: #f5f5f5;
}

.designer-tool-button-disabled:hover {
    color: #b8b8b8;
    background-color: #f5f5f5;
    cursor: default;
}

.designer-tool-button-active {
    color: #b8b8b8;
    background-color: #f5f5f5;
}

.designer-tool-button-active:hover {
    color: #b8b8b8;
    background-color: #f5f5f5;
    cursor: default;
}

.designer-content {
    height: 100%;
    width: 100%;
    overflow: auto;
    position: relative;
    padding: 4px;
}
</style>
