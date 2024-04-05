<script setup lang="ts">
import { computed, defineExpose, reactive, ref, watch } from "vue";
import { Input } from "@opentiny/vue";
import { isFunction } from "@/utils/Typeof";
import { SetterExpose } from "@/draggable/types/ComponentMeta";
import { SetterProps, SetterState } from "@/draggable/types/Setter";

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
interface StringSetterState extends SetterState<string> {
}

// state 属性
const state = reactive<StringSetterState>({
    multipleValues: false,
    value: getValue(),
});
// 内部数据
// const data = {};

// input 引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 动态的 input props
const inputProps = computed(() => {
    const obj: any = {};
    if (state.multipleValues) obj.placeholder = "存在多个不同值";
    return obj;
});
// 监听 value 变化
watch(() => state.value, (value, oldValue) => applyValue(value, oldValue));

// 定义组件公开内容
defineExpose<SetterExpose>({

    getValue(): any {
        return state.value;
    },
    setValue(value: any) {
        state.value = value;
    },
});

function getValue() {
    const { nodes, propsName, getPropsValue } = props;
    if (!nodes) return;
    if (!propsName && !isFunction(getPropsValue)) return;
    const values = new Set<any>();
    for (let node of nodes) {
        if (getPropsValue) {
            values.add(getPropsValue(node.props));
        } else if (propsName) {
            values.add(node.props?.[propsName]);
        } else {
            values.add(undefined);
        }
        if (values.size > 1) {
            break;
        }
    }
    if (values.size <= 0) {
        return;
    } else if (values.size === 1) {
        return values.values()[0];
    } else {
        state.multipleValues = true;
        return;
    }
}

function applyValue(value, oldValue) {
    const { nodes, propsName, applyPropsValue } = props;
    if (!nodes) return;
    if (!propsName && !isFunction(applyPropsValue)) return;
    let flag = false;
    for (let node of nodes) {
        if (applyPropsValue) {
            applyPropsValue(node.props, value, oldValue, setter.value!);
            flag = true;
        } else if (propsName && node.props) {
            node.props[propsName] = value;
            flag = true;
        }
    }
    // 需要重新渲染 block
    if (flag) {
        state.multipleValues = false;
        props.blockInstance.$forceUpdate();
    }
}
</script>

<template>
    <Input
        v-bind="{...$attrs, ...inputProps}"
        ref="setter"
        v-model="state.value"
    />
</template>

<style scoped></style>
