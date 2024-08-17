<script setup lang="ts">
import lodash from "lodash";
import { computed, createVNode, shallowReactive } from "vue";
import { style } from "@/utils/UseType";
import { ComponentManage } from "@/draggable/types/ComponentManage";

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
    iconProps?: any;
    /** 使用svg代码图标(优先级最高) */
    svg?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<IconProps>(), {
    componentManage: globalConfig.componentManage,
    iconType: "FontAwesomeIcon",
    iconProps: {
        size: "lg",
        fixedWidth: true,
        icon: ["fas", "star"],
        style: {
            color: "#3B4549",
        },
    },
});

// 定义 State 类型
interface IconState {
}

// state 属性
const state = shallowReactive<IconState>({});

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

function iconComponent(props: any) {
    const { componentManage, iconType, ...otherProps } = props;
    if (!componentManage || !iconType) return;
    const component = componentManage.getComponent(iconType);
    return createVNode(component, otherProps);
}

// 定义组件公开内容
defineExpose({});
</script>

<template>
    <span v-if="useSvg" :style="data.iconWrapperStyle" v-html="props.svg"/>
    <span v-else :style="data.iconWrapperStyle">
        <component
            :is="iconComponent"
            :componentManage="props.componentManage"
            :iconType="props.iconType"
            v-bind="props.iconProps"
        />
    </span>
</template>

<style scoped>

</style>
