<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref } from "vue";
import { Select } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toStr, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'SelectSetter',
});

// 定义 Props 类型
interface NumberSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<NumberSetterProps>(), {});

// 定义 State 类型
interface NumberSetterState extends SetterState<string> {
}

// state 属性
const state = reactive<NumberSetterState>({
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

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, setter.value, toStr),
});
</script>

<template>
    <Select
        :clearable="true"
        v-bind="inputProps"
        ref="setter"
        v-model="state.value"
        @change="value => applyValue(props, state, setter, value)"
    />
</template>

<style scoped>

</style>
