<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "@opentiny/vue";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { SetterGroup, SetterPanel } from "@/draggable/types/ComponentMeta";

// 定义组件选项
defineOptions({
    name: 'SetterPanel',
});

// 定义 Props 类型
interface SetterPanelProps {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 设置器分组 */
    setterGroup: SetterGroup;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterPanelProps>(), {});

// state 属性
const state = reactive({});

// 内部数据
// const data = {};


</script>

<template>
    <Form>

    </Form>
</template>

<style scoped>

</style>
