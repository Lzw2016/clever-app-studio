<script setup lang="ts">
import { ref } from "vue";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { createSpan, designerTest } from "@/views/DesignerTest";
import { isArray } from "@/utils/Typeof";

const instance = ref<InstanceType<typeof RuntimeBlock> | undefined>();

function updateDesignerTest() {
    if (isArray(designerTest.items)) {
        // console.log("instance", instance.value)
        instance.value?.addNode(createSpan({
            props: {
                style: {
                    backgroundColor: '#ddd',
                },
            },
        }), "c_000");
    }
}
</script>

<template>
    <button @click="updateDesignerTest">更新</button>
    <div class="container">
        <RuntimeBlock ref="instance" :block="designerTest"/>
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
