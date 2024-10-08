<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDown, faArrowUp, faChevronLeft, faClone, faEraser, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { isObj } from "@/utils/Typeof";
import { getChildNodePosition, NodePosition, runtimeNodeToDesignNode } from "@/draggable/utils/DesignerUtils";
import { calcAuxToolPosition } from "@/draggable/utils/PositionCalc";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { AuxToolPosition, Direction } from "@/draggable/types/Designer";
import { DesignerState } from "@/draggable/models/DesignerState";
import { Selection } from "@/draggable/models/Selection";

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
const isDragging = computed(() => props.designerEngine.cursor.isDragging());
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
            style.backgroundColor = insertion.allowDrag ? 'rgba(24, 144, 255, 0.34)' : '#DE504E';
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
const selections = computed(() => {
    const selections: Array<Selection> = [];
    for (let selection of props.designerState.selections) {
        // 判断选中节点大小存在
        const position = selection.position;
        if (position && (position.width < 0 || position.height < 0)) {
            continue;
        }
        const node = props.designerState.selectNodes.find(n => n.id === selection.nodeId);
        const style = node?.props?.style;
        // 判断节点隐藏
        if (style?.display === "none") {
            continue;
        }
        selections.push(selection);
    }
    return selections;
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

function getNodePosition(selection: Selection): NodePosition | undefined {
    if (!selection.parentId || !selection.nodeId) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    const parentNode = blockInstance.globalContext.allNode[selection.parentId]
    if (!parentNode) return;
    return getChildNodePosition(parentNode, selection.nodeId);
}

function showMoveUp(selection: Selection) {
    const pos = getNodePosition(selection);
    if (!pos) return false;
    return pos.idx > 0;
}

function showMoveDown(selection: Selection) {
    const pos = getNodePosition(selection);
    if (!pos) return false;
    return pos.idx < (pos.arr.length - 1);
}

function cancelSelection(nodeId?: string) {
    const selections = props.designerState.selections;
    if (!nodeId || !selections) return;
    const idx = selections.findIndex(selection => selection.nodeId === nodeId);
    if (idx >= 0) selections.splice(idx, 1);
}

/**
 * 当 Selection 对应的 NodeId 变化时重新计算辅助工具的位置
 * @param selection Selection对象
 * @param nodeId    新的NodeId
 */
function setSelection(selection: Selection, nodeId: string) {
    const idx = props.designerState.selections.findIndex(item => item === selection);
    if (idx < 0) return;
    if (!props.designerState.designerContainer) return;
    if (!selection.nodeId) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    const node = blockInstance.globalContext.allNode[nodeId];
    if (!node) return;
    const blockRef = blockInstance.globalContext.nodeRefVueRef[node.ref] ?? node.ref;
    const block = blockInstance.globalContext.allBlock[blockRef];
    if (!block) return;
    let nodeEl = block.$refs[node.ref];
    if (!nodeEl) return;
    if (nodeEl.$el) nodeEl = nodeEl.$el as any;
    const newSelection = new Selection(props.designerState);
    newSelection.nodeId = node.id;
    newSelection.parentId = node.__parentId;
    newSelection.componentMeta = props.designerEngine.componentManage.getComponentMeta(node.type);
    newSelection.position = calcAuxToolPosition(props.designerState.designerContainer, nodeEl);
    props.designerState.selections.splice(idx, 1, newSelection);
}

function selectParent(selection: Selection) {
    if (!selection.parentId) return;
    setSelection(selection, selection.parentId);
}

function moveNode(selection: Selection, up: boolean) {
    if (!selection.nodeId) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    const pos = getNodePosition(selection);
    if (!pos) return false;
    if (pos.isItems) {
        if (up) {
            blockInstance.opsById.moveNodeToItemBeforeById(selection.nodeId, selection.nodeId);
        } else {
            blockInstance.opsById.moveNodeToItemAfterById(selection.nodeId, selection.nodeId);
        }
    } else {
        if (up) {
            blockInstance.opsById.moveNodeToSlotBeforeById(selection.nodeId, pos.slotName, selection.nodeId);
        } else {
            blockInstance.opsById.moveNodeToSlotAfterById(selection.nodeId, pos.slotName, selection.nodeId);
        }
    }
    // 更新 selection
    blockInstance.$nextTick(() => selection.recalcAuxToolPosition()).finally();
}

function copyNode(selection: Selection) {
    if (!selection.nodeId) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    const node = blockInstance.globalContext.allNode[selection.nodeId];
    if (!node) return;
    // 复制节点流程: RuntimeNode -> DesignNode -> cloneDeep(DesignNode) -> afterAddItemById(DesignNode)
    const designNode = runtimeNodeToDesignNode(node);
    const newNode = blockInstance.opsById.afterAddItemById(node.id, designNode);
    if (!newNode) return;
    if (isObj(newNode)) {
        const newId = (newNode as RuntimeNode).id;
        blockInstance.$nextTick(() => setSelection(selection, newId)).finally();
    }
}

function clearChild(selection: Selection) {
    const nodeId = selection.nodeId;
    if (!nodeId) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    blockInstance.opsById.removeChildrenById(nodeId);
    blockInstance.$nextTick(() => selection.recalcAuxToolPosition()).finally();
}

function delNode(nodeId?: string) {
    const blockInstance = props.designerState.blockInstance;
    const selections = props.designerState.selections;
    if (!nodeId || !blockInstance) return;
    blockInstance.opsById.removeById(nodeId);
    const idx = selections.findIndex(selection => selection.nodeId === nodeId);
    if (idx >= 0) selections.splice(idx, 1);
    blockInstance.$nextTick(() => selections.forEach(selection => selection.recalcAuxToolPosition())).finally();
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
        <div v-if="!isDragging" v-for="selection in selections" class="aux-selection-box" :style="positionToStyle(selection.position)">
            <div
                v-if="selection.componentMeta"
                :class="{
                    'mark-top-left': true,
                    'mark-top-left-up': !isTop(selection.position),
                    'mark-top-left-down': isTop(selection.position),
                }"
            >
                <span style="font-size: 12px;">{{ selection.componentMeta.name }}</span>
                <!-- <span class="mark-top-button" title="移动">-->
                <!--     <FontAwesomeIcon :icon="faArrowsUpDownLeftRight" :fixed-width="true" style="font-size: 14px;"/>-->
                <!-- </span>-->
                <!-- <span class="mark-top-button" title="调试">-->
                <!--     <FontAwesomeIcon :icon="faBug" :fixed-width="true" style="font-size: 14px;"/>-->
                <!-- </span>-->
                <!-- <span class="mark-top-button" title="设置">-->
                <!--     <FontAwesomeIcon :icon="faGear" :fixed-width="true" style="font-size: 14px;"/>-->
                <!-- </span>-->
                <span class="mark-top-button" title="取消选择" @click="cancelSelection(selection.nodeId)">
                    <FontAwesomeIcon :icon="faXmark" :fixed-width="true" style="font-size: 14px;"/>
                </span>
            </div>
            <div
                :class="{
                    'mark-bottom-right': true,
                    'mark-bottom-right-up': isBottom(selection.position),
                    'mark-bottom-right-down': !isBottom(selection.position),
                }"
            >
                <span v-if="selection.parentId" class="mark-bottom-button" title="选择父级" @click="selectParent(selection)">
                    <FontAwesomeIcon :icon="faChevronLeft" :fixed-width="true" style="font-size: 12px;"/>
                </span>
                <span v-if="showMoveUp(selection)" class="mark-bottom-button" title="向前移动" @click="moveNode(selection, true)">
                    <FontAwesomeIcon :icon="faArrowUp" :fixed-width="true" style="font-size: 12px;"/>
                </span>
                <span v-if="showMoveDown(selection)" class="mark-bottom-button" title="向后移动" @click="moveNode(selection, false)">
                    <FontAwesomeIcon :icon="faArrowDown" :fixed-width="true" style="font-size: 12px;"/>
                </span>
                <span v-if="selection.parentId" class="mark-bottom-button" title="复制" @click="copyNode(selection)">
                    <FontAwesomeIcon :icon="faClone" :fixed-width="true" style="font-size: 12px;"/>
                </span>
                <span class="mark-bottom-button" title="清空内容" @click="clearChild(selection)">
                    <FontAwesomeIcon :icon="faEraser" :fixed-width="true" style="font-size: 12px;"/>
                </span>
                <span v-if="selection.parentId" class="mark-bottom-button" title="删除" @click="delNode(selection.nodeId)">
                    <FontAwesomeIcon :icon="faTrash" :fixed-width="true" style="font-size: 12px;"/>
                </span>
            </div>
        </div>
        <!-- 拖拽组件时 -->
        <div v-if="isDragging" v-for="position in props.designerEngine.draggingCmpMetas.positions" class="aux-cover-rect-dragging" :style="positionToStyle(position)"></div>
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
    padding: 0;
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
    top: -4px;
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
    right: 1px;
    bottom: 1px;
}

.aux-dashed-box > .mark-bottom-right-down {
    right: -2px;
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
    padding: 2px 4px;
    color: #fff;
    background: #1476ff;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.aux-selection-box > .mark-top-left-up {
    top: -21px;
    left: -2px;
}

.aux-selection-box > .mark-top-left-down {
    top: -2px;
    left: 0;
}

.aux-selection-box > .mark-top-left > .mark-top-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    cursor: pointer;
}

.aux-selection-box > .mark-top-left > .mark-top-button:last-child {
    margin-left: 2px;
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
    bottom: -20px;
}

.aux-selection-box > .mark-bottom-right > .mark-bottom-button {
    cursor: pointer;
    height: 16px;
    padding: 0 2px;
    line-height: 16px;
}

.aux-cover-rect-dragging {
    position: absolute;
    background-color: rgba(24, 144, 255, 0.26);
}
</style>
