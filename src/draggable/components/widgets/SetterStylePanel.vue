<script setup lang="ts">
import lodash from "lodash";
import { computed, getCurrentInstance, nextTick, reactive, ref, watch } from "vue";
import { Collapse, CollapseItem } from "@opentiny/vue";
import { overwriteProperty, removeNullProperty } from "@/utils/Utils";
import { isStr, noValue } from "@/utils/Typeof";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { DesignerState } from "@/draggable/models/DesignerState";
import { SetterState } from "@/draggable/models/SetterState";
import { StylePanel } from "@/draggable/types/ComponentMeta";
import ComponentStyles from "@/draggable/components/widgets/style/ComponentStyles.vue";
import LayoutStyle from "@/draggable/components/widgets/style/LayoutStyle.vue";
import FlexStyle from "@/draggable/components/widgets/style/FlexStyle.vue";
import GridStyle from "@/draggable/components/widgets/style/GridStyle.vue";
import SpacingStyle from "@/draggable/components/widgets/style/SpacingStyle.vue";
import SizeStyle from "@/draggable/components/widgets/style/SizeStyle.vue";
import PositionStyle from "@/draggable/components/widgets/style/PositionStyle.vue";
import FontStyle from "@/draggable/components/widgets/style/FontStyle.vue";
import BorderStyle from "@/draggable/components/widgets/style/BorderStyle.vue";
import EffectStyle from "@/draggable/components/widgets/style/EffectStyle.vue";
import { RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { toObjectStyle } from "@/draggable/utils/StyleUtils";

// 定义组件选项
defineOptions({
    name: 'SetterStylePanel',
});

// 当前组件对象
const instance = getCurrentInstance();

// 定义 Props 类型
interface SetterStylePanelProps {
    /** 设计器引擎 */
    designerEngine: DesignerEngine;
    /** 设计器状态数据 */
    designerState: DesignerState;
    /** 设计器的组件配置面板状态 */
    setterState: SetterState;
    /** 样式设置器面板 */
    stylePanel: StylePanel;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<SetterStylePanelProps>(), {});

// 定义 State 类型
interface SetterStylePanelState {
    class?: string;
    style: Record<string, any>;
}

// state 属性
const state = reactive<SetterStylePanelState>({
    class: undefined,
    style: {},
});
// 内部数据
const data = {
    // 选中节点发生变化导致的 style 变化
    nodeStyleChange: false,
    // 选中节点发生变化导致的 class 变化
    nodeClassChange: false,
};

const firstSelectNode = computed(() => getFirstSelectNode(props.designerState.selectNodes));

const propsStyle = computed(() => {
    data.nodeStyleChange = true;
    const node = firstSelectNode.value;
    if (!node) return;
    return node.props.style;
});

const propsClass = computed(() => {
    data.nodeClassChange = true;
    const node = firstSelectNode.value;
    if (!node) return [];
    const rawClass = node.__raw_props_class;
    const pClass = node.props.class;
    return [rawClass, pClass];
});

const componentStylesRef = ref<InstanceType<typeof ComponentStyles> | undefined>();
const layoutStyleRef = ref<InstanceType<typeof LayoutStyle> | undefined>();
const flexStyleRef = ref<InstanceType<typeof FlexStyle> | undefined>();
const gridStyleRef = ref<InstanceType<typeof GridStyle> | undefined>();
const spacingStyleRef = ref<InstanceType<typeof SpacingStyle> | undefined>();
const sizeStyleRef = ref<InstanceType<typeof SizeStyle> | undefined>();
const positionStyleRef = ref<InstanceType<typeof PositionStyle> | undefined>();
const fontStyleRef = ref<InstanceType<typeof FontStyle> | undefined>();
const borderStyleRef = ref<InstanceType<typeof BorderStyle> | undefined>();
const effectStyleRef = ref<InstanceType<typeof EffectStyle> | undefined>();
watch(() => propsStyle.value, style => {
    style = toObjectStyle(style);
    const styleProperties = [
        // LayoutStyle
        "display", "flexDirection", "flexWrap", "justifyContent", "alignContent", "justifyItems", "alignItems",
        "gridTemplateColumns", "gridTemplateRows", "gridColumnGap", "gridRowGap", "gridAutoFlow",
        // FlexStyle
        "flexGrow", "flexShrink", "alignSelf",
        // GridStyle
        "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "justifySelf", "alignSelf",
        // SpacingStyle
        "marginTop", "marginRight", "marginBottom", "marginLeft", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
        // SizeStyle
        "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "overflow", "objectFit", "objectPosition",
        // PositionStyle
        "position", "top", "right", "bottom", "left", "float", "clear", "zIndex",
        // FontStyle
        "fontSize", "lineHeight", "fontFamily", "fontWeight", "color", "textAlign", "fontStyle", "textDecorationLine",
        // BorderStyle
        "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
        "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle",
        "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
        "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
        // EffectStyle
        "cursor", "backgroundColor", "opacity",
    ];
    for (let property of styleProperties) {
        state.style[property] = style[property];
    }
    modelToState();
}, { immediate: true });
watch(() => propsClass.value, ([rawClass, pClass]) => {
    let newClass: string | undefined;
    if (noValue(rawClass)) {
        newClass = undefined;
    } else if (isStr(pClass) && isStr(rawClass) && pClass.startsWith(rawClass)) {
        newClass = pClass.substring(rawClass.length).trim();
    } else {
        newClass = pClass;
    }
    state.class = newClass;
}, { immediate: true });

const applyStyleDebounce = lodash.debounce((nodes: Array<RuntimeNode>, newStyle: object) => applyStyle(nodes, newStyle), 300);
watch(state.style, style => {
    if (data.nodeStyleChange) {
        data.nodeStyleChange = false;
        return;
    }
    applyStyleDebounce([...props.designerState.selectNodes], style);
});

const applyClassDebounce = lodash.debounce((nodes: Array<RuntimeNode>, newClass?: string) => applyClass(nodes, newClass), 300);
watch(() => state.class, pClass => applyClassDebounce([...props.designerState.selectNodes], pClass));

function getFirstSelectNode(nodes: Array<RuntimeNode>) {
    const types = new Set<any>();
    for (let node of nodes) {
        types.add(node.type);
    }
    if (types.size !== 1) return;
    return nodes[0];
}

function applyStyle(nodes: Array<RuntimeNode>, newStyle: object) {
    newStyle = removeNullProperty(newStyle);
    forEachSelectNodes(nodes, node => {
        if (!node.__raw_props_style) node.__raw_props_style = toObjectStyle(node.props.style);
        node.props.style = { ...node.__raw_props_style, ...newStyle };
    });
}

function applyClass(nodes: Array<RuntimeNode>, newClass?: string) {
    const noneClass = "__$_none_class";
    forEachSelectNodes(nodes, node => {
        if (!node.__raw_props_class) node.__raw_props_class = node.props.class ?? noneClass;
        node.props.class = [node.__raw_props_class, newClass].filter(item => !!item && item !== noneClass).join(" ");
    });
}

function forEachSelectNodes(nodes: Array<RuntimeNode>, each: (node: RuntimeNode) => void) {
    const designerState = props.designerState;
    const blockInstance = props.designerState.blockInstance;
    let res = false;
    if (!nodes || !designerState || !blockInstance) return res;
    for (let node of nodes) {
        each(node);
        res = true;
    }
    if (res) {
        blockInstance.$forceUpdate();
        blockInstance.$nextTick(() => {
            for (let selection of designerState.selections) {
                selection.recalcAuxToolPosition();
            }
        }).finally();
    }
}

function modelToState() {
    const doModelToState = () => {
        layoutStyleRef.value?.modelToState();
        flexStyleRef.value?.modelToState();
        gridStyleRef.value?.modelToState();
        spacingStyleRef.value?.modelToState();
        sizeStyleRef.value?.modelToState();
        positionStyleRef.value?.modelToState();
        fontStyleRef.value?.modelToState();
        borderStyleRef.value?.modelToState();
        effectStyleRef.value?.modelToState();
    };
    if (componentStylesRef.value) {
        doModelToState();
    } else {
        nextTick(doModelToState).finally();
    }
}

function updateStyle(style: Record<string, any>) {
    overwriteProperty(state.style, style);
    modelToState();
}
</script>

<template>
    <div class="settings-groups flex-column-container">
        <Collapse class="flex-item-fill settings-content" v-model="props.setterState.expandGroups['style']">
            <CollapseItem v-if="firstSelectNode" class="settings-items" name="渲染节点" title="渲染节点">
                <ComponentStyles
                    ref="componentStylesRef"
                    v-model="state.class"
                    :node="firstSelectNode"
                    :component-styles="props.stylePanel.componentStyles"
                    @update-style="updateStyle"
                />
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableLayout!==true" class="settings-items" name="布局(容器)" title="布局(容器)">
                <LayoutStyle ref="layoutStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableLayout!==true" class="settings-items" name="布局(元素)" title="布局(元素)">
                <FlexStyle ref="flexStyleRef" v-model="state.style"/>
                <div style="height: 12px;"/>
                <GridStyle ref="gridStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSpacing!==true" class="settings-items" name="间距" title="间距">
                <SpacingStyle ref="spacingStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableSize!==true" class="settings-items" name="尺寸" title="尺寸">
                <SizeStyle ref="sizeStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disablePosition!==true" class="settings-items" name="定位" title="定位">
                <PositionStyle ref="positionStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableFont!==true" class="settings-items" name="文本" title="文本">
                <FontStyle ref="fontStyleRef" v-model="state.style"/>
            </CollapseItem>
            <!-- <CollapseItem class="settings-items" name="背景" title="背景"> -->
            <!-- </CollapseItem> -->
            <CollapseItem v-if="props.stylePanel.disableBorder!==true" class="settings-items" name="边框" title="边框">
                <BorderStyle ref="borderStyleRef" v-model="state.style"/>
            </CollapseItem>
            <CollapseItem v-if="props.stylePanel.disableEffect!==true" class="settings-items" name="效果" title="效果">
                <EffectStyle ref="effectStyleRef" v-model="state.style"/>
            </CollapseItem>
        </Collapse>
    </div>
</template>

<style scoped>
.settings-groups {
    height: 100%;
    overflow: hidden;
}

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.flex-item-fill {
    flex-grow: 1;
    overflow: hidden;
}

.settings-content {
    height: 100%;
    overflow: auto;
    border-top: none;
    border-bottom: none;
    min-height: 80px;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.settings-content :deep(.tiny-collapse-item) {
    margin-top: 0;
    border: none;
}

.settings-items :deep(.tiny-collapse-item__header) {
    background-color: #efefef;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #d9d9d9;
}

.settings-items :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    padding: 8px 4px 8px 12px;
}

.settings-items:last-child :deep(.tiny-collapse-item__wrap .tiny-collapse-item__content) {
    border-bottom: none;
}

.settings-items :deep(.tiny-form-item) {
    margin-bottom: 12px;
}

.settings-items :deep(.tiny-form-item:last-child) {
    margin-bottom: 0;
}

.settings-items :deep(.tiny-form-item .tiny-form-item__label) {
    font-size: 12px;
}
</style>
