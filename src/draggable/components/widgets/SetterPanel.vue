<script setup lang="ts">
import { getCurrentInstance, markRaw, reactive } from "vue";
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
        state.loading = false
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
    const { label, labelTips, enableBind, watchProps, listeners, cmpProps, ...otherCmpProps } = setter;
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
    <div
        v-else-if="state.loading"
        v-loading="state.loading"
        tiny-loading__text="加载中..."
        tiny-loading__background="rgba(0, 0, 0, 0.25)"
        class="setter-panel-loading"
    >
    </div>
    <Form
        v-else
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
                <component :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
            </FormItem>
            <component v-else :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
        </template>
    </Form>
</template>

<style scoped>
.setter-panel {
    padding: 8px 12px;
    font-size: 12px;
}

.setter-panel-loading {
    min-height: 80px;
}

.setter-label-tips {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dashed;
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
