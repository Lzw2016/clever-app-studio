<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, getStyle, toStyleUnit, unStyleUnit, validateInputStyleValue } from "@/draggable/utils/StyleUtils";

// 定义组件选项
defineOptions({
    name: 'SpacingStyle',
});

// 定义 Props 类型
interface SpacingStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SpacingStyleProps>(), {});

// 定义 State 类型
interface SpacingStyleState extends StyleSetterState {
    edit?: "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft";
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    readonly style: {
        marginTop?: string;
        marginRight?: string;
        marginBottom?: string;
        marginLeft?: string;
        paddingTop?: string;
        paddingRight?: string;
        paddingBottom?: string;
        paddingLeft?: string;
    };
}

// state 属性
const state = reactive<SpacingStyleState>({
    edit: undefined,
    style: {
        marginTop: undefined,
        marginRight: undefined,
        marginBottom: undefined,
        marginLeft: undefined,
        paddingTop: undefined,
        paddingRight: undefined,
        paddingBottom: undefined,
        paddingLeft: undefined,
    },
});
// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.marginTop = getStyle(props, state, "marginTop");
    state.style.marginRight = getStyle(props, state, "marginRight");
    state.style.marginBottom = getStyle(props, state, "marginBottom");
    state.style.marginLeft = getStyle(props, state, "marginLeft");
    state.style.paddingTop = getStyle(props, state, "paddingTop");
    state.style.paddingRight = getStyle(props, state, "paddingRight");
    state.style.paddingBottom = getStyle(props, state, "paddingBottom");
    state.style.paddingLeft = getStyle(props, state, "paddingLeft");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.marginTop, marginTop => autoUseStyleUnit(state.style, "marginTop", marginTop));
watch(() => state.marginRight, marginRight => autoUseStyleUnit(state.style, "marginRight", marginRight));
watch(() => state.marginBottom, marginBottom => autoUseStyleUnit(state.style, "marginBottom", marginBottom));
watch(() => state.marginLeft, marginLeft => autoUseStyleUnit(state.style, "marginLeft", marginLeft));
watch(() => state.paddingTop, paddingTop => autoUseStyleUnit(state.style, "paddingTop", paddingTop));
watch(() => state.paddingRight, paddingRight => autoUseStyleUnit(state.style, "paddingRight", paddingRight));
watch(() => state.paddingBottom, paddingBottom => autoUseStyleUnit(state.style, "paddingBottom", paddingBottom));
watch(() => state.paddingLeft, paddingLeft => autoUseStyleUnit(state.style, "paddingLeft", paddingLeft));
// state.style属性变化后应用 style
const applyStyleMarginTop = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMarginRight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMarginBottom = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleMarginLeft = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStylePaddingTop = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStylePaddingRight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStylePaddingBottom = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStylePaddingLeft = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
    state.marginTop = unStyleUnit(state.style.marginTop);
    state.marginRight = unStyleUnit(state.style.marginRight);
    state.marginBottom = unStyleUnit(state.style.marginBottom);
    state.marginLeft = unStyleUnit(state.style.marginLeft);
    state.paddingTop = unStyleUnit(state.style.paddingTop);
    state.paddingRight = unStyleUnit(state.style.paddingRight);
    state.paddingBottom = unStyleUnit(state.style.paddingBottom);
    state.paddingLeft = unStyleUnit(state.style.paddingLeft);
}
</script>

<template>
    <div>
        <div class="spacing-wrap">
            <div class="spacing-max-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="224" height="120" style="grid-area: 1 / 1 / -1 / -1">
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,1 h223 l-36,24 h-151 l-36,-24z"
                                data-automation-id="margin-top-button"
                                aria-label="Margin top button" class="tb-path-color"
                                @click="state.edit='marginTop'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m223,1 v119 l-36,-24 v-71 l36,-24z"
                                data-automation-id="margin-right-button"
                                aria-label="Margin right button"
                                class="lr-path-color"
                                @click="state.edit='marginRight'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,119 h223 l-36,-24 h-151 l-36,24z"
                                data-automation-id="margin-bottom-button"
                                aria-label="Margin bottom button"
                                class="tb-path-color"
                                @click="state.edit='marginBottom'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,1 v119 l36,-24 v-71 l-36,-24z"
                                data-automation-id="margin-left-button"
                                aria-label="Margin left button"
                                class="lr-path-color"
                                @click="state.edit='marginLeft'"
                            ></path>
                        </g>
                    </g>
                    <clipPath id="margin-outer">
                        <rect x="0" y="0" width="224" height="120" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                    </clipPath>
                    <rect class="stroke" clip-path="url(#margin-outer)" x="0" y="0" width="224" height="120" fill="transparent" rx="2" ry="2" style="pointer-events: none; stroke-width: 2px"></rect>
                    <clipPath id="margin-inner">
                        <rect x="36" y="24" width="152" height="72" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                    </clipPath>
                    <rect class="stroke" clip-path="url(#margin-inner)" x="36" y="24" width="152" height="72" fill="transparent" rx="2" ry="2" style="pointer-events: none; stroke-width: 2px"></rect>
                </svg>
                <div
                    v-if="state.edit!=='marginTop'"
                    class="spacing-edit margin-top"
                    :class="{'is-setting': state.marginTop}"
                    @click="state.edit='marginTop'"
                    title="设置margin-top"
                >
                    {{ state.marginTop ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit margin-top"
                    v-focus
                    :value="state.marginTop"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'marginTop' ,$event, true, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStyleMarginTop(props, state, 'marginTop', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='marginRight'"
                    class="spacing-edit margin-right"
                    :class="{'is-setting': state.marginRight}"
                    @click="state.edit='marginRight'"
                    title="设置margin-right"
                >
                    {{ state.marginRight ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit margin-right"
                    v-focus
                    placeholder="0"
                    :value="state.marginRight"
                    @input="validateInputStyleValue(state,'marginRight' ,$event, true, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStyleMarginRight(props, state, 'marginRight', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='marginBottom'"
                    class="spacing-edit margin-bottom"
                    :class="{'is-setting': state.marginBottom}"
                    @click="state.edit='marginBottom'"
                    title="设置margin-bottom"
                >
                    {{ state.marginBottom ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit margin-bottom"
                    v-focus
                    :value="state.marginBottom"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'marginBottom' ,$event, true, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStyleMarginBottom(props, state, 'marginBottom', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='marginLeft'"
                    class="spacing-edit margin-left"
                    :class="{'is-setting': state.marginLeft}"
                    @click="state.edit='marginLeft'"
                    title="设置margin-left"
                >
                    {{ state.marginLeft ?? 0 }}
                </div>
                <input
                    v-else class="spacing-edit margin-left"
                    v-focus
                    :value="state.marginLeft"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'marginLeft' ,$event, true, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStyleMarginLeft(props, state, 'marginLeft', toStyleUnit(event.target?.['value']))"
                />
            </div>
            <div class="spacing-min-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="144" height="64" style="grid-area: 1 / 1 / -1 / -1">
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,1 h143 l-36,24 h-71 l-36,-24z"
                                data-automation-id="padding-top-button"
                                aria-label="Padding top button"
                                class="tb-path-color"
                                @click="state.edit='paddingTop'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m143,1 v63 l-36,-24 v-15 l36,-24z"
                                data-automation-id="padding-right-button"
                                aria-label="Padding right button"
                                class="lr-path-color"
                                @click="state.edit='paddingRight'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,63 h143 l-36,-24 h-71 l-36,24z"
                                data-automation-id="padding-bottom-button"
                                aria-label="Padding bottom button"
                                class="tb-path-color"
                                @click="state.edit='paddingBottom'"
                            ></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                mode="delta"
                                fill="currentColor"
                                d="m1,1 v63 l36,-24 v-15 l-36,-24z"
                                data-automation-id="padding-left-button"
                                aria-label="Padding left button"
                                class="lr-path-color"
                                @click="state.edit='paddingLeft'"
                            ></path>
                        </g>
                    </g>
                    <clipPath id="padding-outer">
                        <rect x="0" y="0" width="144" height="64" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                    </clipPath>
                    <rect class="stroke" clip-path="url(#padding-outer)" x="0" y="0" width="144" height="64" fill="transparent" rx="2" ry="2" style="pointer-events: none; stroke-width: 2px"></rect>
                    <clipPath id="padding-inner">
                        <rect x="36" y="24" width="72" height="16" fill="transparent" rx="2" ry="2" style="pointer-events: none"></rect>
                    </clipPath>
                    <rect class="stroke" clip-path="url(#padding-inner)" x="36" y="24" width="72" height="16" fill="transparent" rx="2" ry="2" style="pointer-events: none; stroke-width: 2px"></rect>
                </svg>
                <div
                    v-if="state.edit!=='paddingTop'"
                    class="spacing-edit padding-top"
                    :class="{'is-setting': state.paddingTop}"
                    @click="state.edit='paddingTop'"
                    title="设置padding-top"
                >
                    {{ state.paddingTop ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit padding-top"
                    v-focus
                    :value="state.paddingTop"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'paddingTop' ,$event, false, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStylePaddingTop(props, state, 'paddingTop', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='paddingRight'"
                    class="spacing-edit padding-right"
                    :class="{'is-setting': state.paddingRight}"
                    @click="state.edit='paddingRight'"
                    title="设置padding-right"
                >
                    {{ state.paddingRight ?? 0 }}
                </div>
                <input
                    v-else class="spacing-edit padding-right"
                    v-focus
                    :value="state.paddingRight"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'paddingRight' ,$event, false, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStylePaddingRight(props, state, 'paddingRight', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='paddingBottom'"
                    class="spacing-edit padding-bottom"
                    :class="{'is-setting': state.paddingBottom}"
                    @click="state.edit='paddingBottom'"
                    title="设置padding-bottom"
                >
                    {{ state.paddingBottom ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit padding-bottom"
                    v-focus
                    :value="state.paddingBottom"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'paddingBottom' ,$event, false, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStylePaddingBottom(props, state, 'paddingBottom', toStyleUnit(event.target?.['value']))"
                />

                <div
                    v-if="state.edit!=='paddingLeft'"
                    class="spacing-edit padding-left"
                    :class="{'is-setting': state.paddingLeft}"
                    @click="state.edit='paddingLeft'"
                    title="设置padding-left"
                >
                    {{ state.paddingLeft ?? 0 }}
                </div>
                <input
                    v-else
                    class="spacing-edit padding-left"
                    v-focus
                    :value="state.paddingLeft"
                    placeholder="0"
                    @input="validateInputStyleValue(state,'paddingLeft' ,$event, false, false)"
                    @blur="state.edit=undefined"
                    @change="event => applyStylePaddingLeft(props, state, 'paddingLeft', toStyleUnit(event.target?.['value']))"
                />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="grid-area: 3 / 3 / span 3 / span 3; pointer-events: none">
                <text x="6" y="4" fill="#a6a6a6" font-style="italic" font-weight="bold" font-size="8" dominant-baseline="hanging">
                    padding
                </text>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="grid-area: 1 / 1 / -1 / -1; pointer-events: none">
                <text x="6" y="4" fill="#a6a6a6" font-style="italic" font-weight="bold" font-size="8" dominant-baseline="hanging">
                    margin
                </text>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.spacing-wrap {
    position: relative;
    display: grid;
    grid-template-columns: 36px 4px 36px 1fr 36px 4px 36px;
    grid-template-rows: 24px 4px 24px 1fr 24px 4px 24px;
    width: 224px;
    height: 120px;
    margin: 0 auto;
    outline-style: none;
    cursor: default;
    user-select: none;
}

.spacing-wrap .spacing-max-icon {
    grid-area: 1 / 1 / -1 / -1;
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    grid-template-rows: 24px minmax(16px, 1fr) 24px;
    justify-items: center;
    width: 224px;
    height: 120px;
}

.spacing-wrap .spacing-min-icon {
    grid-area: 3 / 3 / span 3 / span 3;
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    grid-template-rows: 24px minmax(16px, 1fr) 24px;
    justify-items: center;
    width: 144px;
    height: 64px;
}

.spacing-wrap .spacing-edit {
    cursor: pointer;
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
    color: #191919;
    background: transparent;
    padding: 2px 4px;
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

.spacing-wrap .spacing-edit.is-setting {
    background-color: rgba(76, 152, 241, 0.15);
}

.spacing-wrap .spacing-edit.margin-top, .spacing-wrap .spacing-edit.padding-top {
    grid-area: 1 / 2 / 2 / 3;
}

.spacing-wrap .spacing-edit.margin-right, .spacing-wrap .spacing-edit.padding-right {
    grid-area: 2 / 3 / 3 / 4;
}

.spacing-wrap .spacing-edit.margin-bottom, .spacing-wrap .spacing-edit.padding-bottom {
    grid-area: 3 / 2 / 4 / 3;
}

.spacing-wrap .spacing-edit.margin-left, .spacing-wrap .spacing-edit.padding-left {
    grid-area: 2 / 1 / 3 / 2;
}

.spacing-wrap input.spacing-edit.margin-top,
.spacing-wrap input.spacing-edit.margin-right,
.spacing-wrap input.spacing-edit.margin-bottom,
.spacing-wrap input.spacing-edit.margin-left,
.spacing-wrap input.spacing-edit.padding-top,
.spacing-wrap input.spacing-edit.padding-right,
.spacing-wrap input.spacing-edit.padding-bottom,
.spacing-wrap input.spacing-edit.padding-left {
    border: none;
    text-align: center;
}

.spacing-wrap input.spacing-edit.margin-top:focus-visible,
.spacing-wrap input.spacing-edit.margin-right:focus-visible,
.spacing-wrap input.spacing-edit.margin-bottom:focus-visible,
.spacing-wrap input.spacing-edit.margin-left:focus-visible,
.spacing-wrap input.spacing-edit.padding-top:focus-visible,
.spacing-wrap input.spacing-edit.padding-right:focus-visible,
.spacing-wrap input.spacing-edit.padding-bottom:focus-visible,
.spacing-wrap input.spacing-edit.padding-left:focus-visible {
    outline: none;
}

.spacing-wrap .lr-path-color {
    cursor: pointer;
    color: #e5e5e5;
}

.spacing-wrap .lr-path-color:hover {
    color: #dfdfdf;
}

.spacing-wrap .tb-path-color {
    cursor: pointer;
    color: #d1d1d1;
}

.spacing-wrap .tb-path-color:hover {
    color: #bdbdbd;
}

.spacing-wrap .stroke {
    stroke: #999;
}
</style>
