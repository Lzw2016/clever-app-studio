<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { Modal, TabItem, Tabs } from "@opentiny/vue";
import { IconX } from "@tabler/icons-vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import SetterPropsPanel from "@/draggable/components/widgets/SetterPropsPanel.vue";
import SetterEventPanel from "@/draggable/components/widgets/SetterEventPanel.vue";
import SetterStylePanel from "@/draggable/components/widgets/SetterStylePanel.vue";
import EventEditor from "@/draggable/components/widgets/EventEditor.vue";
import BlockEditor from "@/draggable/components/widgets/BlockEditor.vue";

// 定义组件选项
defineOptions({
    name: 'SettingsPanel',
});

// 定义 Props 类型
interface SettingsPanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SettingsPanelProps>(), {});
// state 属性
const state = reactive({});
// 内部数据
const data = {
    setterTabs: {
        props: "属性",
        events: "事件",
        style: "样式",
        advanced: "高级",
    },
};
// 事件编辑器组件
const blockEditorRef = ref<InstanceType<typeof BlockEditor> | undefined>();
// 事件编辑器组件
const eventEditorRef = ref<InstanceType<typeof EventEditor> | undefined>();
// 当前活动的设计器状态数据
const designerState = computed(() => props.designerEngine.activeDesignerState);
// 存在选中的节点
const existsSelection = computed(() => designerState.value && designerState.value?.existsSelection);
// 选中了多个不同类型的节点
const multipleSelection = computed(() => {
    if (!designerState.value) return false;
    const types = new Set<any>();
    for (let selection of designerState.value?.selections) {
        if (selection.componentMeta) {
            types.add(selection.componentMeta?.type);
        } else {
            types.add(null);
        }
    }
    return types.size > 1;
});
// 当前选中的 ComponentMeta
const selectedComponentMeta = computed(() => {
    const meta = designerState.value?.selectedComponentMeta;
    if (meta) return filterEmptyMeta(meta);
});
// 当前活动的设计器状态数据
const setterState = computed(() => props.designerEngine.activeDesignerState?.setterShareState);

// 重新计算expandGroups(展开的组件分组)
watch(() => selectedComponentMeta.value, () => setterState.value?.recalcExpandGroups());

// 过滤所有空 props events style advanced 中的 items
function filterEmptyMeta(meta: ComponentMeta): ComponentMeta {
    const newMeta = { ...meta };
    if (meta.setter.props && newMeta.setter.props) {
        newMeta.setter.props.groups = meta.setter.props.groups.filter(group => group.items.length > 0);
        if (newMeta.setter.props.groups.length <= 0) delete newMeta.setter.props;
    }
    // if (meta.setter.events && newMeta.setter.events) {
    //     newMeta.setter.events.groups = meta.setter.events.groups.filter(group => group.items.length > 0);
    //     if (newMeta.setter.events.groups.length <= 0) delete newMeta.setter.events;
    // }
    // if (meta.setter.style && newMeta.setter.style) {
    //     newMeta.setter.style.groups = meta.setter.style.groups.filter(group => group.items.length > 0);
    //     if (newMeta.setter.style.groups.length <= 0) delete newMeta.setter.style;
    // }
    // if (meta.setter.advanced && newMeta.setter.advanced) {
    //     newMeta.setter.advanced.groups = meta.setter.advanced.groups.filter(group => group.items.length > 0);
    //     if (newMeta.setter.advanced.groups.length <= 0) delete newMeta.setter.advanced;
    // }
    return newMeta;
}

// 是否存在 setter
function existsSetter(meta?: ComponentMeta) {
    if (!meta) return false;
    return (meta.setter.props && meta.setter.props.groups.length > 0)
        || (meta.setter.events && meta.setter.events.groups.length > 0)
        // || (meta.setter.style && meta.setter.style.groups.length > 0)
        || (meta.setter.advanced && meta.setter.advanced.groups.length > 0);
}
</script>

<template>
    <div class="settings-panel flex-column-container">
        <div class="flex-row-container flex-item-fixed settings-panel-title">
            <div class="flex-item-fixed settings-panel-title-name">组件配置</div>
            <div class="flex-item-fill"/>
            <div class="settings-panel-close">
                <IconX :size="18"/>
            </div>
        </div>
        <div v-if="!existsSelection" class="settings-panel flex-column-container">
            <div class="flex-item-fill settings-panel-empty">请在左侧画布选中节点</div>
        </div>
        <div v-else-if="multipleSelection" class="settings-panel flex-column-container">
            <div class="flex-item-fill settings-panel-empty">选中的节点类型不一致</div>
        </div>
        <div v-else-if="existsSelection && !selectedComponentMeta" class="settings-panel flex-column-container">
            <div class="flex-item-fill settings-panel-empty">选中的节点组件未注册元数据</div>
        </div>
        <div v-else-if="existsSelection && !existsSetter(selectedComponentMeta)" class="settings-panel flex-column-container">
            <div class="flex-item-fill settings-panel-empty">选中的节点未注册配置属性</div>
        </div>
        <Tabs
            v-else-if="selectedComponentMeta && selectedComponentMeta.setter && setterState && designerState"
            class="flex-item-fill settings-tabs flex-column-container"
            :active-name="setterState.activeTab"
            v-model="setterState.activeTab"
            tab-style="button-card"
        >
            <TabItem
                v-if="selectedComponentMeta.setter.props"
                style="height: 100%;"
                key="props"
                name="props"
                :lazy="false"
                :title="selectedComponentMeta.setter.props?.title || data.setterTabs.props"
            >
                <SetterPropsPanel
                    :designer-engine="props.designerEngine"
                    :designer-state="designerState"
                    :setter-panel="selectedComponentMeta.setter.props"
                />
            </TabItem>
            <TabItem
                v-if="selectedComponentMeta.setter.events"
                style="height: 100%;"
                key="events"
                name="events"
                :lazy="false"
                :title="selectedComponentMeta.setter.events?.title || data.setterTabs.events"
            >
                <SetterEventPanel
                    :designer-engine="props.designerEngine"
                    :designer-state="designerState"
                    :event-panel="selectedComponentMeta.setter.events"
                />
            </TabItem>
            <TabItem
                v-if="selectedComponentMeta.setter.style"
                style="height: 100%;"
                key="style"
                name="style"
                :lazy="false"
                :title="selectedComponentMeta.setter.style?.title || data.setterTabs.style"
            >
                <SetterStylePanel
                    :designer-engine="props.designerEngine"
                    :designer-state="designerState"
                    :setter-state="setterState"
                    :style-panel="selectedComponentMeta.setter.style"
                />
            </TabItem>
            <TabItem
                v-if="selectedComponentMeta.setter.advanced"
                style="height: 100%;"
                key="advanced"
                name="advanced"
                :lazy="false"
                :title="selectedComponentMeta.setter.advanced?.title || data.setterTabs.advanced"
            >
                vue指令设置
            </TabItem>
        </Tabs>
        <Modal
            class="block-modal"
            v-model="designerEngine.showBlockEditorDialog"
            height="85%"
            width="70%"
            min-height="350px"
            min-width="500px"
            :esc-closable="true"
            :resize="false"
            title="编辑页面代码"
        >
            <BlockEditor
                ref="blockEditorRef"
                :designer-engine="designerEngine"
                :designer-state="designerState"
            />
        </Modal>
        <Modal
            class="event-modal"
            v-model="designerEngine.showEventEditorDialog"
            height="85%"
            width="70%"
            min-height="350px"
            min-width="500px"
            :esc-closable="true"
            :resize="false"
            title="编辑事件代码"
        >
            <EventEditor
                ref="eventEditorRef"
                :designer-engine="designerEngine"
                :designer-state="designerState"
            />
        </Modal>
    </div>
</template>

<style scoped>
.settings-panel {
    height: 100%;
    width: 100%;
}

.settings-panel-empty {
    text-align: center;
    margin-top: 48px;
    font-size: 12px;
    color: #808080;
}

.settings-panel-title {
    background-color: #efefef;
    padding: 8px 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e1e1e1;
}

.settings-panel-title-name {
    font-size: 16px;
    font-weight: bold;
}

.settings-panel-close {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    cursor: pointer;
}

.settings-panel-close:hover {
    color: #333333;
}

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

.flex-center {
    align-items: center;
    justify-content: center;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-tabs :deep(.tiny-tabs__header) {
    flex-shrink: 0;
    margin-bottom: 16px;
}

.settings-tabs :deep(.tiny-tabs__nav .tiny-tabs__item .tiny-tabs__item__title) {
    padding: 0 12px;
}

.settings-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.settings-tabs :deep(.tiny-tabs__header .tiny-tabs__nav-scroll .tiny-tabs__nav .tiny-tabs__item:last-child) {
    padding-right: 0;
}

.settings-tabs :deep(.tiny-tabs__content) {
    margin: 0;
    flex-grow: 1;
    border-top: 1px solid #d9d9d9;
    font-size: 12px;
}

.settings-tabs :deep(.tiny-form-item .tiny-form-item__label) {
    font-size: 12px;
}

.block-modal :deep(.tiny-modal__box .tiny-modal__body) {
    margin-bottom: 8px;
}

.block-modal.tiny-modal.tiny-modal__wrapper.is__visible :deep(.tiny-modal__box) {
    top: 8vh;
}

.event-modal :deep(.tiny-modal__box .tiny-modal__body) {
    margin-bottom: 8px;
}

 .event-modal.tiny-modal.tiny-modal__wrapper.is__visible :deep(.tiny-modal__box) {
    top: 8vh;
}
</style>
