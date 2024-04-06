<script setup lang="ts">
import { ComponentPublicInstance, defineExpose, reactive, ref } from "vue";
import { Numeric } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toNumber, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'NumberSetter',
});

// 定义 Props 类型
interface NumberSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<NumberSetterProps>(), {});

// 定义 State 类型
interface NumberSetterState extends SetterState<number> {
}

// state 属性
const state = reactive<NumberSetterState>({
    ...getDefState(),
});
state.value = getValue<number>(props, state, toNumber);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<ComponentPublicInstance | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toNumber);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, setter.value, toNumber),
});
</script>

<template>
    <Numeric
        v-bind="inputProps"
        ref="setter"
        @change="value => applyValue(props, state, setter, value)"
        v-model="state.value"
    />
</template>

<style scoped>

</style>
