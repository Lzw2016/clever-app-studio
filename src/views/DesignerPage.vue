<script setup lang="ts">
import { ref, toRaw } from "vue";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { createSpan, designerTest } from "@/views/DesignerTest";
import globalConfig from "@/GlobalConfig";

const instance = ref<InstanceType<typeof RuntimeBlock> | undefined>();

function updateDesignerTest() {
    const blockInstance = instance.value?.blockInstance;
    blockInstance?.ops.appendItem(
        "c_000",
        createSpan({
            props: {
                style: {
                    backgroundColor: '#ddd',
                },
            },
        }),
    );
    console.log("$data", toRaw(blockInstance?.$data));
    if (blockInstance?.$data.str === "000") {
        blockInstance.$data.str = "999";
    }
}

function addEventBind() {
    const blockInstance = instance.value?.blockInstance;
    const runtimeNode = blockInstance?.ops.getRuntimeNode("c_000");
    if (blockInstance?.globalContext.runtimeBlock?.methods && runtimeNode?.__bindListeners && !runtimeNode.__bindListeners.onClick) {
        function dynamic_click_01() {
            console.log("@@@");
            if (blockInstance) blockInstance.$data.str = new Date().getTime();
        }

        runtimeNode.__bindListeners.onClick = dynamic_click_01;
        // runtimeNode.listeners.click
        // blockInstance.globalContext.runtimeBlock.methods.dynamic_click_01
        // blockInstance.dynamic_click_01 = blockInstance.globalContext.runtimeBlock.methods.dynamic_click_01;
        blockInstance.$forceUpdate();
        console.log("事件绑定成功");
    }
}

function addEventBind_2() {
    const blockInstance = instance.value?.blockInstance;

    function dynamic_click_01() {
        // @ts-ignore
        console.log("###", this);
        if (blockInstance) blockInstance.$data.str = new Date().getTime();
    }

    blockInstance?.ops.bindListener("c_000", "click", {
        // handler: function () {
        //     console.log("###", this);
        //     if (blockInstance) blockInstance.$data.str = new Date().getTime();
        // },
        handler: dynamic_click_01,
        modifiers: ["ctrl"],
    }, { override: false });
}
</script>

<template>
    <button class="space" @click="updateDesignerTest">更新</button>
    <button class="space" @click="addEventBind_2">动态事件绑定</button>
    <div class="container">
        <RuntimeBlock ref="instance" :component-manage="globalConfig.componentManage" :block="designerTest" :is-designing="false"/>
    </div>
</template>

<style scoped>
.container {
    margin: 24px;
    height: calc(100% - 80px);
    width: calc(100% - 48px);
    user-select: none;
    border: 1px solid #ccc;
}

.space {
    margin: 0 8px;
}
</style>
