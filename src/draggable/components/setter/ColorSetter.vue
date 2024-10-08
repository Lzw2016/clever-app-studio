<script setup lang="ts">
import { ComponentPublicInstance, getCurrentInstance, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toStr, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'ColorSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface ColorSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ColorSetterProps>(), {});

// 定义 State 类型
interface ColorSetterState extends SetterState<string> {
}

// state 属性
const state = reactive<ColorSetterState>({
    ...getDefState(),
});
state.value = getValue<string>(props, state, toStr);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<ComponentPublicInstance | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toStr);

function clearValue() {
    state.value = undefined;
    applyValue(props, state, instance?.proxy, undefined);
}

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, toStr),
});
</script>

<template>
    <div class="flex-row-container">
        <input
            ref="setter"
            class="color-input"
            type="color"
            :value="state.value ?? '#000000'"
            @input="e => state.value = e.target?.['value']"
            v-bind="inputProps"
            @change="event => applyValue(props, state, instance?.proxy, event.target?.['value'])"
        />
        <span style="margin-left: 8px;">{{ state.value }}</span>
        <FontAwesomeIcon
            v-show="state.value"
            class="button-clear"
            :icon="faXmark" title="清除文本颜色"
            @click="clearValue"
        />
    </div>
</template>

<style scoped>
.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
}

input[type=color].color-input {
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
</style>
