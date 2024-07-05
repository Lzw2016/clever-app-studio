<script setup lang="ts">
import lodash from "lodash";
import { computed, getCurrentInstance, onUnmounted, reactive, watch } from "vue";
import { editor } from "monaco-editor";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { loader, VueMonacoEditor } from "@guolao/vue-monaco-editor";
import { hasValue, isFun, noValue } from "@/utils/Typeof";
import { defOptions, keyBinding, registerTheme } from "@/utils/MonacoEditorUtils";

export type MonacoType = typeof Monaco;
loader.config({
    paths: {
        vs: globalConfig.useExternalLib.monacoEditor?.vs ?? 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs',
    },
    "vs/nls": { availableLanguages: { "*": "zh-cn" } },
});

// 定义组件选项
defineOptions({
    name: 'MonacoEditor',
});

// 当前组件对象
const instance = getCurrentInstance();
// 双向绑定的 value 属性
const value = defineModel<string>();

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
    onBeforeMount?: (monaco: MonacoType) => void;
    /** 编辑器实例创建后执行 */
    onMount?: (editor: editor.IStandaloneCodeEditor, monaco: MonacoType) => void;
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
    /** MonacoEditor实例是否创建 */
    editorMounted: boolean;
}

// state 属性
const state = reactive<MonacoEditorState>({
    editorMounted: false,
});
// 内部数据
const data = {
    uniquePath: lodash.uniqueId("auto_file_"),
    monaco: undefined as (MonacoType | undefined),
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    viewStates: new Map<string | undefined, editor.ICodeEditorViewState | null>(),
    editorModels: new Set<editor.ITextModel>(),
};

const dynamicProps = computed<any>(() => {
    if (state.editorMounted) {
        // 已初始化
        return {
            defaultValue: props.defaultValue,
            defaultLanguage: props.defaultLanguage,
            defaultPath: props.defaultPath ?? data.uniquePath,
        };
    } else {
        // 未初始化
        return {
            defaultValue: props.defaultValue ?? value.value,
            defaultLanguage: props.defaultLanguage ?? props.language,
            defaultPath: props.defaultPath ?? props.path ?? data.uniquePath,
        };
    }
});

function updateValue(val: string) {
    if (val === value.value) return;
    value.value = val;
}

function onBeforeMount(monaco: MonacoType) {
    data.monaco = monaco;
    registerTheme(monaco);
    const that = instance?.proxy;
    if (isFun(props.onBeforeMount)) {
        props.onBeforeMount.call(that, monaco);
    }
}

function onMount(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    state.editorMounted = true;
    data.monacoEditor = editor;
    const model = editor.getModel();
    if (model) data.editorModels.add(model);
    if (hasValue(props.line)) editor.revealLine(props.line);
    keyBinding(editor, monaco);
    const that = instance?.proxy;
    if (isFun(props.onMount)) {
        props.onMount.call(that, editor, monaco);
    }
}

onUnmounted(() => {
    data.editorModels.forEach(model => model.dispose());
    data.editorModels.clear();
});

// fix bug: https://github.com/imguolao/monaco-vue/issues/65
// 参考: https://github.com/imguolao/monaco-vue/blob/main/packages/editor/src/components/Editor.ts
watch(
    [
        () => props.path,
        () => props.language,
        () => value.value,
        () => props.line,
    ],
    ([newPath, newLanguage, newValue, newLine], [oldPath, oldLanguage, oldValue, oldLine]) => {
        // 读取数据
        const { defaultPath, defaultLanguage, defaultValue, saveViewState } = props;
        const { monaco, monacoEditor, viewStates } = data;
        // 校验
        if (!monaco) {
            console.warn("Monaco 还未加载完成!")
            return;
        }
        if (!monacoEditor) {
            console.warn("MonacoEditor 还未创建!")
            return;
        }
        // 获取当前编辑器Model
        const currentModel = monacoEditor.getModel();
        const currOrNewModel = getOrCreateModel(
            monaco,
            newValue ?? defaultValue,
            newLanguage ?? defaultLanguage,
            newPath ?? defaultPath ?? data.uniquePath,
        );
        // 创建新的编辑器Model
        if (currentModel !== currOrNewModel) {
            data.editorModels.add(currOrNewModel);
            // 保存编辑器状态
            if (saveViewState) viewStates.set(oldPath, monacoEditor.saveViewState());
            // 设置新的编辑器Model
            monacoEditor.setModel(currOrNewModel);
            // 还原编辑器
            if (saveViewState) {
                const viewState = viewStates.get(newPath) ?? null;
                monacoEditor.restoreViewState(viewState);
            }
            return;
        }
        // 更新 value
        if (monacoEditor.getValue() !== newValue) monacoEditor.setValue(newValue ?? '');
        // 更新 language
        if (newLanguage !== oldLanguage) monaco.editor.setModelLanguage(currentModel, newLanguage ?? '');
        // 更新 line
        if (newLine !== oldLine && hasValue(newLine)) monacoEditor.revealLine(newLine);
    },
);

// 参考: https://github.com/imguolao/monaco-vue/blob/main/packages/editor/src/utils/index.ts
function getOrCreateModel(monaco: MonacoType, value?: string, language?: string, path?: string) {
    if (noValue(value)) value = "";
    if (noValue(path)) path = "unknown";
    const model = getModel(monaco, path);
    if (model) return model;
    return createModel(monaco, value, language, path);
}

function getModel(monaco: MonacoType, path: string) {
    const uri = createModelUri(monaco, path);
    return monaco.editor.getModel(uri);
}

function createModel(monaco: MonacoType, value: string, language?: string, path?: string) {
    const uri = path ? createModelUri(monaco, path) : undefined;
    return monaco.editor.createModel(value, language, uri);
}

function createModelUri(monaco: MonacoType, path: string) {
    return monaco.Uri.parse(path);
}
</script>

<template>
    <VueMonacoEditor
        @update:value="updateValue"
        v-bind="{
            theme: props.theme,
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
            ...dynamicProps,
        }"
    />
</template>

<style scoped>

</style>
