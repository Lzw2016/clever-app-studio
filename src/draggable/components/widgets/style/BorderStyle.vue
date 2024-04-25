<script setup lang="ts">
import { defineExpose, defineModel, reactive, shallowReactive, watch } from "vue";
import { Input as TinyInput, Select, Tooltip } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { autoUseStyleUnit, unStyleUnit } from "@/draggable/utils/StyleUtils";
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
interface BorderStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<BorderStyleProps>(), {});

// 定义 State 类型
interface BorderStyleState {
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
}

// state 属性
const state = reactive<BorderStyleState>({
    borderRadiusSingle: undefined,
    borderStyleSingle: undefined,
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

interface BorderStyleModel {
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
}

// css display 值
const model = defineModel<BorderStyleModel>({
    default: shallowReactive<BorderStyleModel>({}),
});

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
watch(() => state.borderTopLeftRadius, value => autoUseStyleUnit(model.value, "borderTopLeftRadius", value));
watch(() => state.borderTopRightRadius, value => autoUseStyleUnit(model.value, "borderTopRightRadius", value));
watch(() => state.borderBottomLeftRadius, value => autoUseStyleUnit(model.value, "borderBottomLeftRadius", value));
watch(() => state.borderBottomRightRadius, value => autoUseStyleUnit(model.value, "borderBottomRightRadius", value));
watch(() => state.borderStyle, value => {
    if (value) {
        model.value.borderTopStyle = value;
        model.value.borderRightStyle = value;
        model.value.borderBottomStyle = value;
        model.value.borderLeftStyle = value;
    } else {
        delete model.value.borderTopStyle;
        delete model.value.borderRightStyle;
        delete model.value.borderBottomStyle;
        delete model.value.borderLeftStyle;
    }
});
watch(() => state.borderColor, value => {
    if (value) {
        model.value.borderTopColor = value;
        model.value.borderRightColor = value;
        model.value.borderBottomColor = value;
        model.value.borderLeftColor = value;
    } else {
        delete model.value.borderTopColor;
        delete model.value.borderRightColor;
        delete model.value.borderBottomColor;
        delete model.value.borderLeftColor;
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
watch(() => state.borderTopWidth, value => autoUseStyleUnit(model.value, "borderTopWidth", value));
watch(() => state.borderRightWidth, value => autoUseStyleUnit(model.value, "borderRightWidth", value));
watch(() => state.borderBottomWidth, value => autoUseStyleUnit(model.value, "borderBottomWidth", value));
watch(() => state.borderLeftWidth, value => autoUseStyleUnit(model.value, "borderLeftWidth", value));

function setBorderRadiusSingle(value: boolean) {
    if (state.borderRadiusSingle === value) {
        delete state.borderRadiusSingle;
        delete state.borderRadius;
        delete state.borderTopLeftRadius;
        delete state.borderTopRightRadius;
        delete state.borderBottomLeftRadius;
        delete state.borderBottomRightRadius;
        return;
    }
    state.borderRadiusSingle = value;
}

function setBorderStyleSingle(value: boolean) {
    if (state.borderStyleSingle === value) {
        delete state.borderStyleSingle;
        delete state.borderStyle;
        delete state.borderColor;
        delete state.borderWidth;
        delete state.borderTopWidth;
        delete state.borderRightWidth;
        delete state.borderBottomWidth;
        delete state.borderLeftWidth;
        return;
    }
    state.borderStyleSingle = value;
}

function modelToState(modelValue: BorderStyleModel) {
    const tmp = new Set<any>();
    [
        modelValue.borderTopLeftRadius,
        modelValue.borderTopRightRadius,
        modelValue.borderBottomLeftRadius,
        modelValue.borderBottomRightRadius,
    ].forEach(item => tmp.add(item));
    if (tmp.size === 1) {
        state.borderRadiusSingle = true;
        state.borderRadius = unStyleUnit(modelValue.borderTopLeftRadius);
    } else {
        state.borderRadiusSingle = false;
        state.borderTopLeftRadius = unStyleUnit(modelValue.borderTopLeftRadius);
        state.borderTopRightRadius = unStyleUnit(modelValue.borderTopRightRadius);
        state.borderBottomLeftRadius = unStyleUnit(modelValue.borderBottomLeftRadius);
        state.borderBottomRightRadius = unStyleUnit(modelValue.borderBottomRightRadius);
    }
    tmp.clear();
    [
        modelValue.borderTopStyle,
        modelValue.borderRightStyle,
        modelValue.borderBottomStyle,
        modelValue.borderLeftStyle,
    ].forEach(item => tmp.add(item));
    const styleCount = tmp.size === 1;
    tmp.clear();
    [
        modelValue.borderTopColor,
        modelValue.borderRightColor,
        modelValue.borderBottomColor,
        modelValue.borderLeftColor,
    ].forEach(item => tmp.add(item));
    const colorCount = tmp.size === 1;
    tmp.clear();
    [
        modelValue.borderTopWidth,
        modelValue.borderRightWidth,
        modelValue.borderBottomWidth,
        modelValue.borderLeftWidth,
    ].forEach(item => tmp.add(item));
    const widthCount = tmp.size === 1;
    if (styleCount && colorCount && widthCount) {
        state.borderStyleSingle = true;
        state.borderStyle = modelValue.borderTopStyle;
        state.borderColor = modelValue.borderTopColor;
        state.borderWidth = unStyleUnit(modelValue.borderTopWidth);
    } else {
        state.borderStyleSingle = false;
        state.borderTopWidth = unStyleUnit(modelValue.borderTopWidth);
        state.borderRightWidth = unStyleUnit(modelValue.borderRightWidth);
        state.borderBottomWidth = unStyleUnit(modelValue.borderBottomWidth);
        state.borderLeftWidth = unStyleUnit(modelValue.borderLeftWidth);
    }
}

defineExpose({
    modelToState: () => modelToState(model.value),
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
                <TinyInput v-if="state.borderRadiusSingle" class="flex-item-fill" v-model="state.borderRadius" size="mini" :clearable="true" placeholder="统一设置圆角大小"/>
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
                        <TinyInput class="flex-item-fill" v-model="state.borderTopLeftRadius" size="mini" :clearable="true" placeholder="左上"/>
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右上圆角大小">
                            <BorderRadiusTopRight style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput class="flex-item-fill" v-model="state.borderTopRightRadius" size="mini" :clearable="true" placeholder="右上"/>
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
                        <TinyInput class="flex-item-fill" v-model="state.borderBottomLeftRadius" size="mini" :clearable="true" placeholder="左下"/>
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右下圆角大小">
                            <BorderRadiusBottomRight style="width: 16px; height: 16px;"/>
                        </div>
                        <TinyInput class="flex-item-fill" v-model="state.borderBottomRightRadius" size="mini" :clearable="true" placeholder="右下"/>
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
                <Select class="flex-item-fill" v-model="state.borderStyle" :options="data.borderStyleList" size="mini" :clearable="true" placeholder="样式"/>
                <span style="margin-left: 8px;"/>
                <TinyInput class="flex-item-fill" v-model="state.borderWidth" size="mini" :clearable="true" placeholder="宽度"/>
                <span style="margin-left: 8px;"/>
                <div class="flex-item-fixed flex-row-container flex-center">
                    <input :value="state.borderColor ?? '#000000'" @input="e => state.borderColor= e.target?.['value']" type="color" title="选择边框颜色"/>
                    <FontAwesomeIcon
                        class="button-clear"
                        :style="{ visibility: state.borderColor ? 'unset': 'hidden' }"
                        :icon="faXmark"
                        @click="delete state.borderColor"
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
                    <Select class="flex-item-fill" v-model="model.borderTopStyle" :options="data.borderStyleList" size="mini" :clearable="true" placeholder="样式"/>
                    <span style="margin-left: 8px;"/>
                    <TinyInput class="flex-item-fill" v-model="state.borderTopWidth" size="mini" :clearable="true" placeholder="宽度"/>
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input :value="model.borderTopColor ?? '#000000'" @input="e => model.borderTopColor= e.target?.['value']" type="color" title="选择边框颜色"/>
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: model.borderTopColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delete model.borderTopColor"
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
                    <Select class="flex-item-fill" v-model="model.borderRightStyle" :options="data.borderStyleList" size="mini" :clearable="true" placeholder="样式"/>
                    <span style="margin-left: 8px;"/>
                    <TinyInput class="flex-item-fill" v-model="state.borderRightWidth" size="mini" :clearable="true" placeholder="宽度"/>
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input :value="model.borderRightColor ?? '#000000'" @input="e => model.borderRightColor= e.target?.['value']" type="color" title="选择边框颜色"/>
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: model.borderRightColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delete model.borderRightColor"
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
                    <Select class="flex-item-fill" v-model="model.borderBottomStyle" :options="data.borderStyleList" size="mini" :clearable="true" placeholder="样式"/>
                    <span style="margin-left: 8px;"/>
                    <TinyInput class="flex-item-fill" v-model="state.borderBottomWidth" size="mini" :clearable="true" placeholder="宽度"/>
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input :value="model.borderBottomColor ?? '#000000'" @input="e => model.borderBottomColor= e.target?.['value']" type="color" title="选择边框颜色"/>
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: model.borderBottomColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delete model.borderBottomColor"
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
                    <Select class="flex-item-fill" v-model="model.borderLeftStyle" :options="data.borderStyleList" size="mini" :clearable="true" placeholder="样式"/>
                    <span style="margin-left: 8px;"/>
                    <TinyInput class="flex-item-fill" v-model="state.borderLeftWidth" size="mini" :clearable="true" placeholder="宽度"/>
                    <span style="margin-left: 8px;"/>
                    <div class="flex-item-fixed flex-row-container flex-center">
                        <input :value="model.borderLeftColor ?? '#000000'" @input="e => model.borderLeftColor= e.target?.['value']" type="color" title="选择边框颜色"/>
                        <FontAwesomeIcon
                            class="button-clear"
                            :style="{ visibility: model.borderLeftColor ? 'unset': 'hidden' }"
                            :icon="faXmark"
                            @click="delete model.borderLeftColor"
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
