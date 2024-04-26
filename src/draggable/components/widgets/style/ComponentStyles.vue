<script setup lang="ts">
import { computed, defineModel, reactive } from "vue";
import { Select, Tooltip } from "@opentiny/vue";
import { ComponentStyle } from "@/draggable/types/ComponentMeta";
import CodeSvg from "@/assets/images/code.svg?component";

// 定义组件选项
defineOptions({
    name: 'ComponentStyles',
});

// 定义 Props 类型
interface ComponentStylesProps {
    componentStyles?: Array<ComponentStyle>;
    style?: Record<string, any>;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ComponentStylesProps>(), {});

// 定义 State 类型
interface ComponentStylesState {
}

// state 属性
const state = reactive<ComponentStylesState>({});
// 内部数据
const data = {};

// css display 值
const model = defineModel<string | undefined>();

const componentStyles = computed(() => toSelectOptions(props.componentStyles));

function toSelectOptions(componentStyles: Array<ComponentStyle> | undefined) {
    if (!componentStyles) return [];
    return componentStyles.filter(item => !!item).map(item => ({ label: item.name, value: item.class }));
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="编辑当前选中节点的内联样式代码">
                    <span class="setter-label-tips">内联样式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div class="setter-row-input-radio flex-row-container flex-center" title="编辑内联样式">
                    <CodeSvg style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div v-if="componentStyles.length>0" class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="使用组件提供的内置样式">
                    <span class="setter-label-tips">内置样式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input">
                <Select v-model="model" :options="componentStyles" size="mini" :clearable="true" placeholder="选择内置样式"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.flex-item-fixed {
    flex-shrink: 0;
}

.flex-center {
    align-items: center;
    justify-content: center;
}

.setter-label-tips {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dashed;
}

.setter-row {
    height: 24px;
    margin-bottom: 12px;
    align-items: center;
}

.setter-row:last-child {
    margin-bottom: 0;
}

.setter-row-label {
    width: 55px;
}

.setter-row-input {
    overflow: hidden;
}

.setter-row-input-radio {
    padding: 2px 4px;
    margin: 2px 2px;
    cursor: pointer;
    border: 1px solid #c4c6cf;
    box-sizing: border-box;
}

.setter-row-input-radio:first-child {
    margin-left: 0;
}

.setter-row-input-radio:last-child {
    margin-right: 0;
}

.setter-row-input-radio:hover {
    background: #DFE1E6;
}

.setter-row-input-radio:active {
    background: #DFE1E6;
    color: #4f77ff;
}
</style>
