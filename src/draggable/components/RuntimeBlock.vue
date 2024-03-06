<script setup lang="ts">
// 定义组件选项
import { Fragment } from "vue";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { createBlockComponent } from "@/draggable/BlockFactory";

defineOptions({
    name: 'RuntimeBlock',
});

// 定义 Props 类型
interface RuntimeBlockProps {
    block?: DesignBlock;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<RuntimeBlockProps>(), {});

// 动态创建 Block 组件
const BlockComponent = props.block ? createBlockComponent(props.block) : Fragment;
</script>

<template>
    <BlockComponent v-if="props.block"/>
</template>

<style scoped>

</style>
