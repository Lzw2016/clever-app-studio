<script setup lang="ts">
import lodash from "lodash";
import { mergeProps, reactive, watch } from "vue";
import { Collapse, CollapseItem } from "@opentiny/vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { SetterState } from "@/draggable/models/SetterState";
import { StylePanel } from "@/draggable/types/ComponentMeta";
import ComponentStyles from "@/draggable/components/widgets/style/ComponentStyles.vue";
import LayoutStyle from "@/draggable/components/widgets/style/LayoutStyle.vue";
import SpacingStyle from "@/draggable/components/widgets/style/SpacingStyle.vue";
import SizeStyle from "@/draggable/components/widgets/style/SizeStyle.vue";
import PositionStyle from "@/draggable/components/widgets/style/PositionStyle.vue";
import FontStyle from "@/draggable/components/widgets/style/FontStyle.vue";
import BorderStyle from "@/draggable/components/widgets/style/BorderStyle.vue";
import EffectStyle from "@/draggable/components/widgets/style/EffectStyle.vue";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";

// 定义组件选项
defineOptions({
    name: 'SetterStylePanel',
});

// 定义 Props 类型
interface SetterStylePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设计器的组件配置面板状态 */
    setterState: SetterState;
    /** 样式设置器面板 */
    stylePanel: StylePanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterStylePanelProps>(), {});

// 定义 State 类型
interface SetterStylePanelState {
    // componentStyles: Record<string, any>;
    layoutStyle: Record<string, any>;

    sizeStyle: Record<string, any>;
}

// state 属性
const state = reactive<SetterStylePanelState>({
    // componentStyles: {},
    layoutStyle: {},
    sizeStyle: {
        width: '99px',
    },
});
// 内部数据
// const data = {};

// nodes


const applyStyleDebounce = lodash.debounce(style => applyStyle(props.designerState.selectNodes.value, style), 300);
// watch(state.layoutStyle, style => {
//     console.log("style", style);
// });
watch(state.layoutStyle, applyStyleDebounce);
watch(state.sizeStyle, applyStyleDebounce);

function applyStyle(nodes: Array<RuntimeNode>, newStyle: object) {
    const designerState = props.designerState;
    const blockInstance = props.designerState.blockInstance;
    let res = false;
    if (!nodes || !designerState || !blockInstance) return res;
    for (let node of nodes) {
        if (!node.__raw_props_style) node.__raw_props_style = node.props.style ?? {};
        node.props.style = mergeProps({ style: node.__raw_props_style }, { style: newStyle }).style;
        res = true;
    }
    if (res) {
        blockInstance.$forceUpdate();
        blockInstance.$nextTick(() => {
            for (let selection of designerState.selections) {
                selection.recalcAuxToolPosition();
            }
        }).finally();
    }
}
</script>

<template>
    <div class="settings-groups flex-column-container">
        <Collapse class="flex-item-fill settings-content" v-model="props.setterState.expandGroups['style']">
            <CollapseItem class="settings-items" name="渲染节点" title="渲染节点">
                <ComponentStyles :component-styles="props.stylePanel.componentStyles"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableLayout!==true" class="settings-items" name="布局" title="布局">
                <LayoutStyle v-model="state.layoutStyle"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSpacing!==true" class="settings-items" name="间距" title="间距">
                <SpacingStyle/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSize!==true" class="settings-items" name="尺寸" title="尺寸">
                <SizeStyle v-model="state.sizeStyle"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disablePosition!==true" class="settings-items" name="定位" title="定位">
                <PositionStyle/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableFont!==true" class="settings-items" name="文本" title="文本">
                <FontStyle/>
            </CollapseItem>
            <!-- <CollapseItem class="settings-items" name="背景" title="背景"> -->
            <!-- </CollapseItem> -->
            <CollapseItem v-if="props.stylePanel.disableBorder!==true" class="settings-items" name="边框" title="边框">
                <BorderStyle/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableEffect!==true" class="settings-items" name="效果" title="效果">
                <EffectStyle/>
            </CollapseItem>
        </Collapse>
    </div>
</template>

<style scoped>
.settings-groups {
    height: 100%;
    overflow: hidden;
}

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.settings-content {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
    min-height: 80px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-content :deep(.tiny-collapse-item) {
    margin-top: 0;
    border: none;
}

.settings-items :deep(.tiny-collapse-item__header) {
    background-color: #efefef;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.settings-items :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    padding: 8px 4px 8px 12px;
}

.settings-items:last-child :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    border-bottom: none;
}

.settings-items :deep(.tiny-form-item) {
    margin-bottom: 12px;
}

.settings-items :deep(.tiny-form-item:last-child) {
    margin-bottom: 0;
}

.settings-items :deep(.tiny-form-item .tiny-form-item__label) {
    font-size: 12px;
}
</style>
