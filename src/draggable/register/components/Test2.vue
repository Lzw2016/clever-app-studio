<script setup lang="ts">
import Test1 from "./Test1.vue";
import { disableEvent } from "@/draggable/directives";

const vDisableEvent = disableEvent;

// 定义组件选项
defineOptions({
    name: 'Test2',
});

</script>

<template>
    <div class="__test_2">
        <Test1/>
        test2
        <h1 class="__test_2_1">B111</h1>
        <h2 class="__test_2_2">B222</h2>
        <h3 class="__test_2_3">B333</h3>
    </div>
</template>

<style scoped>

</style>
