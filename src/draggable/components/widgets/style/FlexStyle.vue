<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { Numeric, Tooltip } from "@opentiny/vue";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, getStyle } from "@/draggable/utils/StyleUtils";
import FlexAlignItemsFlexStart from "@/assets/images/flex-align-items-flex-start.svg?component";
import FlexAlignItemsFlexEnd from "@/assets/images/flex-align-items-flex-end.svg?component";
import FlexAlignItemsCenter from "@/assets/images/flex-align-items-center.svg?component";
import FlexAlignItemsBaseline from "@/assets/images/flex-align-items-baseline.svg?component";
import FlexAlignItemsStretch from "@/assets/images/flex-align-items-stretch.svg?component";

// 定义组件选项
defineOptions({
    name: 'FlexStyle',
});

// 定义 Props 类型
interface FlexStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<FlexStyleProps>(), {});

// 定义 State 类型
interface FlexStyleState extends StyleSetterState {
    readonly style: {
        flexShrink?: number;
        flexGrow?: number;
        alignSelf?: string;
    };
}

// state 属性
const state = reactive<FlexStyleState>({
    style: {},
});
// 内部数据
const data = {
    // align-self
    flexAlignSelfList: [
        { value: "flex-start", tip: "flex-start(起点对齐)", icon: FlexAlignItemsFlexStart },
        { value: "flex-end", tip: "flex-end(终点对齐)", icon: FlexAlignItemsFlexEnd },
        { value: "center", tip: "center(居中)", icon: FlexAlignItemsCenter },
        { value: "stretch", tip: "stretch(沾满整个容器的高度)", icon: FlexAlignItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: FlexAlignItemsBaseline },
    ],
};

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.flexShrink = getStyle(props, state, "flexShrink");
    state.style.flexGrow = getStyle(props, state, "flexGrow");
    state.style.alignSelf = getStyle(props, state, "alignSelf");
}, { immediate: true });
// state.style属性变化后应用 style
const applyStyleFlexShrink = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFlexGrow = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleAlignSelf = lodash.debounce(applyStyle, applyStyleDebounceTime);

function setStyle(name: string, val?: string) {
    if (state.style[name] === val) {
        delete state.style[name];
        return;
    }
    state.style[name] = val;
    return val;
}

function setAlignSelf(val?: string) {
    val = setStyle("alignSelf", val);
    applyStyleAlignSelf(props, state, "alignSelf", val);
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(flex布局元素) flex-shrink/flex-grow 属性配置">
                    <span class="setter-label-tips">自动缩放</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Numeric
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.style.flexShrink"
                    size="mini"
                    controls-position="right"
                    :allow-empty="true"
                    placeholder="缩小比例"
                    @change="value => applyStyleFlexShrink(props, state, 'flexShrink', value)"
                />
                <span style="margin-left: 12px;"/>
                <Numeric
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.style.flexGrow"
                    size="mini"
                    controls-position="right"
                    :allow-empty="true"
                    placeholder="放大比例"
                    @change="value => applyStyleFlexGrow(props, state, 'flexGrow', value)"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="(flex布局元素) align-self 属性配置">
                    <span class="setter-label-tips">元素对齐</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="alignSelf in data.flexAlignSelfList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': alignSelf.value===state.style.alignSelf,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setAlignSelf(alignSelf.value)"
                    :title="alignSelf.tip"
                >
                    <component :is="alignSelf.icon" style="width: 16px; height: 16px;"/>
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

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.setter-row-input :deep(.tiny-numeric__input-inner) {
    text-align: left;
}
</style>
