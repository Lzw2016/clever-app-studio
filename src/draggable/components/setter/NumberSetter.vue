<script setup lang="ts">
import { ComponentPublicInstance, getCurrentInstance, reactive, ref } from "vue";
import { Numeric } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toNumber, watchNodes } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'NumberSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

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
    ...getSetterExpose(props, state, instance?.proxy, toNumber),
});
</script>

<template>
    <Numeric
        ref="setter"
        class="number-setter"
        :clearable="true"
        :allowEmpty="true"
        controlsPosition="right"
        v-bind="inputProps"
        v-model="state.value"
        @change="value => applyValue(props, state, instance?.proxy, value)"
    />
</template>

<style scoped>
.number-setter :deep(.tiny-numeric__input-inner) {
    text-align: left;
}
</style>
