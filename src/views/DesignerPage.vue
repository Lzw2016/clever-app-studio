<script setup lang="ts">
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { designerTest } from "@/views/DesignerTest";
</script>

<template>
    <div class="container">
        <RuntimeBlock :block="designerTest"/>
    </div>
</template>

<style scoped>
.container {
    margin: 24px;
    height: calc(100% - 48px);
    width: calc(100% - 48px);
    user-select: none;
    border: 1px solid #ccc;
}
</style>
