<script setup lang="ts">
import { Fragment, reactive } from "vue";
import { componentManage } from "@/draggable/Constant";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { createBlockComponent, getAllComponentType } from "@/draggable/BlockFactory";
import BlockRenderError from "@/draggable/components/BlockRenderError.vue";
import { RenderErrType } from "@/draggable/types/RuntimeBlock";

// 定义组件选项
defineOptions({
    name: 'RuntimeBlock',
});

// 定义 Props 类型
interface RuntimeBlockProps {
    /** block配置 */
    block?: DesignBlock;
    /** 是否自动加载依赖的组件 */
    autoLoadComponent?: boolean;
    /** 是否是设计时 */
    isDesigning?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<RuntimeBlockProps>(), {
    autoLoadComponent: true,
    isDesigning: false,
});

// 定义 State 类型
interface RuntimeBlockState {
    /** 加载资源中 */
    loading: boolean;
    /** Block 组件创建完成 */
    blockCreated: boolean;
    /** 加载错误对象 */
    loadErr?: Error;
}

// state 属性
const state = reactive<RuntimeBlockState>({
    loading: false,
    blockCreated: false,
    loadErr: undefined,
});

// 定义 Data 类型
interface RuntimeBlockData {
    /** Block 组件 */
    component: any;
}

// 内部数据
const data: RuntimeBlockData = {
    component: Fragment,
};
createComponent();

// 基于 Block 创建 vue 组件
function createComponent() {
    if (!props.block) return;
    if (props.autoLoadComponent) {
        const types = getAllComponentType(props.block);
        state.loading = true;
        componentManage.loadAsyncComponent(types).then(result => {
            data.component = createBlockComponent(props.block!);
            state.blockCreated = true;
        }).catch(reason => {
            state.loadErr = reason;
        }).finally(() => state.loading = false);
    } else {
        data.component = createBlockComponent(props.block);
        state.blockCreated = true;
    }
}

// TODO 加载组件，提供加载中状态显示
// TODO 提供 block 操作api
</script>

<template>
    <template v-if="state.loadErr">
        <BlockRenderError
            msg="DesignBlock 模块渲染失败"
            :err-type="RenderErrType.createBlockComponent"
            :errConfig="props.block"
            :node="props.block!"
            :error="state.loadErr"
        />
    </template>
    <component v-else-if="state.blockCreated" :is="data.component"/>
    <div v-else-if="state.loading">加载中...</div>
</template>

<style scoped>

</style>
