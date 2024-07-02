<script setup lang="ts">
import { reactive } from "vue";
import { TabItem, Tabs } from "@opentiny/vue";
import type { editor } from "monaco-editor";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane from "@/components/SplitPane.vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";

// 定义组件选项
defineOptions({
    name: 'BlockEditor',
});

// 定义 Props 类型
interface BlockEditorProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState?: DesignerState;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<BlockEditorProps>(), {});

// 定义 State 类型
interface BlockEditorState {

}

// state 属性
const state = reactive<BlockEditorState>({
    show: false,
});
// 内部数据
const data = {};

function initDataEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}

function initComputedEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}

function initWatchEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}

function initMethodsEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}

function initLifeCyclesEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}


interface BlockEditorExpose {

}

defineExpose<BlockEditorExpose>({});
</script>

<template>
    <Tabs
        class="block-container none-select"
        style="height: 100%;"
        tab-style="card"
        position="left"
        active-name="data"
    >
        <TabItem name="data" title="数据">
            <MonacoEditor
                height="100%"
                theme="idea-light"
                default-language="json"
                :options="{ contextmenu: false }"
                :onMount="initDataEditor"
            />
        </TabItem>
        <TabItem name="computed" title="计算属性">
            <SplitPane
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="150"
                :fixed-pane-min-size="100"
                :fixed-pane-max-size="240"
                :one-collapse="false"
                :two-collapse="false"
                :custom-two-pane="true"
            >
                <template #onePane>

                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-bind="slotProps"
                        height="100%"
                        theme="idea-light"
                        default-language="javascript"
                        :options="{ contextmenu: false }"
                        :onMount="initComputedEditor"
                    />
                </template>
            </SplitPane>
        </TabItem>
        <TabItem name="watch" title="侦听器">
            <SplitPane
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="150"
                :fixed-pane-min-size="100"
                :fixed-pane-max-size="240"
                :one-collapse="false"
                :two-collapse="false"
                :custom-two-pane="true"
            >
                <template #onePane>

                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-bind="slotProps"
                        height="100%"
                        theme="idea-light"
                        default-language="javascript"
                        :options="{ contextmenu: false }"
                        :onMount="initWatchEditor"
                    />
                </template>
            </SplitPane>
        </TabItem>
        <TabItem name="methods" title="函数">
            <SplitPane
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="150"
                :fixed-pane-min-size="100"
                :fixed-pane-max-size="240"
                :one-collapse="false"
                :two-collapse="false"
                :custom-two-pane="true"
            >
                <template #onePane>

                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-bind="slotProps"
                        height="100%"
                        theme="idea-light"
                        default-language="javascript"
                        :options="{ contextmenu: false }"
                        :onMount="initMethodsEditor"
                    />
                </template>
            </SplitPane>
        </TabItem>
        <TabItem name="lifeCycles" title="生命周期">
            <SplitPane
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="150"
                :fixed-pane-min-size="100"
                :fixed-pane-max-size="240"
                :one-collapse="false"
                :two-collapse="false"
                :custom-two-pane="true"
            >
                <template #onePane>

                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-bind="slotProps"
                        height="100%"
                        theme="idea-light"
                        default-language="javascript"
                        :options="{ contextmenu: false }"
                        :onMount="initLifeCyclesEditor"
                    />
                </template>
            </SplitPane>
        </TabItem>
        <TabItem name="i18n" title="多语言">
            <MonacoEditor
                height="100%"
                theme="idea-light"
                default-language="json"
                :options="{ contextmenu: false }"
                :onMount="initDataEditor"
            />
        </TabItem>
        <TabItem name="meta" title="元信息">

        </TabItem>
        <TabItem name="blockCode" title="页面代码">
            <MonacoEditor
                height="100%"
                theme="idea-light"
                default-language="json"
                :options="{ contextmenu: false }"
                :onMount="initDataEditor"
            />
        </TabItem>
    </Tabs>
</template>

<style scoped>
.block-container {
    border: 1px solid #ccc;
}

.none-select {
    user-select: none;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */
.block-container :deep(.tiny-tabs__header.is-left) {
    margin-right: 0;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__nav) {
    width: 80px;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__item) {
    padding: 0 12px;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__item.is-left:not(.is-active)) {
    border-left: none;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__nav-wrap) {
    background-color: #f5f5f6;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__item.is-left.is-active) {
    background-color: white;
}

.block-container :deep(.tiny-tabs__header .tiny-tabs__item.is-left:last-child) {
    border-bottom: 2px solid #dfe1e6;
}

.block-container :deep(.tiny-tabs__content) {
    height: 100%;
    margin: 0;
}

.block-container :deep(.tiny-tabs__content .tiny-tab-pane) {
    height: 100%;
}
</style>
