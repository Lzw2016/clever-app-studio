<script setup lang="ts">
import lodash from "lodash";
import { computed, CSSProperties, reactive, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Tree } from "@opentiny/vue";
import { hasValue, noValue } from "@/utils/Typeof";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { OutlineTreeNode, runtimeNodeToTreeNode } from "@/draggable/utils/DesignerUtils";
import { Selection } from "@/draggable/models/Selection";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { calcAuxToolPosition } from "@/draggable/utils/PositionCalc";

// 定义组件选项
defineOptions({
    name: 'OutlinePanel',
});

// 定义 Props 类型
interface OutlinePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<OutlinePanelProps>(), {});

// 定义 State 类型
interface OutlinePanelState {
    outlineTreeNodes: Array<OutlineTreeNode<RuntimeNode>>;
    selectNodeId?: string;
}

// state 属性
const state = reactive<OutlinePanelState>({
    outlineTreeNodes: [],
    selectNodeId: undefined,
});
// 内部数据
const data = {};
// 设计器状态
const designerState = computed(() => props.designerEngine.activeDesignerState);
// 大纲树组件实例
const outlineTreeRef = ref<InstanceType<typeof Tree> | undefined>();
// 大纲树数据节点
watch(
    () => [designerState.value?.blockInstance?.globalContext?.runtimeBlock, designerState.value?.blockInstance?.ops.nodeChange.value],
    ([runtimeBlock, _]) => {
        if (!runtimeBlock) return [];
        state.outlineTreeNodes = runtimeNodeToTreeNode(runtimeBlock as RuntimeNode, props.designerEngine.componentManage);
    },
    {
        immediate: true,
    },
);
// 选择的节点
watch(
    () => designerState.value?.selectNode,
    selectNode => {
        const nodeId = selectNode ? selectNode.id : undefined;
        state.selectNodeId = nodeId;
        outlineTreeRef.value?.setCurrentKey(nodeId);
    },
    {
        immediate: true,
    },
);

function isHide(node: OutlineTreeNode<RuntimeNode>) {
    const style = node.data?.props.style as CSSProperties;
    return hasValue(style) && (style.display === 'none' || style.visibility === 'hidden');
}

function showNode(node: OutlineTreeNode<RuntimeNode>) {
    if (!node.data) return;
    const props = node.data.props
    let style = props.style as CSSProperties;
    if (noValue(style)) {
        style = {};
        node.data.props.style = style;
    }
    if (props.__raw_props_style_display) {
        style.display = props.__raw_props_style_display;
    } else {
        delete style.display;
    }
    forceUpdateBlock();
}

function hideNode(node: OutlineTreeNode<RuntimeNode>) {
    if (!node.data) return;
    const props = node.data.props
    let style = props.style as CSSProperties;
    if (noValue(style)) {
        style = {};
        node.data.props.style = style;
    }
    props.__raw_props_style_display = style.display;
    style.display = 'none';
    forceUpdateBlock();
}

function forceUpdateBlock() {
    const blockInstance = designerState.value?.blockInstance;
    if (!blockInstance) return;
    blockInstance.$forceUpdate();
    blockInstance.$nextTick(() => {
        const selections = designerState.value?.selections;
        const nodes = designerState.value?.selectNodes;
        if (!selections || !nodes) return;
        const allNode = blockInstance.globalContext.allNode;
        lodash.remove(selections, selection => noValue(selection.nodeId) || noValue(allNode[selection.nodeId]));
        const nodeIds = nodes.map(node => node.id);
        for (let selection of selections) {
            if (selection.nodeId && nodeIds.includes(selection.nodeId)) {
                selection.recalcAuxToolPosition();
            }
        }
    }).finally();
}

function clickNode(node: OutlineTreeNode<RuntimeNode>) {
    const selectNode = node.data;
    if (!selectNode || !designerState.value) return;
    const designer = designerState.value.designerContainer;
    const element = document.querySelector(`[${htmlExtAttr.nodeId}='${selectNode.id}']`);
    if (!designer || !element) return;
    const hover = designerState.value.hover;
    const selections = designerState.value.selections;
    const selection = new Selection(designerState.value);
    selection.nodeId = selectNode.id;
    selection.parentId = node.parentId;
    if (selections.some(item => item.nodeId === selection.nodeId)) return;
    selection.componentMeta = useHtmlExtAttr.componentMeta(element, props.designerEngine.componentManage);
    selection.position = calcAuxToolPosition(designer, element);
    selections.length = 0;
    selections.push(selection);
    if (hover.nodeId && selections.some(item => item.nodeId === hover.nodeId)) {
        hover.clear();
    }
}

function delNode(node: OutlineTreeNode<RuntimeNode>) {
    const selectNode = node.data;
    if (!selectNode || !designerState.value) return;
    designerState.value?.blockInstance?.opsById.removeById(selectNode.id, { cancelRender: true });
    forceUpdateBlock();
}

// 根节点不能拖动
function nodeAllowDrag(node: any) {
    const nData = node.data as OutlineTreeNode<RuntimeNode>;
    return hasValue(nData.parentId);
}

// 不能放置的根节点的前面 | TODO 有些组件内部不能放置渲染节点
function nodeAllowDrop(srcNode: any, targetNode: any, type: 'prev' | 'inner' | 'next') {
    const snData = srcNode.data as OutlineTreeNode<RuntimeNode>;
    const tnData = targetNode.data as OutlineTreeNode<RuntimeNode>;
    return !(noValue(tnData.parentId) && type === 'prev');
}

// 节点拖放变化
function nodeDrop(srcNode: any, targetNode: any, dropType: 'before' | 'after' | 'inner' | 'none', event: Event) {
    const blockInstance = designerState.value?.blockInstance;
    if (!blockInstance) return;
    const snData = srcNode.data as OutlineTreeNode<RuntimeNode>;
    const tnData = targetNode.data as OutlineTreeNode<RuntimeNode>;
    if (dropType === 'before') {
        blockInstance.opsById.moveNodeToItemBeforeById(tnData.id, snData.id, { cancelRender: true });
    } else if (dropType === 'after') {
        blockInstance.opsById.moveNodeToItemAfterById(tnData.id, snData.id, { cancelRender: true });
    } else if (dropType === 'inner' && hasValue(tnData.parentId)) {
        blockInstance.opsById.moveNodeToItemLastById(tnData.parentId, snData.id, { cancelRender: true });
    }
    forceUpdateBlock();
}
</script>

<template>
    <div class="outline-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed outline-panel-title">
            <div class="flex-item-fixed outline-panel-title-name">组件大纲</div>
            <div class="flex-item-fill"/>
            <div class="outline-panel-close">
                <FontAwesomeIcon :icon="faXmark" :fixed-width="true"/>
            </div>
        </div>
        <div class="flex-item-fill" style="overflow: auto;">
            <Tree
                v-show="designerState"
                ref="outlineTreeRef"
                node-key="id"
                :data="state.outlineTreeNodes"
                :show-line="false"
                :default-expand-all="true"
                :highlight-current="true"
                :expand-on-click-node="false"
                :show-contextmenu="false"
                :draggable="true"
                :allow-drag="nodeAllowDrag"
                :allow-drop="nodeAllowDrop"
                size="small"
                :current-node-key="state.selectNodeId"
                @node-click="clickNode"
                @node-drop="nodeDrop"
            >
                <template #prefix="{ node }">
                    <span class="cmp-icon">
                        <component :is="node.data.icon"/>
                    </span>
                </template>
                <template #operation="{ node }">
                    <div v-if="node.data.parentId" class="cmp-ops">
                        <FontAwesomeIcon
                            v-if="isHide(node.data)"
                            title="隐藏节点"
                            :icon="faEye"
                            :fixed-width="true"
                            style="font-size: 14px;"
                            @click="showNode(node.data)"
                        />
                        <FontAwesomeIcon
                            v-else
                            title="显示节点"
                            :icon="faEyeSlash"
                            :fixed-width="true"
                            style="font-size: 14px;"
                            @click="hideNode(node.data)"
                        />
                        <FontAwesomeIcon
                            title="删除节点"
                            :icon="faTrashCan"
                            :fixed-width="true"
                            style="font-size: 14px;"
                            @click="delNode(node.data)"
                        />
                    </div>
                </template>
            </Tree>
            <div v-show="noValue(designerState)" class="outline-empty">
                未选择功能页面
            </div>
        </div>
    </div>
</template>

<style scoped>
.outline-panel {
    height: 100%;
    width: 100%;
}

.outline-panel-title {
    background-color: #efefef;
    padding: 6px 12px;
    border-bottom: 1px solid #e1e1e1;
}

.outline-panel-title-name {
    font-size: 14px;
    font-weight: bold;
}

.outline-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
    font-size: 16px;
}

.outline-panel-close:hover {
    color: #333333;
}

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

.outline-empty {
    text-align: center;
    margin-top: 60px;
    font-size: 12px;
    color: #808080;
}

.cmp-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #303133;
    width: 20px;
}

.cmp-ops {
    text-align: right;
    padding-left: 4px;
    display: none;
}

.cmp-ops > svg:hover {
    color: #7693F5;
}

.cmp-ops > svg:active {
    color: #4f77ff;
}

.tiny-tree-node > .tiny-tree-node__content:hover > .tiny-tree-node__content-right > .cmp-ops {
    display: unset;
}

.tiny-tree-node.is-current > .tiny-tree-node__content > .tiny-tree-node__content-right > .cmp-ops {
    display: unset;
}
</style>
