<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Input } from "@opentiny/vue";
import { isFunction } from "@/utils/Typeof";
import { SetterProps } from "@/draggable/types/Setter";

// 定义组件选项
defineOptions({
    name: 'StringSetter',
});

// 定义 Props 类型
interface StringSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<StringSetterProps>(), {});

// 读取组件 state 属性
interface StringSetterState {
    /** 字符串值 */
    value?: string;
}

// state 属性
const state = reactive<StringSetterState>({
    value: getValue(),
});
// 内部数据
const data = {};

const setter = ref<InstanceType<typeof Input> | undefined>();

watch(() => state.value, (value, oldValue) => applyValue(value, oldValue));

function getValue() {
    const { nodes, propsName, getPropsValue } = props;
    if (!propsName && !isFunction(getPropsValue)) return;
    if (nodes.length !== 1) return;
    const node = nodes[0];
    if (getPropsValue) return getPropsValue(node.props);
    if (propsName) return node.props?.[propsName];
}

function applyValue(value, oldValue) {
    const { nodes, propsName, applyPropsValue } = props;
    if (!propsName && !isFunction(applyPropsValue)) return;
    for (let node of nodes) {
        if (applyPropsValue) {
            applyPropsValue(node.props, value, oldValue, setter.value!);
        } else if (propsName && node.props) {
            node.props[propsName] = value;
        }
    }
}
</script>

<template>
    <Input
        v-bind="$attrs"
        ref="setter"
        v-model="state.value"
    />
</template>

<style scoped></style>
