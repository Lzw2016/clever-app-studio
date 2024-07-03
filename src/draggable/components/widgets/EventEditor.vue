<script setup lang="ts">
import { computed, nextTick, shallowReactive, watch } from "vue";
import { Input, Option, OptionGroup, Select, Tree } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faTrashCan, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import type { editor } from "monaco-editor";
import { hasValue } from "@/utils/Typeof";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane, { Collapsed } from "@/components/SplitPane.vue";
import { RuntimeBlock, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { runtimeNodeToTreeNode, TreeNode } from "@/draggable/utils/BlockPropsTransform";
import { CodeExample } from "@/draggable/types/Base";
import { ComponentMeta, EventGroup, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { codeToString, funToString } from "@/draggable/utils/Utils";
import { getAllListener, getEventGroups, getEventTitle, getNodeComponentMeta } from "@/draggable/utils/EventUtils";

// 定义组件选项
defineOptions({
    name: 'EventEditor',
});

// 定义 Props 类型
interface EventEditorProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState?: DesignerState;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<EventEditorProps>(), {});

// 定义 State 类型
interface EventEditorState {
    /** 当前选中的大纲树节点 */
    selectRuntimeNode?: RuntimeNode;
    /** 当前选择的监听事件 */
    selectListener?: ListenerInfo;
    /** 当前选择的示例代码 */
    selectExample?: CodeExample;
    /** 示例代码折叠状态 */
    exampleCollapsed: Collapsed;
}

// state 属性
const state = shallowReactive<EventEditorState>({
    selectRuntimeNode: undefined,
    selectListener: undefined,
    selectExample: undefined,
    exampleCollapsed: "two",
});
// 内部数据
const data = {
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    lastExampleCollapsed: state.exampleCollapsed,
};
// 大纲树数据节点
const outlineTreeNodes = computed<Array<TreeNode<RuntimeNode>>>(() => getOutlineTreeNodes(props.designerState?.blockInstance?.globalContext?.runtimeBlock));
// 当前选择组件支持的事件分组
const eventGroups = computed<Array<EventGroup>>(() => {
    const componentMeta = getNodeComponentMeta(props.designerEngine.componentManage, state.selectRuntimeNode)
    if (!componentMeta?.setter?.events) return [];
    return getEventGroups(componentMeta.setter.events, state.selectRuntimeNode);
});
// 所有的事件监听器
const allListener = computed<Array<ListenerInfo>>(() => getAllListener(eventGroups.value, state.selectRuntimeNode));
// 存在选中的纲树节点
const existsSelectRuntimeNode = computed<boolean>(() => hasValue(state.selectRuntimeNode));
// 存在选中的监听事件
const existsSelectListener = computed<boolean>(() => hasValue(state.selectListener));
// 存在示例代码
const existsExampleCode = computed<boolean>(() => hasValue(state.selectListener?.funMeta?.examples) && state.selectListener.funMeta.examples.length > 0);

// 选中事件变化
watch(() => state.selectListener, listenerInfo => {
    if (!data.monacoEditor) return;
    if (listenerInfo?.funInfo) {
        const funInfo = { ...listenerInfo.funInfo };
        if (!funInfo.name) funInfo.name = "anonymous";
        data.monacoEditor.setValue(funToString(funInfo));
        // 格式化代码
        data.monacoEditor.getAction('editor.action.formatDocument')?.run();
    } else {
        data.monacoEditor.setValue('');
    }
});

// 不存在示例代码 -> 收起示例代码
watch(existsExampleCode, value => {
    if (value) {
        state.exampleCollapsed = data.lastExampleCollapsed;
    } else {
        data.lastExampleCollapsed = state.exampleCollapsed;
        state.exampleCollapsed = "two";
    }
});

function getOutlineTreeNodes(runtimeBlock?: RuntimeBlock): Array<TreeNode<RuntimeNode>> {
    if (!runtimeBlock) return [];
    return runtimeNodeToTreeNode(runtimeBlock);
}

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    data.monacoEditor = editor;
    // editor.addAction({
    //     id: 'saveCode',
    //     label: '保存代码',
    //     keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    //     run: function () {
    //     },
    // });
}

function selectOutlineNodeChange(data: TreeNode<RuntimeNode>, currentNode: any) {
    state.selectRuntimeNode = data.data;
    nextTick(() => {
        if (allListener.value.length > 0) {
            selectListenerChange(allListener.value[0]);
        } else {
            state.selectListener = undefined;
        }
    });
}

function selectListenerChange(listenerInfo: ListenerInfo) {
    state.selectListener = listenerInfo;
    nextTick(() => {
        if (listenerInfo.funMeta?.examples && listenerInfo.funMeta.examples.length > 0) {
            state.selectExample = listenerInfo.funMeta.examples[0];
        } else {
            state.selectExample = undefined;
        }
    });
}

function selectExampleChange(example: CodeExample) {
    state.selectExample = example;
}

function exampleCollapsedChange(collapsed) {
    state.exampleCollapsed = collapsed;
}

function getSelectComponentMeta(): ComponentMeta | undefined {
    return;
}

interface EventEditorExpose {
    /** 设置选中大纲树节点 */
    setSelectNode(nodeId: string, eventName: string): void;
}

defineExpose<EventEditorExpose>({
    setSelectNode(nodeId: string, eventName: string): void {
    },
});
</script>

<template>
    <SplitPane
        class="event-container"
        style="height: 100%;"
        layout="H"
        fixed-pane="one"
        :fixed-pane-def-size="200"
        :fixed-pane-min-size="100"
        :fixed-pane-max-size="300"
        :one-collapse="true"
        :two-collapse="false"
        :custom-two-pane="true"
    >
        <template #onePane>
            <div class="flex-column-container" style="height: 100%;">
                <div class="flex-item-fixed panel-title">大纲树</div>
                <Tree
                    class="flex-item-fill"
                    :data="outlineTreeNodes"
                    :show-line="false"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    size="small"
                    :indent="12"
                    :current-node-key="state.selectRuntimeNode?.id"
                    @current-change="selectOutlineNodeChange"
                />
            </div>
        </template>
        <template #twoPane="slotProps">
            <SplitPane
                v-bind="slotProps"
                style="height: 100%;overflow: hidden;"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="220"
                :fixed-pane-min-size="150"
                :fixed-pane-max-size="300"
                :one-collapse="false"
                :two-collapse="false"
                :custom-one-pane="true"
                :custom-two-pane="true"
            >
                <template #onePane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div class="flex-item-fixed panel-title">已监听事件</div>
                        <div v-show="existsSelectRuntimeNode" class="flex-item-fixed flex-row-container panel-tools" style="align-items: center;">
                            <div class="flex-item-fill" style="padding-right: 8px;overflow: hidden;">
                                <Input size="mini" placeholder="过滤事件" style="min-width: 60px;max-width: 150px;"/>
                            </div>
                            <div class="flex-item-fixed"/>
                            <div class="flex-item-fixed panel-tools-button" title="新增">
                                <Select
                                    :filterable="false"
                                    :top-create="false"
                                    :is-drop-inherit-width="true"
                                    :drop-style="{
                                        width: '240px',
                                        height: '500px',
                                        'min-height': '500px',
                                        'max-height': '500px',
                                    }"
                                >
                                    <template #reference>
                                        <FontAwesomeIcon :icon="faPlus"/>
                                    </template>
                                    <OptionGroup v-for="group in eventGroups" :key="group.title" :label="group.title" :disabled="group.disabled ?? false">
                                        <Option v-for="item in group.items" :key="item.name" :value="item.name" :disabled="item.disabled ?? false">
                                            <div class="text-ellipsis" style="max-width: 260px;">
                                                {{ item.name }}-{{ item.title }}
                                            </div>
                                            <!-- {{ item.disabled ? '(已监听)' : '' }} -->
                                        </Option>
                                    </OptionGroup>
                                </Select>
                            </div>
                            <div class="flex-item-fixed panel-tools-button" title="删除">
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                        <div v-show="existsSelectRuntimeNode" class="flex-item-fill">
                            <div
                                v-for="item in allListener"
                                :class="{
                                    'text-ellipsis': true,
                                    'event-item': true,
                                    'event-item-active': state.selectListener === item,
                                }"
                                @click="selectListenerChange(item)"
                            >
                                <span>
                                    {{ getEventTitle(item) }}
                                </span>
                            </div>
                        </div>
                        <div v-show="!existsSelectRuntimeNode" class="flex-item-fill"></div>
                    </div>
                </template>
                <template #twoPane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div class="flex-item-fixed panel-title">代码</div>
                        <div v-show="existsSelectListener" class="flex-item-fixed editor-tips">
                            <table class="editor-tips-table" style="width: 100%;">
                                <tbody>
                                <tr>
                                    <td class="editor-tips-title">说明</td>
                                    <td>
                                        <template v-if="hasValue(state.selectListener?.funMeta?.description) || hasValue(state.selectListener?.funMeta?.docLink)">
                                            <span v-if="hasValue(state.selectListener?.funMeta?.description)" style="margin-right: 4px;">
                                                {{ state.selectListener?.funMeta?.description }}
                                            </span>
                                            <a
                                                v-if="hasValue(state.selectListener?.funMeta?.docLink)"
                                                class="editor-doc-link" target="_blank"
                                                title="查看文档"
                                                :href="state.selectListener?.funMeta?.docLink"
                                            >
                                                <FontAwesomeIcon :icon="faUpRightFromSquare"/>
                                            </a>
                                        </template>
                                        <template v-else>-</template>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="editor-tips-title">参数</td>
                                    <td>
                                        <template v-if="state.selectListener?.funMeta?.params && state.selectListener.funMeta.params.length>0">
                                            <div v-for="(item, idx) in state.selectListener?.funMeta?.params">
                                                {{ idx + 1 }}.
                                                <span class="params-name">{{ item.name }}:</span>
                                                <span class="params-type">{{ item.type ?? 'any' }}</span>
                                                <span v-if="hasValue(item.note)" class="params-desc">{{ item.note }}</span>
                                            </div>
                                        </template>
                                        <template v-else>-</template>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="editor-tips-title">返回值</td>
                                    <td>{{ state.selectListener?.funMeta?.return ?? '-' }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <SplitPane
                            v-show="existsSelectListener"
                            class="flex-item-fill"
                            layout="V"
                            fixed-pane="two"
                            :fixed-pane-def-size="200"
                            :fixed-pane-min-size="100"
                            :fixed-pane-max-size="350"
                            :one-collapse="false"
                            :two-collapse="true"
                            :force-hide-one-collapse="!existsExampleCode"
                            :custom-one-pane="true"
                            :custom-two-pane="true"
                            :collapsed="state.exampleCollapsed"
                            @collapsedChange="exampleCollapsedChange"
                        >
                            <template #onePane="slotProps">
                                <MonacoEditor
                                    v-bind="slotProps"
                                    height="20px"
                                    theme="idea-light"
                                    default-language="javascript"
                                    :options="{ contextmenu: false }"
                                    :onMount="initEditor"
                                />
                            </template>
                            <template #twoPane="slotProps">
                                <div v-bind="slotProps" class="editor-examples flex-column-container">
                                    <div class="flex-item-fixed panel-title">使用示例</div>
                                    <div class="flex-item-fill flex-row-container">
                                        <div v-show="existsExampleCode" class="flex-item-fixed" style="border-right: 1px solid #e1e1e1;min-width: 100px;max-width: 300px;">
                                            <div
                                                v-for="(item, idx) in state.selectListener?.funMeta?.examples"
                                                :class="{
                                                    'text-ellipsis': true,
                                                    'examples-item': true,
                                                    'examples-item-active': state.selectExample === item,
                                                }"
                                                @click="selectExampleChange(item)"
                                                :title="item.description"
                                            >
                                                {{ idx + 1 }}. {{ item.title }}
                                            </div>
                                        </div>
                                        <div v-show="existsExampleCode" class="flex-item-fill">
                                            <MonacoEditor
                                                height="100%"
                                                theme="idea-light"
                                                default-language="javascript"
                                                :options="{ contextmenu: false, readOnly: true }"
                                                :value="codeToString(state.selectExample?.code)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </SplitPane>
                        <div v-show="!existsSelectListener" class="flex-item-fill"></div>
                    </div>
                </template>
            </SplitPane>
        </template>
    </SplitPane>
</template>

<style scoped>
.event-container {
    border: 1px solid #ccc;
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

.panel-title {
    background-color: #efefef;
    padding: 4px 8px;
    border-bottom: 1px solid #e1e1e1;
    font-size: 12px;
    font-weight: bold;
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

.event-item {
    padding: 6px 4px;
    border-bottom: 1px solid #e1e1e1;
    color: #252b3a;
    font-size: 12px;
}

.event-item:hover {
    background-color: #f2f5fc;
    cursor: pointer;
}

.event-item-active {
    background-color: #e9edfa;
}

.event-item-active:hover {
    background-color: #e9edfa;
}

.editor-tips {
    font-size: 12px;
    max-height: 150px;
    border-bottom: 1px solid #c2c2c2;
    /* padding: 4px; */
}

.editor-tips-table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    color: #252b3a;
    /* border: 1px solid #cbcbcb; */
}

.editor-tips-table > tbody > tr > td {
    border-left: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    font-size: inherit;
    margin: 0;
    overflow: visible;
    padding: 4px 8px;
    background-color: transparent;
}

.editor-tips-table > tbody > tr:last-child > td {
    border-bottom-width: 0;
}

.editor-tips-table > tbody > tr > td:first-child {
    border-left-width: 0;
}

.editor-tips-title {
    width: 60px;
    text-align: right;
}

.params-name {
    margin-right: 4px;
}

.params-type {
    margin-right: 4px;
}

.params-desc {
    margin-left: 4px;
}

.editor-doc-link {
    color: #5e7ce0;
}

.editor-examples {
    font-size: 12px;
}

.examples-item {
    padding: 6px 4px;
    border-bottom: 1px solid #e1e1e1;
    color: #252b3a;
    font-size: 12px;
}

.examples-item:hover {
    background-color: #f2f5fc;
    cursor: pointer;
}

.examples-item-active {
    background-color: #e9edfa;
}

.examples-item-active:hover {
    background-color: #e9edfa;
}
</style>
