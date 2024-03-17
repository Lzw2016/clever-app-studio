<script setup lang="ts">
import { computed, CSSProperties, ref, Teleport } from "vue"
import { isNum } from "@/utils/Typeof";
import { style } from "@/utils/UseType";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { CursorStatus } from "@/draggable/types/Designer";

// 定义组件选项
defineOptions({
    name: 'DragGhost',
});

// 定义 Props 类型
interface DragGhostProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<DragGhostProps>(), {});
// state 属性
// const state = reactive({});
// 内部数据
// const data = {};
// ghost div实例
const ghost = ref<HTMLDivElement | undefined>();
// ghost样式
const ghostStyle = computed<CSSProperties>(() => {
    if (!ghost.value) return {};
    const position = cursor.position;
    if (!isNum(position.topClientX) || !isNum(position.topClientY)) {
        return {};
    }
    return style({
        transform: `perspective(1px) translate3d(${position.topClientX - 8}px, ${position.topClientY - 20}px, 0) scale(0.8)`,
    });
});
// 设计器引擎光标信息
const cursor = props.designerEngine.cursor;
const draggingCmpMetas = props.designerEngine.draggingCmpMetas;
</script>

<template>
    <Teleport to="body">
        <div
            v-if="cursor.status===CursorStatus.Dragging && draggingCmpMetas.existsCmpMeta"
            ref="ghost"
            class="ghost"
            :style="ghostStyle"
        >
            <span class="ghost-material-name">
                {{ draggingCmpMetas.cmpMetas.map(meta => meta.name).join(',') }}
            </span>
        </div>
    </Teleport>
</template>

<style scoped>
.ghost {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background-color: #1890ff;
    height: 40px;
    min-width: 60px;
    max-width: 150px;
    padding: 4px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    opacity: 0.6;
}

.ghost-material-name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
