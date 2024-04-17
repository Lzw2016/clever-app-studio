<script setup lang="ts">
import { defineModel, reactive, shallowReactive } from "vue";
import DisplayBlock from "@/assets/images/display-block.svg?component";
import DisplayInlineBlock from "@/assets/images/display-inline-block.svg?component";
import DisplayInline from "@/assets/images/display-inline.svg?component";
import DisplayFlex from "@/assets/images/display-flex.svg?component";
import DisplayGrid from "@/assets/images/display-grid.svg?component";
import DisplayNone from "@/assets/images/display-none.svg?component";
import FlexDirectionRow from "@/assets/images/flex-directionrow.svg?component";
import FlexDirectionRowReverse from "@/assets/images/flex-directionrow-reverse.svg?component";
import FlexDirectionColumn from "@/assets/images/flex-directioncolumn.svg?component";
import FlexDirectionColumnReverse from "@/assets/images/flex-directioncolumn-reverse.svg?component";
import FlexJustifyContentFlexStart from "@/assets/images/flex-justify-content-flex-start.svg?component";
import FlexJustifyContentFlexEnd from "@/assets/images/flex-justify-content-flex-end.svg?component";
import FlexJustifyContentCenter from "@/assets/images/flex-justify-content-center.svg?component";
import FlexJustifyContentSpaceBetween from "@/assets/images/flex-justify-content-space-between.svg?component";
import FlexJustifyContentSpaceAround from "@/assets/images/flex-justify-content-space-around.svg?component";
import FlexAlignItemsFlexStart from "@/assets/images/flex-align-items-flex-start.svg?component";
import FlexAlignItemsFlexEnd from "@/assets/images/flex-align-items-flex-end.svg?component";
import FlexAlignItemsCenter from "@/assets/images/flex-align-items-center.svg?component";
import FlexAlignItemsBaseline from "@/assets/images/flex-align-items-baseline.svg?component";
import FlexAlignItemsStretch from "@/assets/images/flex-align-items-stretch.svg?component";

// 定义组件选项
defineOptions({
    name: 'LayoutStyle',
});

// 定义 Props 类型
interface LayoutStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<LayoutStyleProps>(), {});

// 定义 State 类型
interface LayoutStyleState {
}

// state 属性
const state = reactive<LayoutStyleState>({});
// 内部数据
const data = {
    // display
    displayList: [
        { value: "block", tip: "block(块级布局)", icon: DisplayBlock },
        { value: "inline-block", tip: "inline-block(内联块级)", icon: DisplayInlineBlock },
        { value: "inline", tip: "inline(内联)", icon: DisplayInline },
        { value: "flex", tip: "flex(弹性布局)", icon: DisplayFlex },
        { value: "grid", tip: "grid(网格布局)", icon: DisplayGrid },
        { value: "none", tip: "none(隐藏)", icon: DisplayNone },
    ],
    // flex-direction
    flexDirectionList: [
        { value: "row", tip: "row(水平方向，从左到右)", icon: FlexDirectionRow },
        { value: "row-reverse", tip: "row-reverse(水平方向，从右到左)", icon: FlexDirectionRowReverse },
        { value: "column", tip: "column(垂直方向，从上到下)", icon: FlexDirectionColumn },
        { value: "column-reverse", tip: "column-reverse(垂直方向，从下到上)", icon: FlexDirectionColumnReverse },
    ],
    // justify-content
    flexJustifyContentList: [
        { value: "flex-start", tip: "flex-start(左对齐)", icon: FlexJustifyContentFlexStart },
        { value: "flex-end", tip: "flex-end(右对齐)", icon: FlexJustifyContentFlexEnd },
        { value: "center", tip: "center(水平居中)", icon: FlexJustifyContentCenter },
        { value: "space-between", tip: "space-between(两端对齐)", icon: FlexJustifyContentSpaceBetween },
        { value: "space-around", tip: "space-around(横向平分)", icon: FlexJustifyContentSpaceAround },
    ],
    // align-items
    flexAlignItemsList: [
        { value: "flex-start", tip: "flex-start(起点对齐)", icon: FlexAlignItemsFlexStart },
        { value: "flex-end", tip: "flex-end(终点对齐)", icon: FlexAlignItemsFlexEnd },
        { value: "center", tip: "center(水平居中)", icon: FlexAlignItemsCenter },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: FlexAlignItemsBaseline },
        { value: "stretch", tip: "stretch(沾满整个容器的高度)", icon: FlexAlignItemsStretch },
    ],
    // flex-wrap
    flexWrapList: [
        { value: "nowrap", tip: "nowrap(不换行)", icon: null, text: "不换行" },
        { value: "wrap", tip: "wrap(第一行在上方)", icon: null, text: "正换行" },
        { value: "wrap-reverse", tip: "wrap-reverse(第一行在下方)", icon: null, text: "逆换行" },
    ],
};

interface LayoutStyleModel {
    /** display 值 */
    display?: string;
    /** flex-direction 值 */
    flexDirection?: string;
    /** justify-content 值 */
    justifyContent?: string;
    /** align-items 值 */
    alignItems?: string;
    /** flex-wrap 值 */
    flexWrap?: string;
}

// css display 值
const model = defineModel<LayoutStyleModel | undefined>();

function setDisplay(val: string) {
    if (model.value?.display === val) {
        model.value = undefined;
        return;
    }
    if (!model.value) model.value = shallowReactive<LayoutStyleModel>({});
    model.value.display = val;
}

function setDisplayConfig(name: string, val: string) {
    if (model.value?.[name] === val) {
        delete model.value[name];
        return;
    }
    if (!model.value) model.value = shallowReactive<LayoutStyleModel>({});
    model.value[name] = val;
}

function setFlexDirection(val: string) {
    setDisplayConfig("flexDirection", val);
}

function setJustifyContent(val: string) {
    setDisplayConfig("justifyContent", val);
}

function setAlignItems(val: string) {
    setDisplayConfig("alignItems", val);
}

function setFlexWrap(val: string) {
    setDisplayConfig("flexWrap", val);
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">排布</div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="display in data.displayList"
                    :class="{
                            'setter-row-input-radio': true,
                            'selected': display.value===model?.display,
                            'flex-row-container': true,
                            'flex-center': true,
                        }"
                    @click="setDisplay(display.value)"
                    :title="display.tip"
                >
                    <component :is="display.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <template v-if="model?.display==='flex'">
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">主轴方向</div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="flexDirection in data.flexDirectionList"
                        :class="{
                                'setter-row-input-radio': true,
                                'selected': flexDirection.value===model.flexDirection,
                                'flex-row-container': true,
                                'flex-center': true,
                            }"
                        @click="setFlexDirection(flexDirection.value)"
                        :title="flexDirection.tip"
                    >
                        <component :is="flexDirection.icon" style="width: 16px; height: 16px;"/>
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">主轴对齐</div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="justifyContent in data.flexJustifyContentList"
                        :class="{
                                'setter-row-input-radio': true,
                                'selected': justifyContent.value===model.justifyContent,
                                'flex-row-container': true,
                                'flex-center': true,
                            }"
                        @click="setJustifyContent(justifyContent.value)"
                        :title="justifyContent.tip"
                    >
                        <component :is="justifyContent.icon" style="width: 16px; height: 16px;"/>
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">辅轴对齐</div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="alignItems in data.flexAlignItemsList"
                        :class="{
                                'setter-row-input-radio': true,
                                'selected': alignItems.value===model.alignItems,
                                'flex-row-container': true,
                                'flex-center': true,
                            }"
                        @click="setAlignItems(alignItems.value)"
                        :title="alignItems.tip"
                    >
                        <component :is="alignItems.icon" style="width: 16px; height: 16px;"/>
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">换行模式</div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="flexWrap in data.flexWrapList"
                        :class="{
                                'setter-row-input-radio': true,
                                'selected': flexWrap.value===model.flexWrap,
                            }"
                        @click="setFlexWrap(flexWrap.value)"
                        :title="flexWrap.tip"
                    >
                        <span style="font-size: 11px;">{{ flexWrap.text }}</span>
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
