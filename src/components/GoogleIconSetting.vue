<script setup lang="ts">
import type { Component } from "vue";
import { reactive } from "vue";
import { ButtonGroup, Checkbox, ColorPicker, Form, FormItem, Select, Slider } from "@opentiny/vue";

// 定义组件选项
defineOptions({
    name: 'GoogleIconSetting',
});

// 定义 Props 类型
interface GoogleIconSettingProps {
    /** 图标组件 */
    icon: Component;
    /** 图标内容 */
    content: string;
    /** 图标vue组件名称 */
    componentName: string;
    /** 默认的“字体类型” */
    defFontStyle: string;
    /** 支持的“字体类型” */
    fontStyle: string[];
}

// 读取组件 props 属性
const props = withDefaults(defineProps<GoogleIconSettingProps>(), {});

// 定义 State 类型
interface GoogleIconSettingState {
    /** 字体文件url前缀 */
    fontUrlPrefix?: string;
    /** 图标大小，同：font-size */
    size?: number;
    /** 字体类型 */
    fontStyle?: string;
    /** 字体颜色 */
    color?: string;
    /** fill 选项，参考：https://fonts.google.com/ */
    fill?: boolean;
    /** weight 选项，参考：https://fonts.google.com/ */
    weight?: number;
    /** grade 选项，参考：https://fonts.google.com/ */
    grade?: number;
    /** Optical Size 选项，参考：https://fonts.google.com/ */
    opticalSize?: number;
}

// state 属性
const state = reactive<GoogleIconSettingState>({
    size: 28,
    fontStyle: props.defFontStyle,
    color: "#3B4549",
    fill: false,
    weight: 400,
    grade: 0,
    opticalSize: 24,
});
// 内部数据
const data = {
    fontStyleList: [] as Array<any>,
    gradeList: [
        { text: "低", value: -25 },
        { text: "默认", value: 0 },
        { text: "高", value: 200 },
    ],
    opticalSize: [
        { text: "20px", value: 20 },
        { text: "24px", value: 24 },
        { text: "40px", value: 40 },
        { text: "48px", value: 48 },
    ],
};

for (let fontStyle of props.fontStyle) {
    data.fontStyleList.push({ label: fontStyle, value: fontStyle });
}
const isSymbols = props.defFontStyle.includes("symbols");
</script>

<template>
    <div class="flex-column-container google-icon-setting">
        <div class="flex-item-fill flex-column-container">
            <div class="flex-item-fill google-icon-preview">
                <component :is="props.icon" v-bind="{... state}" :content="props.content"/>
            </div>
            <div class="flex-item-fixed google-icon-name">{{ props.content }}</div>
        </div>
        <div class="flex-item-fixed">
            <Form label-position="left" label-width="50px" size="mini">
                <FormItem label="大小" prop="size">
                    <Slider v-model="state.size" :min="8" :max="120" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope }}px</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="风格" prop="fontStyle">
                    <Select v-model="state.fontStyle" placeholder="选择字体风格" :clearable="true" :options="data.fontStyleList"/>
                </FormItem>
                <FormItem label="颜色">
                    <ColorPicker
                        v-model="state.color"
                        :alpha="true"
                        :predefine="[
                            '#5E7CE0FF',
                            '#344899FF',
                            '#526ECCFF',
                            '#7693F5FF',
                            '#181818FF',
                            '#252B3AFF',
                            '#3B4549FF',
                            '#575D6CFF',
                            '#8A8E99FF',
                            '#DFE1E6FF',
                            '#A97AF8FF',
                            '#F3689AFF',
                            '#A6DD82FF',
                            '#DE504EFF',
                            '#FFBCBAFF',
                            '#E37D29FF',
                            '#FAC20AFF',
                            '#FFD0A6FF',
                            '#526ECCFF',
                            '#BECCFAFF',
                            '#3AC295FF',
                            '#ACF2DCFF',
                        ]"
                        @confirm="hex => state.color=hex"
                        style="display: inline-block;"
                    />
                    <span style="margin-left: 16px;">{{ state.color }}</span>
                </FormItem>
                <FormItem label="Fill" prop="fill" v-if="isSymbols">
                    <Checkbox v-model="state.fill" text="Fill 风格"/>
                </FormItem>
                <FormItem label="字宽" prop="weight" v-if="isSymbols">
                    <Slider v-model="state.weight" :min="100" :max="700" :step="100" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope }}</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="等级" prop="grade" v-if="isSymbols">
                    <ButtonGroup v-model="state.grade" :data="data.gradeList as Array<any>"/>
                </FormItem>
                <FormItem label="尺寸" prop="opticalSize" v-if="isSymbols">
                    <ButtonGroup v-model="state.opticalSize" :data="data.opticalSize as Array<any>"/>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<style scoped>
.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.flex-item-fixed {
    flex-shrink: 0;
}

.google-icon-setting {
    width: 300px;
    height: 400px;
}

.google-icon-preview {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.google-icon-name {
    text-align: center;
    color: #6C6C89;
    margin-bottom: 8px;
    font-size: 12px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.google-icon-setting :deep(.tiny-color-picker .tiny-color-select-panel) {
    position: fixed;
}

.google-icon-setting :deep(.tiny-button-group .tiny-group-item li button) {
    min-width: 50px;
}
</style>
