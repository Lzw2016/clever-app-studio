<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input as TinyInput, Select, Tooltip } from "@opentiny/vue";
import { overwriteProperty } from "@/utils/Utils";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, batchApplyStyle, getStyle, toStyleUnit, unStyleUnit } from "@/draggable/utils/StyleUtils";
import BorderRadiusSingle from "@/assets/images/border-radius-single.svg?component";
import BorderRadiusMultiple from "@/assets/images/border-radius-multiple.svg?component";
import BorderRadiusTopLeft from "@/assets/images/border-radius-topleft.svg?component";
import BorderRadiusTopRight from "@/assets/images/border-radius-topright.svg?component";
import BorderRadiusBottomLeft from "@/assets/images/border-radius-bottomleft.svg?component";
import BorderRadiusBottomRight from "@/assets/images/border-radius-bottomright.svg?component";
import BorderAll from "@/assets/images/border-all.svg?component";
import BorderMultiple from "@/assets/images/border-multiple.svg?component";
// import BorderTop from "@/assets/images/border-top.svg?component";
// import BorderRight from "@/assets/images/border-right.svg?component";
// import BorderBottom from "@/assets/images/border-bottom.svg?component";
// import BorderLeft from "@/assets/images/border-left.svg?component";

// 定义组件选项
defineOptions({
    name: 'BorderStyle',
});

// 定义 Props 类型
interface BorderStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<BorderStyleProps>(), {});

// 定义 State 类型
interface BorderStyleState extends StyleSetterState {
    borderRadiusSingle?: boolean;
    borderRadius?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
    borderStyleSingle?: boolean;
    borderStyle?: string;
    borderColor?: string;
    borderWidth?: string;
    borderTopWidth?: string;
    borderRightWidth?: string;
    borderBottomWidth?: string;
    borderLeftWidth?: string;
    readonly style: {
        borderTopLeftRadius?: string;
        borderTopRightRadius?: string;
        borderBottomLeftRadius?: string;
        borderBottomRightRadius?: string;
        borderTopStyle?: string;
        borderRightStyle?: string;
        borderBottomStyle?: string;
        borderLeftStyle?: string;
        borderTopColor?: string;
        borderRightColor?: string;
        borderBottomColor?: string;
        borderLeftColor?: string;
        borderTopWidth?: string;
        borderRightWidth?: string;
        borderBottomWidth?: string;
        borderLeftWidth?: string;
    };
}

// state 属性
const state = reactive<BorderStyleState>({
    style: {},
});
// 内部数据
const data = {
    borderRadiusSingleList: [
        { value: true, tip: "统一设置", icon: BorderRadiusSingle },
        { value: false, tip: "分别设置", icon: BorderRadiusMultiple },
    ],
    borderStyleSingleList: [
        { value: true, tip: "统一设置", icon: BorderAll },
        { value: false, tip: "分别设置", icon: BorderMultiple },
    ],
    borderStyleList: [
        { label: '无-none', value: 'none' },
        { label: '实线-solid', value: 'solid' },
        { label: '虚线-dashed', value: 'dashed' },
        { label: '圆点-dotted', value: 'dotted' },
        { label: '双实线-double', value: 'double' },
    ],
};

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.borderTopLeftRadius = getStyle(props, state, "borderTopLeftRadius");
    state.style.borderTopRightRadius = getStyle(props, state, "borderTopRightRadius");
    state.style.borderBottomLeftRadius = getStyle(props, state, "borderBottomLeftRadius");
    state.style.borderBottomRightRadius = getStyle(props, state, "borderBottomRightRadius");
    state.style.borderTopStyle = getStyle(props, state, "borderTopStyle");
    state.style.borderRightStyle = getStyle(props, state, "borderRightStyle");
    state.style.borderBottomStyle = getStyle(props, state, "borderBottomStyle");
    state.style.borderLeftStyle = getStyle(props, state, "borderLeftStyle");
    state.style.borderTopColor = getStyle(props, state, "borderTopColor");
    state.style.borderRightColor = getStyle(props, state, "borderRightColor");
    state.style.borderBottomColor = getStyle(props, state, "borderBottomColor");
    state.style.borderLeftColor = getStyle(props, state, "borderLeftColor");
    state.style.borderTopWidth = getStyle(props, state, "borderTopWidth");
    state.style.borderRightWidth = getStyle(props, state, "borderRightWidth");
    state.style.borderBottomWidth = getStyle(props, state, "borderBottomWidth");
    state.style.borderLeftWidth = getStyle(props, state, "borderLeftWidth");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.borderRadius, value => {
    if (value) {
        state.borderTopLeftRadius = value;
        state.borderTopRightRadius = value;
        state.borderBottomLeftRadius = value;
        state.borderBottomRightRadius = value;
    } else {
        delete state.borderTopLeftRadius;
        delete state.borderTopRightRadius;
        delete state.borderBottomLeftRadius;
        delete state.borderBottomRightRadius;
    }
});
watch(() => state.borderTopLeftRadius, value => autoUseStyleUnit(state.style, "borderTopLeftRadius", value));
watch(() => state.borderTopRightRadius, value => autoUseStyleUnit(state.style, "borderTopRightRadius", value));
watch(() => state.borderBottomLeftRadius, value => autoUseStyleUnit(state.style, "borderBottomLeftRadius", value));
watch(() => state.borderBottomRightRadius, value => autoUseStyleUnit(state.style, "borderBottomRightRadius", value));
watch(() => state.borderStyle, value => {
    if (value) {
        state.style.borderTopStyle = value;
        state.style.borderRightStyle = value;
        state.style.borderBottomStyle = value;
        state.style.borderLeftStyle = value;
    } else {
        delete state.style.borderTopStyle;
        delete state.style.borderRightStyle;
        delete state.style.borderBottomStyle;
        delete state.style.borderLeftStyle;
    }
});
watch(() => state.borderColor, value => {
    if (value) {
        state.style.borderTopColor = value;
        state.style.borderRightColor = value;
        state.style.borderBottomColor = value;
        state.style.borderLeftColor = value;
    } else {
        delete state.style.borderTopColor;
        delete state.style.borderRightColor;
        delete state.style.borderBottomColor;
        delete state.style.borderLeftColor;
    }
});
watch(() => state.borderWidth, value => {
    if (value) {
        state.borderTopWidth = value;
        state.borderRightWidth = value;
        state.borderBottomWidth = value;
        state.borderLeftWidth = value;
    } else {
        delete state.borderTopWidth;
        delete state.borderRightWidth;
        delete state.borderBottomWidth;
        delete state.borderLeftWidth;
    }
});
watch(() => state.borderTopWidth, value => autoUseStyleUnit(state.style, "borderTopWidth", value));
watch(() => state.borderRightWidth, value => autoUseStyleUnit(state.style, "borderRightWidth", value));
watch(() => state.borderBottomWidth, value => autoUseStyleUnit(state.style, "borderBottomWidth", value));
watch(() => state.borderLeftWidth, value => autoUseStyleUnit(state.style, "borderLeftWidth", value));
// state.style属性变化后应用 style
const batchApplyStyleBorderRadius = lodash.debounce(batchApplyStyle, applyStyleDebounceTime);
const applyStyleBorderTopLeftRadius = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderTopRightRadius = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderBottomLeftRadius = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderBottomRightRadius = lodash.debounce(applyStyle, applyStyleDebounceTime);
const batchApplyStyleBorderStyle = lodash.debounce(batchApplyStyle, applyStyleDebounceTime);
const applyStyleBorderTopStyle = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderRightStyle = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderBottomStyle = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderLeftStyle = lodash.debounce(applyStyle, applyStyleDebounceTime);

const batchApplyStyleBorderColor = lodash.debounce(batchApplyStyle, applyStyleDebounceTime);
const applyStyleBorderTopColor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderRightColor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderBottomColor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderLeftColor = lodash.debounce(applyStyle, applyStyleDebounceTime);

const batchApplyStyleBorderTopWidth = lodash.debounce(batchApplyStyle, applyStyleDebounceTime);
const applyStyleBorderTopWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderRightWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderBottomWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleBorderLeftWidth = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
    const tmp = new Set<any>();
    [
        state.style.borderTopLeftRadius,
        state.style.borderTopRightRadius,
        state.style.borderBottomLeftRadius,
        state.style.borderBottomRightRadius,
    ].forEach(item => tmp.add(item));
    if (tmp.size === 1) {
        if (state.style.borderTopLeftRadius) {
            state.borderRadiusSingle = true;
            state.borderRadius = unStyleUnit(state.style.borderTopLeftRadius);
        } else {
            deleteBorderRadius();
        }
    } else {
        state.borderRadiusSingle = false;
        state.borderTopLeftRadius = unStyleUnit(state.style.borderTopLeftRadius);
        state.borderTopRightRadius = unStyleUnit(state.style.borderTopRightRadius);
        state.borderBottomLeftRadius = unStyleUnit(state.style.borderBottomLeftRadius);
        state.borderBottomRightRadius = unStyleUnit(state.style.borderBottomRightRadius);
    }
    tmp.clear();
    [
        state.style.borderTopStyle,
        state.style.borderRightStyle,
        state.style.borderBottomStyle,
        state.style.borderLeftStyle,
    ].forEach(item => tmp.add(item));
    const styleCount = tmp.size === 1;
    tmp.clear();
    [
        state.style.borderTopColor,
        state.style.borderRightColor,
        state.style.borderBottomColor,
        state.style.borderLeftColor,
    ].forEach(item => tmp.add(item));
    const colorCount = tmp.size === 1;
    tmp.clear();
    [
        state.style.borderTopWidth,
        state.style.borderRightWidth,
        state.style.borderBottomWidth,
        state.style.borderLeftWidth,
    ].forEach(item => tmp.add(item));
    const widthCount = tmp.size === 1;
    if (styleCount && colorCount && widthCount) {
        if (!state.style.borderTopStyle && !state.style.borderTopColor && !state.style.borderTopWidth) {
            deleteBorderStyle();
        } else {
            state.borderStyleSingle = true;
            state.borderStyle = state.style.borderTopStyle;
            state.borderColor = state.style.borderTopColor;
            state.borderWidth = unStyleUnit(state.style.borderTopWidth);
        }
    } else {
        state.borderStyleSingle = false;
        state.borderTopWidth = unStyleUnit(state.style.borderTopWidth);
        state.borderRightWidth = unStyleUnit(state.style.borderRightWidth);
        state.borderBottomWidth = unStyleUnit(state.style.borderBottomWidth);
        state.borderLeftWidth = unStyleUnit(state.style.borderLeftWidth);
    }
}

function getBorderRadius(borderRadius?: string) {
    borderRadius = toStyleUnit(borderRadius);
    return {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    };
}

function deleteBorderRadius() {
    delete state.borderRadiusSingle;
    delete state.borderRadius;
    delete state.borderTopLeftRadius;
    delete state.borderTopRightRadius;
    delete state.borderBottomLeftRadius;
    delete state.borderBottomRightRadius;
    delete state.style.borderTopLeftRadius;
    delete state.style.borderTopRightRadius;
    delete state.style.borderBottomLeftRadius;
    delete state.style.borderBottomRightRadius;
}

function setBorderRadiusSingle(value: boolean) {
    if (state.borderRadiusSingle === value) {
        deleteBorderRadius();
        batchApplyStyleBorderRadius(props, state, getBorderRadius(undefined));
    } else {
        state.borderRadiusSingle = value;
        if (value) {
            batchApplyStyleBorderRadius(props, state, getBorderRadius(state.borderRadius));
        } else {
            batchApplyStyleBorderRadius(props, state, {
                borderTopLeftRadius: state.style.borderTopLeftRadius,
                borderTopRightRadius: state.style.borderTopRightRadius,
                borderBottomLeftRadius: state.style.borderBottomLeftRadius,
                borderBottomRightRadius: state.style.borderBottomRightRadius,
            });
        }
    }
}

function getBorderStyle(borderStyle?: string) {
    return {
        borderTopStyle: borderStyle,
        borderRightStyle: borderStyle,
        borderBottomStyle: borderStyle,
        borderLeftStyle: borderStyle,
    };
}

function getBorderWidth(borderWidth?: string) {
    return {
        borderTopWidth: toStyleUnit(borderWidth),
        borderRightWidth: toStyleUnit(borderWidth),
        borderBottomWidth: toStyleUnit(borderWidth),
        borderLeftWidth: toStyleUnit(borderWidth),
    };
}

function getBorderColor(borderColor?: string) {
    return {
        borderTopColor: borderColor,
        borderRightColor: borderColor,
        borderBottomColor: borderColor,
        borderLeftColor: borderColor,
    };
}

function delBorderColor() {
    delete state.borderColor;
    batchApplyStyleBorderColor(props, state, getBorderColor(undefined));
}

function deleteBorderStyle() {
    delete state.borderStyleSingle;
    delete state.borderStyle;
    delete state.borderColor;
    delete state.borderWidth;
    delete state.borderTopWidth;
    delete state.borderRightWidth;
    delete state.borderBottomWidth;
    delete state.borderLeftWidth;
    delete state.style.borderTopStyle;
    delete state.style.borderRightStyle;
    delete state.style.borderBottomStyle;
    delete state.style.borderLeftStyle;
    delete state.style.borderTopColor;
    delete state.style.borderRightColor;
    delete state.style.borderBottomColor;
    delete state.style.borderLeftColor;
    delete state.style.borderTopWidth;
    delete state.style.borderRightWidth;
    delete state.style.borderBottomWidth;
    delete state.style.borderLeftWidth;
}

function setBorderStyleSingle(value: boolean) {
    if (state.borderStyleSingle === value) {
        deleteBorderStyle();
        batchApplyStyle(props, state, {
            borderTopStyle: undefined,
            borderRightStyle: undefined,
            borderBottomStyle: undefined,
            borderLeftStyle: undefined,
            borderTopColor: undefined,
            borderRightColor: undefined,
            borderBottomColor: undefined,
            borderLeftColor: undefined,
            borderTopWidth: undefined,
            borderRightWidth: undefined,
            borderBottomWidth: undefined,
            borderLeftWidth: undefined,
        });
    } else {
        state.borderStyleSingle = value;
        if(value) {
            batchApplyStyle(props, state, {
                borderTopStyle: state.borderStyle,
                borderRightStyle: state.borderStyle,
                borderBottomStyle: state.borderStyle,
                borderLeftStyle: state.borderStyle,
                borderTopColor: state.borderColor,
                borderRightColor: state.borderColor,
                borderBottomColor: state.borderColor,
                borderLeftColor: state.borderColor,
                borderTopWidth: state.borderWidth,
                borderRightWidth: state.borderWidth,
                borderBottomWidth: state.borderWidth,
                borderLeftWidth: state.borderWidth,
            });
        } else {
            batchApplyStyle(props, state, {
                borderTopStyle: state.style.borderTopStyle,
                borderRightStyle: state.style.borderRightStyle,
                borderBottomStyle: state.style.borderBottomStyle,
                borderLeftStyle: state.style.borderLeftStyle,
                borderTopColor: state.style.borderTopColor,
                borderRightColor: state.style.borderRightColor,
                borderBottomColor: state.style.borderBottomColor,
                borderLeftColor: state.style.borderLeftColor,
                borderTopWidth: state.style.borderTopWidth,
                borderRightWidth: state.style.borderRightWidth,
                borderBottomWidth: state.style.borderBottomWidth,
                borderLeftWidth: state.style.borderLeftWidth,
            });
        }
    }
}

function delBorderTopColor() {
    delete state.style.borderTopColor;
    applyStyleBorderTopColor(props, state, 'borderTopColor', undefined);
}

function delBorderRightColor() {
    delete state.style.borderRightColor;
    applyStyleBorderRightColor(props, state, 'borderRightColor', undefined);
}

function delBorderBottomColor() {
    delete state.style.borderBottomColor
    applyStyleBorderBottomColor(props, state, 'borderBottomColor', undefined);
}

function delBorderLeftColor() {
    delete state.style.borderLeftColor
    applyStyleBorderLeftColor(props, state, 'borderLeftColor', undefined);
}

const styleProperties = [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderTopStyle",
    "borderRightStyle",
    "borderBottomStyle",
    "borderLeftStyle",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
];

function updateStyle(style: Record<string, any>) {
    overwriteProperty(state.style, style, {
        includes: styleProperties,
    });
}

defineExpose({
    initState,
    styleProperties,
    updateStyle,
});
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="border-radius 属性配置，需手动设置单位：px、em等">
                    <span class="setter-label-tips">圆角</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="borderRadiusSingle in data.borderRadiusSingleList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': borderRadiusSingle.value===state.borderRadiusSingle,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setBorderRadiusSingle(borderRadiusSingle.value)"
                    :title="borderRadiusSingle.tip"
                >
                    <component :is="borderRadiusSingle.icon" style="width: 16px; height: 16px;"/>
                </div>
                <TinyInput
                    v-if="state.borderRadiusSingle"
                    class="flex-item-fill"
                    v-model="state.borderRadius"
                    size="mini"
                    :clearable="true"
                    placeholder="统一设置圆角大小"
                    @change="value => batchApplyStyleBorderRadius(props, state, getBorderRadius(value))"
                />
            </div>
        </div>
        <template v-if="state.borderRadiusSingle===false">
            <div class="flex-row-container setter-row" style="height: auto;">
                <div class="flex-item-fixed setter-row-label"/>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="左上圆角大小">
                            <BorderRadiusTopLeft style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput
                            class="flex-item-fill"
                            v-model="state.borderTopLeftRadius"
                            size="mini"
                            :clearable="true"
                            placeholder="左上"
                            @change="value => applyStyleBorderTopLeftRadius(props, state, 'borderTopLeftRadius', toStyleUnit(value))"
                        />
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右上圆角大小">
                            <BorderRadiusTopRight style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput
                            class="flex-item-fill"
                            v-model="state.borderTopRightRadius"
                            size="mini"
                            :clearable="true"
                            placeholder="右上"
                            @change="value => applyStyleBorderTopRightRadius(props, state, 'borderTopRightRadius', toStyleUnit(value))"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row" style="height: auto;">
                <div class="flex-item-fixed setter-row-label"/>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="左下圆角大小">
                            <BorderRadiusBottomLeft style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput
                            class="flex-item-fill"
                            v-model="state.borderBottomLeftRadius"
                            size="mini"
                            :clearable="true"
                            placeholder="左下"
                            @change="value => applyStyleBorderBottomLeftRadius(props, state, 'borderBottomLeftRadius', toStyleUnit(value))"
                        />
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右下圆角大小">
                            <BorderRadiusBottomRight style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput
                            class="flex-item-fill"
                            v-model="state.borderBottomRightRadius"
                            size="mini"
                            :clearable="true"
                            placeholder="右下"
                            @change="value => applyStyleBorderBottomRightRadius(props, state, 'borderBottomRightRadius', toStyleUnit(value))"
                        />
                    </div>
                </div>
            </div>
        </template>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="border-style、border-width、border-color 属性配置，需手动设置单位：px、em等">
                    <span class="setter-label-tips">边框</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="borderStyleSingle in data.borderStyleSingleList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': borderStyleSingle.value===state.borderStyleSingle,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setBorderStyleSingle(borderStyleSingle.value)"
                    :title="borderStyleSingle.tip"
                >
                    <component :is="borderStyleSingle.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div v-if="state.borderStyleSingle" class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="统一设置 border-style、border-width、border-color 属性，需手动设置单位：px、em等">
                    <span class="setter-label-tips">统一设置</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container flex-center">
                <Select
                    class="flex-item-fill"
                    v-model="state.borderStyle"
                    :options="data.borderStyleList"
                    size="mini"
                    :clearable="true"
                    placeholder="样式"
                    @change="value => batchApplyStyleBorderStyle(props, state, getBorderStyle(value))"
                />
                <span style="margin-left: 8px;"/>
                <TinyInput
                    class="flex-item-fill"
                    v-model="state.borderWidth"
                    size="mini"
                    :clearable="true"
                    placeholder="宽度"
                    @change="value => batchApplyStyleBorderTopWidth(props, state, getBorderWidth(value))"
                />
                <span style="margin-left: 8px;"/>
                <div class="flex-item-fixed flex-row-container flex-center">
                    <input
                        :value="state.borderColor ?? '#000000'"
                        @input="e => state.borderColor = e.target?.['value']"
                        type="color"
                        title="选择边框颜色"
                        @change="e => batchApplyStyleBorderColor(props, state, getBorderColor(e.target?.['value']))"
                    />
                    <FontAwesomeIcon
                        class="button-clear"
                        :style="{ visibility: state.borderColor ? 'unset': 'hidden' }"
                        :icon="faXmark"
                        @click="delBorderColor"
                        title="清除边框颜色"
                    />
                </div>
            </div>
        </div>
        <template v-else-if="state.borderStyleSingle===false">
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="border-top-style、border-top-width、border-top-color 属性配置，需手动设置单位：px、em等">
                        <span class="setter-label-tips">上边框</span>
                    </Tooltip>
                    <!-- <BorderTop style="width: 16px; height: 16px;"/> -->
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container flex-center">
                    <Select
                        class="flex-item-fill"
                        v-model="state.style.borderTopStyle"
                        :options="data.borderStyleList"
                        size="mini"
                        :clearable="true"
                        placeholder="样式"
                        @change="value => applyStyleBorderTopStyle(props, state, 'borderTopStyle', value)"
                    />
                    <span style="margin-left: 8px;"/>
                    <TinyInput
                        class="flex-item-fill"
                        v-model="state.borderTopWidth"
                        size="mini"
                        :clearable="true"
                        placeholder="宽度"
                        @change="value => applyStyleBorderTopWidth(props, state, 'borderTopWidth', toStyleUnit(value))"
                    />
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input
                            :value="state.style.borderTopColor ?? '#000000'"
                            @input="e => state.style.borderTopColor= e.target?.['value']"
                            type="color"
                            title="选择边框颜色"
                            @change="e => applyStyleBorderTopColor(props, state, 'borderTopColor', e.target?.['value'])"
                        />
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: state.style.borderTopColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delBorderTopColor"
                            title="清除边框颜色"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="border-right-style、border-right-width、border-right-color 属性配置，需手动设置单位：px、em等">
                        <span class="setter-label-tips">右边框</span>
                    </Tooltip>
                    <!-- <BorderRight style="width: 16px; height: 16px;"/> -->
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container flex-center">
                    <Select
                        class="flex-item-fill"
                        v-model="state.style.borderRightStyle"
                        :options="data.borderStyleList"
                        size="mini"
                        :clearable="true"
                        placeholder="样式"
                        @change="value => applyStyleBorderRightStyle(props, state, 'borderRightStyle', value)"
                    />
                    <span style="margin-left: 8px;"/>
                    <TinyInput
                        class="flex-item-fill"
                        v-model="state.borderRightWidth"
                        size="mini"
                        :clearable="true"
                        placeholder="宽度"
                        @change="value => applyStyleBorderRightWidth(props, state, 'borderRightWidth', toStyleUnit(value))"
                    />
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input
                            :value="state.style.borderRightColor ?? '#000000'"
                            @input="e => state.style.borderRightColor= e.target?.['value']"
                            type="color"
                            title="选择边框颜色"
                            @change="e => applyStyleBorderRightColor(props, state, 'borderRightColor', e.target?.['value'])"
                        />
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: state.style.borderRightColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delBorderRightColor"
                            title="清除边框颜色"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="border-bottom-style、border-bottom-width、border-bottom-color 属性配置，需手动设置单位：px、em等">
                        <span class="setter-label-tips">下边框</span>
                    </Tooltip>
                    <!-- <BorderBottom style="width: 16px; height: 16px;"/> -->
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container flex-center">
                    <Select
                        class="flex-item-fill"
                        v-model="state.style.borderBottomStyle"
                        :options="data.borderStyleList"
                        size="mini"
                        :clearable="true"
                        placeholder="样式"
                        @change="value => applyStyleBorderBottomStyle(props, state, 'borderBottomStyle', value)"
                    />
                    <span style="margin-left: 8px;"/>
                    <TinyInput
                        class="flex-item-fill"
                        v-model="state.borderBottomWidth"
                        size="mini"
                        :clearable="true"
                        placeholder="宽度"
                        @change="value => applyStyleBorderBottomWidth(props, state, 'borderBottomWidth', toStyleUnit(value))"
                    />
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input
                            :value="state.style.borderBottomColor ?? '#000000'"
                            @input="e => state.style.borderBottomColor= e.target?.['value']"
                            type="color"
                            title="选择边框颜色"
                            @change="e => applyStyleBorderBottomColor(props, state, 'borderBottomColor', e.target?.['value'])"
                        />
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: state.style.borderBottomColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delBorderBottomColor"
                            title="清除边框颜色"
                        />
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="border-left-style、border-left-width、border-left-color 属性配置，需手动设置单位：px、em等">
                        <span class="setter-label-tips">左边框</span>
                    </Tooltip>
                    <!-- <BorderLeft style="width: 16px; height: 16px;"/> -->
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container flex-center">
                    <Select
                        class="flex-item-fill"
                        v-model="state.style.borderLeftStyle"
                        :options="data.borderStyleList"
                        size="mini"
                        :clearable="true"
                        placeholder="样式"
                        @change="value => applyStyleBorderLeftStyle(props, state, 'borderLeftStyle', value)"
                    />
                    <span style="margin-left: 8px;"/>
                    <TinyInput
                        class="flex-item-fill"
                        v-model="state.borderLeftWidth"
                        size="mini"
                        :clearable="true"
                        placeholder="宽度"
                        @change="value => applyStyleBorderLeftWidth(props, state, 'borderLeftWidth', toStyleUnit(value))"
                    />
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input
                            :value="state.style.borderLeftColor ?? '#000000'"
                            @input="e => state.style.borderLeftColor= e.target?.['value']"
                            type="color"
                            title="选择边框颜色"
                            @change="e => applyStyleBorderLeftColor(props, state, 'borderLeftColor', e.target?.['value'])"
                        />
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: state.style.borderLeftColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delBorderLeftColor"
                            title="清除边框颜色"
                        />
                    </div>
                </div>
            </div>
        </template>
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

.setter-row-input input[type=color] {
    width: 22px;
    height: 24px;
    border: none;
    background: transparent;
    padding: 0;
    border-radius: 4px;
}

.button-clear {
    padding: 2px 4px;
    color: #252b3a;
    cursor: pointer;
}

.button-clear:hover {
    background: #DFE1E6;
    color: #4f77ff;
}
</style>
