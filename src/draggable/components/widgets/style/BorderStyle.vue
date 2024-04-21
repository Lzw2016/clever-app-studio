<script setup lang="ts">
import { defineModel, reactive, shallowReactive } from "vue";
import { Input, Tooltip } from "@opentiny/vue";
import BorderRadiusSingle from "@/assets/images/border-radius-single.svg?component";
import BorderRadiusMultiple from "@/assets/images/border-radius-multiple.svg?component";
import BorderRadiusTopLeft from "@/assets/images/border-radius-topleft.svg?component";
import BorderRadiusTopRight from "@/assets/images/border-radius-topright.svg?component";
import BorderRadiusBottomLeft from "@/assets/images/border-radius-bottomleft.svg?component";
import BorderRadiusBottomRight from "@/assets/images/border-radius-bottomright.svg?component";

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
    borderRadiusSingle: boolean;
    borderRadius?: string;
    borderStyleSingle: boolean;
    borderStyle?: string;
    borderColor?: string;
    borderWidth?: string;
}

// state 属性
const state = reactive<BorderStyleState>({
    borderRadiusSingle: true,
    borderStyleSingle: true,
});
// 内部数据
const data = {
    borderRadiusSingleList: [
        { value: true, tip: "统一定义", icon: BorderRadiusSingle },
        { value: false, tip: "分别定义", icon: BorderRadiusMultiple },
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

// 初始化
if (model.value) {
    // TODO model -> state
}

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
                    @click="state.borderRadiusSingle=borderRadiusSingle.value"
                    :title="borderRadiusSingle.tip"
                >
                    <component :is="borderRadiusSingle.icon" style="width: 16px; height: 16px;"/>
                </div>
                <Input v-if="state.borderRadiusSingle" class="flex-item-fill" v-model="state.borderRadius" size="mini" :clearable="true" placeholder="统一定义圆角大小"/>
            </div>
        </div>
        <template v-if="!state.borderRadiusSingle">
            <div class="flex-row-container setter-row" style="height: auto;">
                <div class="flex-item-fixed setter-row-label"/>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="左上圆角大小">
                            <BorderRadiusTopLeft style="width: 16px; height: 16px;"/>
                        </div>
                        <Input class="flex-item-fill" v-model="model.borderTopLeftRadius" size="mini" :clearable="true" placeholder="左上"/>
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右上圆角大小">
                            <BorderRadiusTopRight style="width: 16px; height: 16px;"/>
                        </div>
                        <Input class="flex-item-fill" v-model="model.borderTopRightRadius" size="mini" :clearable="true" placeholder="右上"/>
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
                        <Input class="flex-item-fill" v-model="model.borderBottomLeftRadius" size="mini" :clearable="true" placeholder="左下"/>
                    </div>
                    <div style="width: 16px;"/>
                    <div class="flex-item-fill flex-row-container" style="align-items: center;">
                        <div class="flex-row-container flex-center" style="padding: 2px 4px; margin: 2px 2px; border: 1px solid #c4c6cf;" title="右下圆角大小">
                            <BorderRadiusBottomRight style="width: 16px; height: 16px;"/>
                        </div>
                        <Input class="flex-item-fill" v-model="model.borderBottomRightRadius" size="mini" :clearable="true" placeholder="右下"/>
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
</style>
