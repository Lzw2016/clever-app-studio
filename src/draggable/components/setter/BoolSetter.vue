<script setup lang="ts">
import { ComponentPublicInstance, reactive, ref } from "vue";
import { Checkbox, Switch } from "@opentiny/vue";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, multipleValuesText, toBool, watchNodes } from "@/draggable/utils/SetterUtils";

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
    ...getDefState(),
});
state.value = getValue<boolean>(props, state, toBool);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<ComponentPublicInstance | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toBool);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose<boolean>(props, state, setter.value, toBool),
});
</script>

<template>
    <Switch
        v-if="props.useSwitch"
        :false-value="false"
        :true-value="false"
        v-bind="inputProps"
        ref="setter"
        v-model="state.value"
        @change="value => applyValue(props, state, setter, value)"
    />
    <Checkbox
        v-else
        v-bind="inputProps"
        ref="setter"
        v-model="state.value"
        @change="value => applyValue(props, state, setter, value)"
    />
    <span v-if="state.multipleValues" class="multiple-diff-values">
        {{ multipleValuesText }}
    </span>
</template>

<style scoped>
.multiple-diff-values {
    opacity: 0.5;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
