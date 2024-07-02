<script setup lang="ts">
import { computed, shallowReactive, watch } from "vue";
import { Input, Option, OptionGroup, Select, Tree } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import type { editor } from "monaco-editor";
import { hasValue, noValue } from "@/utils/Typeof";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane from "@/components/SplitPane.vue";
import { RuntimeBlock, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { runtimeNodeToTreeNode, TreeNode } from "@/draggable/utils/BlockPropsTransform";
import { ComponentMeta, EventGroup, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { getAllListener, getEventGroups, getEventTitle, getNodeComponentMeta } from "@/draggable/utils/EventUtils";
import { funToString } from "@/draggable/utils/Utils";

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
    /** 当前选中的大纲树数据节点key */
    selectRuntimeNode?: RuntimeNode;
    /** 当前选择的监听事件 */
    selectListener?: ListenerInfo;
}

// state 属性
const state = shallowReactive<EventEditorState>({
    selectRuntimeNode: undefined,
    selectListener: undefined,
});
// 内部数据
const data = {
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
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

watch(() => state.selectListener, listenerInfo => {
    console.log("listenerInfo", listenerInfo);
    if (!data.monacoEditor) return;
    if (listenerInfo?.funInfo) {
        const funInfo = { ...listenerInfo.funInfo };
        if (!funInfo.name) funInfo.name = "anonymous";
        data.monacoEditor.setValue(funToString(funInfo));
    } else {
        data.monacoEditor.setValue('');
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
    state.selectListener = undefined;
}

function selectListenerChange(listenerInfo: ListenerInfo) {
    // TODO 保存代码
    state.selectListener = listenerInfo;
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
            <div class="flex-column-container none-select" style="height: 100%;">
                <div class="flex-item-fixed panel-title">
                    大纲树
                </div>
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
                class="none-select"
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
                        <div class="flex-item-fixed panel-title">
                            已监听事件
                        </div>
                        <div class="flex-item-fixed flex-row-container panel-tools" style="align-items: center;">
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
                        <div class="flex-item-fill">
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
                    </div>
                </template>
                <template #twoPane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div v-show="hasValue(state.selectListener)" class="flex-item-fixed editor-tips">
                            111
                        </div>
                        <MonacoEditor
                            v-show="hasValue(state.selectListener)"
                            class="flex-item-fill"
                            height="20px"
                            theme="idea-light"
                            default-language="javascript"
                            :options="{ contextmenu: false }"
                            :onMount="initEditor"
                        />
                        <div v-show="hasValue(state.selectListener)" class="flex-item-fixed editor-doc flex-row-container">
                            <div class="flex-item-fixed" style="border-right: 1px solid #e1e1e1;min-width: 150px;max-width: 300px;">
                                <div class="text-ellipsis">示例1</div>
                                <div class="text-ellipsis">示例2</div>
                                <div class="text-ellipsis">示例3</div>
                            </div>
                            <div class="flex-item-fill">

                            </div>
                        </div>
                        <div v-show="noValue(state.selectListener)" class="flex-item-fill">
                            选择事件
                        </div>
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

.none-select {
    user-select: none;
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
    height: 50px;
    border-bottom: 1px solid #c2c2c2;
}

.editor-doc {
    height: 100px;
    border-top: 1px solid #c2c2c2;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
