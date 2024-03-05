<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BlockCmp01 } from "./Block01";

const show = ref(1);

const block01ref = ref();

onMounted(() => {
    console.log("block01", block01ref);
});

</script>

<template>
    Page01
    <button @click="show++">{{ show % 2 === 0 ? '卸载' : '加载' }}</button>

    <div style="height: 12px;"/>
    <BlockCmp01 ref="block01ref" v-if="show%2===0"/>

    <div style="height: 12px;"/>
    <BlockCmp01 v-if="show%2===0"/>
</template>

<style scoped>

</style>
