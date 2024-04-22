<script setup lang="ts">
import lodash from "lodash";
import { defineModel, reactive, shallowReactive, watch } from "vue";
import { Input, Tooltip } from "@opentiny/vue";
import OverflowAuto from "@/assets/images/overflow-auto.svg?component";
import OverflowVisible from "@/assets/images/overflow-visible.svg?component";
import OverflowHidden from "@/assets/images/overflow-hidden.svg?component";
import OverflowScroll from "@/assets/images/overflow-scroll.svg?component";
import { autoUseStyleUnit, toStyleUnit } from "@/draggable/utils/StyleUtils";

// 定义组件选项
defineOptions({
    name: 'SizeStyle',
});

// 定义 Props 类型
interface SizeStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SizeStyleProps>(), {});

// 定义 State 类型
interface SizeStyleState {
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    objectPosition1?: string;
    objectPosition2?: string;
}

// state 属性
const state = reactive<SizeStyleState>({});

// 内部数据
const data = {
    overflowList: [
        { value: "auto", tip: "auto(溢出时自动滚动)", icon: OverflowAuto },
        { value: "scroll", tip: "scroll(滚动)", icon: OverflowScroll },
        { value: "hidden", tip: "hidden(隐藏)", icon: OverflowHidden },
        { value: "visible", tip: "visible(溢出可见)", icon: OverflowVisible },
    ],
    objectFitList: [
        { value: "none", tip: "none(内容的尺寸保持不变，不进行缩放)", icon: null, text: "无" },
        { value: "fill", tip: "fill(内容被缩放到完全填满容器，可能会导致内容被裁剪以适应大小)", icon: null, text: "填充" },
        { value: "contain", tip: "contain(内容将被缩放，以在填充元素的内容框时保持其宽高比)", icon: null, text: "包含" },
        { value: "cover", tip: "cover(保持其宽高比的同时填充元素的整个内容框)", icon: null, text: "原比例" },
        { value: "scale-down", tip: "scale-down(自动缩小内容)", icon: null, text: "缩小" },
    ],
};

interface SizeStyleModel {
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    overflow?: string;
    objectFit?: string;
    objectPosition?: string;
}

// css width height 值
const model = defineModel<SizeStyleModel>({
    default: shallowReactive<SizeStyleModel>({}),
});

// 初始化
if (model.value) {
    // TODO model -> state
}

watch(() => state.width, value => autoUseStyleUnit(model.value, "width", value));
watch(() => state.height, value => autoUseStyleUnit(model.value, "height", value));
watch(() => state.minWidth, value => autoUseStyleUnit(model.value, "minWidth", value));
watch(() => state.minHeight, value => autoUseStyleUnit(model.value, "minHeight", value));
watch(() => state.maxWidth, value => autoUseStyleUnit(model.value, "maxWidth", value));
watch(() => state.maxHeight, value => autoUseStyleUnit(model.value, "maxHeight", value));
watch(() => [state.objectPosition1, state.objectPosition2], () => {
    if (!model.value) return;
    let val = [toStyleUnit(state.objectPosition1), toStyleUnit(state.objectPosition2)].map(item => item ?? "").join("");
    val = lodash.trim(val);
    if (val.length <= 0) {
        delete model.value.objectPosition;
    } else {
        model.value.objectPosition = val;
    }
});

function setModel(name: string, val: string) {
    if (model.value?.[name] === val) {
        delete model.value[name];
        return;
    }
    if (!model.value) model.value = shallowReactive<SizeStyleModel>({});
    model.value[name] = val;
}

function setOverflow(val: string) {
    setModel("overflow", val);
}

function setObjectFit(val: string) {
    setModel("objectFit", val);
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="width/height 属性，需要手动设置单位：px、%、em等">
                    <span class="setter-label-tips">宽高(WH)</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.width" size="mini" :allow-empty="true" placeholder="宽(W)"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.height" size="mini" :allow-empty="true" placeholder="高(H)"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="min-width/min-height 属性，需要手动设置单位：px、%、em等">
                    <span class="setter-label-tips">最小宽高</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.minWidth" size="mini" :allow-empty="true" placeholder="最小宽"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.minHeight" size="mini" :allow-empty="true" placeholder="最小高"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="max-width/max-height 属性，需要手动设置单位：px、%、em等">
                    <span class="setter-label-tips">最大宽高</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.maxWidth" size="mini" :allow-empty="true" placeholder="最大宽"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.maxHeight" size="mini" :allow-empty="true" placeholder="最大高"/>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="overflow 属性配置">
                    <span class="setter-label-tips">溢出行为</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="overflow in data.overflowList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': overflow.value===model?.overflow,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setOverflow(overflow.value)"
                    :title="overflow.tip"
                >
                    <component :is="overflow.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="object-fit 属性，主要应用在<img>、<video>标签上">
                    <span class="setter-label-tips">内容大小</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="objectFit in data.objectFitList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': objectFit.value===model.objectFit,
                    }"
                    @click="setObjectFit(objectFit.value)"
                    :title="objectFit.tip"
                >
                    <span style="font-size: 11px; white-space: nowrap;">{{ objectFit.text }}</span>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="object-position 属性，主要应用在<img>、<video>标签上。需要手动设置单位：px、%、em、top、center等">
                    <span class="setter-label-tips">内容位置</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.objectPosition1" size="mini" :allow-empty="true" placeholder="水平方向"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.objectPosition2" size="mini" :allow-empty="true" placeholder="垂直方向"/>
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
