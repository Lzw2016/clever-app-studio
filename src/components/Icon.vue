<script setup lang="ts">
import { reactive } from "vue";

// 定义组件选项
defineOptions({
    name: 'Icon',
});

// 定义 Props 类型
interface IconProps {
    /** 图标类型 */
    type?: "fa" | "tabler" | "google";
    /** 使用svg代码图标(优先级最高) */
    svg?: string;
    /** 图标或者svg的扩展属性 */
    extProps: Record<string, any>;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<IconProps>(), {});

// 定义 State 类型
interface IconState {
}

// state 属性
const state = reactive<IconState>({});

// 定义组件公开内容
defineExpose({});
</script>

<template>

</template>

<style scoped>

</style>
