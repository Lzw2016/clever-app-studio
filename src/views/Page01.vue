<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Block01 } from "./Block01";

const show = ref(0);

const block01ref = ref();

onMounted(() => {
    console.log("block01", block01ref);
});
</script>

<template>
    Page01
    <button @click="show++">{{ show % 2 === 0 ? '卸载' : '加载' }}</button>
    <Block01 ref="block01ref" v-if="show%2===0"/>
</template>

<style scoped>

</style>
