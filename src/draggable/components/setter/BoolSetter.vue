<script setup lang="ts">
import { defineExpose, reactive, ref, watch } from "vue";
import { Checkbox, Switch } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getSetterExpose, getValue } from "@/draggable/utils/SetterUtils";

// 定义组件选项
defineOptions({
    name: 'BoolSetter',
});

// 定义 Props 类型
interface BoolSetterProps extends SetterProps {
    /** 使用Switch组件 */
    useSwitch?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<BoolSetterProps>(), {
    useSwitch: false,
});

// 定义 State 类型
interface BoolSetterState extends SetterState<boolean> {
}

// state 属性
const state = reactive<BoolSetterState>({
    multipleValues: false,
    value: undefined,
});
state.value = getValue<boolean>(props, state, value => !!value);
// 内部数据
// const data = {};

// input 引用
const setter = ref<InstanceType<typeof Switch> & InstanceType<typeof Checkbox> | undefined>();

// 监听 nodes 变化
watch(() => props.nodes, () => state.value = getValue<boolean>(props, state, value => !!value));
// 监听 value 变化
watch(() => state.value, (value, oldValue) => applyValue(props, state, setter, !!value, !!oldValue));

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose<boolean>(props, state, value => !!value),
});
</script>

<template>
    <Switch
        v-if="props.useSwitch"
        :false-value="false"
        :true-value="false"
        v-bind="$attrs"
        ref="setter"
        v-model="state.value"
    />
    <Checkbox
        v-else
        v-bind="$attrs"
        ref="setter"
        v-model="state.value"
    />
    <span v-if="state.multipleValues">
        存在多个不同值
    </span>
</template>

<style scoped>

</style>
