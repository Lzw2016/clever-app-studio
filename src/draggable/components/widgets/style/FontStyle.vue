<script setup lang="ts">
import lodash from "lodash";
import { reactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input as TinyInput, Select, Tooltip } from "@opentiny/vue";
import { StyleSetterProps, StyleSetterState } from "@/draggable/types/ComponentMeta";
import { applyStyle, applyStyleDebounceTime, autoUseStyleUnit, getStyle, toStyleUnit, unStyleUnit } from "@/draggable/utils/StyleUtils";
import TextAlignLeft from "@/assets/images/text-align-left.svg?component";
import TextAlignCenter from "@/assets/images/text-align-center.svg?component";
import TextAlignRight from "@/assets/images/text-align-right.svg?component";
import TextAlignJustify from "@/assets/images/text-align-justify.svg?component";
import FontStyleNormal from "@/assets/images/font-style-normal.svg?component";
import FontStyleItalic from "@/assets/images/font-style-italic.svg?component";
import TextDecorationStrike from "@/assets/images/text-decoration-strike.svg?component";
import TextDecorationUnderline from "@/assets/images/text-decoration-underline.svg?component";
import TextDecorationOverline from "@/assets/images/text-decoration-overline.svg?component";

// 定义组件选项
defineOptions({
    name: 'FontStyle',
});

// 定义 Props 类型
interface FontStyleProps extends StyleSetterProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<FontStyleProps>(), {});

// 定义 State 类型
interface FontStyleState extends StyleSetterState {
    fontSize?: string;
    lineHeight?: string;
    readonly style: {
        fontSize?: string;
        lineHeight?: string;
        fontFamily?: string;
        fontWeight?: string;
        color?: string;
        textAlign?: string;
        fontStyle?: string;
        textDecorationLine?: string;
    };
}

// state 属性
const state = reactive<FontStyleState>({
    style: {},
});
// 内部数据
const data = {
    fontFamilyList: [
        { label: 'Arial', value: 'Arial, "Helvetica Neue", Helvetica' },
        { label: 'Bitter', value: 'Bitter' },
        { label: 'Changa One', value: '"Changa One", Impact' },
        { label: 'Droid Sans', value: '"Droid Sans"' },
        { label: 'Droid Serif', value: '"Droid Serif"' },
        { label: 'Exo', value: 'Exo' },
        { label: 'Georgia', value: 'Georgia, Times, "Times New Roman"' },
        { label: 'Great Vibes', value: '"Great Vibes"' },
        { label: 'Impact', value: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal' },
        { label: 'Inconsolata', value: 'Inconsolata' },
        { label: 'Lato', value: 'Lato' },
        { label: 'Merriweather', value: 'Merriweather' },
        { label: 'Montserrat', value: 'Montserrat' },
        { label: 'Open Sans', value: '"Open Sans"' },
        { label: 'Oswald', value: 'Oswald' },
        { label: 'PT Sans', value: '"PT Sans"' },
        { label: 'PT Serif', value: '"PT Serif"' },
        { label: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino' },
        { label: 'Tahoma', value: 'Tahoma, Verdana, Segoe' },
        { label: 'Times New Roman', value: '"Times New Roman", TimesNewRoman, Times, Baskerville, Georgia' },
        { label: 'Trebuchet MS', value: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma' },
        { label: 'Ubuntu', value: 'Ubuntu, Helvetica' },
        { label: 'Varela', value: 'Varela' },
        { label: 'Varela Round', value: '"Varela Round"' },
        { label: 'Verdana', value: 'Verdana, Geneva' },
        { label: 'Vollkorn', value: 'Vollkorn' },
        { label: 'system-ui', value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue"' },
    ],
    fontWeightList: [
        { label: '100-Thin', value: '100' },
        { label: '400-Normal', value: '400' },
        { label: '700-Bold', value: '700' },
        { label: '900-Black', value: '900' },
    ],
    textAlignList: [
        { value: "left", tip: "left(左对齐)", icon: TextAlignLeft },
        { value: "center", tip: "center(居中对齐)", icon: TextAlignCenter },
        { value: "right", tip: "right(右对齐)", icon: TextAlignRight },
        { value: "Justify", tip: "Justify(两侧对齐)", icon: TextAlignJustify },
    ],
    fontStyleList: [
        { value: "normal", tip: "normal(常规)", icon: FontStyleNormal },
        { value: "italic", tip: "italic(斜体)", icon: FontStyleItalic },
    ],
    textDecorationLineList: [
        { value: "line-through", tip: "line-through(删除线)", icon: TextDecorationStrike },
        { value: "underline", tip: "underline(下划线)", icon: TextDecorationUnderline },
        { value: "overline", tip: "overline(上划线)", icon: TextDecorationOverline },
    ],
};

// 选中节点变化后更新 state.style & state
watch(() => props.nodes, () => {
    // 读取 style 信息
    state.style.fontSize = getStyle(props, state, "fontSize");
    state.style.lineHeight = getStyle(props, state, "lineHeight");
    state.style.fontFamily = getStyle(props, state, "fontFamily");
    state.style.fontWeight = getStyle(props, state, "fontWeight");
    state.style.color = getStyle(props, state, "color");
    state.style.textAlign = getStyle(props, state, "textAlign");
    state.style.fontStyle = getStyle(props, state, "fontStyle");
    state.style.textDecorationLine = getStyle(props, state, "textDecorationLine");
    // state.style -> state
    initState();
}, { immediate: true });
// state -> state.style
watch(() => state.fontSize, fontSize => autoUseStyleUnit(state.style, "fontSize", fontSize));
watch(() => state.lineHeight, lineHeight => autoUseStyleUnit(state.style, "lineHeight", lineHeight));
// state.style属性变化后应用 style
const applyStyleFontSize = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleLineHeight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFontFamily = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFontWeight = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleColor = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleTextAlign = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleFontStyle = lodash.debounce(applyStyle, applyStyleDebounceTime);
const applyStyleTextDecorationLine = lodash.debounce(applyStyle, applyStyleDebounceTime);

function initState() {
    state.fontSize = unStyleUnit(state.style.fontSize);
    state.lineHeight = unStyleUnit(state.style.lineHeight);
}

function setStyle(name: string, val?: string) {
    if (state.style[name] === val) {
        delete state.style[name];
        return;
    }
    state.style[name] = val;
    return val;
}

function setTextAlign(val?: string) {
    val = setStyle("textAlign", val);
    applyStyleTextAlign(props, state, "textAlign", val);
}

function setFontStyle(val?: string) {
    val = setStyle("fontStyle", val);
    applyStyleFontStyle(props, state, "fontStyle", val);
}

function setTextDecorationLine(val?: string) {
    val = setStyle("textDecorationLine", val);
    applyStyleTextDecorationLine(props, state, "textDecorationLine", val);
}

function clearColor() {
    delete state.style.color;
    applyStyleColor(props, state, 'color', undefined);
}
</script>

<template>
    <div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="font-size、line-height 属性配置，需手动设置单位：px、em等">
                    <span class="setter-label-tips">字号/行高</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <TinyInput
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.fontSize"
                    size="mini"
                    :clearable="true"
                    placeholder="字号"
                    @change="value => applyStyleFontSize(props, state, 'fontSize', toStyleUnit(value))"
                />
                <span style="margin-left: 12px;"/>
                <TinyInput
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.lineHeight"
                    size="mini"
                    :clearable="true"
                    placeholder="行高"
                    @change="value => applyStyleLineHeight(props, state, 'lineHeight', toStyleUnit(value))"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="font-family、font-weight 属性配置">
                    <span class="setter-label-tips">字体/字重</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <Select
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.style.fontFamily"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.fontFamilyList"
                    size="mini"
                    :clearable="true"
                    placeholder="字体"
                    @change="value => applyStyleFontFamily(props, state, 'fontFamily', value)"
                />
                <span style="margin-left: 12px;"/>
                <Select
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="state.style.fontWeight"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.fontWeightList"
                    size="mini"
                    :clearable="true"
                    placeholder="字重"
                    @change="value => applyStyleFontWeight(props, state, 'fontWeight', value)"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="color 属性配置">
                    <span class="setter-label-tips">文本颜色</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container" style="align-items: center;">
                <input
                    :value="state.style.color ?? '#000000'"
                    @input="e => state.style.color= e.target?.['value']"
                    type="color"
                    @change="event => applyStyleColor(props, state, 'color', event.target?.['value'])"
                />
                <span style="margin-left: 8px;">{{ state.style.color }}</span>
                <FontAwesomeIcon
                    v-show="state.style.color"
                    class="button-clear"
                    :icon="faXmark" title="清除文本颜色"
                    @click="clearColor"
                />
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="text-align 属性配置">
                    <span class="setter-label-tips">文本对齐</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="textAlign in data.textAlignList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': textAlign.value===state.style.textAlign,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setTextAlign(textAlign.value)"
                    :title="textAlign.tip"
                >
                    <component :is="textAlign.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="font-style 属性配置">
                    <span class="setter-label-tips">文本风格</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="fontStyle in data.fontStyleList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': fontStyle.value===state.style.fontStyle,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setFontStyle(fontStyle.value)"
                    :title="fontStyle.tip"
                >
                    <component :is="fontStyle.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
        <div class="flex-row-container setter-row">
            <div class="flex-item-fixed setter-row-label">
                <Tooltip effect="dark" placement="left" content="text-align 属性配置">
                    <span class="setter-label-tips">文本修饰</span>
                </Tooltip>
            </div>
            <div class="flex-item-fill setter-row-input flex-row-container">
                <div
                    v-for="textDecorationLine in data.textDecorationLineList"
                    :class="{
                        'setter-row-input-radio': true,
                        'selected': textDecorationLine.value===state.style.textDecorationLine,
                        'flex-row-container': true,
                        'flex-center': true,
                    }"
                    @click="setTextDecorationLine(textDecorationLine.value)"
                    :title="textDecorationLine.tip"
                >
                    <component :is="textDecorationLine.icon" style="width: 16px; height: 16px;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.setter-label-tips {
    cursor: help;
    text-decoration-line: underline;
    text-decoration-style: dashed;
}

.setter-row {
    height: 24px;
    margin-bottom: 12px;
    align-items: center;
}

.setter-row:last-child {
    margin-bottom: 0;
}

.setter-row-label {
    width: 55px;
}

.setter-row-input {
    overflow: hidden;
}

.setter-row-input-radio {
    padding: 2px 4px;
    margin: 2px 2px;
    cursor: pointer;
    border: 1px solid #c4c6cf;
    box-sizing: border-box;
}

.setter-row-input-radio:first-child {
    margin-left: 0;
}

.setter-row-input-radio:last-child {
    margin-right: 0;
}

.setter-row-input-radio:hover {
    background: #DFE1E6;
}

.setter-row-input-radio.selected {
    fill: #4f77ff;
    color: #4f77ff;
    border: 1px solid #7693F5;
}

.setter-row-input > input[type=color] {
    width: 22px;
    height: 24px;
    border: none;
    background: transparent;
    padding: 0;
    border-radius: 4px;
}

.button-clear {
    margin-left: 4px;
    padding: 2px 4px;
    color: #252b3a;
    cursor: pointer;
}

.button-clear:hover {
    background: #DFE1E6;
    color: #4f77ff;
}
</style>
