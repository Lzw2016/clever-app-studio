<script setup lang="ts">
import { ComponentPublicInstance, getCurrentInstance, reactive, ref } from "vue";
import { TimePicker } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toObj, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'TimeSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface TimeSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<TimeSetterProps>(), {});

// 定义 State 类型
interface TimeSetterState extends SetterState {
}

// state 属性
const state = reactive<TimeSetterState>({
    ...getDefState(),
});
state.value = getValue<number>(props, state, toObj);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<ComponentPublicInstance | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toObj);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, toObj),
});
</script>

<template>
    <TimePicker
        ref="setter"
        :clearable="true"
        v-bind="inputProps"
        v-model="state.value"
        @change="value => applyValue(props, state, instance?.proxy, value)"
    />
</template>

<style scoped>

</style>
