<script setup lang="ts">
import { style } from "@/utils/UseType";

// 定义组件选项
defineOptions({
    name: 'RuntimeBlock',
});

/** 字体类型 */
type FontStyle = "" | "outlined" | "round" | "Sharp" | "two-tone" | "symbols-outlined" | "symbols-round" | "symbols-sharp";

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
        {{ props.content }}
    </span>
</template>

<style>
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Outlined';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons-Outlined.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Round';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons-Round.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Sharp';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons-Sharp.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons TwoTone';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons-TwoTone.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 100 700;
    src: url(font/MaterialSymbols-Outlined.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Rounded';
    font-style: normal;
    font-weight: 100 700;
    src: url(font/MaterialSymbols-Rounded.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Sharp';
    font-style: normal;
    font-weight: 100 700;
    src: url(font/MaterialSymbols-Sharp.woff2) format('woff2');
}

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
