<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Numeric, Select, Tooltip } from "@opentiny/vue";
import { hasValue } from "@/utils/Typeof";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, getStyle } from "@/draggable/utils/StyleUtils";

// 定义组件选项
defineOptions({
    name: 'EffectStyle',
});

// 定义 Props 类型
interface EffectStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<EffectStyleProps>(), {});

// 定义 State 类型
interface EffectStyleState extends StyleSetterState {
    readonly style: {
        cursor?: string;
        backgroundColor?: string;
        opacity?: number;
    };
}

// state 属性
const state = reactive<EffectStyleState>({
    style: {},
});
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

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.cursor = getStyle(props, state, "cursor");
    state.style.backgroundColor = getStyle(props, state, "backgroundColor");
    state.style.opacity = getStyle(props, state, "opacity");
    // state.style -> state
    initState();
}, { immediate: true });
// state.style属性变化后应用 style
const applyStyleCursor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBackgroundColor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleOpacity = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
}

function delBackgroundColor() {
    delete state.style.backgroundColor;
    applyStyleBackgroundColor(props, state, 'backgroundColor', undefined);
}
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
                    v-model="state.style.cursor"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.cursorList"
                    size="mini"
                    :clearable="true"
                    placeholder="光标样式"
                    @change="value => applyStyleCursor(props, state, 'cursor', value)"
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
                <input
                    :value="state.style.backgroundColor ?? '#000000'"
                    @input="e => state.style.backgroundColor= e.target?.['value']"
                    type="color"
                    @change="e => applyStyleBackgroundColor(props, state, 'backgroundColor', e.target?.['value'])"
                />
                <span style="margin-left: 8px;">{{ state.style.backgroundColor }}</span>
                <FontAwesomeIcon
                    v-show="state.style.backgroundColor"
                    class="button-clear"
                    :icon="faXmark"
                    title="清除背景颜色"
                    @click="delBackgroundColor"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="opacity 属性配置">
                    <span class="setter-label-tips">不透明度</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input">
                <Numeric
                    style="width: 100%;"
                    v-model="state.style.opacity"
                    unit="%"
                    size="mini"
                    :min="0"
                    :max="100"
                    :allow-empty="true"
                    placeholder="不透明度"
                    @change="value => applyStyleOpacity(props, state, 'opacity', hasValue(value)? value/100: undefined)"
                />
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
