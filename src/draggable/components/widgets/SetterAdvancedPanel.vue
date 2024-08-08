<script setup lang="ts">
import lodash from "lodash";
import { computed, reactive } from "vue";
import { Collapse, CollapseItem, Form, FormItem, Input, Tooltip } from "@opentiny/vue";
import { hasValue } from "@/utils/Typeof";
import { applyDirectivesValue } from "@/draggable/utils/SetterUtils";
import { AdvancedPanel } from "@/draggable/types/ComponentMeta";
import { DesignerState } from "@/draggable/models/DesignerState";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import BindSetter from "@/draggable/components/setter/BindSetter.vue";

// 定义组件选项
defineOptions({
    name: 'SetterAdvancedPanel',
});

// 定义 Props 类型
interface SetterAdvancedPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 高级设置器面板 */
    advancedPanel: AdvancedPanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterAdvancedPanelProps>(), {});

// 定义 State 类型
interface SetterAdvancedPanelState {
    /** 强制组件更新的响应式变量 */
    forceUpdateVFor: number;
}

// state 属性
const state = reactive<SetterAdvancedPanelState>({
    forceUpdateVFor: 0,
});
// 内部数据
// const data = {};
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterShareState);
const selectNode = computed(() => {
    const selectNodes = props.designerState.selectNodes;
    if (selectNodes.length === 1) {
        return selectNodes[0];
    }
    return;
});
const enableVFor = computed(() => {
    // 读取“响应式变量”值
    state.forceUpdateVFor;
    const node = props.designerState.selectNode;
    if (!node) return false;
    return hasValue(node.directives.for?.data);
});
const vForKey = computed<string | undefined>({
    get: oldValue => {
        // 读取“响应式变量”值
        state.forceUpdateVFor;
        const node = props.designerState.selectNode;
        return node?.directives.for?.key;
    },
    set: newValue => {
        const node = props.designerState.selectNode;
        if (!node?.directives.for) return;
        if (node.directives.for.key) node.directives.for.key = newValue;
        state.forceUpdateVFor++;
    },
});
const vForIndex = computed<string | undefined>({
    get: oldValue => {
        // 读取“响应式变量”值
        state.forceUpdateVFor;
        const node = props.designerState.selectNode;
        return node?.directives.for?.index;
    },
    set: newValue => {
        const node = props.designerState.selectNode;
        if (!node?.directives.for) return;
        if (node.directives.for.index) node.directives.for.index = newValue;
        state.forceUpdateVFor++;
    },
});
const vForItem = computed<string | undefined>({
    get: oldValue => {
        // 读取“响应式变量”值
        state.forceUpdateVFor;
        const node = props.designerState.selectNode;
        return node?.directives.for?.item;
    },
    set: newValue => {
        const node = props.designerState.selectNode;
        if (!node?.directives.for) return;
        if (node.directives.for.item) node.directives.for.item = newValue;
        if (!node.directives.for.item) node.directives.for.item = '__item';
        state.forceUpdateVFor++;
    },
});

function applyForDirective(_: any, value: any, node: RuntimeNode) {
    value = lodash.trim(value);
    let expContent = value;
    if (expContent.startsWith("{{") && expContent.endsWith("}}")) {
        expContent = lodash.trim(expContent.substring(2, expContent.length - 2));
    }
    if (expContent.length > 0) {
        if (!node.directives.for) node.directives.for = { data: value, item: "__item" };
        node.directives.for.data = value;
        if (!node.directives.for.item) node.directives.for.item = '__item';
        if (!node.directives.for.index) node.directives.for.index = '__index';
        if (!node.__designDirectives) node.__designDirectives = {};
        if (!node.__designDirectives.for) node.__designDirectives.for = { data: value, item: "__item" };
        node.__designDirectives.for.data = node.directives.for.data;
        node.__designDirectives.for.item = node.directives.for.item;
        node.__designDirectives.for.index = node.directives.for.index;
    } else {
        delete node.directives.for;
        delete node.__designDirectives?.for;
    }
    state.forceUpdateVFor++;
}


</script>

<template>
    <Form
        v-if="setterState && props.designerState.blockInstance && selectNode"
        class="advanced-form"
        size="mini"
        label-position="left"
        label-width="65px"
    >
        <Collapse
            class="settings-groups"
            v-model="setterState.expandGroups['advanced']"
        >
            <CollapseItem class="settings-items" name="内置指令" title="内置指令">
                <FormItem v-if="props.advancedPanel.disableVShow !== true" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-show指令，组件的的可见性">
                            <span class="setter-label-tips">是否显示</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <BindSetter
                                :designer-state="props.designerState"
                                :block-instance="props.designerState.blockInstance"
                                :nodes="props.designerState.selectNodes"
                                placeholder="v-show表达式"
                                :contain-braces="true"
                                :only-bind-data="false"
                                :get-props-value="(_, node) => node.directives.show"
                                :apply-props-value="(_, value, node) => applyDirectivesValue('show', value, node)"
                                :recalc-aux-tool-position="true"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem v-if="props.advancedPanel.disableVIf !== true" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-if指令，条件性的渲染">
                            <span class="setter-label-tips">渲染条件</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <BindSetter
                                :designer-state="props.designerState"
                                :block-instance="props.designerState.blockInstance"
                                :nodes="props.designerState.selectNodes"
                                placeholder="v-if指令表达式"
                                :contain-braces="true"
                                :only-bind-data="false"
                                :get-props-value="(_, node) => node.directives.if"
                                :apply-props-value="(_, value, node) => applyDirectivesValue('if', value, node)"
                                :recalc-aux-tool-position="true"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-for指令，基于数据多次渲染">
                            <span class="setter-label-tips">循环渲染</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <BindSetter
                                :designer-state="props.designerState"
                                :block-instance="props.designerState.blockInstance"
                                :nodes="props.designerState.selectNodes"
                                placeholder="v-for指令表达式"
                                :contain-braces="true"
                                :only-bind-data="false"
                                :get-props-value="(_, node) => node.directives.for?.data"
                                :apply-props-value="applyForDirective"
                                :recalc-aux-tool-position="true"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem v-if="enableVFor" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-for指令，子节点的key取值表达式，一般可以不设置">
                            <span class="setter-label-tips">循环key</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <Input
                                size="mini"
                                :clearable="true"
                                placeholder="v-for指令，key取值表达式"
                                v-model="vForKey"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem v-if="enableVFor" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-for指令，index 变量名">
                            <span class="setter-label-tips">循环index</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <Input
                                size="mini"
                                :clearable="true"
                                placeholder="v-for指令，index变量名"
                                v-model="vForIndex"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem v-if="enableVFor" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="v-for指令，item 变量名">
                            <span class="setter-label-tips">循环item</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <Input
                                size="mini"
                                :clearable="false"
                                placeholder="v-for指令，item变量名"
                                v-model="vForItem"
                            />
                        </div>
                    </div>
                </FormItem>
            </CollapseItem>
        </Collapse>
    </Form>
    <div class="event-panel-none" v-else>
        已选中多个节点
    </div>
</template>

<style scoped>
.advanced-form {
    height: 100%;
}

.settings-groups {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
    min-height: 80px;
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

.flex-center {
    align-items: center;
    justify-content: center;
}

.setter-label-tips {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dashed;
}

.setter-button-placeholder {
    margin-left: 4px;
    width: 24px;
    height: 24px;
    padding: 0 4px;
}

.event-panel-none {
    width: 100%;
    height: 100%;
    margin-top: 32px;
    text-align: center;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-groups :deep(.tiny-collapse-item) {
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
