<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, reactive } from "vue";
import globalConfig from "@/GlobalConfig";
import { globalThisPolyfill } from "@/utils/GlobalThisPolyfill";
import { style } from "@/utils/UseType";
import SplitPane from "@/components/SplitPane.vue";
import { componentMeta } from "@/ComponentMetaTabs";
import { componentManage } from "@/draggable/Constant";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { setDesignerEngine } from "@/draggable/InjectVars";
import { DragDropDriver } from "@/draggable/drivers/DragDropDriver";
import { MouseMoveDriver } from "@/draggable/drivers/MouseMoveDriver";
import { MouseClickDriver } from "@/draggable/drivers/MouseClickDriver";
import { CursorEffect } from "@/draggable/effect/CursorEffect";
import { DraggingEffect } from "@/draggable/effect/DraggingEffect";
import { AuxToolEffect } from "@/draggable/effect/AuxToolEffect";
import DragGhost from "@/draggable/components/widgets/DragGhost.vue";
import MaterialPanel from "@/draggable/components/widgets/MaterialPanel.vue";
import SettingsPanel from "@/draggable/components/widgets/SettingsPanel.vue";
import WorkspaceTabs from "@/draggable/components/widgets/WorkspaceTabs.vue";

// 定义组件选项
defineOptions({
    name: 'Workbench',
});

// 定义 Props 类型
interface StudioLayoutProps {
    /** 顶部导航栏高度，单位(px) */
    topNavHeight?: number;
    /** 顶部工具栏高度，单位(px) */
    topToolsHeight?: number;
    /** 底部工具栏高度，单位(px) */
    bottomToolsHeight?: number;
    /** 左侧面板初始宽度，单位(px) */
    leftPanelDefWidth?: number;
    /** 左侧面板最小宽度，单位(px) */
    leftPanelMinWidth?: number;
    /** 左侧面板最大宽度，单位(px) */
    leftPanelMaxWidth?: number;
    /** 右侧面板初始宽度，单位(px) */
    rightPanelDefWidth?: number;
    /** 右侧面板最小宽度，单位(px) */
    rightPanelMinWidth?: number;
    /** 右侧面板最大宽度，单位(px) */
    rightPanelMaxWidth?: number;
    /** 底部工具栏初始高度，单位(px) */
    bottomPanelDefWidth?: number;
    /** 底部工具栏最小高度，单位(px) */
    bottomPanelMinWidth?: number;
    /** 底部工具栏最大高度，单位(px) */
    bottomPanelMaxWidth?: number;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<StudioLayoutProps>(), {
    topNavHeight: 32,
    topToolsHeight: 22,
    bottomToolsHeight: 22,

    leftPanelDefWidth: 250,
    leftPanelMinWidth: 150,
    leftPanelMaxWidth: 350,

    rightPanelDefWidth: 280,
    rightPanelMinWidth: 150,
    rightPanelMaxWidth: 320,

    bottomPanelDefWidth: 180,
    bottomPanelMinWidth: 50,
    bottomPanelMaxWidth: 300,
});
// state 属性
const state = reactive({});
// 内部数据
const data = {};
// 设计器引擎
const designerEngine = markRaw(new DesignerEngine({
    componentManage: componentManage,
    drivers: [
        DragDropDriver,
        MouseMoveDriver,
        MouseClickDriver,
    ],
    effects: [
        CursorEffect,
        DraggingEffect,
        AuxToolEffect,
    ],
}));
setDesignerEngine(designerEngine);
onMounted(() => {
    designerEngine.mount(document, globalThisPolyfill);
});
onUnmounted(() => {
    designerEngine.unmount();
});
</script>

<template>
    <DragGhost :designer-engine="designerEngine"/>
    <div class="studio-layout flex-column-container box-border">
        <div
            class="flex-item-fixed flex-row-container"
            :style="style({ height: props.topNavHeight })"
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
        <div class="flex-item-fill flex-row-container box-border">
            <div class="flex-item-fixed flex-column-container" style="height: 100%;width: 32px;">
                <div class="flex-item-fixed box-border-b" style="height: 32px">组件</div>
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
                :fixed-pane-def-size="props.bottomPanelDefWidth"
                :fixed-pane-min-size="props.bottomPanelMinWidth"
                :fixed-pane-max-size="props.bottomPanelMaxWidth"
                :two-collapse="true"
                def-collapsed="two"
                :custom-one-pane="true"
            >
                <template #onePane="slotProps">
                    <SplitPane
                        v-bind="slotProps"
                        style="height: 100%;"
                        layout="H"
                        :fixed-pane-def-size="props.leftPanelDefWidth"
                        :fixed-pane-min-size="props.leftPanelMinWidth"
                        :fixed-pane-max-size="props.leftPanelMaxWidth"
                        :one-collapse="true"
                        :custom-two-pane="true"
                    >
                        <template #onePane>
                            <MaterialPanel :designer-engine="designerEngine" :tabs="globalConfig.materialMetaTabs"/>
                        </template>
                        <template #twoPane="slotProps">
                            <SplitPane
                                v-bind="slotProps"
                                style="height: 100%;overflow: hidden;"
                                layout="H"
                                fixed-pane="two"
                                :fixed-pane-def-size="props.rightPanelDefWidth"
                                :fixed-pane-min-size="props.rightPanelMinWidth"
                                :fixed-pane-max-size="props.rightPanelMaxWidth"
                                :two-collapse="true"
                            >
                                <template #onePane>
                                    <WorkspaceTabs :designer-engine="designerEngine"/>
                                </template>
                                <template #twoPane>
                                    <SettingsPanel :component-meta="componentMeta"/>
                                </template>
                            </SplitPane>
                        </template>
                    </SplitPane>
                </template>
                <template #twoPane>
                    <div style="height: 800px;"></div>
                </template>
            </SplitPane>
            <div class="flex-item-fixed flex-column-container" style="height: 100%;width: 32px;">
                <div class="flex-item-fixed box-border-b" style="height: 32px">属性</div>
                <div class="flex-item-fixed box-border-b" style="height: 32px">大纲</div>
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
