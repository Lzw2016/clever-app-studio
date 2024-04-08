<script setup lang="ts">
import type { Component } from "vue";
import { defineModel, markRaw, reactive } from "vue";
import { Loading, Modal, Notify } from "@opentiny/vue";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'SelectTablerIcon',
});

// 定义 Props 类型
interface SelectTablerIconProps {
    /** 是否默认显示 */
    defShow?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SelectTablerIconProps>(), {
    defShow: false,
});

// 定义 State 类型
interface SelectTablerIconState {
    /** 所有的图标组件 */
    icons: Map<string, Component>;
    /** 加载图标状态 */
    loading: boolean;
    iconProps: {
        size: number;
        stroke: number;
        color: string;
    }
}

// state 属性
const state = reactive<SelectTablerIconState>({
    icons: new Map<string, Component>(),
    loading: true,
    iconProps: {
        size: 24,
        stroke: 1.5,
        color: "currentColor",
    },
});
// 双向绑定的 show 属性
const show = defineModel<boolean>();
show.value = props.defShow ?? false;

async function loadIcons() {
    state.loading = true;
    try {
        const tablerIcons = await import("@tabler/icons-vue");
        for (let name in tablerIcons) {
            if (!name.startsWith("Icon")) {
                continue;
            }
            const icon = tablerIcons[name];
            name = name.substring(4);
            state.icons.set(name, markRaw(icon));
        }
    } catch (err: Error) {
        console.error("加载图标失败", err);
        Notify({ type: 'error', position: 'top-right', title: "加载图标失败", message: `错误详情：${reason}` });
        show.value = false;
    } finally {
        state.loading = false;
    }
}

loadIcons().finally();
</script>

<template>
    <Modal
        v-loading="state.loading"
        tiny-loading__text="加载中..."
        tiny-loading__background="rgba(0, 0, 0, 0.25)"
        class="icons-modal"
        v-model="show"
        height="60%"
        width="60%"
        :show-footer="true"
    >
        <div class="icons-content">
            <template v-for="[name, icon] in state.icons">
                <div>
                    <component :is="icon" v-bind="state.iconProps"/>
                    <span>{{ name }}</span>
                </div>
            </template>
        </div>
        <template #footer>
            <div>
                footer
            </div>
        </template>
    </Modal>
</template>

<style scoped>
.icons-content {
    height: 100%;
    overflow: auto;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.icons-modal :deep(.tiny-modal__box > .tiny-modal__body) {
    height: 100%;
    overflow: hidden;
}

.icons-modal :deep(.tiny-modal__box > .tiny-modal__body > .tiny-modal__content) {
    height: 100%;
    overflow: hidden;
}
</style>
