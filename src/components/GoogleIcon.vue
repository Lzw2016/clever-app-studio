<script setup lang="ts">
import { computed, CSSProperties, reactive } from "vue";
import { loadFont, LoadFontFaceInfo } from "@/draggable/utils/LoadFont";

// 定义组件选项
defineOptions({
    name: 'GoogleIcon',
});

/** 字体类型 */
type FontStyle = "outlined" | "round" | "sharp" | "two-tone" | "symbols-outlined" | "symbols-round" | "symbols-sharp" | "";

// 定义 Props 类型
interface GoogleIconProps {
    /** 字体文件url前缀 */
    fontUrlPrefix?: string;
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
    fontUrlPrefix: "/font",
    size: 16,
    fill: false,
    weight: 400,
    grade: 0,
    opticalSize: 24,
});
// state 属性
const state = reactive({
    /** 字体是否加载完成 */
    fontLoaded: false,
});
// 图标样式
const styleObj = computed(() => {
    const obj: CSSProperties = {
        "font-variation-settings": `"FILL" ${props.fill ? 1 : 0}, "wght" ${props.weight}, "GRAD" ${props.grade}, "opsz" ${props.opticalSize}`,
    };
    if (props.size) obj.fontSize = `${props.size}px`;
    if (props.size) obj.width = `${props.size}px`;
    if (props.color) obj.color = props.color;
    return obj;
});

async function dynamicLoadFont() {
    let loadFontFaceInfo: LoadFontFaceInfo | undefined;
    switch (props.fontStyle) {
        case "outlined":
            loadFontFaceInfo = await loadFont({
                family: "Material Icons Outlined",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialIcons-Outlined.woff2`,
                descriptors: {
                    weight: "400",
                    style: "normal",
                },
            });
            break;
        case "round":
            loadFontFaceInfo = await loadFont({
                family: "Material Icons Round",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialIcons-Round.woff2`,
                descriptors: {
                    weight: "400",
                    style: "normal",
                },
            });
            break;
        case "sharp":
            loadFontFaceInfo = await loadFont({
                family: "Material Icons Sharp",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialIcons-Sharp.woff2`,
                descriptors: {
                    weight: "400",
                    style: "normal",
                },
            });
            break;
        case "two-tone":
            loadFontFaceInfo = await loadFont({
                family: "Material Icons TwoTone",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialIcons-TwoTone.woff2`,
                descriptors: {
                    weight: "400",
                    style: "normal",
                },
            });
            break;
        case "symbols-outlined":
            loadFontFaceInfo = await loadFont({
                family: "Material Symbols Outlined",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialSymbols-Outlined.woff2`,
                descriptors: {
                    weight: "100 700",
                    style: "normal",
                },
            });
            break;
        case "symbols-round":
            loadFontFaceInfo = await loadFont({
                family: "Material Symbols Rounded",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialSymbols-Rounded.woff2`,
                descriptors: {
                    weight: "100 700",
                    style: "normal",
                },
            });
            break;
        case "symbols-sharp":
            loadFontFaceInfo = await loadFont({
                family: "Material Symbols Sharp",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialSymbols-Sharp.woff2`,
                descriptors: {
                    weight: "100 700",
                    style: "normal",
                },
            });
            break;
        default:
            loadFontFaceInfo = await loadFont({
                family: "Material Icons",
                srcUrl: `${props.fontUrlPrefix ?? ''}/MaterialIcons.woff2`,
                descriptors: {
                    weight: "400",
                    style: "normal",
                },
            });
            break;
    }
    if (loadFontFaceInfo?.load) {
        await loadFontFaceInfo.load;
    }
}

dynamicLoadFont().finally(() => state.fontLoaded = true);
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
        <template v-if="state.fontLoaded">
            {{ props.content }}
        </template>
    </span>
</template>

<style>
/*
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
*/

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
