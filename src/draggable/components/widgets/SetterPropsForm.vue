<script setup lang="ts">
import { computed, getCurrentInstance, markRaw, onBeforeMount, reactive, watch } from "vue";
import { Collapse, CollapseItem, Form, FormItem, Loading, Tooltip } from "@opentiny/vue";
import { isStr } from "@/utils/Typeof";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { Setter, SetterPanel } from "@/draggable/types/ComponentMeta";
import { DesignerState } from "@/draggable/models/DesignerState";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { IconBraces } from "@tabler/icons-vue";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'SetterPropsForm',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface SetterPropsFormProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设置器面板 */
    setterPanel: SetterPanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterPropsFormProps>(), {});

// 定义 State 类型
interface SetterPropsFormState {
    /** 加载资源中 */
    loading: boolean;
    /** 加载错误对象 */
    loadErr?: Error;
}

// state 属性
const state = reactive<SetterPropsFormState>({
    loading: true,
    loadErr: undefined,
});
// 内部数据
// const data = {};
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterState);

// 初始化设计器表单组件
onBeforeMount(() => loadSetterComponent().finally());
// 动态加载设计器表单组件
watch(() => props.setterPanel, () => loadSetterComponent().finally());

async function loadSetterComponent() {
    // 获取所有需要加载的组件类型
    const types = new Set<string>();
    for (let setterGroup of props.setterPanel.groups) {
        for (let item of setterGroup.items) {
            if (isStr(item.cmp) && !isHtmlTag(item.cmp)) types.add(item.cmp);
        }
    }
    // 加载组件
    try {
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
        ...props.setterPanel.formProps,
    };
    return obj;
}

function getFormItemProps(setter: Setter) {
    const obj: any = {
        ...props.setterPanel.formItemProps,
    };
    if (setter.label) obj.label = setter.label;
    return obj;
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
        nodes: [],
        ...cmpProps,
        ...otherCmpProps,
    };
    if (designerState.blockInstance) {
        for (let selection of designerState.selections) {
            if (!selection.nodeId) continue;
            const node = designerState.blockInstance.globalContext.allNode[selection.nodeId];
            obj.nodes.push(markRaw(node));
        }
    }
    // if (setter.watchProps) obj.watchProps = setter.watchProps;
    // if (setter.listeners) obj.listeners = setter.listeners;
    // TODO enableBind, watchProps, listeners
    return obj;
}
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
            <CollapseItem
                class="settings-items"
                v-for="group in props.setterPanel.groups"
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
                                <component v-if="!state.loading" :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
                            </div>
                            <span v-if="item.enableBind !== false" class="flex-item-fixed flex-row-container flex-center setter-button" title="使用数据绑定">
                                <IconBraces :size="16" stroke-width="2"/>
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
    width: 24px;
    height: 24px;
    padding: 0 4px;
    cursor: pointer;
}

.setter-button:hover {
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
