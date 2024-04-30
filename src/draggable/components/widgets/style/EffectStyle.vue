<script setup lang="ts">
import { defineModel, reactive, shallowReactive } from "vue";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Numeric, Select, Tooltip } from "@opentiny/vue";

// 定义组件选项
defineOptions({
    name: 'EffectStyle',
});

// 定义 Props 类型
interface EffectStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<EffectStyleProps>(), {});

// 定义 State 类型
interface EffectStyleState {
}

// state 属性
const state = reactive<EffectStyleState>({});
// 内部数据
const data = {
    cursorList: [
        { value: 'default', label: '默认(default)', icon: null },
        { value: 'auto', label: '自动(auto)', icon: null },
        { value: 'pointer', label: '指针(pointer)', icon: null },
        { value: 'not-allowed', label: '不允许(not-allowed)', icon: null },
        { value: 'wait', label: '等待(wait)', icon: null },
        { value: 'progress', label: '处理中(progress)', icon: null },
        { value: 'help', label: '帮助(help)', icon: null },
        { value: 'text', label: '文本选择(text)', icon: null },
        { value: 'cell', label: '单元格(cell)', icon: null },
        { value: 'copy', label: '复制(copy)', icon: null },
        { value: 'move', label: '移动(move)', icon: null },
    ],
};

interface EffectStyleModel {
    cursor?: string;
    backgroundColor?: string;
    opacity?: number;
}

// css display 值
const model = defineModel<EffectStyleModel>({
    default: shallowReactive<EffectStyleModel>({}),
});

function modelToState(modelValue: EffectStyleModel) {
}

defineExpose({
    modelToState: () => modelToState(model.value),
});
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="cursor 属性配置">
                    <span class="setter-label-tips">光标样式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input">
                <Select
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="model.cursor"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.cursorList"
                    size="mini"
                    :clearable="true"
                    placeholder="光标样式"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="background-color 属性配置">
                    <span class="setter-label-tips">背景颜色</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <input :value="model.backgroundColor ?? '#000000'" @input="e => model.backgroundColor= e.target?.['value']" type="color"/>
                <span style="margin-left: 8px;">{{ model.backgroundColor }}</span>
                <FontAwesomeIcon v-show="model.backgroundColor" class="button-clear" :icon="faXmark" title="清除背景颜色" @click="delete model.backgroundColor"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="opacity 属性配置">
                    <span class="setter-label-tips">不透明度</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input">
                <Numeric style="width: 100%;" v-model="model.opacity" unit="%" size="mini" :min="0" :max="100" :allow-empty="true" placeholder="不透明度"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.flex-item-fixed {
    flex-shrink: 0;
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

.setter-row-input > input[type=color] {
    width: 22px;
    height: 24px;
    border: none;
    background: transparent;
    padding: 0;
    border-radius: 4px;
}

.button-clear {
    margin-left: 4px;
    padding: 2px 4px;
    color: #252b3a;
    cursor: pointer;
}

.button-clear:hover {
    background: #DFE1E6;
    color: #4f77ff;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.setter-row-input :deep(.tiny-numeric__input-inner) {
    text-align: left;
}

.setter-row-input :deep(.tiny-numeric__unit) {
    width: 28px;
}
</style>
