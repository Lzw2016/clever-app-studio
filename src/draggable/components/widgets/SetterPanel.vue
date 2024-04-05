<script setup lang="ts">
import { markRaw, reactive } from "vue";
import { Form, FormItem, Loading } from "@opentiny/vue";
import { isStr } from "@/utils/Typeof";
import { toAny } from "@/utils/UseType";
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

function getFormItemProps(setter: Setter) {
    const obj: any = {
        ...props.setterGroup?.formItemProps,
    };
    if (setter.label) obj.label = setter.label;
    return obj;
}

function getSetterProps(setter: Setter) {
    const { designerState } = props;
    const obj: any = {
        blockInstance: designerState.blockInstance,
        nodes: [],
        ...setter.cmpProps,
    };
    if (designerState.blockInstance) {
        for (let selection of designerState.selections) {
            const node = designerState.blockInstance.globalContext.allNode[selection.nodeId];
            obj.nodes.push(markRaw(node));
        }
    }
    if (setter.propsName) obj.propsName = setter.propsName;
    if (setter.getPropsValue) obj.getPropsValue = setter.getPropsValue;
    if (setter.applyPropsValue) obj.applyPropsValue = setter.applyPropsValue;
    // if (setter.watchProps) obj.watchProps = setter.watchProps;
    // if (setter.listeners) obj.listeners = setter.listeners;
    return obj;
}

loadSetterComponent().finally();
</script>

<template>
    <div v-if="state.loadErr">

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
        v-bind="toAny(props.setterGroup?.formProps)"
    >
        <template v-for="item in props.setterGroup.items">
            <FormItem
                v-if="item.label"
                v-bind="getFormItemProps(item)"
            >
                <component :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
            </FormItem>
            <component v-else :is="getComponent(item.cmp)" v-bind="getSetterProps(item)"/>
        </template>
    </Form>
</template>

<style scoped>
.setter-panel {

}

.setter-panel-loading {
    min-height: 80px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

</style>
