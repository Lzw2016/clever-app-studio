<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { Numeric, Tooltip } from "@opentiny/vue";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, batchApplyStyle, getStyle, toStyleUnit, unStyleUnit, validateInputStyleValue } from "@/draggable/utils/StyleUtils";
import PositionAll from "@/assets/images/position-all.svg?component";
import PositionBottom from "@/assets/images/position-bottom.svg?component";
import PositionBottomLeft from "@/assets/images/position-bottom-left.svg?component";
import PositionBottomRight from "@/assets/images/position-bottom-right.svg?component";
import PositionLeft from "@/assets/images/position-left.svg?component";
import PositionRight from "@/assets/images/position-right.svg?component";
import PositionTop from "@/assets/images/position-top.svg?component";
import PositionTopLeft from "@/assets/images/position-top-left.svg?component";
import PositionTopRight from "@/assets/images/position-top-right.svg?component";

// 定义组件选项
defineOptions({
    name: 'PositionStyle',
});

// 定义 Props 类型
interface PositionStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<PositionStyleProps>(), {});

// 定义 State 类型
interface PositionStyleState extends StyleSetterState {
    edit?: "top" | "right" | "bottom" | "left";
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    readonly style: {
        position?: string;
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
        float?: string;
        clear?: string;
        zIndex?: number;
    };
}

// state 属性
const state = reactive<PositionStyleState>({
    style: {},
});
// 内部数据
const data = {
    positionList: [
        { value: "static", tip: "static(默认定位)", icon: null, text: "默认" },
        { value: "relative", tip: "relative(相对定位)", icon: null, text: "相对" },
        { value: "absolute", tip: "absolute(绝对定位)", icon: null, text: "绝对" },
        { value: "fixed", tip: "fixed(固定定位)", icon: null, text: "固定" },
        { value: "sticky", tip: "sticky(粘性定位)", icon: null, text: "粘性" },
    ],
    floatList: [
        { value: "none", tip: "none(不浮动)", icon: null, text: "不浮动" },
        { value: "left", tip: "left(浮动在其所在的容器左侧)", icon: null, text: "左" },
        { value: "right", tip: "right(浮动在其所在的容器右侧)", icon: null, text: "右" },
        { value: "inline-start", tip: "inline-start(浮动在其所在块容器的开始一侧)", icon: null, text: "起始" },
        { value: "inline-end", tip: "inline-end(浮动在其所在块容器的结束一侧)", icon: null, text: "结束" },
    ],
    clearList: [
        { value: "none", tip: "none(不清除浮动)", icon: null, text: "不清除" },
        { value: "left", tip: "left(清除左浮动)", icon: null, text: "左" },
        { value: "right", tip: "right(清除右浮动)", icon: null, text: "右" },
        { value: "both", tip: "both(清除左右浮动)", icon: null, text: "左右" },
        { value: "inline-start", tip: "inline-start(清除起始侧浮动)", icon: null, text: "起始" },
        { value: "inline-end", tip: "inline-end(清除结束侧浮动)", icon: null, text: "结束" },
    ],
    positionOptionList: [
        { value: { top: "0", right: "auto", bottom: "auto", left: "0" }, tip: "左上", icon: PositionTopLeft },
        { value: { top: "0", right: "0", bottom: "auto", left: "auto" }, tip: "右上", icon: PositionTopRight },
        { value: { top: "auto", right: "auto", bottom: "0", left: "0" }, tip: "左下", icon: PositionBottomLeft },
        { value: { top: "auto", right: "0", bottom: "0", left: "auto" }, tip: "右下", icon: PositionBottomRight },
        { value: { top: "0", right: "auto", bottom: "0", left: "0" }, tip: "左边", icon: PositionLeft },
        { value: { top: "0", right: "0", bottom: "0", left: "auto" }, tip: "又边", icon: PositionRight },
        { value: { top: "0", right: "0", bottom: "auto", left: "0" }, tip: "上边", icon: PositionTop },
        { value: { top: "auto", right: "0", bottom: "0", left: "0" }, tip: "下边", icon: PositionBottom },
        { value: { top: "0", right: "0", bottom: "0", left: "0" }, tip: "铺满", icon: PositionAll },
    ],
};

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.position = getStyle(props, state, "position");
    state.style.top = getStyle(props, state, "top");
    state.style.right = getStyle(props, state, "right");
    state.style.bottom = getStyle(props, state, "bottom");
    state.style.left = getStyle(props, state, "left");
    state.style.float = getStyle(props, state, "float");
    state.style.clear = getStyle(props, state, "clear");
    state.style.zIndex = getStyle(props, state, "zIndex");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.top, top => autoUseStyleUnit(state.style, "top", top));
watch(() => state.right, right => autoUseStyleUnit(state.style, "right", right));
watch(() => state.bottom, bottom => autoUseStyleUnit(state.style, "bottom", bottom));
watch(() => state.left, left => autoUseStyleUnit(state.style, "left", left));
// state.style属性变化后应用 style
const applyStylePosition = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleTop = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleRight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBottom = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleLeft = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFloat = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleClear = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleZIndex = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
    state.top = unStyleUnit(state.style.top);
    state.right = unStyleUnit(state.style.right);
    state.bottom = unStyleUnit(state.style.bottom);
    state.left = unStyleUnit(state.style.left);
}

function setStyle(name: string, val?: string) {
    if (state.style[name] === val) {
        delete state.style[name];
        return;
    }
    state.style[name] = val;
    return val;
}

function setPosition(val?: string) {
    val = setStyle("position", val);
    applyStylePosition(props, state, "position", val);
}

function setFloat(val?: string) {
    val = setStyle("float", val);
    applyStyleFloat(props, state, "float", val);
}

function setClear(val?: string) {
    val = setStyle("clear", val);
    applyStyleClear(props, state, "clear", val);
}

function equalPosition(val: { top: string, right: string, bottom: string, left: string }) {
    return state.top === val.top
        && state.right === val.right
        && state.bottom === val.bottom
        && state.left === val.left;
}

function setFastPosition(val: { top: string, right: string, bottom: string, left: string }) {
    if (equalPosition(val)) {
        delete state.top;
        delete state.right;
        delete state.bottom;
        delete state.left;
    } else {
        lodash.assign(state, val);
    }
    batchApplyStyle(props, state, {
        top: state.top,
        right: state.right,
        bottom: state.bottom,
        left: state.left,
    });
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="position 属性配置">
                    <span class="setter-label-tips">定位方式</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="position in data.positionList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': position.value===state.style.position,
                    }"
                    @click="setPosition(position.value)"
                    :title="position.tip"
                >
                    <span style="font-size: 11px; white-space: nowrap;">{{ position.text }}</span>
                </div>
            </div>
        </div>
        <div v-if="state.style.position && ['absolute', 'fixed'].includes(state.style.position)" class="flex-row-container setter-row" style="height: auto;">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="快速设置 top、bottom、left、right 值">
                    <span class="setter-label-tips">快速选择</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="positionOption in data.positionOptionList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected2': equalPosition(positionOption.value),
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    style="padding: 2px; margin: 1px; border: none;"
                    @click="setFastPosition(positionOption.value)"
                    :title="positionOption.tip"
                >
                    <component :is="positionOption.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div v-if="state.style.position && ['relative', 'absolute', 'fixed', 'sticky'].includes(state.style.position)" class="setter-row" style="height: auto;">
            <div class="flex-item-fixed setter-row-label"/>
            <div class="flex-item-fill setter-row-input">
                <div class="setting-wrap">
                    <div class="setting">
                        <svg xmlns="http://www.w3.org/2000/svg" width="172" height="64" style="grid-area: 1 / 1 / -1 / -1">
                            <g>
                                <g>
                                    <path
                                        mode="delta"
                                        fill="currentColor"
                                        d="m1,1h171l-36,24h-99l-36,-24z"
                                        data-automation-id="position-top-button"
                                        aria-label="Position top button"
                                        class="tb-path-color"
                                        @click="state.edit='top'"
                                    ></path>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        mode="delta"
                                        fill="currentColor"
                                        d="m171,1v63l-36,-24v-15l36,-24z"
                                        data-automation-id="position-right-button"
                                        aria-label="Position right button"
                                        class="lr-path-color"
                                        @click="state.edit='right'"
                                    ></path>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        mode="delta"
                                        fill="currentColor"
                                        d="m1,63h171l-36,-24h-99l-36,24z"
                                        data-automation-id="position-bottom-button"
                                        aria-label="Position bottom button"
                                        class="tb-path-color"
                                        @click="state.edit='bottom'"
                                    ></path>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        mode="delta"
                                        fill="currentColor"
                                        d="m1,1v63l36,-24v-15l-36,-24z"
                                        data-automation-id="position-left-button"
                                        aria-label="Position left button"
                                        class="lr-path-color"
                                        @click="state.edit='left'"
                                    ></path>
                                </g>
                            </g>
                            <clipPath id="position-outer">
                                <rect x="0" y="0" width="172" height="64" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                            </clipPath>
                            <rect clip-path="url(#position-outer)" x="0" y="0" width="172" height="64" fill="transparent" rx="2" ry="2" class="stroke" style="pointer-events: none; stroke-width: 2px"></rect>
                            <clipPath id="position-inner">
                                <rect x="36" y="24" width="100" height="16" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                            </clipPath>
                            <rect clip-path="url(#position-inner)" x="36" y="24" width="100" height="16" fill="transparent" rx="2" ry="2" class="stroke" style="pointer-events: none; stroke-width: 2px"></rect>
                        </svg>
                        <div
                            v-if="state.edit!=='top'"
                            class="direction top"
                            :class="{'is-setting': state.top}"
                            @click="state.edit='top'"
                            title="设置top"
                        >
                            {{ state.top ?? 0 }}
                        </div>
                        <input
                            v-else
                            class="direction top"
                            v-focus
                            :value="state.top"
                            placeholder="0"
                            @input="validateInputStyleValue(state, 'top',$event, true, true)"
                            @blur="state.edit=undefined"
                            @change="event => applyStyleTop(props, state, 'top', toStyleUnit(event.target?.['value']))"
                        />

                        <div
                            v-if="state.edit!=='right'"
                            class="direction right"
                            :class="{'is-setting': state.right}"
                            @click="state.edit='right'"
                            title="设置right"
                        >
                            {{ state.right ?? 0 }}
                        </div>
                        <input
                            v-else
                            class="direction right"
                            v-focus
                            :value="state.right"
                            placeholder="0"
                            @input="validateInputStyleValue(state, 'right',$event, true, true)"
                            @blur="state.edit=undefined"
                            @change="event => applyStyleRight(props, state, 'right', toStyleUnit(event.target?.['value']))"
                        />

                        <div
                            v-if="state.edit!=='bottom'"
                            class="direction bottom"
                            :class="{'is-setting': state.bottom}"
                            @click="state.edit='bottom'"
                            title="设置bottom"
                        >
                            {{ state.bottom ?? 0 }}
                        </div>
                        <input
                            v-else
                            class="direction bottom"
                            v-focus
                            :value="state.bottom"
                            placeholder="0"
                            @input="validateInputStyleValue(state, 'bottom',$event, true, true)"
                            @blur="state.edit=undefined"
                            @change="event => applyStyleBottom(props, state, 'bottom', toStyleUnit(event.target?.['value']))"
                        />

                        <div
                            v-if="state.edit!=='left'"
                            class="direction left"
                            :class="{'is-setting': state.left}"
                            @click="state.edit='left'"
                            title="设置left"
                        >
                            {{ state.left ?? 0 }}
                        </div>
                        <input
                            v-else
                            class="direction left"
                            v-focus
                            :value="state.left"
                            placeholder="0"
                            @input="validateInputStyleValue(state, 'left',$event, true, true)"
                            @blur="state.edit=undefined"
                            @change="event => applyStyleLeft(props, state, 'left', toStyleUnit(event.target?.['value']))"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="float 属性配置">
                    <span class="setter-label-tips">元素浮动</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="float in data.floatList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': float.value===state.style.float,
                    }"
                    @click="setFloat(float.value)"
                    :title="float.tip"
                >
                    <span style="font-size: 11px; white-space: nowrap;">{{ float.text }}</span>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="clear 属性配置">
                    <span class="setter-label-tips">清除浮动</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="clear in data.clearList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': clear.value===state.style.clear,
                    }"
                    @click="setClear(clear.value)"
                    :title="clear.tip"
                >
                    <span style="font-size: 11px; white-space: nowrap;">{{ clear.text }}</span>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="z-index 属性配置">
                    <span class="setter-label-tips">重叠位置</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <Numeric
                    style="width: 100%;"
                    v-model="state.style.zIndex"
                    size="mini"
                    :allow-empty="true"
                    :clearable="true"
                    controlsPosition="right"
                    placeholder="z-index"
                    @change="value => applyStyleZIndex(props, state, 'zIndex', value)"
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

.setter-row-input-radio.selected2 {
    fill: #4f77ff;
    color: #4f77ff;
    border: 1px solid #7693F5;
    background: #b5b5b5;
}

.setting-wrap {
    grid-column: 1 / -1;
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: 48px 1fr;
    padding: 0;
}

.setting-wrap .setting {
    grid-area: 1 / 2 / -1 / 3;
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    grid-template-rows: 24px minmax(16px, 1fr) 24px;
    justify-items: center;
    width: 172px;
    height: 64px;
}

.setting-wrap .direction {
    cursor: default;
    user-select: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.2px;
    display: flex;
    color: #252b3a;
    background: transparent;
    padding: 2px;
    margin-left: -2px;
    border-radius: 2px;
    max-width: 100%;
    box-sizing: content-box;
    place-self: center;
    position: relative;
    opacity: 1;
    align-items: center;
    justify-content: center;
}

.setting-wrap .direction.is-setting {
    background-color: rgba(76, 152, 241, 0.15);
}

.setting-wrap .top {
    grid-area: 1 / 2 / 2 / 3;
}

.setting-wrap .right {
    grid-area: 2 / 3 / 3 / 4;
}

.setting-wrap .bottom {
    grid-area: 3 / 2 / 4 / 3;
}

.setting-wrap .left {
    grid-area: 2 / 1 / 3 / 2;
}

.setting-wrap input.top,
.setting-wrap input.right,
.setting-wrap input.bottom,
.setting-wrap input.left {
    border: none;
    text-align: center;
}

.setting-wrap input.top:focus-visible,
.setting-wrap input.right:focus-visible,
.setting-wrap input.bottom:focus-visible,
.setting-wrap input.left:focus-visible {
    outline: none;
}

.setting-wrap .lr-path-color {
    color: #e5e5e5;
    cursor: pointer;
}

.setting-wrap .lr-path-color:hover {
    color: #dfdfdf;
}

.setting-wrap .tb-path-color {
    color: #d1d1d1;
    cursor: pointer;
}

.setting-wrap .tb-path-color:hover {
    color: #bdbdbd;
}

.setting-wrap .stroke {
    stroke: #999;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.setter-row-input :deep(.tiny-numeric__input-inner) {
    text-align: left;
}
</style>
