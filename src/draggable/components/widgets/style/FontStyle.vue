<script setup lang="ts">
import { defineModel, reactive, shallowReactive, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input, Select, Tooltip } from "@opentiny/vue";
import TextAlignLeft from "@/assets/images/text-align-left.svg?component";
import TextAlignCenter from "@/assets/images/text-align-center.svg?component";
import TextAlignRight from "@/assets/images/text-align-right.svg?component";
import TextAlignJustify from "@/assets/images/text-align-justify.svg?component";
import FontStyleNormal from "@/assets/images/font-style-normal.svg?component";
import FontStyleItalic from "@/assets/images/font-style-italic.svg?component";
import TextDecorationStrike from "@/assets/images/text-decoration-strike.svg?component";
import TextDecorationUnderline from "@/assets/images/text-decoration-underline.svg?component";
import TextDecorationOverline from "@/assets/images/text-decoration-overline.svg?component";
import { autoUseStyleUnit } from "@/draggable/utils/StyleUtils";

// 定义组件选项
defineOptions({
    name: 'FontStyle',
});

// 定义 Props 类型
interface FontStyleProps {
}

// 读取组件 props 属性
const props = withDefaults(defineProps<FontStyleProps>(), {});

// 定义 State 类型
interface FontStyleState {
    fontSize?: string;
    lineHeight?: string;
}

// state 属性
const state = reactive<FontStyleState>({});
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

interface FontStyleModel {
    fontSize?: string;
    lineHeight?: string;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
    fontStyle?: string;
    textDecorationLine?: string;
}

// css display 值
const model = defineModel<FontStyleModel>({
    default: shallowReactive<FontStyleModel>({}),
});

// 初始化
if (model.value) {
    // TODO model -> state
}

watch(() => state.fontSize, value => autoUseStyleUnit(model.value, "fontSize", value));
watch(() => state.lineHeight, value => autoUseStyleUnit(model.value, "lineHeight", value));

function setStyleConfig(name: string, val: string) {
    if (model.value?.[name] === val) {
        delete model.value[name];
        return;
    }
    model.value[name] = val;
}

function setTextAlign(val: string) {
    setStyleConfig("textAlign", val);
}

function setFontStyle(val: string) {
    setStyleConfig("fontStyle", val);
}

function setTextDecorationLine(val: string) {
    setStyleConfig("textDecorationLine", val);
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
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.fontSize" size="mini" :clearable="true" placeholder="字号"/>
                <span style="margin-left: 12px;"/>
                <Input class="flex-item-fill" style="min-width: 60px;" v-model="state.lineHeight" size="mini" :clearable="true" placeholder="行高"/>
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
                    v-model="model.fontFamily"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.fontFamilyList"
                    size="mini"
                    :clearable="true"
                    placeholder="字体"
                />
                <span style="margin-left: 12px;"/>
                <Select
                    class="flex-item-fill"
                    style="min-width: 60px;"
                    v-model="model.fontWeight"
                    :filterable="true"
                    :allow-create="true"
                    :options="data.fontWeightList"
                    size="mini"
                    :clearable="true"
                    placeholder="字重"
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
                <input v-model="model.color" type="color"/>
                <span style="margin-left: 8px;">{{ model.color }}</span>
                <FontAwesomeIcon v-if="model.color" class="button-clear" :icon="faXmark" title="清除" @click="delete model.color"/>
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
                            'selected': textAlign.value===model.textAlign,
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
                            'selected': fontStyle.value===model.fontStyle,
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
                            'selected': textDecorationLine.value===model.textDecorationLine,
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
