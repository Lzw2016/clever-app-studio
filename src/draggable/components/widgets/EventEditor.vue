<script setup lang="ts">
import lodash from "lodash";
import { computed, getCurrentInstance, nextTick, ref, shallowReactive, watch } from "vue";
import { layer } from "@layui/layer-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown, faChevronUp, faPlus, faTrashCan, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, CheckboxGroup, Input, Option, OptionGroup, Select, Tree } from "@opentiny/vue";
import type { editor } from "monaco-editor";
import { hasValue } from "@/utils/Typeof";
import { randomUID } from "@/utils/IDCreate";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane, { Collapsed } from "@/components/SplitPane.vue";
import { RuntimeBlock, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { OutlineTreeNode, runtimeNodeToTreeNode } from "@/draggable/utils/DesignerUtils";
import { CodeExample } from "@/draggable/types/Base";
import { EventGroup, EventInfo, ListenerInfo } from "@/draggable/types/ComponentMeta";
import { RemoveListenerEvent } from "@/draggable/events/designer/RemoveListenerEvent";
import { AddListenerEvent } from "@/draggable/events/designer/AddListenerEvent";
import { UpdateListenerEvent } from "@/draggable/events/designer/UpdateListenerEvent";
import { codeToString, createFun, funToString, parseFun } from "@/draggable/utils/FunctionUtils";
import { addNodeListener, getAllListener, getEventGroups, getEventTitle, getNodeComponentMeta } from "@/draggable/utils/EventUtils";

// 定义组件选项
defineOptions({
    name: 'EventEditor',
});

// 当前组件对象
const instance = getCurrentInstance();

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
    /** 强制组件更新的响应式变量 */
    forceUpdateForModifiers: number;
    /** 强制组件更新的响应式变量 */
    forceUpdateForAllListener: number;
    /** 大纲树节点数据 */
    outlineTreeNodes: Array<OutlineTreeNode<RuntimeNode>>;
    /** 当前选中的大纲树节点 */
    selectRuntimeNode?: RuntimeNode;
    /** 当前选择的监听事件 */
    selectListener?: ListenerInfo;
    /** 是否显示事件文档 */
    showListenerDoc: boolean;
    /** 当前选择的示例代码 */
    selectExample?: CodeExample;
    /** 示例代码折叠状态 */
    exampleCollapsed: Collapsed;
    /** 过滤事件列表文本 */
    filterEventTxt: string;
}

// state 属性
const state = shallowReactive<EventEditorState>({
    forceUpdateForModifiers: 0,
    forceUpdateForAllListener: 0,
    outlineTreeNodes: [],
    selectRuntimeNode: undefined,
    selectListener: undefined,
    showListenerDoc: false,
    selectExample: undefined,
    exampleCollapsed: "two",
    filterEventTxt: "",
});
// 内部数据
const data = {
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    lastExampleCollapsed: state.exampleCollapsed,
    modifiers: [
        { label: 'stop', text: 'stop', title: '阻止事件继续传播' },
        { label: 'prevent', text: 'prevent', title: '阻止默认事件行为' },
        { label: 'self', text: 'self', title: '只有当事件是在该元素本身触发时才会调用事件处理函数' },
        { label: 'exact', text: 'exact', title: '精确控制触发事件所需的系统修饰符的组合' },
        { label: 'ctrl', text: 'ctrl', title: 'ctrl键被按下时才会调用事件处理函数' },
        { label: 'shift', text: 'shift', title: 'shift键被按下时才会调用事件处理函数' },
        { label: 'alt', text: 'alt', title: 'alt键被按下时才会调用事件处理函数' },
        { label: 'meta', text: 'meta', title: 'cmd键被按下时才会调用事件处理函数' },
        { label: 'left', text: 'left', title: '鼠标左键点击时才会调用事件处理函数' },
        { label: 'middle', text: 'middle', title: '鼠标中键点击时才会调用事件处理函数' },
        { label: 'right', text: 'right', title: '鼠标右键点击时才会调用事件处理函数' },
    ],
    startEditValue: "",
};
// 大纲树组件实例
const outlineTreeRef = ref<InstanceType<typeof Tree> | undefined>();
// 大纲树数据节点
watch(
    () => [props.designerState?.blockInstance?.globalContext?.runtimeBlock, props.designerState?.blockInstance?.ops.nodeChange.value],
    ([runtimeBlock, _]) => {
        if (!runtimeBlock) return [];
        state.outlineTreeNodes = getOutlineTreeNodes(runtimeBlock as RuntimeBlock);
    },
    {
        immediate: true,
    },
);
// 组件元数据
const componentMeta = computed(() => getNodeComponentMeta(props.designerEngine.componentManage, state.selectRuntimeNode));
// 当前选择组件支持的事件分组
const eventGroups = computed<Array<EventGroup>>(() => {
    const cmpMeta = componentMeta.value;
    if (!cmpMeta?.setter?.events) return [];
    // 读取“响应式变量”值
    state.forceUpdateForAllListener;
    return getEventGroups(cmpMeta.setter.events, state.selectRuntimeNode);
});
// 所有的事件监听器
const allListener = computed<Array<ListenerInfo>>(() => {
    // 读取“响应式变量”值
    state.forceUpdateForAllListener;
    return getAllListener(eventGroups.value, state.selectRuntimeNode);
});
// 显示的的事件监听器
const showListener = computed<Array<ListenerInfo>>(() => {
    let list = allListener.value;
    const search = state.filterEventTxt;
    if (search) {
        list = list.filter(item => {
            return item?.eventName?.includes(search)
                || item?.funMeta?.title?.includes(search)
                || item?.funMeta?.description?.includes(search);
        });
    }
    return list;
});
// 存在选中的纲树节点
const existsSelectRuntimeNode = computed<boolean>(() => hasValue(state.selectRuntimeNode));
// 存在选中的监听事件
const existsSelectListener = computed<boolean>(() => {
    let exists = hasValue(state.selectListener);
    if (exists) {
        exists = showListener.value.includes(state.selectListener!);
    }
    return exists;
});
// 存在示例代码
const existsExampleCode = computed<boolean>(() => hasValue(state.selectListener?.funMeta?.examples) && state.selectListener.funMeta.examples.length > 0);
// 函数修饰符值
const modifiers = computed<Array<string>>({
    get: () => {
        // 读取“响应式变量”值
        state.forceUpdateForModifiers;
        if (state.selectListener?.modifiers) {
            return [...state.selectListener.modifiers];
        }
        return [];
    },
    set: (newValue: Array<any>) => {
        if (!state.selectListener) return;
        if (!state.selectListener.modifiers) state.selectListener.modifiers = [];
        state.selectListener.modifiers.length = 0;
        state.selectListener.modifiers.push(...newValue);
        // 同步modifiers数据到RuntimeNode
        if (state.selectListener.rawListener.modifiers) {
            state.selectListener.rawListener.modifiers.length = 0;
            state.selectListener.rawListener.modifiers.push(...newValue);
        } else {
            state.selectListener.rawListener.modifiers = state.selectListener.modifiers;
        }
        state.forceUpdateForModifiers++;
    },
});

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

function getOutlineTreeNodes(runtimeBlock?: RuntimeBlock): Array<OutlineTreeNode<RuntimeNode>> {
    if (!runtimeBlock) return [];
    return runtimeNodeToTreeNode(runtimeBlock, props.designerEngine.componentManage);
}

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    data.monacoEditor = editor;
    editor.addAction({
        id: 'saveCode',
        label: '保存代码',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function () {
            try {
                updateListener();
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
            updateListener();
        } catch (err) {
            console.warn(err);
        }
    });
}

function selectOutlineNodeChange(data: OutlineTreeNode<RuntimeNode>, currentNode: any) {
    state.selectRuntimeNode = data.data;
    nextTick(() => selectListenerChange(allListener.value?.[0]));
}

function selectListenerChange(listenerInfo?: ListenerInfo) {
    state.selectListener = listenerInfo;
    if (!listenerInfo) return;
    nextTick(() => {
        if (listenerInfo?.funMeta?.examples && listenerInfo.funMeta.examples.length > 0) {
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

function removeListener() {
    const listenerInfo = state.selectListener;
    const node = state.selectRuntimeNode;
    if (!listenerInfo || !node || !existsSelectListener.value) {
        layer.msg("未选中事件函数");
        return;
    }
    const blockInstance = props.designerState?.blockInstance;
    if (!blockInstance) return;
    // 计算自动选择位置
    let idx = showListener.value.findIndex(item => item.eventName === listenerInfo.eventName);
    if (showListener.value.length <= (idx + 1)) idx--;
    idx = Math.max(0, idx);
    // 删除事件监听
    blockInstance.ops.removeListener(node.ref, listenerInfo.eventName);
    // 生产事件
    props.designerState.events.removeListener = new RemoveListenerEvent({
        nodeId: node.id,
        eventName: listenerInfo.eventName,
    });
    nextTick(() => selectListenerChange(showListener.value?.[idx]));
}

function addListener(eventInfo: EventInfo) {
    const node = state.selectRuntimeNode;
    const blockInstance = props.designerState?.blockInstance;
    if (!node || !blockInstance) return;
    addNodeListener(node.ref, eventInfo, blockInstance.ops);
    props.designerState.events.addListener = new AddListenerEvent({
        nodeId: node.id,
        eventInfo: eventInfo,
    });
}

function updateListener() {
    const node = state.selectRuntimeNode;
    const listener = state.selectListener;
    const blockInstance = props.designerState?.blockInstance;
    if (!node || !listener || !blockInstance) {
        throw new Error("函数代码保存失败: 未选择渲染节点");
    }
    const editor = data.monacoEditor;
    if (!editor) return;
    const funCode = lodash.trim(editor.getValue());
    const oldFunCode = lodash.trim(Function.prototype.toString.call(listener.rawListener.handler));
    if (funCode === oldFunCode) {
        return;
    }
    // 解析函数
    const funInfo = funCode.length > 0 ? parseFun(funCode) : {
        async: false,
        name: randomUID(`${listener.eventName}_`, 8),
        params: (listener.funMeta?.params ?? []).map(item => item.name),
        body: `// ${listener.funMeta?.title ?? ''}`,
        lambda: false,
    };
    if (!funInfo) {
        throw new Error(`函数代码语法错误: ${funCode}`);
    }
    let fun: any;
    try {
        fun = createFun(funInfo);
    } catch (err) {
        throw new Error(`函数代码语法错误: ${funInfo.body}`, { cause: err });
    }
    blockInstance.ops.bindListener(
        node.ref,
        listener.eventName,
        {
            handler: fun,
            modifiers: listener.modifiers,
        },
        {
            cancelRender: false,
            override: true,
        },
    );
    // 生产事件
    props.designerState.events.updateListener = new UpdateListenerEvent({
        nodeId: node.id,
        eventName: listener.eventName,
    });
}

function setSelectNode(nodeId: string, eventName: string) {
    if (!outlineTreeRef.value) return;
    outlineTreeRef.value?.setCurrentKey(nodeId);
    const node = outlineTreeRef.value?.getNode(nodeId);
    state.selectRuntimeNode = node?.data?.data;
    nextTick(() => selectListenerChange(allListener.value?.find(item => item.eventName === eventName)));
}

function recalcAllListener(nodeId: string, eventName: string) {
    const { selectRuntimeNode, selectListener } = state;
    if (!selectRuntimeNode || selectRuntimeNode.id !== nodeId) return;
    state.forceUpdateForAllListener++;
    if (selectListener?.eventName === eventName) {
        nextTick(() => selectListenerChange(allListener.value?.find(item => item.eventName === eventName)));
    }
}

interface EventEditorExpose {
    /** 设置选中大纲树节点 */
    setSelectNode(nodeId: string, eventName: string): void;

    /** 当 RuntimeNode 事件发生变化时，重新计算 allListener、selectListener 等属性 */
    recalcAllListener(nodeId: string, eventName: string): void;
}

defineExpose<EventEditorExpose>({
    setSelectNode,
    recalcAllListener,
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
                    ref="outlineTreeRef"
                    class="flex-item-fill"
                    node-key="id"
                    :data="state.outlineTreeNodes"
                    :show-line="false"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    size="small"
                    :indent="12"
                    :current-node-key="state.selectRuntimeNode?.id"
                    @current-change="selectOutlineNodeChange"
                >
                    <template #prefix="{ node }">
                        <span class="cmp-icon">
                            <component :is="node.data.icon"/>
                        </span>
                    </template>
                </Tree>
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
                                <Input v-model="state.filterEventTxt" size="mini" placeholder="过滤事件" :clearable="true" style="min-width: 60px;max-width: 150px;"/>
                            </div>
                            <div class="flex-item-fixed"/>
                            <div class="flex-item-fixed panel-tools-button" title="新增">
                                <Select
                                    popper-class="unmax-height"
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
                                        <Option v-for="item in group.items" :key="item.name" :value="item.name" :disabled="item.disabled ?? false" @click="addListener(item)">
                                            <div class="text-ellipsis" style="max-width: 260px;">
                                                {{ item.name }}-{{ item.title }}
                                            </div>
                                            <!-- {{ item.disabled ? '(已监听)' : '' }} -->
                                        </Option>
                                    </OptionGroup>
                                </Select>
                            </div>
                            <div class="flex-item-fixed panel-tools-button" title="删除" @click="removeListener">
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                        <div v-show="existsSelectRuntimeNode" class="flex-item-fill">
                            <div
                                v-for="item in showListener"
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
                        <div v-show="existsSelectListener" class="flex-item-fixed doc-gutter">
                            <span v-if="state.showListenerDoc" class="doc-gutter-button" @click="state.showListenerDoc = false">
                               <FontAwesomeIcon :icon="faChevronUp" style="font-size: 12px;"/>
                            </span>
                            <span v-else class="doc-gutter-button" @click="state.showListenerDoc = true">
                                <FontAwesomeIcon :icon="faChevronDown" style="font-size: 12px;"/>
                            </span>
                        </div>
                        <div v-show="state.showListenerDoc && existsSelectListener" class="flex-item-fixed editor-tips">
                            <table class="editor-tips-table" style="width: 100%;">
                                <tbody>
                                <tr>
                                    <td class="editor-tips-title">说明</td>
                                    <td>
                                        <template v-if="hasValue(state.selectListener?.funMeta?.description) || hasValue(state.selectListener?.funMeta?.docLink) || hasValue(componentMeta?.docLink)">
                                            <span v-if="hasValue(state.selectListener?.funMeta?.description)" style="margin-right: 4px;">
                                                {{ state.selectListener?.funMeta?.description }}
                                            </span>
                                            <a
                                                v-if="hasValue(state.selectListener?.funMeta?.docLink) || hasValue(componentMeta?.docLink)"
                                                class="editor-doc-link"
                                                target="_blank"
                                                title="查看文档"
                                                :href="state.selectListener?.funMeta?.docLink ?? componentMeta?.docLink"
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
                                <div v-bind="slotProps" class="flex-column-container">
                                    <div class="flex-item-fixed fun-modifiers flex-row-container" style="align-items: center;">
                                        <div class="flex-item-fixed">修饰符</div>
                                        <a
                                            class="flex-item-fixed modifiers-doc-link"
                                            target="_blank"
                                            title="查看文档"
                                            href="https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers"
                                        >
                                            <FontAwesomeIcon :icon="faUpRightFromSquare"/>
                                        </a>
                                        <CheckboxGroup class="flex-item-fill" type="checkbox" size="mini" v-model="modifiers">
                                            <Checkbox
                                                class="modifiers-item"
                                                v-for="item in data.modifiers"
                                                :label="item.label"
                                                :text="item.text"
                                                :title="item.title"
                                            />
                                        </CheckboxGroup>
                                    </div>
                                    <MonacoEditor
                                        class="flex-item-fill"
                                        height="100%"
                                        theme="idea-light"
                                        default-language="javascript"
                                        :options="{ contextmenu: false }"
                                        :onMount="initEditor"
                                    />
                                </div>
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

.cmp-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #303133;
    width: 20px;
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

.doc-gutter {
    height: 0;
    overflow: hidden;
}

.doc-gutter-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: #252b3a;
    cursor: pointer;
    z-index: 1;
    position: absolute;
    right: 24px;
    top: 4px;
    /* border: 1px solid #cbcbcb; */
}

.doc-gutter-button:hover {
    color: #5E7CE0;
}

.fun-modifiers {
    padding: 8px 0 8px 16px;
    font-size: 12px;
    border-bottom: 1px solid #cbcbcb;
}

.modifiers-item {
    /* width: 64px; */
    margin-right: 16px;
}

.modifiers-doc-link {
    display: flex;
    align-items: center;
    color: #5e7ce0;
    margin-left: 2px;
    margin-right: 16px;
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
