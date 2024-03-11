<script setup lang="ts">
import { onMounted, ref } from "vue";
import { style } from "@/utils/UseType";

// 定义组件选项
defineOptions({
    name: 'RuntimeBlock',
});

/** 字体类型 */
type FontStyle = "" | "outlined" | "round" | "sharp" | "two-tone" | "symbols-outlined" | "symbols-round" | "symbols-sharp";

// 定义 Props 类型
interface GoogleIconProps {
    /** 图标内容 */
    content: string;
    /** 图标大小，同：font-size */
    size?: number;
    /**  */
    fontStyle?: FontStyle;
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
}

// 读取组件 props 属性
const props = withDefaults(defineProps<GoogleIconProps>(), {
    size: 16,
    fill: false,
    weight: 400,
    grade: 0,
    opticalSize: 24,
});

// 是否已加载字体
const loadFonts = ref(false);

onMounted(() => {
    let loader: Promise<any>;
    if (props.fontStyle === 'outlined') {
        loader = import('@/assets/font-material-icons-outlined.css');
    } else if (props.fontStyle === 'round') {
        loader = import('@/assets/font-material-icons-round.css');
    } else if (props.fontStyle === 'sharp') {
        loader = import('@/assets/font-material-icons-sharp.css');
    } else if (props.fontStyle === 'two-tone') {
        loader = import('@/assets/font-material-icons-two-tone.css');
    } else if (props.fontStyle === 'symbols-outlined') {
        loader = import('@/assets/font-material-symbols-outlined.css');
    } else if (props.fontStyle === 'symbols-round') {
        loader = import('@/assets/font-material-symbols-round.css');
    } else if (props.fontStyle === 'symbols-sharp') {
        loader = import('@/assets/font-material-symbols-sharp.css');
    } else {
        loader = import('@/assets/font-material-icons.css');
    }
    loader.finally(() => loadFonts.value = true);
});
</script>

<template>
    <span
        :style='style({
            fontSize: `${props.size}px`,
            color: props.color,
            "font-variation-settings": `"FILL" ${props.fill ? 1 : 0}, "wght" ${props.weight}, "GRAD" ${props.grade}, "opsz" ${props.opticalSize}`,
        })'
        :class="{
            'material-icons': true,
            'outlined': props.fontStyle === 'outlined',
            'round': props.fontStyle === 'round',
            'sharp': props.fontStyle === 'sharp',
            'two-tone': props.fontStyle === 'two-tone',
            'symbols-outlined': props.fontStyle === 'symbols-outlined',
            'symbols-round': props.fontStyle === 'symbols-round',
            'symbols-sharp': props.fontStyle === 'symbols-sharp',
        }"
    >
        {{ loadFonts ? props.content : '' }}
    </span>
</template>

<style>
/*noinspection ALL*/
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    /* Preferred icon size */
    font-size: 16px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
    /* Support for IE. */
    font-feature-settings: 'liga';
}

/*noinspection ALL*/
.material-icons.outlined {
    font-family: 'Material Icons Outlined';
}

/*noinspection ALL*/
.material-icons.round {
    font-family: 'Material Icons Round';
}

/*noinspection ALL*/
.material-icons.sharp {
    font-family: 'Material Icons Sharp';
}

/*noinspection ALL*/
.material-icons.two-tone {
    font-family: 'Material Icons TwoTone';
}

/*noinspection ALL*/
.material-icons.symbols-outlined {
    font-family: 'Material Symbols Outlined';
}

/*noinspection ALL*/
.material-icons.symbols-round {
    font-family: 'Material Symbols Rounded';
}

/*noinspection ALL*/
.material-icons.symbols-sharp {
    font-family: 'Material Symbols Sharp';
}
</style>
