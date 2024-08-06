<script setup lang="ts">
import lodash from "lodash";
import { reactive, ref } from "vue";
import { Input, Modal, Tree } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toStr, watchNodes } from "@/draggable/utils/SetterUtils";
import { BindTreeNode, getBindTreeNode } from "@/draggable/utils/DesignerUtils";

// 定义组件选项
defineOptions({
    name: 'VModelSetter',
});

// 定义 Props 类型
interface VModelSetterProps extends SetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<VModelSetterProps>(), {
    getPropsValue: (_, node) => node.directives.model,
    applyPropsValue: (_, value, node) => {
        value = lodash.trim(value);
        if (value.length > 0) {
            node.directives.model = value;
        } else {
            delete node.directives.model;
        }
    },
});

// 定义 State 类型
interface VModelSetterState extends SetterState<string> {
    /** 显示选择bind属性值对话框 */
    showModal: boolean;
    /** props 绑定表达式的数据树 */
    bindTree: Array<BindTreeNode>;
}

// state 属性
const state = reactive<VModelSetterState>({
    ...getDefState(),
    showModal: false,
    bindTree: [],
});
state.value = getValue<string>(props, state, toStr);
// 内部数据
// const data = {};
// 设置器内部组件引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toStr);

function showModal() {
    const globalContext = props.designerState.blockInstance?.globalContext;
    const node = props.designerState.selectNode;
    if (!globalContext || !node) {
        return;
    }
    const blockRef = globalContext.nodeRefVueRef[node.ref];
    const block = globalContext.allBlock[blockRef];
    // TODO 只需要data
    state.bindTree = getBindTreeNode(block?.globalContext.runtimeBlock);
    state.showModal = true;
}

function selectBindNode(data: BindTreeNode) {
    if (!data.bindExpContent) {
        return;
    }
    state.showModal = false;
    state.value = data.bindExpContent;
    applyValue(props, state, setter, state.value);
}

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, setter.value, toStr),
});
</script>

<template>
    <Input
        class="bind-input"
        :clearable="false"
        v-bind="inputProps"
        placeholder="绑定数据"
        ref="setter"
        v-model="state.value"
        @change="value => applyValue(props, state, setter, value)"
    >
        <template #suffix>
            <FontAwesomeIcon class="icons-button" :icon="faMagnifyingGlass" @click="showModal"/>
        </template>
    </Input>
    <Modal
        v-if="state.showModal"
        class="bind-modal"
        v-model="state.showModal"
        width="500px"
        :esc-closable="true"
        :resize="false"
        title="选择绑定数据"
    >
        <div class="bind-tree-container">
            <Tree
                node-key="id"
                :data="state.bindTree "
                :show-line="false"
                :default-expand-all="true"
                :highlight-current="true"
                :expand-on-click-node="false"
                size="small"
                @current-change="selectBindNode"
            />
        </div>
    </Modal>
</template>

<style scoped>
.icons-button:hover {
    color: #666;
}

.icons-button:active {
    color: #2e3243;
}

.bind-tree-container {
    min-height: 300px;
    max-height: 800px;
    overflow: auto;
    margin: 8px 6px 16px 0;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.bind-modal.tiny-modal.tiny-modal__wrapper.is__visible :deep(.tiny-modal__box) {
    top: 8vh;
}
</style>
