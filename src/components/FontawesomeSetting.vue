<script setup lang="ts">
import type { Component } from "vue";
import { CSSProperties, reactive, ref, watch } from "vue";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Checkbox, ColorPicker, Form, FormItem, Select, Slider } from "@opentiny/vue";

// 定义组件选项
defineOptions({
    name: 'FontawesomeSetting',
});

// 定义 Props 类型
interface FontawesomeSettingProps {
    /** 图标信息 */
    icon: IconDefinition;
    /** 图标组件 */
    iconComponent: Component;
    /** 图标vue组件名称 */
    componentName: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<FontawesomeSettingProps>(), {});

// 定义 State 类型
interface FontawesomeSettingState {
    /** css样式 */
    style: CSSProperties;
    /** 大小 */
    size: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | string;
    /** 固定宽度 */
    fixedWidth?: boolean;
    /** 旋转角度 */
    rotation?: number;
    /** 翻转/动画 */
    flip?: "horizontal" | "vertical" | "both" | true;
    /** 动画 */
    beat?: boolean;
    /** 动画 */
    beatFade?: boolean;
    /** 动画 */
    bounce?: boolean;
    /** 动画 */
    fade?: boolean;
    /** 动画 */
    shake?: boolean;
    /** 动画 */
    spin?: boolean;
    /** 动画 */
    spinReverse?: boolean;
    /** 动画 */
    spinPulse?: boolean;
    /** 边框 */
    border?: boolean;
    /** 浮动 */
    pull?: "left" | "right";
    /** 翻转颜色 */
    inverse?: boolean;
}

// state 属性
const state = reactive<FontawesomeSettingState>({
    size: "2x",
    fixedWidth: true,
    style: {
        fontSize: 32,
        color: "#3B4549",
    },
});
// 内部数据
const data = {
    sizeList: [
        { label: '2xs', value: '2xs' },
        { label: 'xs', value: 'xs' },
        { label: 'sm', value: 'sm' },
        { label: 'lg', value: 'lg' },
        { label: 'xl', value: 'xl' },
        { label: '2xl', value: '2xl' },
        { label: '1x', value: '1x' },
        { label: '2x', value: '2x' },
        { label: '3x', value: '3x' },
        { label: '4x', value: '4x' },
        { label: '5x', value: '5x' },
        { label: '6x', value: '6x' },
        { label: '7x', value: '7x' },
        { label: '8x', value: '8x' },
        { label: '9x', value: '9x' },
        { label: '10x', value: '10x' },
    ],
    flipList: [
        { text: '默认', value: undefined },
        { text: '水平', value: 'horizontal' },
        { text: '垂直', value: 'vertical' },
        { text: '水平&垂直', value: 'both' },
    ],
    animationList: [
        // { label: 'flip', value: 'flip' },
        { label: 'beat', value: 'beat' },
        { label: 'beat-fade', value: 'beatFade' },
        { label: 'bounce', value: 'bounce' },
        { label: 'fade', value: 'fade' },
        { label: 'shake', value: 'shake' },
        { label: 'spin', value: 'spin' },
        { label: 'spin-reverse', value: 'spinReverse' },
        { label: 'spin-pulse', value: 'spinPulse' },
    ],
};
const rotation = ref<number | undefined>();
const animation = ref<string | undefined>();

watch(rotation, value => {
    if (!value || value <= 0 || value >= 360) {
        delete state.rotation;
    } else {
        state.rotation = value;
    }
});
watch(animation, value => animationChange(value));

function animationChange(value?: string) {
    for (let animation of data.animationList) {
        if (value === animation.value) {
            state[value] = true;
        } else {
            delete state[animation.value];
        }
    }
    if (value === "spinReverse") {
        state.spin = true;
    }
}

// 定义组件公开内容
defineExpose({
    /** 图标 props 对象 */
    iconProps: state,
});
</script>

<template>
    <div class="flex-column-container fontawesome-icon-setting">
        <div class="flex-item-fill flex-column-container">
            <div class="flex-item-fill fontawesome-icon-preview">
                <component :is="props.iconComponent" :icon="props.icon" v-bind="{...state as any}"/>
            </div>
            <div class="flex-item-fixed fontawesome-icon-name">
                {{ props.icon.prefix }} {{ props.icon.iconName }}
            </div>
        </div>
        <div class="flex-item-fixed">
            <Form label-position="left" label-width="50px" size="mini">
                <FormItem label="大小" prop="size" v-if="false">
                    <Select v-model="state.size" placeholder="选择图标大小" :clearable="true" :options="data.sizeList"/>
                </FormItem>
                <FormItem label="大小" prop="style.fontSize">
                    <Slider v-model="state.style.fontSize as number" :min="8" :max="120" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope }}px</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="旋转" prop="rotation">
                    <Slider v-model="rotation" :min="0" :max="360" :step="90" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope }}°</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="翻转" prop="flip">
                    <ButtonGroup v-model="state.flip as string" :data="data.flipList"/>
                </FormItem>
                <FormItem label="动画" prop="animation">
                    <Select v-model="animation" placeholder="选择动画" :clearable="true" :options="data.animationList"/>
                </FormItem>
                <FormItem label="风格" prop="inverse" v-if="false">
                    <Checkbox v-model="state.inverse" text="翻转颜色"/>
                </FormItem>
                <FormItem label="颜色">
                    <ColorPicker
                        v-model="state.style.color"
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
                        @confirm="hex => state.style.color=hex"
                        style="display: inline-block;"
                    />
                    <span style="margin-left: 16px;">{{ state.style.color }}</span>
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

.fontawesome-icon-setting {
    width: 300px;
    height: 360px;
}

.fontawesome-icon-preview {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.fontawesome-icon-name {
    text-align: center;
    color: #6C6C89;
    margin-bottom: 8px;
    font-size: 12px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.fontawesome-icon-setting :deep(.tiny-color-picker .tiny-color-select-panel) {
    position: fixed;
}

.fontawesome-icon-setting :deep(.tiny-button-group .tiny-group-item li button) {
    min-width: 50px;
}
</style>
