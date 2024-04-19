<script setup lang="ts">
import { defineModel, reactive, shallowReactive } from "vue";
import { Tooltip } from "@opentiny/vue";

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

}

// state 属性
const state = reactive<PositionStyleState>({

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
const model = defineModel<PositionStyleModel | undefined>();

// 初始化
if (model.value) {
    // TODO model -> state
}

function setPosition(val: string) {
    if (model.value?.position === val) {
        model.value = undefined;
        return;
    }
    model.value = shallowReactive<PositionStyleModel>({});
    model.value.position = val;
}

</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
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
                        'selected': position.value===model?.position,
                    }"
                        @click="setPosition(position.value)"
                        :title="position.tip"
                    >
                        <span style="font-size: 11px;">{{ position.text }}</span>
                    </div>
                </div>
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
