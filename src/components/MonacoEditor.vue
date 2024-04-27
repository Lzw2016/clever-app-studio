<script setup lang="ts">
import lodash from "lodash";
import { defineModel, getCurrentInstance, reactive } from "vue";
import type { editor } from "monaco-editor";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { loader, VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { isFun } from "@/utils/Typeof";
import { defOptions, keyBinding } from "@/utils/MonacoEditorUtils";

type MonacoEditor = typeof Monaco;
loader.config({
    paths: {
        vs: globalConfig.useExternalLib.monacoEditor?.vs ?? 'https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs',
    },
    "vs/nls": { availableLanguages: { "*": "zh-cn" } },
});

// 定义组件选项
defineOptions({
    name: 'MonacoEditor',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface MonacoEditorProps {
    /** 当前编辑器的默认值 */
    defaultValue?: string;
    /** 当前编辑器的语言 */
    language?: string;
    /** 当前编辑器的默认语言 */
    defaultLanguage?: string;
    /** 当前编辑器的路径 */
    path?: string;
    /** 当前编辑器的默认路径 */
    defaultPath?: string;
    /** 主题 */
    theme?: string;
    /** 可以设置要跳到行数 */
    line?: number;
    /** IStandaloneEditorConstructionOptions */
    options?: editor.IStandaloneEditorConstructionOptions;
    /** IEditorOverrideServices */
    overrideServices?: editor.IEditorOverrideServices;
    /** 编辑器 model 变更后，保存 model 的视图状态(滚动位置等)，需要给每个 model 配置唯一 path */
    saveViewState?: boolean;
    /** 容器宽度 */
    width?: number | string;
    /** 容器高度 */
    height?: number | string;
    /** 内层容器 class */
    className?: string;
    /** 编辑器实例创建前执行 */
    onBeforeMount?: (monaco: MonacoEditor) => void;
    /** 编辑器实例创建后执行 */
    onMount?: (editor: editor.IStandaloneCodeEditor, monaco: MonacoEditor) => void;
    /** 编辑改变值后执行 */
    onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
    /** 当语法发生错误时执行 */
    onValidate?: (markers: editor.IMarker[]) => void;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<MonacoEditorProps>(), {
    theme: "vs",
    saveViewState: true,
    width: "100%",
    height: "100%",
});

// 定义 State 类型
interface MonacoEditorState {
}

// state 属性
const state = reactive<MonacoEditorState>({});
// 内部数据
const data = {};

const model = defineModel<string | undefined>();

function onBeforeMount(monaco: MonacoEditor) {
    const that = instance?.proxy;
    if (isFun(props.onBeforeMount)) {
        props.onBeforeMount.call(that, monaco);
    }
}

function onMount(editor: editor.IStandaloneCodeEditor, monaco: MonacoEditor) {
    keyBinding(editor, monaco);
    const that = instance?.proxy;
    if (isFun(props.onMount)) {
        props.onMount.call(that, editor, monaco);
    }
}
</script>

<template>
    <VueMonacoEditor
        v-model:value="model"
        v-bind="{
            defaultValue: props.defaultValue,
            language: props.language,
            defaultLanguage: props.defaultLanguage,
            path: props.path,
            defaultPath: props.defaultPath,
            theme: props.theme,
            line: props.line,
            options: lodash.defaultsDeep(props.options, defOptions),
            overrideServices: props.overrideServices,
            saveViewState: props.saveViewState,
            width: props.width,
            height: props.height,
            className: props.className,
            onBeforeMount: onBeforeMount,
            onMount: onMount,
            onChange: props.onChange,
            onValidate: props.onValidate,
        }"
    />
</template>

<style scoped>

</style>
