<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { Input } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toStr, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'StringSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

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
    ...getDefState(),
});
state.value = getValue<string>(props, state, toStr);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toStr);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, toStr),
});
</script>

<template>
    <Input
        ref="setter"
        :clearable="true"
        v-bind="inputProps"
        v-model="state.value"
        @change="value => applyValue(props, state, instance?.proxy, value)"
    />
</template>

<style scoped>

</style>
