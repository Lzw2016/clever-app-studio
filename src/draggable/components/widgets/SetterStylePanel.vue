<script setup lang="ts">
import { reactive } from "vue";
import { Button, Collapse, CollapseItem } from "@opentiny/vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { SetterState } from "@/draggable/models/SetterState";
import { StylePanel } from "@/draggable/types/ComponentMeta";
import LayoutStyle from "@/draggable/components/widgets/style/LayoutStyle.vue";
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

}

// state 属性
const state = reactive<SetterStylePanelState>({});
// 内部数据
// const data = {};

// nodes


</script>

<template>
    <div class="settings-groups flex-column-container">
        <div class="flex-item-fixed flex-row-container flex-center settings-top-buttons">
            <Button :round="true" size="mini">编辑页面样式</Button>
            <Button :round="true" size="mini">编辑内联样式</Button>
        </div>
        <Collapse class="flex-item-fill settings-content" v-model="props.setterState.expandGroups['style']">
            <CollapseItem class="settings-items" name="布局" title="布局">
                <LayoutStyle/>
            </CollapseItem>
            <CollapseItem class="settings-items" name="间距" title="间距">
                <SpacingStyle/>
            </CollapseItem>
            <CollapseItem class="settings-items" name="尺寸" title="尺寸">
                <SizeStyle/>
            </CollapseItem>
            <CollapseItem class="settings-items" name="定位" title="定位">
                <PositionStyle/>
            </CollapseItem>
            <CollapseItem class="settings-items" name="文本" title="文本">
                <FontStyle/>
            </CollapseItem>
            <!-- <CollapseItem class="settings-items" name="背景" title="背景"> -->
            <!-- </CollapseItem> -->
            <CollapseItem class="settings-items" name="边框" title="边框">
                <BorderStyle/>
            </CollapseItem>
            <CollapseItem class="settings-items" name="效果" title="效果">
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

.flex-row-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
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

.flex-item-fixed {
    flex-shrink: 0;
}

.flex-center {
    align-items: center;
    justify-content: center;
}

.settings-content {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
    min-height: 80px;
}

.settings-top-buttons {
    padding: 12px 4px 10px 4px;
    border-bottom: 1px solid #d9d9d9;
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
