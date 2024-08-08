<script setup lang="ts">
import lodash from "lodash";
import { computed, getCurrentInstance, onBeforeMount, reactive, ref, watch } from "vue";
import { Collapse, CollapseItem, Form, FormItem, Input, Loading, Tooltip } from "@opentiny/vue";
import { layer } from "@layui/layer-vue";
import { hasValue, isStr, noValue } from "@/utils/Typeof";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { applyDirectivesValue, forceUpdateBlock } from "@/draggable/utils/SetterUtils";
import { PropsPanel, Setter } from "@/draggable/types/ComponentMeta";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerState } from "@/draggable/models/DesignerState";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import BindSetter from "@/draggable/components/setter/BindSetter.vue";
import Braces from "@/assets/images/braces.svg?component";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'SetterPropsPanel',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface SetterPropsPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设置器面板 */
    propsPanel: PropsPanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterPropsPanelProps>(), {});

// 定义 State 类型
interface SetterPropsPanelState {
    /** 加载资源中 */
    loading: boolean;
    /** 加载错误对象 */
    loadErr?: Error;
    /** 选中节点的ref值 */
    nodeRef?: string,
}

// state 属性
const state = reactive<SetterPropsPanelState>({
    loading: false,
    loadErr: undefined,
    nodeRef: undefined,
});
// 内部数据
// const data = {};
const refInputRef = ref<any>();
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterShareState);
const selectNode = computed(() => {
    const selectNodes = props.designerState.selectNodes;
    if (selectNodes.length === 1) {
        return selectNodes[0];
    }
    return;
});

// 初始化设计器表单组件
onBeforeMount(() => loadSetterComponent(props.propsPanel).finally());
// 动态加载设计器表单组件
watch(() => props.propsPanel, setterPanel => loadSetterComponent(setterPanel).finally());
// 选中节点的ref值
watch(() => selectNode.value, node => resetNodeRef(node), { immediate: true });

async function loadSetterComponent(setterPanel: PropsPanel) {
    // 获取所有需要加载的组件类型
    const types = new Set<string>();
    for (let setterGroup of setterPanel.groups) {
        for (let item of setterGroup.items) {
            if (isStr(item.cmp) && !isHtmlTag(item.cmp)) types.add(item.cmp);
        }
    }
    // 加载组件
    try {
        state.loading = true;
        if (types.size > 0) await props.designerEngine.componentManage.loadAsyncComponent(Array.from(types));
    } catch (err: any) {
        state.loadErr = err;
        console.warn("加载组件失败", err);
    } finally {
        state.loading = false;
    }
}

function getComponent(cmp: any): any {
    if (isStr(cmp) && !isHtmlTag(cmp)) return props.designerEngine.componentManage.getComponent(cmp);
    return cmp;
}

function formProps() {
    const obj: any = {
        size: "mini",
        labelPosition: "left",
        labelWidth: "65px",
        ...props.propsPanel.formProps,
    };
    return obj;
}

function getFormItemProps(setter: Setter) {
    const obj: any = {
        ...props.propsPanel.formItemProps,
    };
    if (setter.label) obj.label = setter.label;
    return obj;
}

function resetNodeRef(node?: RuntimeNode) {
    if (node) {
        state.nodeRef = node.ref;
    } else {
        state.nodeRef = undefined;
    }
}

function getSetterProps(setter: Setter) {
    const { designerState } = props;
    const {
        cmp,
        cmpProps,
        label,
        labelTips,
        enableBind,
        watchProps,
        listeners,
        ...otherCmpProps
    } = setter;
    const obj: any = {
        designerState: designerState,
        blockInstance: designerState.blockInstance,
        nodes: designerState.selectNodes,
        ...cmpProps,
        ...otherCmpProps,
    };
    // if (setter.watchProps) obj.watchProps = setter.watchProps;
    // if (setter.listeners) obj.listeners = setter.listeners;
    // TODO watchProps, listeners
    return obj;
}

function updateNodeRef(oldRef: string, newRef: string) {
    if (!newRef || lodash.trim(newRef).length <= 0) return;
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) {
        return;
    }
    if (!blockInstance.ops.updateNodeRef(oldRef, newRef)) {
        layer.msg("ref值更新失败，ref值必须唯一", { time: 1500 });
    }
}

function isBound(setter: Setter): boolean {
    const { propsName, enableBind } = setter;
    if (enableBind === false || noValue(propsName)) return false;
    const nodes = props.designerState.selectNodes;
    const values = new Set<any>();
    for (let node of nodes) {
        values.add(node.props[propsName]);
    }
    if (values.size !== 1) return false;
    const propsValue = values.values().next().value;
    if (!isStr(propsValue)) return false;
    const bindStr = lodash.trim(propsValue);
    return bindStr.startsWith("{{") && bindStr.endsWith("}}");
}

/**
 * @param setter    Setter值
 * @param isBound   当前节点是否是bind状态
 */
function toggleBind(setter: Setter, isBound: boolean) {
    const { propsName } = setter;
    if (noValue(propsName)) return;
    const nodes = props.designerState.selectNodes;
    for (let node of nodes) {
        if (!node.__tmp_bind_props) node.__tmp_bind_props = {};
        if (!node.__tmp_unbind_props) node.__tmp_unbind_props = {};
        if (isBound) {
            // 当前是bind，切换成unbind
            const propsValue = node.props[propsName];
            if (isStr(propsValue)) {
                const bindStr = lodash.trim(propsValue);
                if (bindStr.startsWith("{{") && bindStr.endsWith("}}")) {
                    node.__tmp_bind_props[propsName] = bindStr;
                }
            }
            node.props[propsName] = node.__tmp_unbind_props[propsName];
        } else {
            // 当前是unbind，切换成bind
            node.__tmp_unbind_props[propsName] = node.props[propsName];
            node.props[propsName] = node.__tmp_bind_props[propsName] ?? "{{  }}";
        }
    }
    instance?.proxy?.$forceUpdate();
    const blockInstance = props.designerState.blockInstance;
    if (!blockInstance) return;
    forceUpdateBlock(props.designerState, blockInstance, nodes, false, true);
}

// function
</script>

<template>
    <Form
        v-loading="state.loading"
        tiny-loading__text="加载中..."
        tiny-loading__background="rgba(0, 0, 0, 0.25)"
        class="props-form"
        v-bind="formProps()"
    >
        <div v-if="state.loadErr">
            加载设计器表单失败
        </div>
        <Collapse
            v-else-if="!state.loading && setterState"
            class="settings-groups"
            v-model="setterState.expandGroups['props']"
        >
            <CollapseItem v-if="selectNode" class="settings-items" name="内置属性" title="内置属性">
                <FormItem size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="设置当前选中节点的引用ref">
                            <span class="setter-label-tips">节点ref</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <Input
                                ref="refInputRef"
                                size="mini"
                                :clearable="true"
                                placeholder="ref必须唯一"
                                v-model="state.nodeRef"
                                @change="(newRef) => selectNode && updateNodeRef(selectNode.ref, newRef)"
                                @blur="resetNodeRef(selectNode)"
                                @clear="() => refInputRef && refInputRef.focus()"
                            />
                        </div>
                        <span class="setter-button-placeholder"/>
                    </div>
                </FormItem>
                <FormItem v-if="props.propsPanel.enableVModel && hasValue(props.designerState.blockInstance)" size="mini" labelPosition="left">
                    <template #label>
                        <Tooltip effect="dark" placement="left" content="数据双向绑定v-model">
                            <span class="setter-label-tips">数据绑定</span>
                        </Tooltip>
                    </template>
                    <div class="flex-row-container" style="align-items: center;">
                        <div class="flex-item-fill flex-row-container" style="align-items: center;">
                            <BindSetter
                                :designer-state="props.designerState"
                                :block-instance="props.designerState.blockInstance"
                                :nodes="props.designerState.selectNodes"
                                placeholder="输入绑定变量"
                                :contain-braces="false"
                                :only-bind-data="true"
                                :get-props-value="(_, node) => node.directives.model"
                                :apply-props-value="(_, value, node) => applyDirectivesValue('model', value, node)"
                            />
                        </div>
                        <span class="setter-button-placeholder"/>
                    </div>
                </FormItem>
            </CollapseItem>
            <CollapseItem
                class="settings-items"
                v-for="group in props.propsPanel.groups"
                :name="group.title"
                :title="group.title"
            >
                <template v-for="item in group.items">
                    <FormItem
                        v-if="item.label"
                        v-bind="getFormItemProps(item)"
                    >
                        <template #label v-if="item.labelTips">
                            <Tooltip effect="dark" placement="left" :content="item.labelTips">
                                <span class="setter-label-tips">{{ item.label }}</span>
                            </Tooltip>
                        </template>
                        <div class="flex-row-container" style="align-items: center;">
                            <div class="flex-item-fill flex-row-container" style="align-items: center;">
                                <template v-if="!state.loading">
                                    <BindSetter
                                        v-if="isBound(item)"
                                        v-bind="getSetterProps(item)"
                                        :designer-state="props.designerState"
                                        :block-instance="props.designerState.blockInstance"
                                        :nodes="props.designerState.selectNodes"
                                        :contain-braces="true"
                                        :only-bind-data="false"
                                    />
                                    <component v-else :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
                                </template>
                            </div>
                            <span
                                v-if="item.enableBind !== false && hasValue(item.propsName)"
                                :class="{
                                    'flex-item-fixed': true,
                                    'flex-row-container': true,
                                    'flex-center': true,
                                    'setter-button': true,
                                    'setter-button-active': isBound(item),
                                }"
                                title="使用数据绑定"
                                @click="toggleBind(item, isBound(item))"
                            >
                                <Braces stroke-width="1.8" style="width: 16px; height: 16px;"/>
                            </span>
                            <span v-else class="setter-button-placeholder"/>
                        </div>
                    </FormItem>
                    <component v-else-if="!state.loading" :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
                </template>
            </CollapseItem>
        </Collapse>
    </Form>
</template>

<style scoped>
.props-form {
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

.setter-button {
    margin-left: 4px;
    width: 16px;
    height: 24px;
    padding: 0 4px;
    cursor: pointer;
}

.setter-button:hover {
    background-color: #006cff;
    color: #fff;
}

.setter-button-active {
    background-color: #006cff;
    color: #fff;
}

.setter-button-placeholder {
    margin-left: 4px;
    width: 24px;
    height: 24px;
    padding: 0 4px;
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
