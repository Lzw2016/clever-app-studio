<script setup lang="ts">
import lodash from "lodash";
import type { Component, CSSProperties } from "vue";
import { computed, getCurrentInstance, markRaw, reactive, ref } from "vue";
import { useResizeObserver, useVirtualList } from "@vueuse/core";
import { Input, Loading, Modal, Notify, TabItem, Tabs } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toBatch } from "@/utils/Utils";
import FontawesomeSetting from "@/components/FontawesomeSetting.vue";
import GoogleIconSetting from "@/components/GoogleIconSetting.vue";
import TablerIconSetting from "@/components/TablerIconSetting.vue";

const vLoading = Loading.directive;

// 定义组件选项
defineOptions({
    name: 'SelectIcon',
});

// 自定义事件类型
const emit = defineEmits<{
    selectedIcon: [component: Component, props: Record<string, any>, iconInfo: IconInfo];
}>();

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface SelectTablerIconProps {
    /** 是否默认显示 */
    defShow?: boolean;
    /** 不使用 fontawesome 图标 */
    disableFontawesome?: boolean;
    /** 不使用 googleIcon 图标 */
    disableGoogleIcon?: boolean;
    /** 不使用 tabler 图标  */
    disableTabler?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SelectTablerIconProps>(), {
    defShow: false,
});

enum IconInfoLib {
    fontawesome = "fontawesome",
    googleIcon = "googleIcon",
    tabler = "tabler",
}

/** 图标信息 */
export interface IconInfo {
    /** 图标组件 */
    icon: Component;
    /** 显示名称 */
    displayName: string;
    /** 图标风格分组 */
    styleGroup: string;
    /** 图标类别分组 */
    categoryGroup?: string;
    /** 图标vue组件名称 */
    componentName: string;
    /** 图标库名称 */
    lib: IconInfoLib;

    [name: string]: any;
}

// 定义 State 类型
interface SelectTablerIconState {
    /** 加载图标状态 */
    loading: boolean;
    /** 查找关键字 */
    searchKey?: string;
    /** 一行显示的数量 */
    batchSize: number;
    /** 当前选中的图标 */
    selectedIcon?: IconInfo;
    /** 当前选中的叶签 */
    activeTab: string;

    /** fontawesome图标组件包装器 */
    fontAwesomeComponent?: Component;
    /** fontawesome所有的图标组件 */
    fontAwesomeIcons: Array<IconInfo>;
    /** fontawesome图标组件属性 */
    fontAwesomeIconProps: {
        // 显示的图标
        // icon: string;
        /** css样式 */
        style?: CSSProperties;
        /** 大小 */
        size: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | string;
        /** 固定宽度 */
        fixedWidth?: boolean;
        /** 旋转角度 */
        rotation?: number;
        /** 翻转/动画 */
        flip?: "horizontal" | "vertical" | "both" | true;
        /** 动画 */
        beat?: boolean;
        /** 动画 */
        beatFade?: boolean;
        /** 动画 */
        bounce?: boolean;
        /** 动画 */
        fade?: boolean;
        /** 动画 */
        shake?: boolean;
        /** 动画 */
        spin?: boolean;
        /** 动画 */
        spinReverse?: boolean;
        /** 动画 */
        spinPulse?: boolean;
        /** 边框 */
        border?: boolean;
        /** 浮动 */
        pull?: "left" | "right";
        /** 翻转颜色 */
        inverse?: boolean;
    };
    /** 显示 FontawesomeSetting 对话框 */
    showFontAwesomeSetting: boolean;

    /** googleIcon图标组件包装器 */
    googleIconComponent?: Component;
    /** googleIcon所有的图标组件 */
    googleIcons: Array<IconInfo>;
    /** googleIcon图标组件属性 */
    googleIconProps: {
        // /** 图标内容 */
        // content: string;
        /** 图标大小，同：font-size */
        size?: number;
        /** 字体类型 */
        fontStyle?: "outlined" | "round" | "sharp" | "two-tone" | "symbols-outlined" | "symbols-rounded" | "symbols-sharp" | string;
        /** 字体颜色 */
        color?: string;
        /** fill 选项，参考：https://fonts.google.com/ */
        fill?: boolean;
        /** weight 选项，参考：https://fonts.google.com/ */
        weight?: number;
        /** grade 选项，参考：https://fonts.google.com/ */
        grade?: number;
        /** Optical Size 选项，参考：https://fonts.google.com/ */
        opticalSize?: number;
    };
    /** 显示 GoogleIconSetting 对话框 */
    showGoogleIconSetting: boolean;

    /** tabler所有的图标组件 */
    tablerIcons: Array<IconInfo>;
    /** tabler图标组件属性 */
    tablerIconProps: {
        size: number;
        stroke: number;
        color: string;
    };
    /** 显示 TablerIconSetting 对话框 */
    showTablerSetting: boolean;
}

// state 属性
const state = reactive<SelectTablerIconState>({
    loading: true,
    searchKey: undefined,
    batchSize: 1,
    selectedIcon: undefined,
    activeTab: "fontawesome",

    fontAwesomeComponent: undefined,
    fontAwesomeIcons: [],
    fontAwesomeIconProps: {
        size: "2x",
        fixedWidth: true,
        style: {
            color: "#3B4549",
        },
    },
    showFontAwesomeSetting: false,

    googleIconComponent: undefined,
    googleIcons: [],
    googleIconProps: {
        size: 28,
        color: "#3B4549",
    },
    showGoogleIconSetting: false,

    tablerIcons: [],
    tablerIconProps: {
        size: 28,
        stroke: 1.5,
        color: "#3B4549",
    },
    showTablerSetting: false,
});
// 内部数据
const data = {
    iconHeight: 80,
    iconHeightCss: "80px",
    officialWeb: {
        fontawesome: "https://fontawesome.com/search",
        googleIcon: "https://fonts.google.com/icons",
        tabler: "https://tabler.io/icons",
    },
    defFontAwesomeIconProps: {
        size: "lg",
        fixedWidth: true,
        style: {
            fontSize: 14,
            color: "#3B4549",
        },
    },
    defGoogleIconProps: {
        size: 16,
        color: "#3B4549",
        fill: false,
        weight: 400,
        grade: 0,
        opticalSize: 24,
    },
    defTablerIconProps: {
        size: 16,
        stroke: 2,
        color: "#3B4549",
    },
};
// 双向绑定的 show 属性
const show = defineModel<boolean>();
show.value = props.defShow ?? false;
// icons-content dom
const contentRef = ref<HTMLDivElement | undefined>();
// fontAwesome图标的虚拟滚动对象
const fontAwesomeVirtualList = useVirtualList(
    computed(() => toBatch(filterIcons(state.fontAwesomeIcons, state.searchKey), state.batchSize)),
    { itemHeight: data.iconHeight },
);
// googleIcon图标的虚拟滚动对象
const googleIconsVirtualList = useVirtualList(
    computed(() => toBatch(filterIcons(state.googleIcons, state.searchKey), state.batchSize)),
    { itemHeight: data.iconHeight },
);
// tabler图标的虚拟滚动对象
const tablerIconsVirtualList = useVirtualList(
    computed(() => toBatch(filterIcons(state.tablerIcons, state.searchKey), state.batchSize)),
    { itemHeight: data.iconHeight },
);
// 图标库官网
const officialWeb = computed(() => data.officialWeb[state.activeTab]);
// 对话框大小变化后重算 batchSize
useResizeObserver(contentRef, entries => {
    const rect = entries[0];
    state.batchSize = Math.floor((rect.contentRect.width - 16) / (96 + 16));
    if (state.batchSize < 1) state.batchSize = 1;
});

function filterIcons(icons: Array<IconInfo>, searchKey?: string) {
    searchKey = lodash.trim(searchKey);
    if (!searchKey) return icons;
    return icons.filter(iconInfo => iconInfo.displayName.toLowerCase().includes(searchKey.toLowerCase()));
}

async function loadFontawesomeIcons() {
    try {
        const { FontAwesomeIcon } = await import("@fortawesome/vue-fontawesome");
        const { fas } = await import("@fortawesome/free-solid-svg-icons");
        const { far } = await import("@fortawesome/free-regular-svg-icons");
        const { fab } = await import("@fortawesome/free-brands-svg-icons");
        const uniqueIcons = new Set<string>();
        for (let iconPack of [fas, far, fab]) {
            for (let name in iconPack) {
                const icon = iconPack[name];
                const iconKey = [icon.iconName, icon.prefix].join("|");
                if (uniqueIcons.has(iconKey)) {
                    continue;
                }
                uniqueIcons.add(iconKey);
                state.fontAwesomeIcons.push(markRaw({
                    icon: markRaw(icon),
                    displayName: icon.iconName,
                    styleGroup: icon.prefix,
                    componentName: "FontAwesomeIcon",
                    lib: IconInfoLib.fontawesome,
                }));
            }
        }
        state.fontAwesomeComponent = markRaw(FontAwesomeIcon);
    } catch (err: any) {
        console.error("加载fontawesome图标失败", err);
        Notify({ type: 'error', position: 'top-right', title: "加载fontawesome图标失败", message: `错误详情：${err}` });
        show.value = false;
    }
}

async function loadGoogleIcons() {
    try {
        const module = await import("@/components/GoogleIcon.vue");
        const { allIcons } = await import("@/components/GoogleIconsAll");
        for (let icon of allIcons) {
            state.googleIcons.push(markRaw({
                icon: icon.content as any,
                displayName: `${icon.content}(${icon.name})`,
                styleGroup: icon.defFontStyle,
                componentName: "GoogleIcon",
                lib: IconInfoLib.googleIcon,
                defFontStyle: icon.defFontStyle,
                fontStyle: icon.fontStyle,
            }));
        }
        state.googleIconComponent = markRaw(module.default);
    } catch (err: any) {
        console.error("加载GoogleIcon图标失败", err);
        Notify({ type: 'error', position: 'top-right', title: "加载GoogleIcon图标失败", message: `错误详情：${err}` });
        show.value = false;
    }
}

async function loadTablerIcons() {
    try {
        const tablerIcons = await import("@tabler/icons-vue");
        for (let name in tablerIcons) {
            if (!name.startsWith("Icon")) {
                continue;
            }
            const icon = tablerIcons[name];
            state.tablerIcons.push(markRaw({
                icon: markRaw(icon),
                displayName: name.substring(4),
                styleGroup: name.toLowerCase().endsWith("filled") ? "filled" : "outline",
                componentName: `Tabler${name}`,
                lib: IconInfoLib.tabler,
            }));
        }
    } catch (err: any) {
        console.error("加载tabler图标失败", err);
        Notify({ type: 'error', position: 'top-right', title: "加载tabler图标失败", message: `错误详情：${err}` });
        show.value = false;
    }
}

async function loadIcons() {
    state.loading = true;
    try {
        if (!props.disableFontawesome) await loadFontawesomeIcons();
        if (!props.disableGoogleIcon) await loadGoogleIcons();
        if (!props.disableTabler) await loadTablerIcons();
    } finally {
        state.loading = false;
    }
}

function selectedIcon(component: Component, props: Record<string, any>, iconInfo: IconInfo) {
    show.value = false;
    emit("selectedIcon", component, props, iconInfo);
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
        width="60%"
        height="80%"
        min-height="350px"
        min-width="500px"
        :esc-closable="true"
        title="选择图标"
    >
        <div ref="contentRef" class="icons-content flex-column-container">
            <div class="flex-item-fixed flex-row-container icons-form" style="align-items: center;">
                <Input placeholder="输入关键字查找" v-model="state.searchKey" style="width: 230px;">
                    <template #prefix>
                        <FontAwesomeIcon :icon="faMagnifyingGlass"/>
                    </template>
                </Input>
                <div style="margin-left: 12px; display: none;">filled/outline</div>
                <div style="margin-left: 12px; display: none;">Category Group</div>
                <div v-if="officialWeb" style="margin-left: 12px; display: none;">
                    <a :href="officialWeb" target="_blank">官网</a>
                </div>
            </div>
            <Tabs class="flex-item-fill" v-model="state.activeTab">
                <TabItem v-if="!props.disableFontawesome" name="fontawesome" title="Fontawesome图标" :lazy="true">
                    <div class="virtual-list-container" v-bind="fontAwesomeVirtualList.containerProps">
                        <div v-bind="fontAwesomeVirtualList.wrapperProps.value">
                            <div v-for="icons in fontAwesomeVirtualList.list.value" :key="icons.index" class="icons-row flex-row-container">
                                <div v-for="iconInfo in icons.data" class="icons-item flex-column-container" :title="iconInfo.displayName">
                                    <div class="flex-item-fill icons-item-icon">
                                        <component :is="state.fontAwesomeComponent" v-bind="state.fontAwesomeIconProps" :icon="iconInfo.icon"/>
                                    </div>
                                    <div class="flex-item-fixed icons-item-name">{{ iconInfo.displayName }}</div>
                                    <div class="flex-item-fixed icons-item-buttons">
                                        <span class="icons-item-button" @click="selectedIcon(state.fontAwesomeComponent!, data.defFontAwesomeIconProps, iconInfo)">选择</span>
                                        <span
                                            class="icons-item-button"
                                            @click="() => {
                                                state.showFontAwesomeSetting = true;
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
                <TabItem v-if="!props.disableGoogleIcon" name="googleIcon" title="GoogleIcon图标" :lazy="true">
                    <div class="virtual-list-container" v-bind="googleIconsVirtualList.containerProps">
                        <div v-bind="googleIconsVirtualList.wrapperProps.value">
                            <div v-for="icons in googleIconsVirtualList.list.value" :key="icons.index" class="icons-row flex-row-container">
                                <div v-for="iconInfo in icons.data" class="icons-item flex-column-container" :title="iconInfo.displayName">
                                    <div class="flex-item-fill icons-item-icon">
                                        <component :is="state.googleIconComponent" v-bind="state.googleIconProps" :content="iconInfo.icon" :fontStyle="iconInfo.defFontStyle"/>
                                    </div>
                                    <div class="flex-item-fixed icons-item-name">{{ iconInfo.displayName }}</div>
                                    <div class="flex-item-fixed icons-item-buttons">
                                        <span class="icons-item-button"
                                              @click="selectedIcon(state.googleIconComponent!, {...data.defGoogleIconProps, content: iconInfo.icon, fontStyle: iconInfo.defFontStyle}, iconInfo)"
                                        >
                                            选择
                                        </span>
                                        <span
                                            class="icons-item-button"
                                            @click="() => {
                                                state.showGoogleIconSetting = true;
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
                <TabItem v-if="!props.disableTabler" name="tabler" title="Tabler图标" :lazy="true">
                    <div class="virtual-list-container" v-bind="tablerIconsVirtualList.containerProps">
                        <div v-bind="tablerIconsVirtualList.wrapperProps.value">
                            <div v-for="icons in tablerIconsVirtualList.list.value" :key="icons.index" class="icons-row flex-row-container">
                                <div v-for="iconInfo in icons.data" class="icons-item flex-column-container" :title="iconInfo.displayName">
                                    <div class="flex-item-fill icons-item-icon">
                                        <component :is="iconInfo.icon" v-bind="state.tablerIconProps"/>
                                    </div>
                                    <div class="flex-item-fixed icons-item-name">{{ iconInfo.displayName }}</div>
                                    <div class="flex-item-fixed icons-item-buttons">
                                        <span class="icons-item-button" @click="selectedIcon(iconInfo.icon, data.defTablerIconProps, iconInfo)">选择</span>
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
        <Modal
            v-if="state.selectedIcon && state.fontAwesomeComponent && state.showFontAwesomeSetting"
            v-model="state.showFontAwesomeSetting"
            :esc-closable="true"
            :mask-closable="true"
            width="auto"
            title="设置图标"
            :show-footer="true"
            :confirm-btn-props="{ autoFocus: true, text: '确定' }"
            @confirm="() => {
                const fontawesomeSetting = instance?.refs.fontawesomeSetting as InstanceType<typeof FontawesomeSetting>;
                selectedIcon(state.fontAwesomeComponent!, fontawesomeSetting.iconProps, state.selectedIcon!);
            }"
        >
            <FontawesomeSetting
                ref="fontawesomeSetting"
                :icon="state.selectedIcon.icon as any"
                :icon-component="state.fontAwesomeComponent"
                :component-name="state.selectedIcon.componentName"
                style="margin: 8px 4px 16px 4px"
            />
        </Modal>
        <Modal
            v-if="state.selectedIcon && state.googleIconComponent && state.showGoogleIconSetting"
            v-model="state.showGoogleIconSetting"
            :esc-closable="true"
            :mask-closable="true"
            width="auto"
            title="设置图标"
            :show-footer="true"
            :confirm-btn-props="{ autoFocus: true, text: '确定' }"
            @confirm="() => {
                const googleIconSetting = instance?.refs.googleIconSetting as InstanceType<typeof GoogleIconSetting>;
                selectedIcon(
                    state.googleIconComponent!,
                    {...googleIconSetting.iconProps, content: state.selectedIcon!.icon },
                    state.selectedIcon!
                );
            }"
        >
            <GoogleIconSetting
                ref="googleIconSetting"
                :icon="state.googleIconComponent"
                :content="state.selectedIcon.icon as any"
                :component-name="state.selectedIcon.componentName"
                :def-font-style="state.selectedIcon.defFontStyle"
                :font-style="state.selectedIcon.fontStyle"
                style="margin: 8px 4px 16px 4px"
            />
        </Modal>
        <Modal
            v-if="state.selectedIcon && state.showTablerSetting"
            v-model="state.showTablerSetting"
            :esc-closable="true"
            :mask-closable="true"
            width="auto"
            title="设置图标"
            :show-footer="true"
            :confirm-btn-props="{ autoFocus: true, text: '确定' }"
            @confirm="() => {
                const tablerIconSetting = instance?.refs.tablerIconSetting as InstanceType<typeof TablerIconSetting>;
                selectedIcon(state.selectedIcon!.icon, tablerIconSetting.iconProps, state.selectedIcon!);
            }"
        >
            <TablerIconSetting
                ref="tablerIconSetting"
                :icon="state.selectedIcon.icon"
                :component-name="state.selectedIcon.componentName"
                style="margin: 8px 4px 16px 4px"
            />
        </Modal>
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
    margin: 8px;
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
    cursor: pointer;
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
.icons-modal.tiny-modal.tiny-modal__wrapper.is__visible :deep(.tiny-modal__box) {
    top: 8vh;
}

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
