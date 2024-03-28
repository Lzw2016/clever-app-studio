<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { IconArrowDown, IconArrowUp, IconChevronLeft, IconCopy, IconSettings, IconTrash, IconX } from "@tabler/icons-vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { AuxToolPosition, Direction } from "@/draggable/types/Designer";
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
// const state = reactive({});
// 内部数据
// const data = {};

const hover = computed(() => props.designerState.hover);
const hoverIsTop = computed(() => isTop(props.designerState.hover.position));
const hoverIsBottom = computed(() => isBottom(props.designerState.hover.position));
const hoverStyle = computed(() => positionToStyle(hover.value.position));
const insertionStyle = computed(() => {
    const style: CSSProperties = {};
    const insertion = props.designerEngine.insertion;
    if (props.designerState === props.designerEngine.activeDesignerState && !insertion.isEmpty() && insertion.distance && insertion.direction && insertion.position) {
        if (insertion.placeholder) {
            style.top = `${insertion.position.top}px`;
            style.left = `${insertion.position.left}px`;
            style.width = `${insertion.position.width}px`;
            style.height = `${insertion.position.height}px`;
            style.backgroundColor = 'rgba(24, 144, 255, 0.34)';
        } else {
            if ([Direction.left, Direction.top].includes(insertion.direction)) {
                style.top = `${insertion.position.top}px`;
                style.left = `${insertion.position.left}px`;
            } else if (insertion.direction === Direction.right) {
                style.top = `${insertion.position.top}px`;
                style.left = `${insertion.position.left + insertion.position.width}px`;
            } else if (insertion.direction === Direction.bottom) {
                style.top = `${insertion.position.top + insertion.position.height}px`;
                style.left = `${insertion.position.left}px`;
            }
            if (insertion.isHorizontal()) {
                style.width = "4px";
                style.height = `${insertion.distance.height}px`;
            } else {
                style.height = "4px";
                style.width = `${insertion.distance.width}px`;
            }
        }
    } else {
        style.display = "none";
    }
    return style;
});

function positionToStyle(position?: AuxToolPosition) {
    const style: CSSProperties = {};
    if (position) {
        style.top = `${position.top}px`;
        style.left = `${position.left}px`;
        style.height = `${position.height}px`;
        style.width = `${position.width}px`;
    } else {
        style.display = "none";
    }
    return style;
}

function isTop(position?: AuxToolPosition) {
    return position?.isTop;
}

function isBottom(position?: AuxToolPosition) {
    return position?.isBottom;
}

function cancelSelection(nodeId?: string) {
    const selections = props.designerState.selections;
    if (!nodeId || !selections) return;
    const idx = selections.findIndex(selection => selection.nodeId === nodeId);
    if (idx >= 0) selections.splice(idx, 1);
}

function delNode(nodeId?: string) {
    const blockInstance = props.designerState.blockInstance;
    const selections = props.designerState.selections;
    if (!nodeId || !blockInstance) return;
    blockInstance.blockOpsById.removeById(nodeId);
    const idx = selections.findIndex(selection => selection.nodeId === nodeId);
    if (idx >= 0) selections.splice(idx, 1);
}
</script>

<template>
    <div class="aux-tool">
        <!-- 插入占位 -->
        <div class="aux-insertion" :style="insertionStyle"></div>
        <!-- 设计器鼠标悬停时的虚线 -->
        <div class="aux-dashed-box" :style="hoverStyle">
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
                v-if="hover.isContainer && hover.position &&  (!hoverIsBottom || hover.position?.height > 24 && hover.position?.width > 60)"
                :class="{
                    'mark-bottom-right': true,
                    'mark-bottom-right-up': hoverIsBottom,
                    'mark-bottom-right-down': !hoverIsBottom,
                }"
            >
                拖放元素到容器内
            </div>
        </div>
        <!-- 设计器时选择组件的实线 -->
        <div v-for="selection in props.designerState.selections" class="aux-selection-box" :style="positionToStyle(selection.position)">
            <div
                v-if="selection.componentMeta && props.designerState.singleSelection"
                :class="{
                    'mark-top-left': true,
                    'mark-top-left-up': !isTop(selection.position),
                    'mark-top-left-down': isTop(selection.position),
                }"
            >
                <span>{{ selection.componentMeta.name }}</span>
                <IconSettings style="margin-left: 4px; cursor: pointer;" title="设置" :size="16"/>
                <IconX style="margin-left: 2px; cursor: pointer;" title="取消" :size="16" @click="cancelSelection(selection.nodeId)"/>
            </div>
            <div
                v-if="props.designerState.singleSelection"
                :class="{
                    'mark-bottom-right': true,
                    'mark-bottom-right-up': isBottom(selection.position),
                    'mark-bottom-right-down': !isBottom(selection.position),
                }"
            >
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
                <span v-if="selection.parentId" class="mark-bottom-button" title="删除" @click="delNode(selection.nodeId)">
                    <IconTrash :size="18"/>
                </span>
            </div>
        </div>
        <!-- 自由选择组件组件的边框 -->
        <div class="aux-free-selection" style="display: none;">
            自由选择组件
        </div>
    </div>
</template>

<style scoped>
.aux-tool {
    position: absolute;
    top: 0;
    left: 0;
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
    background-color: #1476ff;
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
    font-size: 14px;
    padding: 3px 4px;
    color: #fff;
    background: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-selection-box > .mark-top-left-up {
    top: -23px;
    left: -2px;
}

.aux-selection-box > .mark-top-left-down {
    top: 0;
    left: 0;
}

.aux-selection-box > .mark-bottom-right {
    pointer-events: all;
    position: absolute;
    padding: 2px 4px;
    color: #fff;
    background: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-selection-box > .mark-bottom-right-up {
    right: 0;
    bottom: 0;
}

.aux-selection-box > .mark-bottom-right-down {
    right: -2px;
    bottom: -24px;
}

.aux-selection-box > .mark-bottom-right > .mark-bottom-button {
    cursor: pointer;
    height: 18px;
    padding: 0 2px;
}
</style>
