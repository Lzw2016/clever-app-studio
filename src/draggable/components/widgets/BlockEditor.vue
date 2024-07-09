<script setup lang="ts">
import { computed, reactive } from "vue";
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
    /** 当前选中的叶签 */
    activeTab: string;
}

// state 属性
const state = reactive<BlockEditorState>({
    activeTab: "data",
});
// 内部数据
const data = {
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    tabs: {
        data: "数据",
        computed: "计算属性",
        watch: "侦听器",
        methods: "函数",
        lifeCycles: "生命周期",
        i18n: "多语言",
        meta: "元信息",
        code: "页面代码",
    },
    tabsConfig: {
        data: {
            collapsed: 'one',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: true,
            language: "json",
            code: "",
        },
        computed: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
        },
        watch: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
        },
        methods: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
        },
        lifeCycles: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
        },
        i18n: {
            collapsed: 'one',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: true,
            language: "json",
            code: "",
        },
        meta: {
            collapsed: 'two',
            forceHideOneCollapse: true,
            forceHideTwoCollapse: false,
            language: "json",
            code: "",
        },
        code: {
            collapsed: 'one',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: true,
            language: "javascript",
            code: "",
        },
    },
};
// 当前选中的叶签对应的配置
const activeTabConfig = computed<any>(() => data.tabsConfig[state.activeTab]);
// 编辑器代码
const monacoEditorCode = computed<string>({
    get: () => {
        const config = data.tabsConfig[state.activeTab];
        if (!config) return "";
        return config.code;
    },
    set: newValue => {
        const config = data.tabsConfig[state.activeTab];
        if (!config) return;
        config.code = newValue;
    },
});

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    data.monacoEditor = editor;
}

function activeTabChange(tab: string) {
    state.activeTab = tab;
}

function codeChange() {
    console.log("codeChange");
}

function codeValidate(markers: editor.IMarker[]) {
    console.log("codeValidate");
}

interface BlockEditorExpose {
}

defineExpose<BlockEditorExpose>({});
</script>

<template>
    <div class="flex-row-container block-container">
        <div class="flex-item-fixed block-tabs">
            <div
                v-for="(name, tab) in data.tabs"
                :class="{
                    'block-tabs-title': true,
                    'block-tabs-title-active': state.activeTab===tab,
                }"
                @click="activeTabChange(tab)"
            >
                {{ name }}
            </div>
        </div>
        <div class="flex-item-fill">
            <SplitPane
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="150"
                :fixed-pane-min-size="100"
                :fixed-pane-max-size="300"
                :one-collapse="false"
                :two-collapse="false"
                :force-hide-one-collapse="activeTabConfig?.forceHideOneCollapse"
                :force-hide-two-collapse="activeTabConfig?.forceHideTwoCollapse"
                :custom-two-pane="true"
                :collapsed="activeTabConfig?.collapsed"
            >
                <template #onePane>

                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-bind="slotProps"
                        height="100%"
                        theme="idea-light"
                        v-model="monacoEditorCode"
                        :language="activeTabConfig?.language"
                        :save-view-state="true"
                        :path="state.activeTab"
                        :options="{ contextmenu: false }"
                        :onMount="initEditor"
                        :onChange="codeChange"
                        :onValidate="codeValidate"
                    />
                </template>
            </SplitPane>
        </div>
    </div>
</template>

<style scoped>
.block-container {
    border: 1px solid #ccc;
    font-size: 12px;
    height: 100%;
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
    overflow: auto;
}

.flex-item-fixed {
    flex-shrink: 0;
}

.block-tabs {
    background-color: #f5f5f6;
}

.block-tabs-title {
    box-sizing: border-box;
    padding: 6px 12px;
    border-top: 1px solid #dfe1e6;
    cursor: pointer;
}

.block-tabs-title:first-child {
    border-top: none;
}

.block-tabs-title:last-child {
    border-bottom: 1px solid #dfe1e6;
}

.block-tabs-title:hover {
    color: #5e7ce0;
}

.block-tabs-title-active {
    background-color: white;
    color: #5e7ce0;
    border-left: 2px solid #5e7ce0;
    padding-left: 10px;
}
</style>
