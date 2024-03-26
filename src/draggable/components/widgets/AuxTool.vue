<script setup lang="ts">
import { computed, CSSProperties, reactive } from "vue";
import { IconArrowDown, IconArrowUp, IconChevronLeft, IconCopy, IconSettings, IconTrash } from "@tabler/icons-vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";

// 定义组件选项
defineOptions({
    name: 'AuxTool',
});

// 定义 Props 类型
interface AuxToolProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<AuxToolProps>(), {});

// state 属性
const state = reactive({});
// 内部数据
const data = {};

const hover = computed(() => props.designerState.hover);
const hoverIsTop = computed(() => props.designerState.hover.position?.isTop);
const hoverIsBottom = computed(() => props.designerState.hover.position?.isBottom);

// 设计器鼠标悬停时的虚线
const dashedStyle = computed(() => {
    const style: CSSProperties = {};
    const position = hover.value.position;
    if (position) {
        style.top = `${position.top}px`;
        style.left = `${position.left}px`;
        style.height = `${position.height}px`;
        style.width = `${position.width}px`;
    } else {
        style.display = "none";
    }
    return style;
});

const selectionStyle = computed(() => {
    const style: CSSProperties = {};
    const selection = props.designerEngine.tmp.selection;
    if (selection) {
        style.top = `${selection.top}px`;
        style.left = `${selection.left}px`;
        style.height = `${selection.height}px`;
        style.width = `${selection.width}px`;
    } else {
        style.display = "none";
    }
    return style;
});
</script>

<template>
    <div class="aux-tool">
        <div class="aux-insertion" style="display: none;"></div>
        <div class="aux-dashed-box" :style="dashedStyle">
            <div
                v-if="props.designerState.hover.componentMeta"
                :class="{
                    'mark-top-left': true,
                    'mark-top-left-up': !hoverIsTop,
                    'mark-top-left-down': hoverIsTop,
                }"
            >
                {{ props.designerState.hover.componentMeta.name }}
            </div>
            <div
                v-if="hover.position &&  hover.position?.height > 40 && hover.position?.width > 80"
                :class="{
                    'mark-bottom-right': true,
                    'mark-bottom-right-up': hoverIsBottom,
                    'mark-bottom-right-down': !hoverIsBottom,
                }"
            >
                拖放元素到容器内
            </div>
        </div>
        <div class="aux-selection-box" :style="selectionStyle">
            <div v-if="designerEngine.tmp.selection?.componentType" class="mark-top-left">
                <span>{{ designerEngine.tmp.selection.componentType }}</span>
                <IconSettings style="margin-left: 2px; cursor: pointer;" :size="16"/>
            </div>
            <div class="mark-bottom-right">
                <span class="mark-bottom-button" title="选择父级">
                    <IconChevronLeft :size="18"/>
                </span>
                <span class="mark-bottom-button" title="向上移动">
                    <IconArrowUp :size="18"/>
                </span>
                <span class="mark-bottom-button" title="向下移动">
                    <IconArrowDown :size="18"/>
                </span>
                <span class="mark-bottom-button" title="复制">
                    <IconCopy :size="18"/>
                </span>
                <span class="mark-bottom-button" title="删除">
                    <IconTrash :size="18"/>
                </span>
            </div>
        </div>
        <!--        aux-free-selection-->
    </div>
</template>

<style scoped>
.aux-tool {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    box-sizing: border-box;
}

.aux-tool > div {
    pointer-events: none;
    box-sizing: border-box;
    z-index: 2;
}

.aux-insertion {
    position: absolute;
    top: 0;
    left: 0;
    width: 1896px;
    height: 2px;
    background-color: #1890ff;
}

.aux-dashed-box {
    position: absolute;
    border: 1px dashed #1476ff;
}

.aux-dashed-box > .mark-top-left {
    position: relative;
    font-size: 12px;
    padding: 0 4px;
    color: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.aux-dashed-box > .mark-top-left-up {
    top: -20px;
}

.aux-dashed-box > .mark-top-left-down {
    top: -2px;
}

.aux-dashed-box > .mark-bottom-right {
    position: absolute;
    font-size: 12px;
    color: #808080;
    background: #f5f5f5;
    border: 1px solid #c2c2c2;
    padding: 0 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-dashed-box > .mark-bottom-right-up {
    right: 2px;
    bottom: 2px;
}

.aux-dashed-box > .mark-bottom-right-down {
    right: -1px;
    bottom: -20px;
}

.aux-selection-box {
    position: absolute;
    border: 2px solid #1476ff;
}

.aux-selection-box > .mark-top-left {
    pointer-events: all;
    position: relative;
    top: -23px;
    left: -2px;
    font-size: 14px;
    padding: 3px 8px;
    color: #fff;
    background: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-selection-box > .mark-bottom-right {
    pointer-events: all;
    position: absolute;
    right: -2px;
    bottom: -24px;
    padding: 2px 4px;
    color: #fff;
    background: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-selection-box > .mark-bottom-right > .mark-bottom-button {
    cursor: pointer;
    height: 18px;
    padding: 0 2px;
}
</style>
<!-- #1890ff -->
