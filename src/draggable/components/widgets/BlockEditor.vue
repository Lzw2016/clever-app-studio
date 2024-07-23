<script setup lang="ts">
import lodash from "lodash";
import { computed, reactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { layer } from "@layui/layer-vue";
import type { editor } from "monaco-editor";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane from "@/components/SplitPane.vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { jsonStringify, runtimeNodeToJsCode } from "@/draggable/utils/DesignerUtils";
import { funToString, parseFun } from "@/draggable/utils/FunctionUtils";

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
    /** 强制组件更新的响应式变量 */
    forceUpdateEditor: number;
    /** 当前选中的叶签 */
    activeTab: string;
    /** 当前的计算属性列表 */
    computedList: Array<string>;
    /** 当前选中的计算属性 */
    selectComputed?: string;
}

// state 属性
const state = reactive<BlockEditorState>({
    forceUpdateEditor: 0,
    activeTab: "data",
    computedList: [],
    selectComputed: undefined,
});
// 内部数据
const data = {
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    tabsEnum: {
        data: "data",
        computed: "computed",
        watch: "watch",
        methods: "methods",
        lifeCycles: "lifeCycles",
        i18n: "i18n",
        meta: "meta",
        code: "code",
    },
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
            showEditor: true,
        },
        computed: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
            showEditor: true,
        },
        watch: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
            showEditor: true,
        },
        methods: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
            showEditor: true,
        },
        lifeCycles: {
            collapsed: '',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: false,
            language: "javascript",
            code: "",
            showEditor: true,
        },
        i18n: {
            collapsed: 'one',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: true,
            language: "json",
            code: "",
            showEditor: true,
        },
        meta: {
            collapsed: 'two',
            forceHideOneCollapse: true,
            forceHideTwoCollapse: false,
            language: "json",
            code: "",
            showEditor: true,
        },
        code: {
            collapsed: 'one',
            forceHideOneCollapse: false,
            forceHideTwoCollapse: true,
            language: "javascript",
            code: "",
            showEditor: true,
        },
    },
    startEditValue: "",
};
// 当前选中的叶签对应的配置
const activeTabConfig = computed<any>(() => {
    // // 读取“响应式变量”值
    // state.forceUpdateEditor;
    return data.tabsConfig[state.activeTab];
});
// 编辑器代码
const monacoEditorCode = computed<string>({
    get: () => {
        // 读取“响应式变量”值
        state.forceUpdateEditor;
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
const showComputed = computed<boolean>(() => state.activeTab === data.tabsEnum.computed);
const showWatch = computed<boolean>(() => state.activeTab === data.tabsEnum.watch);
const showMethods = computed<boolean>(() => state.activeTab === data.tabsEnum.methods);
const showLifeCycles = computed<boolean>(() => state.activeTab === data.tabsEnum.lifeCycles);
const showI18n = computed<boolean>(() => state.activeTab === data.tabsEnum.i18n);
const showMeta = computed<boolean>(() => state.activeTab === data.tabsEnum.meta);
const showCode = computed<boolean>(() => state.activeTab === data.tabsEnum.code);

// const selectComputedCode = computed<string>(() => {
//     if (!state.selectComputed) return '';
//     const computed = props.designerState?.blockInstance?.globalContext?.runtimeBlock?.computed;
//     if (!computed) return '';
//     const selectComputed = computed[state.selectComputed];
//     const funInfo = parseFun(selectComputed);
//     if (!funInfo) return '';
//     if (!funInfo.name) funInfo.name = "anonymous";
//     return funToString(funInfo);
// });

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    data.monacoEditor = editor;
    editor.addAction({
        id: 'saveCode',
        label: '保存代码',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function () {
            try {
                // TODO 更新内容
                layer.msg("保存成功", { time: 800 });
            } catch (err) {
                layer.msg("保存失败");
                console.warn(err);
            }
        },
    });
    // 获取焦点
    editor.onDidFocusEditorText(() => data.startEditValue = editor.getValue());
    // 丢失焦点
    editor.onDidBlurEditorText(() => {
        const oldValue = data.startEditValue;
        const value = editor.getValue();
        data.startEditValue = "";
        if (lodash.trim(oldValue) === lodash.trim(value)) {
            return;
        }
        try {
            // TODO 更新内容
        } catch (err) {
            console.warn(err);
        }
    });
}

function activeTabChange(tab: string) {
    state.activeTab = tab;
}

function computedChange(computed: string) {
    state.selectComputed = computed;
}

function codeChange(code: string) {
}

function codeValidate(markers: editor.IMarker[]) {
}

watch(
    () => [state.activeTab, props.designerEngine.showBlockEditorDialog],
    ([activeTab, show], oldValue) => {
        if (oldValue) {
            const [oldActiveTab, oldShow] = oldValue;
        }
        if (!show) return;
        const blockInstance = props.designerState?.blockInstance;
        const runtimeBlock = blockInstance?.globalContext?.runtimeBlock;
        if (activeTab === data.tabsEnum.data) {
            // 显示 数据
            data.tabsConfig.data.code = jsonStringify(runtimeBlock?.data);
            state.forceUpdateEditor++;
        } else if (activeTab === data.tabsEnum.computed) {
            // 显示 计算属性
            state.computedList.length = 0;
            if (runtimeBlock?.computed) {
                for (let name in runtimeBlock.computed) {
                    state.computedList.push(name);
                }
            }
            if (state.computedList.length > 0 && (!state.selectComputed || !state.computedList.includes(state.selectComputed))) {
                state.selectComputed = state.computedList[0];
            }
            state.forceUpdateEditor++;
        } else if (activeTab === data.tabsEnum.watch) {
            // 显示 侦听器

        } else if (activeTab === data.tabsEnum.methods) {
            // 显示 函数

        } else if (activeTab === data.tabsEnum.lifeCycles) {
            // 显示 生命周期

        } else if (activeTab === data.tabsEnum.i18n) {
            // 显示 多语言

        } else if (activeTab === data.tabsEnum.meta) {
            // 显示 元信息

        } else if (activeTab === data.tabsEnum.code) {
            // 显示 页面代码
            runtimeNodeToJsCode(runtimeBlock).then(code => {
                data.tabsConfig.code.code = code;
                state.forceUpdateEditor++;
            }).catch(err => {
                layer.msg("代码生成失败!");
                console.warn(err);
            });
        }
    },
    {
        immediate: true,
    },
);

watch(() => state.selectComputed, selected => {
    if (!showComputed.value) return;
    if (!selected) return;
    const computed = props.designerState?.blockInstance?.globalContext?.runtimeBlock?.computed;
    if (!computed) return;
    const selectComputed = computed[selected].__raw_fun;
    const funInfo = parseFun(selectComputed);
    if (!funInfo) return;
    if (!funInfo.name) funInfo.name = selected ?? "anonymous";
    data.tabsConfig.computed.code = funToString(funInfo);
    state.forceUpdateEditor++;
});

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
                :custom-one-pane="true"
                :custom-two-pane="true"
                :collapsed="activeTabConfig?.collapsed"
            >
                <template #onePane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div v-show="showComputed" class="flex-item-fixed flex-row-container panel-tools" style="align-items: center;">
                            <div class="flex-item-fill"/>
                            <div class="flex-item-fixed panel-tools-button" title="新增" @click="">
                                <FontAwesomeIcon :icon="faPlus"/>
                            </div>
                            <div class="flex-item-fixed panel-tools-button" title="删除" @click="">
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                        <div v-show="showComputed" class="flex-item-fill">
                            <div
                                v-for="item in state.computedList"
                                :class="{
                                    'text-ellipsis': true,
                                    'block-item': true,
                                    'block-item-active': state.selectComputed === item,
                                }"
                                @click="computedChange(item)"
                            >
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </template>
                <template #twoPane="slotProps">
                    <MonacoEditor
                        v-show="activeTabConfig?.showEditor"
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

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

.panel-tools {
    padding: 4px 8px;
    border-bottom: 1px solid #e1e1e1;
    overflow: hidden;
}

.panel-tools-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: 4px;
    color: #252b3a;
    cursor: pointer;
}

.panel-tools-button:hover {
    color: #5E7CE0;
}

.panel-tools-button:last-child {
    margin-right: 0;
}

.block-item {
    padding: 6px 4px;
    border-bottom: 1px solid #e1e1e1;
    color: #252b3a;
    font-size: 12px;
}

.block-item:hover {
    background-color: #f2f5fc;
    cursor: pointer;
}

.block-item-active {
    background-color: #e9edfa;
}

.block-item-active:hover {
    background-color: #e9edfa;
}
</style>
