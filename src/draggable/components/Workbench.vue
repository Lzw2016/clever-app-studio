<script setup lang="ts">
import { computed, markRaw, onMounted, onUnmounted, reactive } from "vue";
import { Dropdown, DropdownItem, DropdownMenu, UserHead } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRightFromBracket, faLanguage, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { globalThisPolyfill } from "@/utils/GlobalThisPolyfill";
import { style } from "@/utils/UseType";
import SplitPane from "@/components/SplitPane.vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { setDesignerEngine } from "@/draggable/InjectVars";
import { DragDropDriver } from "@/draggable/drivers/DragDropDriver";
import { MouseMoveDriver } from "@/draggable/drivers/MouseMoveDriver";
import { MouseClickDriver } from "@/draggable/drivers/MouseClickDriver";
import { KeyboardDriver } from "@/draggable/drivers/KeyboardDriver";
import { CursorEffect } from "@/draggable/effect/CursorEffect";
import { DraggingEffect } from "@/draggable/effect/DraggingEffect";
import { AuxToolEffect } from "@/draggable/effect/AuxToolEffect";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { MaterialMetaTab } from "@/draggable/types/ComponentMeta";
import DragGhost from "@/draggable/components/widgets/DragGhost.vue";
import PagePanel from "@/draggable/components/widgets/PagePanel.vue";
import MaterialPanel from "@/draggable/components/widgets/MaterialPanel.vue";
import DictPanel from "@/draggable/components/widgets/DictPanel.vue";
import APIPanel from "@/draggable/components/widgets/APIPanel.vue";
import DatabasePanel from "@/draggable/components/widgets/DatabasePanel.vue";
import SettingsPanel from "@/draggable/components/widgets/SettingsPanel.vue";
import WorkspaceTabs from "@/draggable/components/widgets/WorkspaceTabs.vue";
import FolderClosed from "@/assets/images/folder-closed.svg?component";
import Puzzle from "@/assets/images/puzzle.svg?component";
import UnPlug from "@/assets/images/unplug.svg?component";
import Settings from "@/assets/images/settings.svg?component";
import CircleHelp from "@/assets/images/circle-help.svg?component";
import TableProperties from "@/assets/images/table-properties.svg?component";
import ListTree from "@/assets/images/list-tree.svg?component";
import History from "@/assets/images/history.svg?component";
import Database from "@/assets/images/database.svg?component";
import BookMarked from "@/assets/images/book-marked.svg?component";
import KeySvg from "@/assets/images/key.svg?component";
import LogoSvg from "@/assets/images/logo.svg?component";

// 定义组件选项
defineOptions({
    name: 'Workbench',
});

// 定义 Props 类型
interface StudioLayoutProps {
    /** 组件管理器实例 */
    componentManage: ComponentManage;
    /** 物料配置 */
    materialMetaTabs: Array<MaterialMetaTab>;
    /** 顶部导航栏高度 */
    topNavHeight?: string;
    /** 顶部工具栏高度 */
    topToolsHeight?: string;
    /** 底部工具栏高度 */
    bottomToolsHeight?: string;
    /** 左侧面板初始宽度，单位(px) */
    leftPanelDefWidth?: number;
    /** 左侧面板最小宽度，单位(px) */
    leftPanelMinWidth?: number;
    /** 左侧面板最大宽度，单位(px) */
    leftPanelMaxWidth?: number;
    /** 右侧面板初始宽度，单位(px) */
    rightPanelDefWidth?: number;
    /** 右侧面板最小宽度，单位(px) */
    rightPanelMinWidth?: number;
    /** 右侧面板最大宽度，单位(px) */
    rightPanelMaxWidth?: number;
    /** 底部工具栏初始高度，单位(px) */
    bottomPanelDefWidth?: number;
    /** 底部工具栏最小高度，单位(px) */
    bottomPanelMinWidth?: number;
    /** 底部工具栏最大高度，单位(px) */
    bottomPanelMaxWidth?: number;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<StudioLayoutProps>(), {
    topNavHeight: "32px",
    topToolsHeight: "22px",
    bottomToolsHeight: "22px",

    leftPanelDefWidth: 250,
    leftPanelMinWidth: 150,
    leftPanelMaxWidth: 350,

    rightPanelDefWidth: 280,
    rightPanelMinWidth: 220,
    rightPanelMaxWidth: 320,

    bottomPanelDefWidth: 180,
    bottomPanelMinWidth: 50,
    bottomPanelMaxWidth: 300,
});

enum LeftTools {
    /** 页面 */
    Page = "Page",
    /** 物料 */
    Material = "Material",
    /** 字典 */
    Dict = "Dict",
    /** 接口 */
    API = "API",
    /** 数据库 */
    Database = "Database",
}

enum RightTools {
    /** 属性 */
    Props = "Props",
    /** 大纲 */
    Outline = "Outline",
    /** 历史 */
    History = "History",
}

// 定义 State 类型
interface WorkbenchState {
    /** 左侧工具栏 */
    leftTool?: LeftTools;
    /** 右侧工具栏 */
    rightTool?: RightTools;
}

// state 属性
const state = reactive<WorkbenchState>({
    leftTool: LeftTools.Page,
    rightTool: RightTools.Props,
});
// 内部数据
const data = {};
// 工具栏显示状态
const isPage = computed(() => state.leftTool === LeftTools.Page);
const isMaterial = computed(() => state.leftTool === LeftTools.Material);
const isDict = computed(() => state.leftTool === LeftTools.Dict);
const isAPI = computed(() => state.leftTool === LeftTools.API);
const isDatabase = computed(() => state.leftTool === LeftTools.Database);
const isProps = computed(() => state.rightTool === RightTools.Props);
const isOutline = computed(() => state.rightTool === RightTools.Outline);
const isHistory = computed(() => state.rightTool === RightTools.History);

// 设计器引擎
const designerEngine = markRaw(new DesignerEngine({
    componentManage: props.componentManage,
    drivers: [
        DragDropDriver,
        MouseMoveDriver,
        MouseClickDriver,
        KeyboardDriver,
    ],
    effects: [
        CursorEffect,
        DraggingEffect,
        AuxToolEffect,
    ],
}));
setDesignerEngine(designerEngine);
onMounted(() => {
    designerEngine.mount(document, globalThisPolyfill);
});
onUnmounted(() => {
    designerEngine.unmount();
});

function setLeftTool(leftTool?: LeftTools) {
    state.leftTool = leftTool;
}

function setRightTool(rightTool?: RightTools) {
    state.rightTool = rightTool;
}
</script>

<template>
    <DragGhost :designer-engine="designerEngine"/>
    <div class="studio-layout flex-column-container box-border">
        <div
            class="flex-item-fixed flex-row-container top-menus"
            :style="style({ height: props.topNavHeight })"
        >
            <div class="flex-item-fixed flex-row-container" style="align-items: center;">
                <LogoSvg style="width: 22px; height: 22px;"/>
                <div style="font-size: 16px; font-weight: bold; margin-left: 4px; color: #1296db;">DevEase</div>
                <!-- <div style="font-size: 12px; margin-left: 4px;">v1.0.0</div> -->
            </div>
            <div class="flex-item-fill"></div>
            <!-- <div class="flex-item-fixed">关于</div> -->
            <div class="flex-item-fixed" style="width: 16px;"></div>
            <Dropdown class="flex-item-fixed" :show-icon="true" trigger="hover">
                <div class="flex-row-container" style="align-items: center;">
                    <FontAwesomeIcon :icon="faLanguage" :fixed-width="true" style="font-size: 18px; color: #183153"/>
                    <div style="margin-left: 4px;">中文(zh-CN)</div>
                </div>
                <template #dropdown>
                    <DropdownMenu>
                        <DropdownItem>中文(zh-CN)</DropdownItem>
                        <DropdownItem>英文(en-US)</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
            <div class="flex-item-fixed" style="width: 16px;"></div>
            <Dropdown class="flex-item-fixed" :show-icon="false" trigger="hover">
                <div class="flex-row-container user-info-menu">
                    <UserHead class="flex-item-fixed user-icon" type="icon" :min="true" :round="true">
                        <FontAwesomeIcon :icon="faUserLarge" :fixed-width="true"/>
                    </UserHead>
                    <div class="flex-item-fill user-name">管理员</div>
                </div>
                <template #dropdown>
                    <DropdownMenu>
                        <DropdownItem>
                            <FontAwesomeIcon :icon="faUser" :fixed-width="true"/>
                            用户设置
                        </DropdownItem>
                        <DropdownItem>
                            <KeySvg stroke-width="1.8" style="width: 12px; height: 12px;margin: 0 2px;"/>
                            重置密码
                        </DropdownItem>
                        <DropdownItem>
                            <FontAwesomeIcon :icon="faArrowRightFromBracket" :fixed-width="true"/>
                            退出登录
                        </DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>
        <div
            class="flex-item-fixed flex-row-container box-border-t"
            :style="style({ height: props.topToolsHeight, display: 'none' })"
        >
            <div class="flex-item-fixed box-border-r" style="width: 128px;">当前叶签信息</div>
            <div class="flex-item-fill"></div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">功能</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">功能</div>
        </div>
        <div class="flex-item-fill flex-row-container box-border">
            <div class="flex-item-fixed flex-column-container left-tools">
                <div class="flex-item-fixed" style="height: 8px;"></div>
                <div
                    class="flex-item-fixed left-tools-button"
                    :class="{'left-tools-button-active': isPage}"
                    title="页面"
                    @click="setLeftTool(LeftTools.Page)"
                >
                    <FolderClosed/>
                </div>
                <div
                    class="flex-item-fixed left-tools-button"
                    title="物料"
                    :class="{'left-tools-button-active': isMaterial}"
                    @click="setLeftTool(LeftTools.Material)"
                >
                    <Puzzle/>
                </div>
                <div
                    class="flex-item-fixed left-tools-button"
                    title="字典"
                    :class="{'left-tools-button-active': isDict}"
                    @click="setLeftTool(LeftTools.Dict)"
                >
                    <BookMarked/>
                </div>
                <div
                    class="flex-item-fixed left-tools-button"
                    title="接口"
                    :class="{'left-tools-button-active': isAPI}"
                    @click="setLeftTool(LeftTools.API)"
                >
                    <UnPlug/>
                </div>
                <div
                    class="flex-item-fixed left-tools-button"
                    title="数据库"
                    :class="{'left-tools-button-active': isDatabase}"
                    @click="setLeftTool(LeftTools.Database)"
                >
                    <Database/>
                </div>
                <div class="flex-item-fill"></div>
                <div class="flex-item-fixed left-tools-button" title="帮助">
                    <CircleHelp/>
                </div>
                <div class="flex-item-fixed left-tools-button" title="设置">
                    <Settings/>
                </div>
                <div class="flex-item-fixed" style="height: 8px;"></div>
            </div>
            <SplitPane
                class="flex-item-fill box-border-lr"
                style="height: 100%;"
                layout="V"
                fixed-pane="two"
                :fixed-pane-def-size="props.bottomPanelDefWidth"
                :fixed-pane-min-size="props.bottomPanelMinWidth"
                :fixed-pane-max-size="props.bottomPanelMaxWidth"
                :two-collapse="true"
                def-collapsed="two"
                :custom-one-pane="true"
            >
                <template #onePane="slotProps">
                    <SplitPane
                        v-bind="slotProps"
                        style="height: 100%;"
                        layout="H"
                        :fixed-pane-def-size="props.leftPanelDefWidth"
                        :fixed-pane-min-size="props.leftPanelMinWidth"
                        :fixed-pane-max-size="props.leftPanelMaxWidth"
                        :one-collapse="true"
                        :custom-two-pane="true"
                    >
                        <template #onePane>
                            <PagePanel v-show="isPage"/>
                            <MaterialPanel v-show="isMaterial" :designer-engine="designerEngine" :tabs="props.materialMetaTabs"/>
                            <DictPanel v-show="isDict"/>
                            <APIPanel v-show="isAPI"/>
                            <DatabasePanel v-show="isDatabase"/>
                        </template>
                        <template #twoPane="slotProps">
                            <SplitPane
                                v-bind="slotProps"
                                style="height: 100%;overflow: hidden;"
                                layout="H"
                                fixed-pane="two"
                                :fixed-pane-def-size="props.rightPanelDefWidth"
                                :fixed-pane-min-size="props.rightPanelMinWidth"
                                :fixed-pane-max-size="props.rightPanelMaxWidth"
                                :two-collapse="true"
                            >
                                <template #onePane>
                                    <WorkspaceTabs :designer-engine="designerEngine"/>
                                </template>
                                <template #twoPane>
                                    <SettingsPanel :designer-engine="designerEngine"/>
                                </template>
                            </SplitPane>
                        </template>
                    </SplitPane>
                </template>
                <template #twoPane>
                    <div style="height: 800px;"></div>
                </template>
            </SplitPane>
            <div class="flex-item-fixed flex-column-container right-tools">
                <div
                    class="flex-item-fixed right-tools-button"
                    title="属性"
                    :class="{'right-tools-button-active': isProps}"
                >
                    <TableProperties/>
                </div>
                <div
                    class="flex-item-fixed right-tools-button"
                    title="大纲"
                    :class="{'right-tools-button-active': isOutline}"
                >
                    <ListTree/>
                </div>
                <div
                    class="flex-item-fixed right-tools-button"
                    title="历史"
                    :class="{'right-tools-button-active': isHistory}"
                >
                    <History/>
                </div>
                <div class="flex-item-fill"></div>
                <div class="flex-item-fixed right-tools-button" style="display: none;"></div>
            </div>
        </div>
        <div class="flex-item-fixed flex-row-container" :style="style({ height: props.bottomToolsHeight, display: 'none' })">
            <div class="flex-item-fixed box-border-r" style="width: 48px;">指示1</div>
            <div class="flex-item-fixed box-border-r" style="width: 48px;">指示2</div>
            <div class="flex-item-fill"></div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">状态1</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">状态2</div>
            <div class="flex-item-fixed box-border-l" style="width: 48px;">设置</div>
        </div>
    </div>
</template>

<style scoped>
.studio-layout {
    height: 100%;
    width: 100%;
    user-select: none;
}

.flex-column-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

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

.box-border {
    border: 1px solid #ccc;
}

.box-border-l {
    border-left: 1px solid #ccc;
}

.box-border-r {
    border-right: 1px solid #ccc;
}

.box-border-lr {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.box-border-t {
    border-top: 1px solid #ccc;
}

.box-border-b {
    border-bottom: 1px solid #ccc;
}

.box-border-tb {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.top-menus {
    align-items: center;
    margin: 0 8px;
}

.user-info-menu {
    align-items: center;
}

.user-icon > :deep(div) {
    height: 24px;
    width: 24px;
    line-height: 24px;
}

.user-name {
    margin-left: 4px;
}

.left-tools {
    height: 100%;
    width: 32px;
    align-items: center;
}

.left-tools-button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    margin: 4px 0;
}

.left-tools-button > svg {
    stroke-width: 2;
    width: 18px;
    height: 18px;
}

.left-tools-button:hover {
    background-color: #f0f0f0;
}

.left-tools-button-active {
    color: #1476ff;
    background-color: #f0f0f0;
}

.right-tools {
    height: 100%;
    width: 32px;
    align-items: center;
}

.right-tools-button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    margin: 4px 0;
}

.right-tools-button > svg {
    stroke-width: 2;
    width: 18px;
    height: 18px;
}

.right-tools-button:hover {
    background-color: #f0f0f0;
}

.right-tools-button-active {
    color: #1476ff;
    background-color: #f0f0f0;
}

/* --------------------------------------------------------- 三方组件样式 --------------------------------------------------------- */

.block-modal :deep(.tiny-modal__box .tiny-modal__body .tiny-modal__content) {
    padding: 8px 0 16px 0;
}

.top-menus :deep(.tiny-dropdown) {
    color: unset;
}
</style>
