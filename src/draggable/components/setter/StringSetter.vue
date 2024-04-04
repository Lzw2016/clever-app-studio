<script setup lang="ts">
import { reactive } from "vue";
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
// state 属性
const state = reactive({});
// 内部数据
const data = {};

</script>

<template>

</template>

<style scoped>

</style>
