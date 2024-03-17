<script setup lang="ts">
import { computed, CSSProperties, reactive, ref, Teleport } from "vue"
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
const state = reactive({});
// 内部数据
const data = {};
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
        transform: `perspective(1px) translate3d(${position.topClientX - 18}px,${position.topClientY - 12}px, 0) scale(0.8)`,
    });
});
// 设计器引擎光标信息
const cursor = props.designerEngine.cursor;
</script>

<template>
    <Teleport to="body">
        <div
            ref="ghost"
            v-if="cursor.status===CursorStatus.Dragging"
            class="ghost"
            :style="ghostStyle"
            style="width: 60px;"
        >
            <span style="white-space: nowrap;">
                组件名称
            </span>
        </div>
    </Teleport>
</template>

<style scoped>
.ghost {

}
</style>
