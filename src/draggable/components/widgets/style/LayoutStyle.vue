<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Checkbox, Input, Tooltip } from "@opentiny/vue";
import { VueDraggable } from "vue-draggable-plus";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, getStyle, toStyleUnit, unStyleUnit } from "@/draggable/utils/StyleUtils";
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
import GridJustifyContentStart from "@/assets/images/grid-justify-content-start.svg?component";
import GridJustifyContentCenter from "@/assets/images/grid-justify-content-center.svg?component";
import GridJustifyContentEnd from "@/assets/images/grid-justify-content-end.svg?component";
import GridJustifyContentStretch from "@/assets/images/grid-justify-content-stretch.svg?component";
import GridJustifyContentSpaceBetween from "@/assets/images/grid-justify-content-space-between.svg?component";
import GridJustifyContentSpaceAround from "@/assets/images/grid-justify-content-space-around.svg?component";
import GridAlignContentStart from "@/assets/images/grid-align-content-start.svg?component";
import GridAlignContentCenter from "@/assets/images/grid-align-content-center.svg?component";
import GridAlignContentEnd from "@/assets/images/grid-align-content-end.svg?component";
import GridAlignContentStretch from "@/assets/images/grid-align-content-stretch.svg?component";
import GridAlignContentSpaceBetween from "@/assets/images/grid-align-content-space-between.svg?component";
import GridAlignContentSpaceRound from "@/assets/images/grid-align-content-space-around.svg?component";
import GridJustifyItemsStart from "@/assets/images/grid-justify-items-start.svg?component";
import GridJustifyItemsCenter from "@/assets/images/grid-justify-items-center.svg?component";
import GridJustifyItemsEnd from "@/assets/images/grid-justify-items-end.svg?component";
import GridJustifyItemsStretch from "@/assets/images/grid-justify-items-stretch.svg?component";
import GridJustifyItemsBaseline from "@/assets/images/grid-justify-items-baseline.svg?component";
import GridAlignItemsStart from "@/assets/images/grid-align-items-start.svg?component";
import GridAlignItemsCenter from "@/assets/images/grid-align-items-center.svg?component";
import GridAlignItemsEnd from "@/assets/images/grid-align-items-end.svg?component";
import GridAlignItemsStretch from "@/assets/images/grid-align-items-stretch.svg?component";
import GridAlignItemsBaseline from "@/assets/images/grid-align-items-baseline.svg?component";

// 定义组件选项
defineOptions({
    name: 'LayoutStyle',
});

// 定义 Props 类型
interface LayoutStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<LayoutStyleProps>(), {});

interface GridTemplateRowColumn {
    /** 配置类型 */
    type: "px" | "percentage" | "fr" | "minmax" | "auto" | "自定义",
    px?: number;
    percentage?: number;
    fr?: number;
    min?: number;
    max?: number;
}

// 定义 State 类型
interface LayoutStyleState extends StyleSetterState {
    /** grid-template-columns 配置("px" | "%" | "fr" | "minmax" | "auto") */
    gridTemplateColumns: Array<string>;
    /** grid-template-rows 配置("px" | "%" | "fr" | "minmax" | "auto") */
    gridTemplateRows: Array<string>;
    /** grid-column-gap 属性 */
    gridColumnGap?: string;
    /** grid-row-gap 属性 */
    gridRowGap?: string;
    /** grid-auto-flow 属性 */
    gridAutoFlow?: string;
    /** grid-auto-flow 属性 dense 选项 */
    gridAutoFlowDense?: boolean;
    /** 样式属性 */
    readonly style: {
        /** display 值 */
        display?: string;
        /** flex-direction 值 */
        flexDirection?: string;
        /** flex-wrap 值 */
        flexWrap?: string;
        /** justify-content 值 */
        justifyContent?: string;
        /** align-content 值 */
        alignContent?: string;
        /** justify-items 值 */
        justifyItems?: string;
        /** align-items 值 */
        alignItems?: string;
        /** grid-template-columns 配置("px" | "%" | "fr" | "minmax" | "auto") */
        gridTemplateColumns?: string;
        /** grid-template-rows 配置("px" | "%" | "fr" | "minmax" | "auto") */
        gridTemplateRows?: string;
        /** grid-column-gap 属性 */
        gridColumnGap?: string;
        /** grid-row-gap 属性 */
        gridRowGap?: string;
        /** grid-auto-flow 属性 */
        gridAutoFlow?: string;
    },
}

// state 属性
const state = reactive<LayoutStyleState>({
    gridTemplateColumns: [],
    gridTemplateRows: [],
    gridColumnGap: undefined,
    gridRowGap: undefined,
    gridAutoFlow: undefined,
    gridAutoFlowDense: undefined,
    style: {
        display: undefined,
        flexDirection: undefined,
        flexWrap: undefined,
        justifyContent: undefined,
        alignContent: undefined,
        justifyItems: undefined,
        alignItems: undefined,
        gridTemplateColumns: undefined,
        gridTemplateRows: undefined,
        gridColumnGap: undefined,
        gridRowGap: undefined,
        gridAutoFlow: undefined,
    },
});
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
        { value: "center", tip: "center(居中)", icon: FlexJustifyContentCenter },
        { value: "space-between", tip: "space-between(两端对齐)", icon: FlexJustifyContentSpaceBetween },
        { value: "space-around", tip: "space-around(横向平分)", icon: FlexJustifyContentSpaceAround },
    ],
    // align-items
    flexAlignItemsList: [
        { value: "flex-start", tip: "flex-start(起点对齐)", icon: FlexAlignItemsFlexStart },
        { value: "flex-end", tip: "flex-end(终点对齐)", icon: FlexAlignItemsFlexEnd },
        { value: "center", tip: "center(居中)", icon: FlexAlignItemsCenter },
        { value: "stretch", tip: "stretch(沾满整个容器的高度)", icon: FlexAlignItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: FlexAlignItemsBaseline },
    ],
    // flex-wrap
    flexWrapList: [
        { value: "nowrap", tip: "nowrap(不换行)", icon: null, text: "不换行" },
        { value: "wrap", tip: "wrap(第一行在上方)", icon: null, text: "正换行" },
        { value: "wrap-reverse", tip: "wrap-reverse(第一行在下方)", icon: null, text: "逆换行" },
    ],

    // justify-content
    gridJustifyContentList: [
        { value: "start", tip: "start(对齐容器的起始边框)", icon: GridJustifyContentStart },
        { value: "center", tip: "center(容器内部居中)", icon: GridJustifyContentCenter },
        { value: "end", tip: "end(对齐容器的结束边框)", icon: GridJustifyContentEnd },
        { value: "stretch", tip: "stretch(拉伸占据整个网格容器)", icon: GridJustifyContentStretch },
        { value: "space-around", tip: "space-around(每个项目两侧的间隔相等)", icon: GridJustifyContentSpaceBetween },
        { value: "space-between", tip: "space-between(项目与项目的间隔相等)", icon: GridJustifyContentSpaceAround },
    ],
    // align-content
    gridAlignContentList: [
        { value: "start", tip: "start(对齐容器的起始边框)", icon: GridAlignContentStart },
        { value: "center", tip: "center(容器内部居中)", icon: GridAlignContentCenter },
        { value: "end", tip: "end(对齐容器的结束边框)", icon: GridAlignContentEnd },
        { value: "stretch", tip: "stretch(拉伸占据整个网格容器)", icon: GridAlignContentStretch },
        { value: "space-around", tip: "space-around(每个项目两侧的间隔相等)", icon: GridAlignContentSpaceBetween },
        { value: "space-between", tip: "space-between(项目与项目的间隔相等)", icon: GridAlignContentSpaceRound },
    ],
    // justify-items
    gridJustifyItemsList: [
        { value: "start", tip: "start(起点对齐)", icon: GridJustifyItemsStart },
        { value: "center", tip: "center(居中)", icon: GridJustifyItemsCenter },
        { value: "end", tip: "end(终点对齐)", icon: GridJustifyItemsEnd },
        { value: "stretch", tip: "stretch(拉伸，占满单元格的整个宽度)", icon: GridJustifyItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: GridJustifyItemsBaseline },
    ],
    // align-items
    gridAlignItemsList: [
        { value: "start", tip: "start(起点对齐)", icon: GridAlignItemsStart },
        { value: "center", tip: "center(居中)", icon: GridAlignItemsCenter },
        { value: "end", tip: "(终点对齐)", icon: GridAlignItemsEnd },
        { value: "stretch", tip: "stretch(拉伸，占满单元格的整个宽度)", icon: GridAlignItemsStretch },
        { value: "baseline", tip: "baseline(项目第一行文字的基线对齐)", icon: GridAlignItemsBaseline },
    ],
    // grid-auto-flow
    gridAutoFlowList: [
        { value: "row", tip: "row(容器子元素的放置顺序：先行后列)", icon: null, text: "先行后列" },
        { value: "column", tip: "column(容器子元素的放置顺序：先列后行)", icon: null, text: "先列后行" },
    ],
};

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.display = getStyle(props, state, "display");
    state.style.flexDirection = getStyle(props, state, "flexDirection");
    state.style.flexWrap = getStyle(props, state, "flexWrap");
    state.style.justifyContent = getStyle(props, state, "justifyContent");
    state.style.alignContent = getStyle(props, state, "alignContent");
    state.style.justifyItems = getStyle(props, state, "justifyItems");
    state.style.alignItems = getStyle(props, state, "alignItems");
    state.style.gridTemplateColumns = getStyle(props, state, "gridTemplateColumns");
    state.style.gridTemplateRows = getStyle(props, state, "gridTemplateRows");
    state.style.gridColumnGap = getStyle(props, state, "gridColumnGap");
    state.style.gridRowGap = getStyle(props, state, "gridRowGap");
    state.style.gridAutoFlow = getStyle(props, state, "gridAutoFlow");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.gridTemplateColumns, gridTemplateColumns => {
    if (gridTemplateColumns.length <= 0) {
        delete state.style.gridTemplateColumns;
        return;
    }
    state.style.gridTemplateColumns = gridTemplateColumns.map(col => toStyleUnit(col) || 'auto').join(" ");
}, { deep: true });
watch(state.gridTemplateRows, gridTemplateRows => {
    if (gridTemplateRows.length <= 0) {
        delete state.style.gridTemplateRows;
        return;
    }
    state.style.gridTemplateRows = gridTemplateRows.map(col => toStyleUnit(col) || 'auto').join(" ");
});
watch(() => state.gridColumnGap, gridColumnGap => autoUseStyleUnit(state.style, "gridColumnGap", gridColumnGap));
watch(() => state.gridRowGap, gridRowGap => autoUseStyleUnit(state.style, "gridRowGap", gridRowGap));
watch(() => [state.gridAutoFlow, state.gridAutoFlowDense], () => {
    if (!state.gridAutoFlow) {
        delete state.style.gridAutoFlow;
        return;
    }
    state.style.gridAutoFlow = `${state.gridAutoFlow}${state.gridAutoFlowDense ? ' dense' : ''}`;
});
// state.style属性变化后应用 style
const applyStyleDisplay = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFlexDirection = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFlexWrap = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleJustifyContent = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleAlignContent = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleJustifyItems = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleAlignItems = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleGridTemplateColumns = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleGridTemplateRows = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleGridColumnGap = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleGridRowGap = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleGridAutoFlow = lodash.debounce(applyStyle, applyStyleDebounceTime);
watch(() => state.style.display, display => applyStyleDisplay(props, state, "display", display));
watch(() => state.style.flexDirection, flexDirection => applyStyleFlexDirection(props, state, "flexDirection", flexDirection));
watch(() => state.style.flexWrap, flexWrap => applyStyleFlexWrap(props, state, "flexWrap", flexWrap));
watch(() => state.style.justifyContent, justifyContent => applyStyleJustifyContent(props, state, "justifyContent", justifyContent));
watch(() => state.style.alignContent, alignContent => applyStyleAlignContent(props, state, "alignContent", alignContent));
watch(() => state.style.justifyItems, justifyItems => applyStyleJustifyItems(props, state, "justifyItems", justifyItems));
watch(() => state.style.alignItems, alignItems => applyStyleAlignItems(props, state, "alignItems", alignItems));
watch(() => state.style.gridTemplateColumns, gridTemplateColumns => applyStyleGridTemplateColumns(props, state, "gridTemplateColumns", gridTemplateColumns));
watch(() => state.style.gridTemplateRows, gridTemplateRows => applyStyleGridTemplateRows(props, state, "gridTemplateRows", gridTemplateRows));
watch(() => state.style.gridColumnGap, gridColumnGap => applyStyleGridColumnGap(props, state, "gridColumnGap", gridColumnGap));
watch(() => state.style.gridRowGap, gridRowGap => applyStyleGridRowGap(props, state, "gridRowGap", gridRowGap));
watch(() => state.style.gridAutoFlow, gridAutoFlow => applyStyleGridAutoFlow(props, state, "gridAutoFlow", gridAutoFlow));

function initState() {
    if (state.style.gridTemplateColumns) {
        state.gridTemplateColumns = state.style.gridTemplateColumns.split(" ").map(col => unStyleUnit(col) ?? "auto");
    } else {
        state.gridTemplateColumns = [];
    }
    if (state.style.gridTemplateRows) {
        state.gridTemplateRows = state.style.gridTemplateRows.split(" ").map(col => unStyleUnit(col) ?? "auto");
    } else {
        state.gridTemplateRows = [];
    }
    state.gridColumnGap = unStyleUnit(state.style.gridColumnGap);
    state.gridRowGap = unStyleUnit(state.style.gridRowGap);
    if (state.style.gridAutoFlow) {
        if (state.style.gridAutoFlow.endsWith(" dense")) {
            state.gridAutoFlowDense = true;
            state.gridAutoFlow = state.style.gridAutoFlow.substring(0, state.style.gridAutoFlow.length - 6);
        } else {
            state.gridAutoFlowDense = false;
            state.gridAutoFlow = state.style.gridAutoFlow;
        }
    }
}

function setDisplay(val: string) {
    if (state.style.display === val) {
        delete state.style.display;
        delete state.style.flexDirection;
        delete state.style.flexWrap;
        delete state.style.justifyContent;
        delete state.style.alignContent;
        delete state.style.justifyItems;
        delete state.style.alignItems;
        delete state.style.gridTemplateColumns;
        delete state.style.gridTemplateRows;
        delete state.style.gridColumnGap;
        delete state.style.gridRowGap;
        delete state.style.gridAutoFlow;
        initState();
        return;
    }
    state.style.display = val;
}

function setDisplayConfig(name: string, val: string) {
    if (state.style[name] === val) {
        delete state.style[name];
        return;
    }
    state.style[name] = val;
}

function setFlexDirection(val: string) {
    setDisplayConfig("flexDirection", val);
}

function setJustifyContent(val: string) {
    setDisplayConfig("justifyContent", val);
}

function setAlignContent(val: string) {
    setDisplayConfig("alignContent", val);
}

function setJustifyItems(val: string) {
    setDisplayConfig("justifyItems", val);
}

function setAlignItems(val: string) {
    setDisplayConfig("alignItems", val);
}

function setFlexWrap(val: string) {
    setDisplayConfig("flexWrap", val);
}

function setGridAutoFlow(val: string) {
    if (state.gridAutoFlow === val) {
        state.gridAutoFlow = undefined;
        state.gridAutoFlowDense = undefined;
        return;
    }
    state.gridAutoFlow = val;
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="display 属性配置">
                    <span class="setter-label-tips">容器布局</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="display in data.displayList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': display.value===state.style.display,
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
        <template v-if="state.style.display==='flex'">
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="flex-direction 属性">
                        <span class="setter-label-tips">主轴方向</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="flexDirection in data.flexDirectionList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': flexDirection.value===state.style.flexDirection,
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
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="justify-content 属性">
                        <span class="setter-label-tips">主轴对齐</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="justifyContent in data.flexJustifyContentList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': justifyContent.value===state.style.justifyContent,
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
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="align-items 属性">
                        <span class="setter-label-tips">辅轴对齐</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="alignItems in data.flexAlignItemsList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': alignItems.value===state.style.alignItems,
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
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="flex-wrap 属性">
                        <span class="setter-label-tips">换行模式</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="flexWrap in data.flexWrapList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': flexWrap.value===state.style.flexWrap,
                        }"
                        @click="setFlexWrap(flexWrap.value)"
                        :title="flexWrap.tip"
                    >
                        <span style="font-size: 11px; white-space: nowrap;">{{ flexWrap.text }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="state.style.display==='grid'">
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="justify-content 属性，整个内容区域在容器里面的水平位置">
                        <span class="setter-label-tips">水平位置</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="justifyContent in data.gridJustifyContentList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': justifyContent.value===state.style.justifyContent,
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
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="align-content 属性，整个内容区域在容器里面的垂直位置">
                        <span class="setter-label-tips">垂直位置</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="alignContent in data.gridAlignContentList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': alignContent.value===state.style.alignContent,
                            'flex-row-container': true,
                            'flex-center': true,
                        }"
                        @click="setAlignContent(alignContent.value)"
                        :title="alignContent.tip"
                    >
                        <component :is="alignContent.icon" style="width: 16px; height: 16px;"/>
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="justify-items 属性，设置单元格内容的水平位置">
                        <span class="setter-label-tips">水平对齐</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="justifyItems in data.gridJustifyItemsList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': justifyItems.value===state.style.justifyItems,
                            'flex-row-container': true,
                            'flex-center': true,
                        }"
                        @click="setJustifyItems(justifyItems.value)"
                        :title="justifyItems.tip"
                    >
                        <component :is="justifyItems.icon" style="width: 16px; height: 16px;"/>
                    </div>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="align-items 属性，设置单元格内容的垂直位置">
                        <span class="setter-label-tips">垂直对齐</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="alignItems in data.gridAlignItemsList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': alignItems.value===state.style.alignItems,
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
            <div class="setter-row" style="height: auto;">
                <div class="flex-row-container" style="align-items: center;">
                    <div class="flex-item-fixed setter-row-label">
                        <Tooltip effect="dark" placement="left" content="grid-template-columns 属性，定义每一列的列宽">
                            <span class="setter-label-tips">列配置</span>
                        </Tooltip>
                    </div>
                    <div class="flex-item-fixed">{{ state.gridTemplateColumns.length }} 列</div>
                    <div class="flex-item-fill setter-row-input flex-row-container" style="justify-content: right;">
                        <div class="setter-row-input-button" title="新增列配置" @click="state.gridTemplateColumns.push('auto')">
                            <FontAwesomeIcon :icon="faPlus"/>
                        </div>
                    </div>
                </div>
                <div class="flex-row-container" style="align-items: center;">
                    <div class="flex-item-fixed setter-row-label"/>
                    <VueDraggable
                        class="flex-item-fill setter-row-input"
                        v-model="state.gridTemplateColumns"
                        handle=".setter-row-list-handle"
                    >
                        <div v-for="(col, idx) in state.gridTemplateColumns" class="flex-row-container setter-row-list">
                            <div class="flex-item-fixed flex-row-container flex-center setter-row-list-handle">
                                <FontAwesomeIcon :icon="faUpDownLeftRight"/>
                            </div>
                            <div class="flex-item-fixed flex-row-container flex-center setter-row-list-number">{{ idx + 1 }}.</div>
                            <div class="flex-item-fill">
                                <Tooltip effect="dark" placement="left" content="列宽配置，支持：px、%、fr、auto、minmax(min, max)">
                                    <Input
                                        v-model="state.gridTemplateColumns[idx]"
                                        size="mini"
                                        placeholder="支持：px、%、fr、auto、minmax(min, max)"
                                        :clearable="true"
                                    />
                                </Tooltip>
                            </div>
                            <div
                                class="flex-item-fixed flex-row-container flex-center setter-row-list-button"
                                @click="state.gridTemplateColumns.splice(idx, 1);"
                            >
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                    </VueDraggable>
                </div>
            </div>
            <div class="setter-row" style="height: auto;">
                <div class="flex-row-container" style="align-items: center;">
                    <div class="flex-item-fixed setter-row-label">
                        <Tooltip effect="dark" placement="left" content="grid-template-rows 属性，定义每一行的行高">
                            <span class="setter-label-tips">行配置</span>
                        </Tooltip>
                    </div>
                    <div class="flex-item-fixed">{{ state.gridTemplateRows.length }} 行</div>
                    <div class="flex-item-fill setter-row-input">
                        <div class="flex-row-container" style="justify-content: right;">
                            <div class="setter-row-input-button" title="新增行配置" @click="state.gridTemplateRows.push('auto')">
                                <FontAwesomeIcon :icon="faPlus"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-row-container" style="align-items: center;">
                    <div class="flex-item-fixed setter-row-label"/>
                    <VueDraggable
                        class="flex-item-fill setter-row-input"
                        v-model="state.gridTemplateRows"
                        handle=".setter-row-list-handle"
                    >
                        <div v-for="(col, idx) in state.gridTemplateRows" class="flex-row-container setter-row-list">
                            <div class="flex-item-fixed flex-row-container flex-center setter-row-list-handle">
                                <FontAwesomeIcon :icon="faUpDownLeftRight"/>
                            </div>
                            <div class="flex-item-fixed flex-row-container flex-center setter-row-list-number">{{ idx + 1 }}.</div>
                            <div class="flex-item-fill">
                                <Tooltip effect="dark" placement="left" content="行高配置，支持：px、%、fr、auto、minmax(min, max)">
                                    <Input
                                        v-model="state.gridTemplateRows[idx]"
                                        size="mini"
                                        placeholder="支持：px、%、fr、auto、minmax(min, max)"
                                        :clearable="true"
                                    />
                                </Tooltip>
                            </div>
                            <div
                                class="flex-item-fixed flex-row-container flex-center setter-row-list-button"
                                @click="state.gridTemplateRows.splice(idx, 1);"
                            >
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                    </VueDraggable>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="grid-row-gap/grid-column-gap 属性，设置行列的间隔，需要手动设置单位：px、em等">
                        <span class="setter-label-tips">行列间隔</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                    <!-- <span class="flex-item-fixed" style="margin-right: 4px;">列</span> -->
                    <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.gridColumnGap" size="mini" :clearable="true" placeholder="列间隔"/>
                    <span style="margin-left: 12px;"/>
                    <!-- <span class="flex-item-fixed" style="margin-right: 4px;">行</span> -->
                    <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.gridRowGap" size="mini" :clearable="true" placeholder="行间隔"/>
                </div>
            </div>
            <div class="flex-row-container setter-row">
                <div class="flex-item-fixed setter-row-label">
                    <Tooltip effect="dark" placement="left" content="grid-auto-flow 属性，容器子元素的放置顺序">
                        <span class="setter-label-tips">放置顺序</span>
                    </Tooltip>
                </div>
                <div class="flex-item-fill setter-row-input flex-row-container">
                    <div
                        v-for="autoFlow in data.gridAutoFlowList"
                        :class="{
                            'setter-row-input-radio': true,
                            'selected': autoFlow.value===state.gridAutoFlow,
                        }"
                        @click="setGridAutoFlow(autoFlow.value)"
                        :title="autoFlow.tip"
                    >
                        <span style="font-size: 11px; white-space: nowrap;">{{ autoFlow.text }}</span>
                    </div>
                    <Checkbox
                        v-if="state.gridAutoFlow"
                        class="setter-row-input-checkbox"
                        v-model="state.gridAutoFlowDense"
                        size="mini"
                        title="并且尽可能紧密填满，尽量不出现空格"
                    >
                        dense
                    </Checkbox>
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

.setter-row-input-checkbox {
    margin-left: 4px;
}

.setter-row-input-button {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cf;
    box-sizing: border-box;
    cursor: pointer;
}

.setter-row-input-button:hover {
    background: #DFE1E6;
    color: #4f77ff;
}

.setter-row-list {
    align-items: center;
    margin: 6px 0;
}

.setter-row-list:last-child {
    margin-bottom: 0;
}

.setter-row-list-handle {
    width: 18px;
    height: 18px;
    cursor: move;
    margin-right: 4px;
}

.setter-row-list-number {
    min-width: 16px;
    margin-right: 4px;
    text-align: right;
}

.setter-row-list-button {
    margin-left: 4px;
    width: 18px;
    height: 18px;
    cursor: pointer;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.setter-row-input-checkbox :deep(.tiny-checkbox__label) {
    padding-left: 2px;
}

.setter-row-input :deep(.tiny-numeric__unit) {
    width: 28px;
}
</style>
