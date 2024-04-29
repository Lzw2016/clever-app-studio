<script setup lang="ts">
import lodash from "lodash";
import { computed, defineModel, nextTick, reactive } from "vue";
import { Alert, Button, Modal, Select, Tooltip } from "@opentiny/vue";
import { layer } from "@layui/layer-vue";
import type { editor } from "monaco-editor";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import { ComponentStyle } from "@/draggable/types/ComponentMeta";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { toInlineStyle, toObjectStyle } from "@/draggable/utils/StyleUtils";
import CodeSvg from "@/assets/images/code.svg?component";
import { noValue } from "@/utils/Typeof";

// 定义组件选项
defineOptions({
    name: 'ComponentStyles',
});

// 自定义事件类型
const emit = defineEmits<{
    updateStyle: [style: Record<string, any>];
}>();

// 定义 Props 类型
interface ComponentStylesProps {
    node: RuntimeNode;
    componentStyles?: Array<ComponentStyle>;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ComponentStylesProps>(), {});

// 定义 State 类型
interface ComponentStylesState {
    showStyleModal: boolean;
    style?: string;
    monacoEditorHeight?: number;
}

// state 属性
const state = reactive<ComponentStylesState>({
    showStyleModal: false,
});
// 内部数据
const data = {
    styleHasErr: false,
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    setTimeoutClearId: undefined as any,
};

// css display 值
const model = defineModel<string | undefined>();

const componentStyles = computed(() => toSelectOptions(props.componentStyles));

function toSelectOptions(componentStyles: Array<ComponentStyle> | undefined) {
    if (!componentStyles) return [];
    return componentStyles.filter(item => !!item).map(item => ({ label: item.name, value: item.class }));
}

function showStyleModal() {
    let style = props.node.props.style;
    const tab = "    ";
    const inlineStyle: Array<string> = [];
    if (style) {
        style = toInlineStyle(style);
        for (let key in style) {
            const value = style[key];
            if (noValue(value) || lodash.trim(value).length <= 0) continue;
            inlineStyle.push(`${tab}${key}: ${value};`);
        }
    }
    inlineStyle.push(tab);
    inlineStyle.push(tab);
    inlineStyle.push(tab);
    state.style = `:root {\n${inlineStyle.join("\n")}\n}\n`;
    state.showStyleModal = true;
    const lineNumber = inlineStyle.length - 1;
    const column = tab.length + 1;
    nextTick(() => {
        if (data.setTimeoutClearId) clearTimeout(data.setTimeoutClearId);
        data.setTimeoutClearId = setTimeout(() => {
            data.monacoEditor?.focus();
            data.monacoEditor?.revealLine(lineNumber);
            data.monacoEditor?.setPosition({ lineNumber, column });
        }, 300);
    });
}

function onValidate(markers: editor.IMarker[]) {
    data.styleHasErr = markers.length > 0;
}

function saveStyle() {
    if (data.styleHasErr) {
        layer.msg("内联样式存在语法错误", { time: 1500 });
        return false;
    }
    const inlineStyle = lodash.trim(state.style);
    // :root    匹配包含 :root 的部分
    // \s*      匹配任意数量的空白字符(包括空格、制表符、换行符等)
    // \{       匹配文本 {
    // ([^}]*)  使用捕获组来匹配任意数量的非 } 字符。这是一个懒惰匹配，意味着它将尽可能少地匹配字符，直到遇到第一个 }
    // \}       匹配文本 }
    const match = inlineStyle.match(/^:root\s*\{([^}]*)}$/);
    if (match && match[1]) {
        const style = toObjectStyle(lodash.trim(match[1]));
        emit("updateStyle", style);
        return true;
    } else {
        layer.msg("不要修改“:root { ... }”格式", { time: 1500 });
        return false;
    }
}

function saveStyleAndClose() {
    if (saveStyle()) {
        state.showStyleModal = false;
    }
}

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    data.monacoEditor = editor;
    editor.addAction({
        id: 'applyStyle',
        label: '应用内联样式',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function () {
            saveStyle();
        },
    });
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="编辑当前选中节点的内联样式代码">
                    <span class="setter-label-tips">内联样式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div class="setter-row-input-radio flex-row-container flex-center" title="编辑内联样式" @click="showStyleModal">
                    <CodeSvg style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div v-if="componentStyles.length>0" class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="使用组件提供的内置样式">
                    <span class="setter-label-tips">内置样式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input">
                <Select v-model="model" :options="componentStyles" size="mini" :clearable="true" placeholder="选择内置样式"/>
            </div>
        </div>
        <Modal
            :modelValue="state.showStyleModal"
            height="60%"
            width="50%"
            min-height="350px"
            min-width="500px"
            :esc-closable="true"
            title="编辑节点内联样式"
            :show-footer="true"
            @cancel="state.showStyleModal=false"
            @hide="state.showStyleModal=false"
            @close="state.showStyleModal=false"
        >
            <div class="flex-column-container" style="width: 100%; height: 100%;">
                <Alert class="flex-item-fixed" :closable="false" type="info">
                    <template #description>
                        <div>
                            内联样式直接写在<span>“:root { ... }”</span>中，不要修改<span>“:root { ... }”</span>格式，否则无法更新样式！
                            使用<span>“Ctrl + S”</span>快速应用样式。
                        </div>
                    </template>
                </Alert>
                <MonacoEditor
                    class="flex-item-fill"
                    style="border: 1px solid #c2c2c2;"
                    height="20px"
                    theme="idea-light"
                    v-model="state.style"
                    default-language="css"
                    :options="{ contextmenu: false }"
                    :onValidate="onValidate"
                    :onMount="initEditor"
                />
            </div>
            <template #footer>
                <Button :type="'primary'" @click="saveStyleAndClose">确定</Button>
            </template>
        </Modal>
    </div>
</template>

<style scoped>
.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.flex-item-fixed {
    flex-shrink: 0;
}

.flex-center {
    align-items: center;
    justify-content: center;
}

.setter-label-tips {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dashed;
}

.setter-row {
    height: 24px;
    margin-bottom: 12px;
    align-items: center;
}

.setter-row:last-child {
    margin-bottom: 0;
}

.setter-row-label {
    width: 55px;
}

.setter-row-input {
    overflow: hidden;
}

.setter-row-input-radio {
    padding: 2px 4px;
    margin: 2px 2px;
    cursor: pointer;
    border: 1px solid #c4c6cf;
    box-sizing: border-box;
}

.setter-row-input-radio:first-child {
    margin-left: 0;
}

.setter-row-input-radio:last-child {
    margin-right: 0;
}

.setter-row-input-radio:hover {
    background: #DFE1E6;
}

.setter-row-input-radio:active {
    background: #DFE1E6;
    color: #4f77ff;
}
</style>
