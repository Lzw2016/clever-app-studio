<script setup lang="ts">
import type { Component } from "vue";
import { computed, getCurrentInstance, markRaw, reactive, ref, watch } from "vue";
import { Input } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { isFun } from "@/utils/Typeof";
import SelectIcon, { IconInfo } from "@/components/SelectIcon.vue";
import { iconDisplayName } from "@/draggable/Constant";
import { ComponentParam } from "@/draggable/types/Base";
import { PropComponentValue } from "@/draggable/types/DesignBlock";
import { SetterExpose, SetterProps, SetterState } from "@/draggable/types/ComponentMeta";
import { createComponentParam } from "@/draggable/utils/BlockPropsTransform";
import { applyValue, getDefState, getInputProps, getSetterExpose, getValue, toComponentParam, watchNodes } from "@/draggable/utils/SetterUtils";

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
    /** 自定义“渲染节点属性值转换成 ComponentParam 值”逻辑 */
    valueTransform?: (value: any) => ComponentParam | undefined;
    /** 把 ComponentParam 值转换成渲染节点属性值 */
    convertValue?: (value: ComponentParam) => ComponentParam;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<IconSetterProps>(), {
    disableFontawesome: globalConfig.useExternalLib.fontawesome !== true,
    disableGoogleIcon: globalConfig.useExternalLib.googleIcon !== true,
    disableTabler: globalConfig.useExternalLib.tablerIcon !== true,
    valueTransform: toComponentParam,
});

// 定义 State 类型
interface IconSetterState extends SetterState<ComponentParam> {
    /** 显示选择图标对话框 */
    showSelectIcon: boolean;
    /** 图标组件 */
    iconComponent?: Component;
}

// state 属性
const state = reactive<IconSetterState>({
    ...getDefState(),
    showSelectIcon: false,
});
state.value = getValue<ComponentParam>(props, state, props.valueTransform);
// 内部数据
// const data = {};
// 选择的图标组件
const inputValue = computed(() => {
    const componentParam = state.value;
    return componentParam?.[iconDisplayName] ?? componentParam?.type;
});
// 图标组件对象
watch(
    () => state.value,
    value => {
        if (value) {
            state.iconComponent = createComponentParam(value, props.designerState.designerEngine.componentManage);
        } else {
            state.iconComponent = undefined;
        }
    },
    {
        immediate: true,
    },
);
// 设置器内部组件引用
const setter = ref<InstanceType<typeof Input> | undefined>();
// 设置器内部组件属性
const inputProps = getInputProps(state);
// 监听 nodes 变化
watchNodes(props, state, props.valueTransform);

// 定义组件公开内容
defineExpose<SetterExpose>({
    ...getSetterExpose(props, state, instance?.proxy, props.valueTransform),
});

function selectedIcon(component: Component, iconProps: Record<string, any>, iconInfo: IconInfo) {
    let componentParam: ComponentParam = {
        __component_param: true,
        [iconDisplayName]: iconInfo.displayName,
        type: iconInfo.componentName,
        props: { ...iconProps },
    } as PropComponentValue;
    // 处理 props
    if (!componentParam.props) componentParam.props = {};
    if (iconInfo.componentName === "FontAwesomeIcon" && componentParam.props) {
        componentParam.props.icon = [iconInfo.icon['prefix'], iconInfo.icon['iconName']];
    }
    // 处理 style
    // if (!componentParam.props.style) componentParam.props.style = {};
    // componentParam.props.style['margin-right'] = '2px';
    // 加载组件
    const componentManage = props.designerState.designerEngine.componentManage;
    props.designerState.designerEngine.componentManage.loadAsyncComponent([componentParam.type]).finally(() => {
        state.value = markRaw(componentParam);
        let value: any;
        if (isFun(props.convertValue)) {
            try {
                value = props.convertValue(componentParam);
            } catch (err) {
                console.warn("数据转换错误", err);
                return;
            }
        } else {
            value = createComponentParam(componentParam, componentManage);
        }
        applyValue(props, state, instance?.proxy, value);
    });
}

function clearValue() {
    state.value = undefined;
    applyValue(props, state, setter, undefined);
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
            @clear="clearValue"
        >
            <template #prefix v-if="state.iconComponent">
                <component :is="state.iconComponent" width="18" height="18" style="font-size: 16px;width: 18px;height: 18px;margin: 0;padding: 0;"/>
            </template>
            <template #suffix>
                <FontAwesomeIcon
                    v-if="inputValue"
                    class="icons-button"
                    :icon="faXmark"
                    @click="clearValue"
                />
                <FontAwesomeIcon
                    class="icons-button"
                    :class="{
                        'icons-button-margin': inputValue,
                    }"
                    :icon="faMagnifyingGlass"
                    @click="() => state.showSelectIcon = true"
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
    margin: 0 0 0 8px;
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
    height: 22px;
}

.icon-setter :deep(.tiny-input .tiny-input__prefix svg.tabler-icon) {
    color: #3b4549;
    fill: none;
}

.icon-setter :deep(.tiny-input .tiny-input__prefix svg.tabler-icon[class$="-filled"]) {
    fill: currentcolor;
}
</style>
