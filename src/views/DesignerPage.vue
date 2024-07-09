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
</script>

<template>
    <button @click="updateDesignerTest">更新</button>
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
</style>
