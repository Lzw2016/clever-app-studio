<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref } from "vue";
import { Collapse, CollapseItem } from "@opentiny/vue";
import { batchApplyStyle } from "@/draggable/utils/StyleUtils";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { SetterState } from "@/draggable/models/SetterState";
import { StylePanel, StyleSetterProps } from "@/draggable/types/ComponentMeta";
import ComponentStyles from "@/draggable/components/widgets/style/ComponentStyles.vue";
import LayoutStyle from "@/draggable/components/widgets/style/LayoutStyle.vue";
import FlexStyle from "@/draggable/components/widgets/style/FlexStyle.vue";
import GridStyle from "@/draggable/components/widgets/style/GridStyle.vue";
import SpacingStyle from "@/draggable/components/widgets/style/SpacingStyle.vue";
import SizeStyle from "@/draggable/components/widgets/style/SizeStyle.vue";
import PositionStyle from "@/draggable/components/widgets/style/PositionStyle.vue";
import FontStyle from "@/draggable/components/widgets/style/FontStyle.vue";
import BorderStyle from "@/draggable/components/widgets/style/BorderStyle.vue";
import EffectStyle from "@/draggable/components/widgets/style/EffectStyle.vue";

// 定义组件选项
defineOptions({
    name: 'SetterStylePanel',
});

// 当前组件对象
const instance = getCurrentInstance();

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
    class?: string;
    readonly style: Record<string, any>;
    forceUpdateVar: number,
}

// state 属性
const state = reactive<SetterStylePanelState>({
    class: undefined,
    style: {},
    forceUpdateVar: 0,
});
// 内部数据
const data = {
    // 选中节点发生变化导致的 style 变化
    nodeStyleChange: false,
    // 选中节点发生变化导致的 class 变化
    nodeClassChange: false,
};

const styleSetterProps = computed<StyleSetterProps>(() => {
    const { designerState } = props;
    return {
        designerState: designerState,
        blockInstance: designerState.blockInstance!,
        nodes: designerState.selectNodes,
    }
});

const componentStylesRef = ref<InstanceType<typeof ComponentStyles> | undefined>();
const layoutStyleRef = ref<InstanceType<typeof LayoutStyle> | undefined>();
const flexStyleRef = ref<InstanceType<typeof FlexStyle> | undefined>();
const gridStyleRef = ref<InstanceType<typeof GridStyle> | undefined>();
const spacingStyleRef = ref<InstanceType<typeof SpacingStyle> | undefined>();
const sizeStyleRef = ref<InstanceType<typeof SizeStyle> | undefined>();
const positionStyleRef = ref<InstanceType<typeof PositionStyle> | undefined>();
const fontStyleRef = ref<InstanceType<typeof FontStyle> | undefined>();
const borderStyleRef = ref<InstanceType<typeof BorderStyle> | undefined>();
const effectStyleRef = ref<InstanceType<typeof EffectStyle> | undefined>();

function updateStyle(style: Record<string, any>) {
    if (!props.designerState.existsSelection) return;
    // StyleSetter 支持的样式配置
    const styleProperties = [
        ...(layoutStyleRef.value?.styleProperties ?? []),
        ...(flexStyleRef.value?.styleProperties ?? []),
        ...(gridStyleRef.value?.styleProperties ?? []),
        ...(spacingStyleRef.value?.styleProperties ?? []),
        ...(sizeStyleRef.value?.styleProperties ?? []),
        ...(positionStyleRef.value?.styleProperties ?? []),
        ...(fontStyleRef.value?.styleProperties ?? []),
        ...(borderStyleRef.value?.styleProperties ?? []),
        ...(effectStyleRef.value?.styleProperties ?? []),
    ];
    const baseStyle: Record<string, any> = {};
    for (let property of styleProperties) {
        baseStyle[property] = style[property];
    }
    // 更新渲染节点
    batchApplyStyle(styleSetterProps.value, { style: {} }, { ...baseStyle, ...style });
    // 更新 StyleSetter 状态
    layoutStyleRef.value?.updateStyle(baseStyle);
    flexStyleRef.value?.updateStyle(baseStyle);
    gridStyleRef.value?.updateStyle(baseStyle);
    spacingStyleRef.value?.updateStyle(baseStyle);
    sizeStyleRef.value?.updateStyle(baseStyle);
    positionStyleRef.value?.updateStyle(baseStyle);
    fontStyleRef.value?.updateStyle(baseStyle);
    borderStyleRef.value?.updateStyle(baseStyle);
    effectStyleRef.value?.updateStyle(baseStyle);
    layoutStyleRef.value?.initState();
    flexStyleRef.value?.initState();
    gridStyleRef.value?.initState();
    spacingStyleRef.value?.initState();
    sizeStyleRef.value?.initState();
    positionStyleRef.value?.initState();
    fontStyleRef.value?.initState();
    borderStyleRef.value?.initState();
    effectStyleRef.value?.initState();
}
</script>

<template>
    <div class="settings-groups flex-column-container">
        <Collapse class="flex-item-fill settings-content" v-model="props.setterState.expandGroups['style']">
            <CollapseItem v-if="props.designerState.existsSelection" class="settings-items" name="渲染节点" title="渲染节点">
                <ComponentStyles
                    ref="componentStylesRef"
                    v-bind="styleSetterProps"
                    :component-styles="props.stylePanel.componentStyles"
                    @update-style="updateStyle"
                />
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableLayout!==true" class="settings-items" name="布局(容器)" title="布局(容器)">
                <LayoutStyle ref="layoutStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableLayout!==true" class="settings-items" name="布局(元素)" title="布局(元素)">
                <FlexStyle ref="flexStyleRef" v-bind="styleSetterProps"/>
                <div style="height: 12px;"/>
                <GridStyle ref="gridStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSpacing!==true" class="settings-items" name="间距" title="间距">
                <SpacingStyle ref="spacingStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSize!==true" class="settings-items" name="尺寸" title="尺寸">
                <SizeStyle ref="sizeStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disablePosition!==true" class="settings-items" name="定位" title="定位">
                <PositionStyle ref="positionStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableFont!==true" class="settings-items" name="文本" title="文本">
                <FontStyle ref="fontStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <!-- <CollapseItem class="settings-items" name="背景" title="背景"> -->
            <!-- </CollapseItem> -->
            <CollapseItem v-if="props.stylePanel.disableBorder!==true" class="settings-items" name="边框" title="边框">
                <BorderStyle ref="borderStyleRef" v-bind="styleSetterProps"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableEffect!==true" class="settings-items" name="效果" title="效果">
                <EffectStyle ref="effectStyleRef" v-bind="styleSetterProps"/>
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
