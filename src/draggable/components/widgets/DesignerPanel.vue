<script setup lang="ts">
import { computed, CSSProperties, onMounted, reactive, ref, watch } from "vue";
import { RouteParams, useRoute } from "vue-router";
import { ResizeObserverEntry, useResizeObserver } from '@vueuse/core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowPointer, faArrowRotateLeft, faArrowRotateRight, faArrowsUpDownLeftRight, faCode, faLaptop, faMobileScreen, faPalette, faPlay } from "@fortawesome/free-solid-svg-icons";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import Codemirror from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";
import { requestIdle } from "@/utils/RequestIdle";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerCursorMode, DesignerLayout, DesignerTab } from "@/draggable/types/Designer";
import { DesignPageMate } from "@/draggable/types/DesignBlock";
import { DesignerState } from "@/draggable/models/DesignerState";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import AuxTool from "@/draggable/components/widgets/AuxTool.vue";

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
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设计页面元数据 */
    designPageMate?: DesignPageMate;
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
    /** 代码编辑器是否已经加载 */
    codeEditorLoaded: boolean;
    /** 代码编辑器配置 */
    codeEditorOptions: EditorConfiguration;
}

// state 属性
const state = reactive<DesignerPanelState>({
    designerBlockStyle: {},
    cursorMode: DesignerCursorMode.DragDrop,
    layout: DesignerLayout.PC,
    activeTab: DesignerTab.Designer,
    codeEditorLoaded: false,
    codeEditorOptions: {
        mode: {
            name: "text/javascript",
            json: true,
        },
        lineWrapping: false,
        readOnly: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    },
});
// 内部数据
const data = {
    /** designerContainer 上一次的矩形大小 */
    designerContainerPreRect: null as (null | ResizeObserverEntry),
    /** designerContainer 最后一次隐藏状态 */
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
// // 响应式布局
// const isResponsiveLayout = computed(() => state.layout === DesignerLayout.Responsive);
// 设计器
const isDesignerTab = computed(() => state.activeTab === DesignerTab.Designer);
// 源码
const isCodeTab = computed(() => state.activeTab === DesignerTab.Code);
// 预览
const isPreviewTab = computed(() => state.activeTab === DesignerTab.Preview);
// 设计器容器
const designerContainer = props.designerState._designerContainer;
// 设计器组件实例
const designerBlockInstance = props.designerState._designerBlockInstance;
// 拖拽辅助工具实例
const auxTool = ref<InstanceType<typeof AuxTool> | undefined>();
// 代码编辑器实例
const codeEditorInstance = ref<Editor | undefined>();

// 当前命中的路由
const route = useRoute();

// 组件加载
onMounted(() => {
    calcDesignerBlockStyle();
});

// 设计器容器大小变化时
useResizeObserver(designerContainer, entries => {
    const preRect = data.designerContainerPreRect;
    const rect = entries[0];
    // designerContainer 被隐藏了
    if (rect.contentRect.width <= 20 || rect.contentRect.height <= 20) {
        data.designerContainerLastHide = true;
        return;
    }
    // designerContainer 上一次是隐藏状态
    if (data.designerContainerLastHide) {
        data.designerContainerLastHide = false;
        return;
    }
    recalcAuxToolPosition();
    // 区域变化不大就不动
    if (preRect && Math.abs(preRect.contentRect.width - rect.contentRect.width) < 12 && Math.abs(preRect.contentRect.height - rect.contentRect.height) < 12) {
        return;
    }
    data.designerContainerPreRect = rect;
    requestIdle(() => {
        calcDesignerBlockStyle();
        // auxTool.value?.$nextTick(() => calcDesignerBlockStyle());
    });
});

// RuntimeBlock 组件创建时
watch(designerBlockInstance, () => calcDesignerBlockStyle());

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

console.log("pageId", route.params.pageId)
// TODO 设计器设计流程: pageId -> DesignBlock对象(json/js) -> 渲染(RuntimeBlock.vue) -> 拖拽/配置 -> 更新DesignBlock对象 -> 保存DesignBlock对象历史 -> 持久化DesignBlock对象
</script>

<template>
    <div class="designer-layout flex-column-container">
        <div class="flex-item-fixed flex-row-container designer-tool box-border-b">
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-disabled': !canRevoke}"
                title="撤销"
            >
                <FontAwesomeIcon :icon="faArrowRotateLeft" :fixed-width="true"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-disabled': !canBackRevoke}"
                title="反撤销"
            >
                <FontAwesomeIcon :icon="faArrowRotateRight" :fixed-width="true"/>
            </div>
            <div style="width: 16px;"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isDragDropCursor}"
                title="拖拽"
                @click="state.cursorMode=DesignerCursorMode.DragDrop"
            >
                <FontAwesomeIcon :icon="faArrowsUpDownLeftRight" :fixed-width="true"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-active': isSelectionCursor}"
                title="自由选择"
                @click="state.cursorMode=DesignerCursorMode.Selection"
            >
                <FontAwesomeIcon :icon="faArrowPointer" :fixed-width="true"/>
            </div>
            <div style="width: 16px;"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isPCLayout}"
                title="PC布局"
                @click="state.layout=DesignerLayout.PC"
            >
                <FontAwesomeIcon :icon="faLaptop" :fixed-width="true"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isMobileLayout}"
                title="移动端布局"
                @click="state.layout=DesignerLayout.Mobile"
            >
                <FontAwesomeIcon :icon="faMobileScreen" :fixed-width="true"/>

            </div>
            <div class="flex-item-fill"/>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isDesignerTab}"
                title="设计器"
                @click="state.activeTab=DesignerTab.Designer"
            >
                <FontAwesomeIcon :icon="faPalette" :fixed-width="true"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button"
                :class="{'designer-tool-button-active': isCodeTab}"
                title="源码"
                @click="()=> {
                    if(state.activeTab!==DesignerTab.Code) {
                        props.designerState.generateDesignBlockCode().finally();
                    }
                    state.activeTab=DesignerTab.Code;
                    state.codeEditorLoaded = true;
                }"
            >
                <FontAwesomeIcon :icon="faCode" :fixed-width="true"/>
            </div>
            <div
                class="flex-item-fixed designer-tool-button designer-tool-button-last"
                :class="{'designer-tool-button-active': isPreviewTab}"
                title="预览"
                @click="state.activeTab=DesignerTab.Preview"
            >
                <FontAwesomeIcon :icon="faPlay" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill">
            <div v-show="isDesignerTab" ref="designerContainer" class="designer-content">
                <RuntimeBlock
                    v-if="props.designPageMate?.designBlock"
                    ref="designerBlockInstance"
                    :style="state.designerBlockStyle"
                    :component-manage="props.designerEngine.componentManage"
                    :block="props.designPageMate.designBlock"
                    :is-designing="true"
                />
                <AuxTool ref="auxTool" :designer-engine="props.designerEngine" :designerState="props.designerState"/>
            </div>
            <div v-if="state.codeEditorLoaded" v-show="isCodeTab" class="designer-code">
                <Codemirror
                    :value="props.designerState.designerBlockCode"
                    :options="state.codeEditorOptions"
                    @ready="cm => codeEditorInstance=cm"
                />
            </div>
            <div v-show="isPreviewTab" class="designer-content">
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
    padding: 0 12px;
    box-sizing: border-box;
}

.designer-tool-button {
    width: 22px;
    height: 22px;
    box-sizing: border-box;
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

.designer-tool-button > svg {
    font-size: 14px;
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

.designer-code {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
