<script setup lang="ts">
import type { Component } from "vue";
import { reactive, ref, watch } from "vue";
import { ColorPicker, Form, FormItem, Slider } from "@opentiny/vue";

// 定义组件选项
defineOptions({
    name: 'TablerIconSetting',
});

// 定义 Props 类型
interface TablerIconSettingIconProps {
    /** 图标组件 */
    icon: Component;
    /** 显示名称 */
    name: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<TablerIconSettingIconProps>(), {});

// 定义 State 类型
interface TablerIconSettingState {
    size: number,
    stroke: number,
    color: string,
}

// state 属性
const state = reactive<TablerIconSettingState>({
    size: 24,
    stroke: 1.5,
    color: "#3B4549FF",
});

const stroke10x = ref(state.stroke * 10);
watch(() => stroke10x.value, value => state.stroke = value / 10);
</script>

<template>
    <div class="flex-column-container tabler-icon-setting">
        <div class="flex-item-fill flex-column-container">
            <div class="flex-item-fill tabler-icon-preview">
                <component :is="props.icon" v-bind="{...state}"/>
            </div>
            <div class="flex-item-fixed tabler-icon-name">{{ props.name }}</div>
        </div>
        <div class="flex-item-fixed">
            <Form label-position="left" label-width="50px" size="mini">
                <FormItem label="大小" prop="size">
                    <Slider v-model="state.size" :min="8" :max="100" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope }}px</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="粗细">
                    <Slider v-model="stroke10x" :min="1" :max="50" :show-tip="false" :show-input="true">
                        <template #default="{ slotScope }">
                            <div style="width: 35px;">{{ slotScope / 10 }}</div>
                        </template>
                    </Slider>
                </FormItem>
                <FormItem label="颜色">
                    <ColorPicker
                        v-model="state.color"
                        :alpha="true"
                        :predefine="[
                            '#5E7CE0',
                            '#344899',
                            '#526ECC',
                            '#7693F5',
                            '#181818',
                            '#252B3A',
                            '#575D6C',
                            '#8A8E99',
                            '#DFE1E6',
                            '#A97AF8',
                            '#F3689A',
                            '#A6DD82',
                            '#DE504E',
                            '#FFBCBA',
                            '#E37D29',
                            '#FAC20A',
                            '#FFD0A6',
                            '#526ECC',
                            '#BECCFA',
                            '#3AC295',
                            '#ACF2DC',
                        ]"
                        @confirm="hex => state.color=hex"
                        style="display: inline-block;"
                    />
                    <span style="margin-left: 16px;">{{ state.color }}</span>
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

.tabler-icon-setting {
    width: 300px;
    height: 300px;
}

.tabler-icon-preview {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.tabler-icon-name {
    text-align: center;
    color: #6C6C89;
    margin-bottom: 8px;
}
/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.tabler-icon-setting :deep(.tiny-color-picker .tiny-color-select-panel) {
    position: fixed;
}
</style>
