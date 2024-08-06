<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "@opentiny/vue";
import { PropsPanel } from "@/draggable/types/ComponentMeta";
import { DesignerState } from "@/draggable/models/DesignerState";
import { DesignerEngine } from "@/draggable/DesignerEngine";

// 定义组件选项
defineOptions({
    name: 'SetterAdvancedPanel',
});

// 定义 Props 类型
interface SetterAdvancedPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设置器面板 */
    propsPanel: PropsPanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterAdvancedPanelProps>(), {});

// 定义 State 类型
interface SetterAdvancedPanelState {
}

// state 属性
const state = reactive<SetterAdvancedPanelState>({});
// 内部数据
// const data = {};



</script>

<template>
    <Form
        class="props-form"
        size="mini"
        label-position="left"
        label-width="65px"
    >

    </Form>
</template>

<style scoped>

</style>
