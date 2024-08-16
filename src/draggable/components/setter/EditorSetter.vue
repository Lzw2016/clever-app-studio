<script setup lang="ts">
import lodash from "lodash";
import { computed, getCurrentInstance, nextTick, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import type { JSONSchema7 } from "json-schema";
import { Button, Input, Modal } from "@opentiny/vue";
import { layer } from "@layui/layer-vue";
import type { editor } from "monaco-editor";
import { isFun } from "@/utils/Typeof";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, jsonStringify, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'EditorSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface EditorSetterProps extends SetterProps {
    /** 对话框标题 */
    title?: string;
    /** 自定义“渲染节点属性值转换成编辑器字符串代码”逻辑 */
    valueTransform?: (value: any) => string | undefined;
    /** 把编辑器代码字符串转换成渲染节点属性值 */
    convertValue?: (value: string) => any;
    /** 限制输入的 json-schema 验证 */
    jsonSchema?: JSONSchema7;
    /** 启用 json-schema 验证 */
    jsonSchemaValidate?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<EditorSetterProps>(), {
    title: "编辑对象属性值",
    valueTransform: jsonStringify,
    convertValue: value => {
        let obj: any;
        if (value) {
            try {
                obj = JSON.parse(value);
            } catch (err) {
                layer.msg("json语法错误", { time: 1500 });
                return false;
            }
        }
        return obj;
    },
    jsonSchemaValidate: true,
});

// 定义 State 类型
interface EditorSetterState extends SetterState<string> {
    /** 是否显示对话框 */
    showModal: boolean;
}

// state 属性
const state = reactive<EditorSetterState>({
    showModal: false,
    ...getDefState(),
});
state.value = getValue<string>(props, state, props.valueTransform);
// 内部数据
const data = {
    hasErr: false,
    monacoEditor: undefined as (editor.IStandaloneCodeEditor | undefined),
    setTimeoutClearId: undefined as any,
};
// 设置器内部组件引用
const setter = ref<InstanceType<typeof MonacoEditor> | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, props.valueTransform);

const inputValue = computed<string>(() => {
    const value = lodash.trim(state.value)
    if (value) {
        return `已配置(${value.length}字符)`;
    }
    return "未配置";
});

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
    // 配置 json-schema 验证规则
    if (props.jsonSchema) {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: props.jsonSchemaValidate,
            schemaValidation: "error",
            schemas: [
                {
                    uri: "check-schema.json",
                    fileMatch: ["*.json"],
                    schema: props.jsonSchema,
                }
            ],
        });
    }
    // 初始化 editor
    data.monacoEditor = editor;
    editor.addAction({
        id: 'applyValue',
        label: '应用值',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function () {
            const success = setValue();
            if (success) layer.msg("保存成功", { time: 1500 });
        },
    });
}

function onValidate(markers: editor.IMarker[]) {
    data.hasErr = markers.length > 0;
}

function showModal() {
    state.showModal = true;
    nextTick(() => {
        if (data.setTimeoutClearId) clearTimeout(data.setTimeoutClearId);
        data.setTimeoutClearId = setTimeout(() => data.monacoEditor?.focus(), 300);
    });
}

function setValue(): boolean {
    if (data.hasErr) {
        layer.msg("存在语法错误", { time: 1500 });
        return false;
    }
    let value = lodash.trim(state.value);
    if (isFun(props.convertValue)) {
        try {
            value = props.convertValue(value);
        } catch (err) {
            layer.msg("数据转换错误", { time: 1500 });
            console.warn("数据转换错误", err);
            return false;
        }
    }
    applyValue(props, state, instance?.proxy, value);
    return true;
}

function confirmValue() {
    const success = setValue();
    if (success) state.showModal = false;
}

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, props.valueTransform),
});
</script>

<template>
    <div style="width: 100%;">
        <Input
            style="width: 100%;"
            :clearable="false"
            :readonly="true"
            :modelValue="inputValue"
        >
            <template #suffix>
                <FontAwesomeIcon class="icons-button" title="配置属性值" :icon="faCode" @click="showModal"/>
            </template>
        </Input>
        <Modal
            v-if="state.showModal"
            v-model="state.showModal"
            :title="props.title"
            width="35%"
            height="65%"
            min-height="350px"
            min-width="300px"
            max-width="500px"
            :esc-closable="true"
            :show-footer="true"
        >
            <MonacoEditor
                ref="setter"
                style="border: 1px solid #c2c2c2;"
                width="100%"
                height="100%"
                theme="idea-light"
                v-bind="inputProps"
                v-model="state.value"
                path="test.json"
                default-language="json"
                :options="{ contextmenu: false }"
                :onValidate="onValidate"
                :onMount="initEditor"
            />
            <template #footer>
                <Button :type="'primary'" @click="confirmValue">确定</Button>
            </template>
        </Modal>
    </div>
</template>

<style scoped>
.icons-button:hover {
    color: #666;
}

.icons-button:active {
    color: #2e3243;
}
</style>
