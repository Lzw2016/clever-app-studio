<script setup lang="ts">
import { Fragment, reactive, ref } from "vue";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";
import { getAllTypes } from "@/draggable/utils/DesignerUtils";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { BlockInstance, CreateConfig, RenderErrType } from "@/draggable/types/RuntimeBlock";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { createBlockComponent } from "@/draggable/BlockFactory";
import BlockRenderError from "@/draggable/components/BlockRenderError.vue";

// 定义组件选项
defineOptions({
    name: 'RuntimeBlock',
});

// 自定义事件类型
const emit = defineEmits<{
    /** block组件创建成功 */
    blockCreated: [component: any];
}>();

// 定义 Props 类型
interface RuntimeBlockProps {
    /** 组件管理器实例 */
    componentManage: ComponentManage;
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
// DesignBlock 的 vue 组件实例
const blockInstance = ref<BlockInstance | undefined>();

// 定义组件公开内容
defineExpose({
    /** block实例对象 */
    blockInstance: blockInstance,
});

// TODO 加载组件，提供加载中状态显示
// TODO 提供 block 操作api

// 基于 Block 创建 vue 组件
async function createComponent() {
    const config: CreateConfig = {
        componentManage: props.componentManage,
        isDesigning: props.isDesigning,
    };
    if (!props.block) return;
    if (props.autoLoadComponent) {
        const types = getAllTypes(props.block);
        state.loading = true;
        try {
            try {
                // 加载组件元数据
                if (config.isDesigning) await props.componentManage.loadAsyncComponentMeta(types);
            } catch (err) {
                console.warn("加载组件元数据失败", err);
            }
            // 加载组件
            await props.componentManage.loadAsyncComponent(types.filter(type => !isHtmlTag(type)));
            // 动态创建 block 组件
            data.component = createBlockComponent(props.block, config);
            state.blockCreated = true;
            emit("blockCreated", data.component);
        } catch (reason: any) {
            state.loadErr = reason;
        } finally {
            state.loading = false
        }
    } else {
        data.component = createBlockComponent(props.block, config);
        state.blockCreated = true;
        emit("blockCreated", data.component);
    }
}

createComponent().finally();
</script>

<template>
    <template v-if="state.loadErr">
        <BlockRenderError
            msg="DesignBlock 模块渲染失败"
            :err-type="RenderErrType.createBlockComponent"
            :errConfig="props.block"
            :node="blockInstance?.globalContext?.runtimeBlock ?? props.block!"
            :error="state.loadErr"
        />
    </template>
    <component v-else-if="state.blockCreated" ref="blockInstance" :is="data.component"/>
    <div v-else-if="state.loading">加载中...</div>
</template>

<style scoped>

</style>
