<script setup lang="ts">
import { computed, CSSProperties, reactive } from "vue";
import { IconCaretDownFilled, IconCaretLeftFilled, IconCaretRightFilled, IconCaretUpFilled } from "@tabler/icons-vue";

// 定义组件选项
defineOptions({
    name: 'SplitPane',
});

// 定义 Props 类型
interface SplitPaneProps {
    /** 分割类型，可选值为 H(水平) 或 V(垂直)；默认值H */
    layout?: "H" | "V";
    /** 使用绝对大小的面板，可选值为 one(第一个面板) 或 two(第二个面板)；默认值“one” */
    fixedPane?: "one" | "two";
    /** 第一个面板的默认大小(绝对大小) */
    fixedPaneDefSize?: number;
    /** 第一个面板的最小大小(绝对大小) */
    fixedPaneMinSize?: number;
    /** 第一个面板的最大大小(绝对大小) */
    fixedPaneMaxSize?: number;
    /** 显示第一个面板的折叠按钮 */
    oneCollapse?: boolean;
    /** 显示第二个面板的折叠按钮 */
    twoCollapse?: boolean;
    /** 禁用拖拽 */
    disable?: boolean;
    /** 分隔拖拽区大小 */
    gutterSize?: number;
    /** 默认折叠状态，one:第一个面板折叠 , two:第二个面板折叠 */
    defCollapsed?: "" | "one" | "two";
    /** 面板自定义样式，同时应用在 第一个面板 和 第二个面板 */
    paneStyle?: CSSProperties;
    /** 分隔线样式 */
    gutterStyle?: CSSProperties;
    /** 自定义第一个面板(手动定义第一个面板的根级html dom) */
    customOnePane?: boolean;
    /** 自定义第二个面板(手动定义第二个面板的根级html dom) */
    customTwoPane?: boolean;
}

// 自定义事件类型
const emit = defineEmits<{
    // 开始改变大小
    resizeStar: [];
    // 正在改变大小
    resizing: [changeSize: number, newSize: number, event: MouseEvent];
    // 改变大小结束
    resizeEnd: [];
}>();

// 读取组件 props 属性
const props = withDefaults(defineProps<SplitPaneProps>(), {
    layout: "H",
    fixedPane: "one",
    fixedPaneDefSize: 50,
    fixedPaneMinSize: 50,
    oneCollapse: false,
    twoCollapse: false,
    gutterSize: 12,
    defCollapsed: "",
});
// state 属性
const state = reactive({
    // 当前的绝对大小
    fixedSize: props.fixedPaneDefSize || 40,
    // 当前正在改变大小
    resizing: false,
    // 已经折叠的面板 one:第一个面板折叠 | two:第二个面板折叠 | 都没有折叠
    collapsed: props.defCollapsed,
});
// 内部数据
const data = {
    // 原始的光标样式
    originalCursor: window.document.body.style.cursor,
    // 最后一次鼠标位置 clientX | clientY
    lastPosition: -1,
    // 当前已超出 fixedPaneMinSize | fixedPaneMaxSize 范围，分别取值 min | max
    outOfMinMax: "",
    // 分隔线(最外层显示的线)大小
    gutterLineSize: 2,
};
// 水平模式
const horizontal = computed(() => props.layout === 'H');
// 第一个面板自动填满
const onePaneFixed = computed(() => props.fixedPane === 'one');
// style 属性 width | height
const widthOrHeight = computed(() => horizontal.value ? 'width' : 'height');
// clientX | clientY
const clientXOrY = computed(() => horizontal.value ? 'clientX' : 'clientY');
// col-resize | row-resize
const resizeColOrRow = computed(() => horizontal.value ? 'col-resize' : 'row-resize');
// 是否需要隐藏第一个面板
const hideOne = computed(() => state.collapsed === 'one');
// 是否需要隐藏第二个面板
const hideTwo = computed(() => state.collapsed === 'two');
// 第一个面 style
const onePaneStyle = computed(() => {
    const style: CSSProperties = {};
    if (hideOne.value) {
        style[widthOrHeight.value] = "0px";
        style.display = 'none';
    } else if (hideTwo.value) {
        style[widthOrHeight.value] = "100%";
        // style[widthOrHeight.value] = `calc(100% - ${data.gutterLineSize}px)`;
    } else if (onePaneFixed.value) {
        style[widthOrHeight.value] = `${state.fixedSize}px`;
    } else {
        style[widthOrHeight.value] = `calc(100% - ${state.fixedSize}px)`;
    }
    return style;
});
// 第二个面 style
const twoPaneStyle = computed(() => {
    const style: CSSProperties = {};
    if (hideTwo.value) {
        style[widthOrHeight.value] = "0px";
        style.display = 'none';
    } else if (hideOne.value) {
        style[widthOrHeight.value] = "100%";
        // style[widthOrHeight.value] = `calc(100% - ${data.gutterLineSize}px)`;
    } else if (onePaneFixed.value) {
        style[widthOrHeight.value] = `calc(100% - ${state.fixedSize}px)`;
    } else {
        style[widthOrHeight.value] = `${state.fixedSize}px`;
    }
    return style;
});
// 分隔线 style
const gutterStyle = computed(() => {
    const style: CSSProperties = {};
    if (!hideOne.value && !hideTwo.value) {
        style.cursor = resizeColOrRow.value;
    }
    if (horizontal.value) {
        style.height = "100%";
    } else {
        style.width = "100%";
    }
    if (hideOne.value || hideTwo.value) {
        style[widthOrHeight.value] = '0px';
    } else {
        style[widthOrHeight.value] = `${data.gutterLineSize}px`;
    }
    return style;
});
// 分隔区响应拖拽 style
const gutterDragStyle = computed(() => {
    const style: CSSProperties = {};
    const gutterSizeHalf = (props.gutterSize - data.gutterLineSize) / 2;
    const gutterSizeStrictHalf = props.gutterSize / 2;
    if (horizontal.value) {
        style.height = "100%";
        style.left = `-${gutterSizeHalf}px`;
        if (hideOne.value || hideTwo.value) {
            style.padding = "0";
        } else {
            style.padding = `0 ${gutterSizeStrictHalf}px`;
        }
    } else {
        style.width = "100%";
        style.top = `-${gutterSizeHalf}px`;
        if (hideOne.value || hideTwo.value) {
            style.padding = "0";
        } else {
            style.padding = `${gutterSizeStrictHalf}px 0`;
        }
    }
    return style;
});
// 收起第一个面板按钮 style
const oneCollapseStyle = computed(() => {
    const style: CSSProperties = {};
    const gutterSizeHalf = props.gutterSize / 2 + data.gutterLineSize / 2;
    if (horizontal.value) {
        style.width = '14px';
        style.height = '24px';
        style.top = '50%';
        style.left = `calc(50% - ${gutterSizeHalf}px)`;
    } else {
        style.width = '24px';
        style.height = '14px';
        style.top = `calc(50% - ${gutterSizeHalf}px)`;
        style.left = '50%';
    }
    return style;
});
// 收起第二个面板按钮 style
const twoCollapseStyle = computed(() => {
    const style: CSSProperties = {};
    const gutterSizeHalf = props.gutterSize / 2 + data.gutterLineSize / 2;
    if (horizontal.value) {
        style.width = '14px';
        style.height = '24px';
        style.top = '50%';
        style.left = `calc(50% + ${gutterSizeHalf}px)`;
    } else {
        style.width = '24px';
        style.height = '14px';
        style.top = `calc(50% + ${gutterSizeHalf}px)`;
        style.left = '50%';
    }
    return style;
});

// 改变大小开始
function gutterResizeStar(event: MouseEvent) {
    if (event.button != 0) return;
    emit("resizeStar");
    state.resizing = true;
    data.originalCursor = window.document.body.style.cursor;
    data.lastPosition = -1;
    data.outOfMinMax = "";
    window.document.body.style.setProperty('cursor', resizeColOrRow.value, 'important');
    window.addEventListener("mousemove", gutterResizing);
    window.addEventListener("mouseup", gutterResizeEnd, { once: true });
}

// 改变大小中
function gutterResizing(event: MouseEvent) {
    const position = event[clientXOrY.value];
    // 第一次的鼠标移动事件
    if (data.lastPosition < 0) {
        data.lastPosition = position;
        return;
    }
    const changeSize = position - data.lastPosition;
    let newSize = state.fixedSize + changeSize * (onePaneFixed.value ? 1 : -1);
    emit("resizing", changeSize, newSize, event);
    // 大到一定范围才处理
    if (Math.abs(changeSize) <= 5) {
        return;
    }
    // 已超出范围
    if (data.outOfMinMax === 'min' && ((onePaneFixed.value && changeSize < 0) || (!onePaneFixed.value && changeSize > 0))) {
        return;
    }
    if (data.outOfMinMax === 'max' && ((onePaneFixed.value && changeSize > 0) || (!onePaneFixed.value && changeSize < 0))) {
        return;
    }
    data.outOfMinMax = "";
    if (props.fixedPaneMinSize && props.fixedPaneMinSize > newSize) {
        newSize = props.fixedPaneMinSize;
        data.outOfMinMax = "min";

    } else if (props.fixedPaneMaxSize && props.fixedPaneMaxSize < newSize) {
        newSize = props.fixedPaneMaxSize;
        data.outOfMinMax = "max";
    }
    state.fixedSize = newSize;
    if (!data.outOfMinMax) {
        data.lastPosition = position;
    }
}

// 改变大小结束
function gutterResizeEnd() {
    emit("resizeEnd");
    window.removeEventListener("mousemove", gutterResizing);
    window.removeEventListener("mouseup", gutterResizeEnd);
    state.resizing = false;
    window.document.body.style.cursor = data.originalCursor;
}

function oneCollapseClick() {
    switch (state.collapsed) {
        case "one":
            break
        case "two":
            state.collapsed = "";
            break
        default:
            state.collapsed = "one";
    }
}

function twoCollapseClick() {
    switch (state.collapsed) {
        case "one":
            state.collapsed = "";
            break
        case "two":
            break
        default:
            state.collapsed = "two";
    }
}
</script>

<template>
    <div
        :class="{
            'flex-column-container': !horizontal,
            'flex-row-container': horizontal,
        }"
    >
        <slot
            v-if="props.customOnePane"
            name="onePane"
            :class="{
                'flex-item-fill': !onePaneFixed && !hideOne,
                'flex-item-fixed': onePaneFixed && !hideOne,
            }"
            :style="{overflow: 'auto', ...onePaneStyle, ...paneStyle}"
        >
        </slot>
        <div
            v-else
            :class="{
                'flex-item-fill': !onePaneFixed && !hideOne,
                'flex-item-fixed': onePaneFixed && !hideOne,
            }"
            :style="{overflow: 'auto', ...onePaneStyle, ...paneStyle}"
        >
            <slot name="onePane"></slot>
        </div>

        <slot name="gutter">
            <div
                :class="{
                    'flex-item-fixed': true,
                    'split-gutter': true,
                    'split-gutter-vertical': !horizontal,
                    'split-gutter-horizontal': horizontal,
                    'resizing': state.resizing,
                }"
                :style="{...gutterStyle, ...props.gutterStyle}"
            >
                <div
                    class="split-gutter-drag"
                    :style="gutterDragStyle"
                    @mousedown="gutterResizeStar"
                >
                </div>
                <div
                    v-if="(props.oneCollapse && !hideOne) || hideTwo"
                    class="split-gutter-button"
                    :style="oneCollapseStyle"
                    @click="oneCollapseClick"
                >
                    <IconCaretLeftFilled v-if="horizontal" viewBox="4 4 16 16" style="width: 12px;"/>
                    <IconCaretUpFilled v-else viewBox="4 4 16 16" style="height: 12px;"/>
                </div>
                <div
                    v-if="(props.twoCollapse && !hideTwo) || hideOne"
                    class="split-gutter-button"
                    :style="twoCollapseStyle"
                    @click="twoCollapseClick"
                >
                    <IconCaretRightFilled v-if="horizontal" viewBox="4 4 16 16" style="width: 12px;"/>
                    <IconCaretDownFilled v-else viewBox="4 4 16 16" style="height: 12px;"/>
                </div>
            </div>
        </slot>

        <slot
            v-if="props.customTwoPane"
            name="twoPane"
            :class="{
                'flex-item-fill': onePaneFixed && !hideTwo,
                'flex-item-fixed': !onePaneFixed && !hideTwo,
            }"
            :style="{overflow: 'auto', ...twoPaneStyle, ...paneStyle}"
        >
        </slot>
        <div
            v-else
            :class="{
                'flex-item-fill': onePaneFixed && !hideTwo,
                'flex-item-fixed': !onePaneFixed && !hideTwo,
            }"
            :style="{overflow: 'auto', ...twoPaneStyle, ...paneStyle}"
        >
            <slot name="twoPane"></slot>
        </div>
    </div>
</template>

<style scoped>
.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

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

.split-gutter {
    box-sizing: border-box;
    margin: 0;
    background-color: #e9e9e9;
    position: relative;
}

.split-gutter:hover {
    background-color: #0072e8;
}

.split-gutter-drag {
    position: absolute;
    opacity: 0.1;
}

.split-gutter.resizing {
    background-color: #0072e8;
}

.split-gutter-button {
    position: absolute;
    color: #939393;
    border: 1px solid rgba(25, 25, 25, .1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.split-gutter-button:hover {
    color: #282c43;
}
</style>
