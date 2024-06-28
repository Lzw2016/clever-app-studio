<script setup lang="ts">
import { reactive } from "vue";
import { Input, Tree } from "@opentiny/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import type { editor } from "monaco-editor";
import MonacoEditor, { MonacoType } from "@/components/MonacoEditor.vue";
import SplitPane from "@/components/SplitPane.vue";

// 定义组件选项
defineOptions({
    name: 'EventEditor',
});

// 定义 Props 类型
interface EventEditorProps {

}

// 读取组件 props 属性
const props = withDefaults(defineProps<EventEditorProps>(), {});

// 定义 State 类型
interface EventEditorState {

}

// state 属性
const state = reactive<EventEditorState>({
    show: false,
});
// 内部数据
const data = {
    aaa: [
        {
            id: '1',
            label: '数据 1',
            children: [
                { id: '1-1', label: '数据 1-1', children: [{ id: '1-1-1', label: '数据 1-1-1' }] },
                { id: '1-2', label: '数据 1-2' }
            ]
        },
        {
            id: '2',
            label: '数据 2',
            children: [
                { id: '2-1', label: '数据 2-1' },
                { id: '2-2', label: '数据 2-2' }
            ]
        },
        {
            id: '3',
            label: '数据 3',
            children: [{ id: '3-1', label: '数据 3-1' }]
        },
        {id: '4',label: '数据 4'},
        {id: '5',label: '数据 5'},
        {id: '6',label: '数据 6'},
        {id: '7',label: '数据 7'},
        {id: '8',label: '数据 8'},
        {id: '9',label: '数据 9'},
        {id: '10',label: '数据 10'},
        {id: '11',label: '数据 11'},
        {id: '12',label: '数据 12'},
        {id: '13',label: '数据 13'},
        {id: '14',label: '数据 14'},
        {id: '15',label: '数据 15'},
        {id: '16',label: '数据 16'},
        {id: '17',label: '数据 17'},
        {id: '18',label: '数据 18'},
        {id: '19',label: '数据 19'},
        {id: '20',label: '数据 20'},
        {id: '21',label: '数据 21'},
        {id: '22',label: '数据 22'},
        {id: '23',label: '数据 23'},
        {id: '24',label: '数据 24'},
        {id: '25',label: '数据 25'},
        {id: '26',label: '数据 26'},
        {id: '27',label: '数据 27'},
        {id: '28',label: '数据 28'},
        {id: '29',label: '数据 29'},
        {id: '30',label: '数据 30'},
        {id: '31',label: '数据 31'},
        {id: '32',label: '数据 32'},
        {id: '33',label: '数据 33'},
        {id: '34',label: '数据 34'},
        {id: '35',label: '数据 35'},
        {id: '36',label: '数据 36'},
        {id: '37',label: '数据 37'},
        {id: '38',label: '数据 38'},
        {id: '39',label: '数据 39'},
        {id: '40',label: '数据 40'},
        {id: '41',label: '数据 41'},
        {id: '42',label: '数据 42'},
    ],
};

function initEditor(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {

}

interface EventEditorExpose {

}

defineExpose<EventEditorExpose>({

});
</script>

<template>
    <SplitPane
        class="event-container"
        style="height: 100%;"
        layout="H"
        fixed-pane="one"
        :fixed-pane-def-size="200"
        :fixed-pane-min-size="100"
        :fixed-pane-max-size="300"
        :one-collapse="true"
        :two-collapse="false"
        :custom-two-pane="true"
    >
        <template #onePane>
            <div class="flex-column-container none-select" style="height: 100%;">
                <div class="flex-item-fixed panel-title">
                    大纲树
                </div>
                <Tree
                    class="flex-item-fill"
                    :data="data.aaa"
                    :show-line="false"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    size="small"
                />
                <!--current-node-key-->
            </div>
        </template>
        <template #twoPane="slotProps">
            <SplitPane
                v-bind="slotProps"
                style="height: 100%;overflow: hidden;"
                class="none-select"
                layout="H"
                fixed-pane="one"
                :fixed-pane-def-size="200"
                :fixed-pane-min-size="150"
                :fixed-pane-max-size="300"
                :one-collapse="false"
                :two-collapse="false"
                :custom-one-pane="true"
                :custom-two-pane="true"
            >
                <template #onePane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div class="flex-item-fixed panel-title">
                            已监听事件
                        </div>
                        <div class="flex-item-fixed flex-row-container panel-tools" style="align-items: center;">
                            <div class="flex-item-fill" style="padding-right: 8px;overflow: hidden;">
                                <Input size="mini" placeholder="过滤事件" style="min-width: 60px;max-width: 150px;"/>
                            </div>
                            <div class="flex-item-fixed" />
                            <div class="flex-item-fixed panel-tools-button" title="新增">
                                <FontAwesomeIcon :icon="faPlus"/>
                            </div>
                            <div class="flex-item-fixed panel-tools-button" title="删除">
                                <FontAwesomeIcon :icon="faTrashCan"/>
                            </div>
                        </div>
                        <div class="flex-item-fill">
                            <div v-for="item in data.aaa" class="event-item">
                                <span>{{ item.label }}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template #twoPane="slotProps">
                    <div v-bind="slotProps" class="flex-column-container" style="height: 100%;overflow: hidden;">
                        <div class="flex-item-fixed editor-tips">
                            111
                        </div>
                        <MonacoEditor
                            class="flex-item-fill"
                            height="20px"
                            theme="idea-light"
                            default-language="javascript"
                            :options="{ contextmenu: false }"
                            :onMount="initEditor"
                        />
                        <div class="flex-item-fixed editor-doc flex-row-container">
                            <div class="flex-item-fixed" style="border-right: 1px solid #e1e1e1;">
                                <div>示例1</div>
                                <div>示例2</div>
                                <div>示例3</div>
                            </div>
                            <div class="flex-item-fill">

                            </div>
                        </div>
                    </div>
                </template>
            </SplitPane>
        </template>
    </SplitPane>
</template>

<style scoped>
.event-container {
    border: 1px solid #ccc;
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
    overflow: auto;
}

.flex-item-fixed {
    flex-shrink: 0;
}

.none-select {
    user-select: none;
}

.panel-title {
    background-color: #efefef;
    padding: 4px 8px;
    border-bottom: 1px solid #e1e1e1;
    font-size: 12px;
    font-weight: bold;
}

.panel-tools {
    padding: 4px 8px;
    border-bottom: 1px solid #e1e1e1;
    overflow: hidden;
}

.panel-tools-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: 4px;
    color: #252b3a;
    cursor: pointer;
}

.panel-tools-button:hover {
    color: #5E7CE0;
}

.panel-tools-button:last-child {
    margin-right: 0;
}

.event-item {
    padding: 6px 4px;
    border-bottom: 1px solid #e1e1e1;
    color: #252b3a;
    font-size: 12px;
}

.event-item:hover {
    background-color: #f2f5fc;
    cursor: unset;
}

.event-item.active {
    background-color: #e9edfa;
}

.editor-tips {
    height: 50px;
    border-bottom: 1px solid #c2c2c2;
}

.editor-doc {
    height: 100px;
    border-top: 1px solid #c2c2c2;
}
</style>
