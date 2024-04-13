<script setup lang="ts">
import { getCurrentInstance, markRaw, reactive } from "vue";
import { IconBraces } from "@tabler/icons-vue";
import { Form, FormItem, Loading, Tooltip } from "@opentiny/vue";
import { isStr } from "@/utils/Typeof";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { Setter, SetterGroup, SetterPanel } from "@/draggable/types/ComponentMeta";
import { DesignerState } from "@/draggable/models/DesignerState";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'SetterPanel',
});

// 定义 Props 类型
interface SetterPanelProps {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设置器分组 */
    setterGroup: SetterGroup;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterPanelProps>(), {});

// 定义 State 类型
interface SetterPanelState {
    /** 加载资源中 */
    loading: boolean;
    /** 加载错误对象 */
    loadErr?: Error;
}

// state 属性
const state = reactive<SetterPanelState>({
    loading: true,
    loadErr: undefined,
});
// 内部数据
// const data = {};

// const formProps = computed(()=> {
//     const obj: any = {
//         ...props.setterGroup?.formProps,
//     };
//     return obj;
// });

async function loadSetterComponent() {
    const { setterGroup } = props;
    const types: Array<string> = [];
    for (let item of setterGroup.items) {
        if (isStr(item.cmp) && !isHtmlTag(item.cmp)) {
            types.push(item.cmp);
        }
    }
    // 加载组件
    try {
        if (types.length > 0) {
            await props.componentManage.loadAsyncComponent(types);
        }
    } catch (err: any) {
        state.loadErr = err;
        console.warn("加载组件失败", err);
    } finally {
        state.loading = false;
    }
}

function getComponent(cmp: any): any {
    if (isStr(cmp) && !isHtmlTag(cmp)) return props.componentManage.getComponent(cmp);
    return cmp;
}

function formProps() {
    const obj: any = {
        labelPosition: "left",
        labelWidth: "65px",
        ...props.setterGroup?.formProps,
    };
    return obj;
}

function getFormItemProps(setter: Setter) {
    const obj: any = {
        ...props.setterGroup?.formItemProps,
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
    // TODO ref、enableBind, watchProps, listeners
    return obj;
}

loadSetterComponent().finally();

// TODO 测试
window['a'] = getCurrentInstance();
</script>

<template>
    <div v-if="state.loadErr">
        加载错误
    </div>
    <Form
        v-else
        v-loading="state.loading"
        tiny-loading__text="加载中..."
        tiny-loading__background="rgba(0, 0, 0, 0.25)"
        class="setter-panel"
        v-bind="formProps()"
    >
        <template v-for="item in props.setterGroup.items">
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
                    <span
                        class="flex-item-fixed flex-row-container flex-center"
                        :class="{
                            'setter-button': item.enableBind !== false,
                            'setter-button-placeholder': item.enableBind === false,
                        }"
                        title="使用数据绑定"
                    >
                        <IconBraces v-if="item.enableBind !== false" :size="16" stroke-width="2"/>
                    </span>
                </div>
            </FormItem>
            <component v-else-if="!state.loading" :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
        </template>
    </Form>
</template>

<style scoped>
.setter-panel {
    min-height: 80px;
    padding: 8px 4px 8px 12px;
    font-size: 12px;
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

.setter-panel :deep(.tiny-form-item) {
    margin-bottom: 16px;
}

.setter-panel :deep(.tiny-form-item:last-child) {
    margin-bottom: 0;
}

.setter-panel :deep(.tiny-form-item .tiny-form-item__label) {
    font-size: 13px;
}
</style>
