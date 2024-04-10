<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { style } from "@/utils/UseType";

// 定义组件选项
defineOptions({
    name: 'GoogleIcon',
});

/** 字体类型 */
type FontStyle = "outlined" | "round" | "sharp" | "two-tone" | "symbols-outlined" | "symbols-round" | "symbols-sharp" | "";

// 定义 Props 类型
interface GoogleIconProps {
    /** 图标内容 */
    content: string;
    /** 图标大小，同：font-size */
    size?: number;
    /** 字体类型 */
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
// 图标样式
const styleObj = computed(()=> {
    const obj: CSSProperties = {
        "font-variation-settings": `"FILL" ${props.fill ? 1 : 0}, "wght" ${props.weight}, "GRAD" ${props.grade}, "opsz" ${props.opticalSize}`,
    };
    if(props.size) obj.fontSize = `${props.size}px`;
    if(props.size) obj.width = `${props.size}px`;
    if(props.color) obj.color = props.color;
    return obj;
});
</script>

<template>
    <span
        :style='styleObj'
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
    src: url(../../public/font/MaterialIcons.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Outlined';
    font-style: normal;
    font-weight: 400;
    src: url(../../public/font/MaterialIcons-Outlined.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Round';
    font-style: normal;
    font-weight: 400;
    src: url(../../public/font/MaterialIcons-Round.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons Sharp';
    font-style: normal;
    font-weight: 400;
    src: url(../../public/font/MaterialIcons-Sharp.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Icons TwoTone';
    font-style: normal;
    font-weight: 400;
    src: url(../../public/font/MaterialIcons-TwoTone.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 100 700;
    src: url(../../public/font/MaterialSymbols-Outlined.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Rounded';
    font-style: normal;
    font-weight: 100 700;
    src: url(../../public/font/MaterialSymbols-Rounded.woff2) format('woff2');
}

@font-face {
    font-family: 'Material Symbols Sharp';
    font-style: normal;
    font-weight: 100 700;
    src: url(../../public/font/MaterialSymbols-Sharp.woff2) format('woff2');
}

/*noinspection ALL*/
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    /* Preferred icon size */
    font-size: 16px;
    width: 16px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
