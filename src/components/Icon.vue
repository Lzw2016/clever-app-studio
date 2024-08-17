<script setup lang="ts">
import lodash from "lodash";
import { computed, shallowReactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { style } from "@/utils/UseType";
import { ComponentParam } from "@/draggable/types/Base";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { createComponentParam } from "@/draggable/utils/BlockPropsTransform";

// 定义组件选项
defineOptions({
    name: 'Icon',
});

// 定义 Props 类型
interface IconProps {
    /** 组件管理器 */
    componentManage?: ComponentManage;
    /** 图标类型(componentName) */
    iconType?: string;
    /** 图标的属性 */
    iconProps?: Record<string, any>;
    /** 使用svg代码图标(优先级最高) */
    svg?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<IconProps>(), {
    componentManage: globalConfig.componentManage,
});

// 定义 State 类型
interface IconState {
    /** 加载图标状态 */
    loading: boolean;
    /** 图标组件 */
    iconComponent?: any;
}

// state 属性
const state = shallowReactive<IconState>({
    loading: false,
});

// 内部数据
const data = {
    iconWrapperStyle: style({
        display: "inline-flex",
        "align-items": "center",
        "justify-content": "center",
    }),
};

// 使用svg图标
const useSvg = computed(() => lodash.trim(props.svg).length > 0);

// 根据配置动态生成图标组件 componentManage: props.componentManage,
watch(
    () => ({ useSvg: useSvg.value, iconType: props.iconType, iconProps: props.iconProps }),
    ({ useSvg, iconType, iconProps }) => createIconComponent(useSvg, iconType, iconProps),
    {
        immediate: true,
        deep: true,
    },
);

// 创建图标组件
function createIconComponent(useSvg: boolean, iconType?: string, iconProps?: Record<string, any>) {
    if (useSvg) return;
    const { componentManage } = props;
    if (!componentManage || !iconType || !iconProps) {
        state.iconComponent = null;
        return;
    }
    state.loading = true;
    componentManage.loadAsyncComponent([iconType]).finally(() => {
        const componentParam: ComponentParam = {
            type: iconType,
            props: iconProps,
        };
        state.iconComponent = createComponentParam(componentParam, componentManage);
    }).finally(() => state.loading = false);
}

// 定义组件公开内容
defineExpose({});
</script>

<template>
    <span v-if="useSvg" :style="data.iconWrapperStyle" v-html="props.svg"/>
    <span v-else-if="!state.loading && state.iconComponent" :style="data.iconWrapperStyle">
        <component :is="state.iconComponent"/>
    </span>
    <span v-else :style="{...data.iconWrapperStyle, width: '24px', height: '24px'}">
        <FontAwesomeIcon :icon="faStar" :fixed-width="true" size="lg"/>
    </span>
</template>

<style scoped>

</style>
