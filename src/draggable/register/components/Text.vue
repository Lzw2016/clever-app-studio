<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";

// 定义组件选项
defineOptions({
    name: 'Text',
});

// 定义 Props 类型
interface TextProps {
    /** 默认的字符串 */
    defText?: any;
    /** 标签类型 */
    tagType?: "div" | "span" | "p" | string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<TextProps>(), {
    tagType: "span",
});

// 定义 State 类型
interface TextState {
}

// state 属性
const state = reactive<TextState>({});

// 双向绑定的 value 属性
const text = defineModel<any>();

// 监听
watch(() => props.defText, value => text.value = lodash.toString(value ?? ""), { immediate: true });

// 定义组件公开内容
defineExpose({
    text,
    state,
});
</script>

<template>
    <component :is="props.tagType ?? 'div'">
        {{ lodash.toString(text ?? "") }}
    </component>
</template>

<style scoped>
</style>
