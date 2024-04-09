<script setup lang="ts">
import lodash from "lodash";
import type { Component } from "vue";
import { computed, defineModel, markRaw, reactive, ref } from "vue";
import { useResizeObserver, useVirtualList } from "@vueuse/core";
import { Input, Loading, Modal, Notify, TabItem, Tabs } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toBatch } from "@/utils/Utils";
import TablerIconSetting from "@/components/TablerIconSetting.vue";

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

/** 图标信息 */
interface IconInfo {
    /** 图标组件 */
    icon: Component;
    /** 图标名 */
    name: string;
    /** 显示名称 */
    displayName: string;
}

// 定义 State 类型
interface SelectTablerIconState {
    /** 加载图标状态 */
    loading: boolean;
    /** 查找关键字 */
    searchKey?: string;
    /** 一行显示的数量 */
    batchSize: number;
    /** tabler 所有的图标组件 */
    tablerIcons: Array<IconInfo>;
    /** tabler 所有的图标组件属性 */
    tablerIconProps: {
        size: number;
        stroke: number;
        color: string;
    };
    /** 当前选中的图标 */
    selectedIcon?: IconInfo;
    /** 显示 TablerIconSetting 对话框 */
    showTablerSetting: boolean;
}

// state 属性
const state = reactive<SelectTablerIconState>({
    loading: true,
    searchKey: undefined,
    batchSize: 1,
    tablerIcons: [],
    tablerIconProps: {
        size: 28,
        stroke: 1.5,
        color: "#3B4549",
    },
    selectedIcon: undefined,
    showTablerSetting: false,
});
// 内部数据
const data = {
    iconHeight: 80,
    iconHeightCss: "80px",
};
// 双向绑定的 show 属性
const show = defineModel<boolean>();
show.value = props.defShow ?? false;
// icons-content dom
const contentRef = ref<HTMLDivElement | undefined>();
// tabler图标的虚拟滚动对象
const tablerIconsVirtualList = useVirtualList(
    computed(() => toBatch(filterIcons(state.tablerIcons, state.searchKey), state.batchSize)),
    { itemHeight: data.iconHeight },
);
// 对话框大小变化后重算 batchSize
useResizeObserver(contentRef, entries => {
    const rect = entries[0];
    state.batchSize = Math.floor((rect.contentRect.width - 16) / (96 + 16));
    if (state.batchSize < 1) state.batchSize = 1;
});

function filterIcons(icons: Array<IconInfo>, searchKey?: string) {
    searchKey = lodash.trim(searchKey);
    if (!searchKey) return icons;
    return icons.filter(iconInfo => iconInfo.name.toLowerCase().includes(searchKey.toLowerCase()));
}

async function loadTablerIcons() {
    try {
        const tablerIcons = await import("@tabler/icons-vue");
        for (let name in tablerIcons) {
            if (!name.startsWith("Icon")) {
                continue;
            }
            const icon = tablerIcons[name];
            state.tablerIcons.push({
                name: `Tabler${name}`,
                icon: markRaw(icon),
                displayName: name.substring(4),
            });
        }
    } catch (err: any) {
        console.error("加载图标失败", err);
        Notify({ type: 'error', position: 'top-right', title: "加载tabler图标失败", message: `错误详情：${err}` });
        show.value = false;
    }
}

async function loadIcons() {
    state.loading = true;
    try {
        await loadTablerIcons();
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
        :esc-closable="true"
        title="选择图标"
    >
        <div ref="contentRef" class="icons-content flex-column-container">
            <div class="flex-item-fixed icons-form">
                <div>
                    <Input placeholder="输入关键字查找" v-model="state.searchKey" style="width: 230px;">
                        <template #prefix>
                            <FontAwesomeIcon :icon="faMagnifyingGlass"/>
                        </template>
                    </Input>
                </div>
            </div>
            <Tabs class="flex-item-fill" active-name="tabler">
                <TabItem name="fontawesome" title="Fontawesome图标" :lazy="true">

                </TabItem>
                <TabItem name="tabler" title="Tabler图标" :lazy="true">
                    <div class="virtual-list-container" v-bind="tablerIconsVirtualList.containerProps">
                        <div v-bind="tablerIconsVirtualList.wrapperProps.value">
                            <div v-for="icons in tablerIconsVirtualList.list.value" :key="icons.index" class="icons-row flex-row-container">
                                <div v-for="iconInfo in icons.data" class="icons-item flex-column-container" :title="iconInfo.displayName">
                                    <div class="flex-item-fill icons-item-icon">
                                        <component :is="iconInfo.icon" v-bind="state.tablerIconProps"/>
                                    </div>
                                    <div class="flex-item-fixed icons-item-name">{{ iconInfo.displayName }}</div>
                                    <div class="flex-item-fixed icons-item-buttons">
                                        <span class="icons-item-button">选择</span>
                                        <span
                                            class="icons-item-button"
                                            @click="() => {
                                                state.showTablerSetting = true;
                                                state.selectedIcon = iconInfo;
                                            }"
                                        >
                                            设置
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabItem>
            </Tabs>
        </div>
    </Modal>

    <Modal
        v-if="state.selectedIcon && state.showTablerSetting"
        v-model="state.showTablerSetting"
        :esc-closable="true"
        :mask-closable="true"
        width="auto"
        title="设置图标"
        :show-footer="true"
        :confirm-btn-props="{
            autoFocus: true,
            text: '确定',
        }"
    >
        <TablerIconSetting
            :icon="state.selectedIcon?.icon"
            :name="state.selectedIcon?.name"
            style="margin: 8px 4px 16px 4px"
        />
    </Modal>
</template>

<style scoped>
.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
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

.icons-content {
    height: 100%;
    overflow: auto;
}

.icons-form {
    margin: 12px 8px 8px 8px;
}

.virtual-list-container {
    height: 100%;
}

.icons-row {
    height: v-bind('data.iconHeightCss');
    margin: 8px 0;
}

.icons-item {
    height: v-bind('data.iconHeightCss');
    width: 96px;
    margin: 0 8px;
    padding: 4px 0;
    align-items: center;
    font-size: 12px;
    border: 1px solid #e6ebf1;
    border-radius: 4px;
    user-select: none;
}

.icons-item:hover {
    border-color: #5E7CE0;
}

.icons-item-icon {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.icons-item-name {
    width: calc(100% - 8px);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
    user-select: text;
    color: #6C6C89;
}

.icons-item-buttons {
    width: calc(100% - 8px);
    text-align: center;
    margin: 4px 0;
    font-size: 11px;
}

.icons-item-button {
    margin-right: 12px;
    color: #6C6C89;
}

.icons-item-button:hover {
    color: #344899;
}

.icons-item-button:active {
    color: #7693f5;
}

.icons-item-button:last-child {
    margin-right: 0;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.icons-modal :deep(.tiny-modal__box .tiny-modal__body) {
    height: 100%;
    overflow: hidden;
}

.icons-modal :deep(.tiny-modal__box .tiny-modal__body .tiny-modal__content) {
    height: 100%;
    overflow: hidden;
}

.icons-modal :deep(.tiny-tabs) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.icons-modal :deep(.tiny-tabs .tiny-tabs__header) {
    flex-shrink: 0;
}

.icons-modal :deep(.tiny-tabs .tiny-tabs__content) {
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
}

.icons-modal :deep(.tiny-tabs .tiny-tabs__content .tiny-tab-pane) {
    height: 100%;
    overflow: auto;
}
</style>
