<script setup lang="ts">
import { Component, computed, getCurrentInstance, isVNode, markRaw, reactive, ref } from "vue";
import { Input } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { configRawValueName } from "@/draggable/Constant";
import { ComponentParam } from "@/draggable/types/Base";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { createComponentParam } from "@/draggable/utils/BlockPropsTransform";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toObj, watchNodes } from "@/draggable/utils/SetterUtils";
import SelectIcon, { IconInfo } from "@/components/SelectIcon.vue";

// 定义组件选项
defineOptions({
    name: 'IconSetter',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface IconSetterProps extends SetterProps {
    /** 不使用 fontawesome 图标 */
    disableFontawesome?: boolean;
    /** 不使用 googleIcon 图标 */
    disableGoogleIcon?: boolean;
    /** 不使用 tabler 图标  */
    disableTabler?: boolean;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<IconSetterProps>(), {
    disableFontawesome: globalConfig.useExternalLib.fontawesome !== true,
    disableGoogleIcon: globalConfig.useExternalLib.googleIcon !== true,
    disableTabler: globalConfig.useExternalLib.tablerIcon !== true,
});

// 定义 State 类型
interface IconSetterState extends SetterState<ComponentParam> {
    /** 显示选择图标对话框 */
    showSelectIcon: boolean;
}

// state 属性
const state = reactive<IconSetterState>({
    ...getDefState(),
    showSelectIcon: false,
});
state.value = getValue<ComponentParam>(props, state, toObj);
// 内部数据
// const data = {};
// 选择的图标组件
const inputValue = computed(() => {
    let valueObj: any = state.value;
    if (!valueObj) return;
    if (valueObj[configRawValueName]) {
        valueObj = valueObj[configRawValueName];
    }
    if (isVNode(valueObj)) return;
    if (valueObj.__icon_display_name) return valueObj.__icon_display_name;
    return valueObj.type;
});
// 设置器内部组件引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, toObj);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, toObj),
});

function selectedIcon(component: Component, iconProps: Record<string, any>, iconInfo: IconInfo) {
    const componentParam: ComponentParam = markRaw({
        __component_param: true,
        __icon_display_name: iconInfo.displayName,
        type: iconInfo.componentName,
        props: { ...iconProps },
    });
    if (iconInfo.componentName === "FontAwesomeIcon" && componentParam.props) {
        componentParam.props.icon = [iconInfo.icon['prefix'], iconInfo.icon['iconName']];
    }
    if (!componentParam.props) componentParam.props = {};
    if (!componentParam.props.style) componentParam.props.style = {};
    componentParam.props.style['margin-right'] = '2px';
    const componentManage = props.designerState.designerEngine.componentManage;
    componentManage.loadAsyncComponent([componentParam.type]).finally(() => {
        const cmp = markRaw(createComponentParam(componentParam, componentManage));
        cmp[configRawValueName] = componentParam;
        state.value = componentParam;
        applyValue(props, state, instance?.proxy, cmp);
    });
}
</script>

<template>
    <div class="icon-setter" style="width: 100%;">
        <Input
            style="width: 100%;"
            :clearable="false"
            v-bind="inputProps"
            ref="setter"
            :modelValue="inputValue"
            @clear="() => {
                state.value = undefined;
                applyValue(props, state, setter, state.value);
            }"
        >
            <template #suffix>
                <FontAwesomeIcon
                    class="icons-button"
                    :class="{
                        'icons-button-margin': inputValue,
                    }"
                    :icon="faMagnifyingGlass"
                    @click="() => state.showSelectIcon = true"
                />
                <FontAwesomeIcon
                    v-if="inputValue"
                    class="icons-button"
                    :icon="faXmark"
                    @click="() => {
                        state.value = undefined;
                        applyValue(props, state, setter, undefined);
                    }"
                />
            </template>
        </Input>
        <SelectIcon
            v-model="state.showSelectIcon"
            :disableFontawesome="props.disableFontawesome"
            :disableGoogleIcon="props.disableGoogleIcon"
            :disableTabler="props.disableTabler"
            @selectedIcon="selectedIcon"
        />
    </div>
</template>

<style scoped>
.icons-button-margin {
    margin: 0 8px 0 4px;
}

.icons-button:hover {
    color: #666;
}

.icons-button:active {
    color: #2e3243;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.icon-setter :deep(.tiny-input .tiny-input__suffix) {
    background-color: #fff;
}
</style>
