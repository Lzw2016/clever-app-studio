<script setup lang="ts">
import { defineExpose, reactive, ref, watch } from "vue";
import { Input } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getSetterExpose, getValue } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'StringSetter',
});

// 定义 Props 类型
interface StringSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<StringSetterProps>(), {});

// 定义 State 类型
interface StringSetterState extends SetterState<string> {
}

// state 属性
const state = reactive<StringSetterState>({
    multipleValues: false,
    value: undefined,
});
state.value = getValue<string>(props, state);
// 内部数据
// const data = {};

// input 引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 监听 value 变化
watch(() => state.value, (value, oldValue) => applyValue(props, state, setter, value, oldValue));

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state),
});
</script>

<template>
    <Input
        v-bind="$attrs"
        ref="setter"
        v-model="state.value"
    />
    <span v-if="state.multipleValues">
        存在多个不同值
    </span>
</template>

<style scoped></style>
