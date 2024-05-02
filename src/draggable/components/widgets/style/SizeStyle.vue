<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { Input, Tooltip } from "@opentiny/vue";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, getStyle, toStyleUnit, unStyleUnit } from "@/draggable/utils/StyleUtils";
import OverflowAuto from "@/assets/images/overflow-auto.svg?component";
import OverflowVisible from "@/assets/images/overflow-visible.svg?component";
import OverflowHidden from "@/assets/images/overflow-hidden.svg?component";
import OverflowScroll from "@/assets/images/overflow-scroll.svg?component";
import { hasValue } from "@/utils/Typeof";

// 定义组件选项
defineOptions({
    name: 'SizeStyle',
});

// 定义 Props 类型
interface SizeStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SizeStyleProps>(), {});

// 定义 State 类型
interface SizeStyleState extends StyleSetterState {
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    objectPosition1?: string;
    objectPosition2?: string;
    readonly style: {
        width?: string;
        height?: string;
        minWidth?: string;
        minHeight?: string;
        maxWidth?: string;
        maxHeight?: string;
        overflow?: string;
        objectFit?: string;
        objectPosition?: string;
    };
}

// state 属性
const state = reactive<SizeStyleState>({
    style: {},
});

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
// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.width = getStyle(props, state, "width");
    state.style.height = getStyle(props, state, "height");
    state.style.minWidth = getStyle(props, state, "minWidth");
    state.style.minHeight = getStyle(props, state, "minHeight");
    state.style.maxWidth = getStyle(props, state, "maxWidth");
    state.style.maxHeight = getStyle(props, state, "maxHeight");
    state.style.overflow = getStyle(props, state, "overflow");
    state.style.objectFit = getStyle(props, state, "objectFit");
    state.style.objectPosition = getStyle(props, state, "objectPosition");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.width, width => autoUseStyleUnit(state.style, "width", width));
watch(() => state.height, height => autoUseStyleUnit(state.style, "height", height));
watch(() => state.minWidth, minWidth => autoUseStyleUnit(state.style, "minWidth", minWidth));
watch(() => state.minHeight, minHeight => autoUseStyleUnit(state.style, "minHeight", minHeight));
watch(() => state.maxWidth, maxWidth => autoUseStyleUnit(state.style, "maxWidth", maxWidth));
watch(() => state.maxHeight, maxHeight => autoUseStyleUnit(state.style, "maxHeight", maxHeight));
watch(() => [state.objectPosition1, state.objectPosition2], ([objectPosition1, objectPosition2]) => {
    const objectPosition = getObjectPosition(objectPosition1, objectPosition2);
    if (hasValue(objectPosition)) {
        state.style.objectPosition = objectPosition;
    } else {
        delete state.style.objectPosition;
    }
});
// state.style属性变化后应用 style
const applyStyleWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleHeight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMinWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMinHeight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMaxWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMaxHeight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleOverflow = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleObjectFit = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleObjectPosition = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
    state.width = unStyleUnit(state.style.width);
    state.height = unStyleUnit(state.style.height);
    state.minWidth = unStyleUnit(state.style.minWidth);
    state.minHeight = unStyleUnit(state.style.minHeight);
    state.maxWidth = unStyleUnit(state.style.maxWidth);
    state.maxHeight = unStyleUnit(state.style.maxHeight);
    if (state.style.objectPosition) {
        const [objectPosition1, objectPosition2] = state.style.objectPosition.split(" ");
        state.objectPosition1 = objectPosition1;
        state.objectPosition2 = objectPosition2;
    }
}

function getObjectPosition(objectPosition1?: string, objectPosition2?: string) {
    let val = [toStyleUnit(objectPosition1), toStyleUnit(objectPosition2)].map(item => item ?? "").join(" ");
    val = lodash.trim(val);
    if (val.length <= 0) {
        return;
    } else {
        return val;
    }
}

function setStyle(name: string, val?: string) {
    if (state.style[name] === val) {
        delete state.style[name];
        return;
    }
    state.style[name] = val;
    return val;
}

function setOverflow(val?: string) {
    val = setStyle("overflow", val);
    applyStyleOverflow(props, state, "overflow", val);
}

function setObjectFit(val?: string) {
    val = setStyle("objectFit", val);
    applyStyleObjectFit(props, state, "objectFit", val);
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
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.width"
                    size="mini"
                    :clearable="true"
                    placeholder="宽(W)"
                    @change="value => applyStyleWidth(props, state, 'width', toStyleUnit(value))"
                />
                <span style="margin-left: 12px;"/>
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.height"
                    size="mini"
                    :clearable="true"
                    placeholder="高(H)"
                    @change="value => applyStyleHeight(props, state, 'height', toStyleUnit(value))"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="min-width/min-height 属性，需要手动设置单位：px、%、em等">
                    <span class="setter-label-tips">最小宽高</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.minWidth"
                    size="mini"
                    :clearable="true"
                    placeholder="最小宽"
                    @change="value => applyStyleMinWidth(props, state, 'minWidth', toStyleUnit(value))"
                />
                <span style="margin-left: 12px;"/>
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.minHeight"
                    size="mini"
                    :clearable="true"
                    placeholder="最小高"
                    @change="value => applyStyleMinHeight(props, state, 'minHeight', toStyleUnit(value))"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="max-width/max-height 属性，需要手动设置单位：px、%、em等">
                    <span class="setter-label-tips">最大宽高</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.maxWidth"
                    size="mini"
                    :clearable="true"
                    placeholder="最大宽"
                    @change="value => applyStyleMaxWidth(props, state, 'maxWidth', toStyleUnit(value))"
                />
                <span style="margin-left: 12px;"/>
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.maxHeight"
                    size="mini"
                    :clearable="true"
                    placeholder="最大高"
                    @change="value => applyStyleMaxHeight(props, state, 'maxHeight', toStyleUnit(value))"
                />
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
                        'selected': overflow.value===state.style.overflow,
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
                        'selected': objectFit.value===state.style.objectFit,
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
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.objectPosition1"
                    size="mini"
                    :clearable="true"
                    placeholder="水平方向"
                    @change="value => applyStyleObjectPosition(props, state, 'objectPosition', getObjectPosition(value, state.objectPosition2))"
                />
                <span style="margin-left: 12px;"/>
                <Input
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.objectPosition2"
                    size="mini"
                    :clearable="true"
                    placeholder="垂直方向"
                    @change="value => applyStyleObjectPosition(props, state, 'objectPosition', getObjectPosition(state.objectPosition1, value))"
                />
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
