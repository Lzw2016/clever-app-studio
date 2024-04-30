<script setup lang="ts">
import { defineModel, reactive, shallowReactive } from "vue";
import { Input, Tooltip } from "@opentiny/vue";
import GridJustifyItemsStart from "@/assets/images/grid-justify-items-start.svg?component";
import GridJustifyItemsCenter from "@/assets/images/grid-justify-items-center.svg?component";
import GridJustifyItemsEnd from "@/assets/images/grid-justify-items-end.svg?component";
import GridJustifyItemsStretch from "@/assets/images/grid-justify-items-stretch.svg?component";
import GridJustifyItemsBaseline from "@/assets/images/grid-justify-items-baseline.svg?component";
import GridAlignItemsStart from "@/assets/images/grid-align-items-start.svg?component";
import GridAlignItemsCenter from "@/assets/images/grid-align-items-center.svg?component";
import GridAlignItemsEnd from "@/assets/images/grid-align-items-end.svg?component";
import GridAlignItemsStretch from "@/assets/images/grid-align-items-stretch.svg?component";
import GridAlignItemsBaseline from "@/assets/images/grid-align-items-baseline.svg?component";

// 定义组件选项
defineOptions({
    name: 'GridStyle',
});

// 定义 Props 类型
interface GridStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<GridStyleProps>(), {});

// 定义 State 类型
interface GridStyleState {
}

// state 属性
const state = reactive<GridStyleState>({});
// 内部数据
const data = {
    // justify-self
    gridJustifySelfList: [
        { value: "start", tip: "start(起点对齐)", icon: GridJustifyItemsStart },
        { value: "center", tip: "center(居中)", icon: GridJustifyItemsCenter },
        { value: "end", tip: "end(终点对齐)", icon: GridJustifyItemsEnd },
        { value: "stretch", tip: "stretch(拉伸，占满单元格的整个宽度)", icon: GridJustifyItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: GridJustifyItemsBaseline },
    ],
    // align-self
    gridAlignSelfList: [
        { value: "start", tip: "start(起点对齐)", icon: GridAlignItemsStart },
        { value: "center", tip: "center(居中)", icon: GridAlignItemsCenter },
        { value: "end", tip: "(终点对齐)", icon: GridAlignItemsEnd },
        { value: "stretch", tip: "stretch(拉伸，占满单元格的整个宽度)", icon: GridAlignItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: GridAlignItemsBaseline },
    ],
};

interface GridStyleModel {
    gridColumnStart?: string;
    gridColumnEnd?: string;
    gridRowStart?: string;
    gridRowEnd?: string;
    justifySelf?: string;
    alignSelf?: string;
}

const model = defineModel<GridStyleModel>({
    default: shallowReactive<GridStyleModel>({}),
});

function setModel(name: string, val: string) {
    if (model.value?.[name] === val) {
        delete model.value[name];
        return;
    }
    if (!model.value) model.value = shallowReactive<GridStyleModel>({});
    model.value[name] = val;
}

function setJustifySelf(val: string) {
    setModel("justifySelf", val);
}

function setAlignSelf(val: string) {
    setModel("alignSelf", val);
}

function modelToState(modelValue: GridStyleModel) {
}

defineExpose({
    modelToState: () => modelToState(model.value),
});
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(grid布局元素) grid-column-start/grid-column-end 属性配置">
                    <span class="setter-label-tips">网格列</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="model.gridColumnStart" size="mini" :clearable="true" placeholder="起始列"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="model.gridColumnEnd" size="mini" :clearable="true" placeholder="结束列"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(grid布局元素) grid-row-start/grid-row-end 属性配置">
                    <span class="setter-label-tips">网格行</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="model.gridRowStart" size="mini" :clearable="true" placeholder="起始行"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="model.gridRowEnd" size="mini" :clearable="true" placeholder="结束行"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(grid布局元素) justify-self 属性配置">
                    <span class="setter-label-tips">水平对齐</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="justifySelf in data.gridJustifySelfList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': justifySelf.value===model.justifySelf,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setJustifySelf(justifySelf.value)"
                    :title="justifySelf.tip"
                >
                    <component :is="justifySelf.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(grid布局元素) align-self 属性配置">
                    <span class="setter-label-tips">垂直对齐</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="alignSelf in data.gridAlignSelfList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': alignSelf.value===model.alignSelf,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setAlignSelf(alignSelf.value)"
                    :title="alignSelf.tip"
                >
                    <component :is="alignSelf.icon" style="width: 16px; height: 16px;"/>
                </div>
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

.setter-row-input-radio.selected {
    fill: #4f77ff;
    color: #4f77ff;
    border: 1px solid #7693F5;
}
</style>
