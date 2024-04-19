<script setup lang="ts">
import lodash from "lodash";
import { defineModel, reactive, shallowReactive } from "vue";
import { Numeric, Tooltip } from "@opentiny/vue";

// 定义组件选项
defineOptions({
    name: 'PositionStyle',
});

// 定义 Props 类型
interface PositionStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<PositionStyleProps>(), {});

// 定义 State 类型
interface PositionStyleState {
    edit?: "top" | "right" | "bottom" | "left";
}

// state 属性
const state = reactive<PositionStyleState>({});
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
};

interface PositionStyleModel {
    position?: string;
    inset?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    float?: string;
    clear?: string;
    zIndex?: number;
}

// css display 值
const model = defineModel<PositionStyleModel>({
    default: shallowReactive<PositionStyleModel>({}),
});

// 初始化
if (model.value) {
    // TODO model -> state
}

function setPosition(val: string) {
    if (model.value.position === val) {
        delete model.value.position;
        return;
    }
    model.value.position = val;
}

function setPositionConfig(name: string, val: string) {
    if (model.value[name] === val) {
        delete model.value[name];
        return;
    }
    model.value[name] = val;
}

function setFloat(val: string) {
    setPositionConfig("float", val);
}

function setClear(val: string) {
    setPositionConfig("clear", val);
}

function validateSpacingValue(event: Event, name: string, useAuto: boolean = true) {
    if (!event.target) return;
    let value: string = event.target["value"] ?? "";
    let spacingValue: any;
    if (value.length <= 0) {
        spacingValue = "";
    } else if (useAuto && value.toLowerCase() === "a") {
        // 输入 a 表示 auto
        spacingValue = "auto";
    } else if (useAuto && value === "aut") {
        // 删除 auto
        spacingValue = undefined;
    } else if (useAuto && value.startsWith("auto") && value.length > 4) {
        // auto后面接着输入
        value = value.substring(4);
        const num = lodash.toNumber(value);
        spacingValue = lodash.isFinite(num) ? value : "auto";
    } else {
        // 输入的是
        spacingValue = value;
    }
    spacingValue = lodash.trim(spacingValue);
    // 保证输入“数字”或者“auto”
    if (![undefined, "", "auto"].includes(spacingValue) && !lodash.isFinite(lodash.toNumber(spacingValue))) {
        const match = value.match(/\d+(\.\d+)?/);
        if (match && match[0]) {
            spacingValue = match[0];
        } else {
            spacingValue = undefined;
        }
    }
    // 空值处理
    if (["0", ""].includes(spacingValue)) {
        spacingValue = undefined;
    }
    // 更新数据
    model.value[name] = spacingValue;
    event.target["value"] = spacingValue ?? "";
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
                        'selected': position.value===model.position,
                    }"
                    @click="setPosition(position.value)"
                    :title="position.tip"
                >
                    <span style="font-size: 11px; white-space: nowrap;">{{ position.text }}</span>
                </div>
            </div>
        </div>
        <div v-if="['relative', 'absolute', 'fixed', 'sticky'].includes(model.position)" class="setter-row" style="height: auto;">
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
                        <div v-if="state.edit!=='top'" class="direction top" :class="{'is-setting': model.top}" @click="state.edit='top'">
                            {{ model.top ?? 0 }}
                        </div>
                        <input v-else class="direction top" v-focus :value="model.top" @input="validateSpacingValue($event, 'top')" placeholder="0" @blur="state.edit=undefined"/>

                        <div v-if="state.edit!=='right'" class="direction right" :class="{'is-setting': model.right}" @click="state.edit='right'">
                            {{ model.right ?? 0 }}
                        </div>
                        <input v-else class="direction right" v-focus :value="model.right" @input="validateSpacingValue($event, 'right')" placeholder="0" @blur="state.edit=undefined"/>

                        <div v-if="state.edit!=='bottom'" class="direction bottom" :class="{'is-setting': model.bottom}" @click="state.edit='bottom'">
                            {{ model.bottom ?? 0 }}
                        </div>
                        <input v-else class="direction bottom" v-focus :value="model.bottom" @input="validateSpacingValue($event, 'bottom')" placeholder="0" @blur="state.edit=undefined"/>

                        <div v-if="state.edit!=='left'" class="direction left" :class="{'is-setting': model.left}" @click="state.edit='left'">
                            {{ model.left ?? 0 }}
                        </div>
                        <input v-else class="direction left" v-focus :value="model.left" @input="validateSpacingValue($event, 'left')" placeholder="0" @blur="state.edit=undefined"/>
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
                        'selected': float.value===model.float,
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
                        'selected': clear.value===model.clear,
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
                <Numeric style="width: 100%;" v-model="model.zIndex" size="mini" :allow-empty="true" :clearable="true" controlsPosition="right" placeholder="z-index"/>
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
