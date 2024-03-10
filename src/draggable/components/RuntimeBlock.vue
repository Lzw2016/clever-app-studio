<script setup lang="ts">
import { Fragment, ref } from "vue";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { componentManage, createBlockComponent, getAllComponentType } from "@/draggable/BlockFactory";

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
}

// 读取组件 props 属性
const props = withDefaults(defineProps<RuntimeBlockProps>(), {
    autoLoadComponent: true,
});
// 加载中
const loading = ref(false);
// Block 组件
let BlockComponent: any = Fragment;
// Block 组件创建完成
const blockCreated = ref(false);
if (props.block) {
    if (props.autoLoadComponent) {
        const types = getAllComponentType(props.block);
        loading.value = true;
        componentManage.loadAsyncComponent(types).then(result => {
            BlockComponent = createBlockComponent(props.block!);
            blockCreated.value = true;
        }).catch(reason => {
            // TODO 异常处理
            console.log("渲染Block失败", reason);
        }).finally(() => loading.value = false);
    } else {
        BlockComponent = createBlockComponent(props.block);
        blockCreated.value = true;
    }
}

// TODO 加载组件，提供加载中状态显示
// TODO 提供 block 操作api
</script>

<template>
    <component :is="BlockComponent" v-if="blockCreated"/>
    <div v-else>加载中...</div>
</template>

<style scoped>

</style>
