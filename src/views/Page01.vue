<script setup lang="ts">
import { ref } from "vue";
import { block01 } from "./Block01";
import { block02 } from "./Block02";
import { block03 } from "./Block03";
import { block04 } from "./Block04";
import { createBlockComponent } from "@/draggable/BlockFactory";

const BlockCmp01 = createBlockComponent(block01);
const BlockCmp02 = createBlockComponent(block02);
const BlockCmp03 = createBlockComponent(block03);
const BlockCmp04 = createBlockComponent(block04);

const show = ref(1);
const block01ref = ref();

</script>

<template>
    Page01
    <button @click="show++">{{ show % 2 === 0 ? '卸载' : '加载' }}</button>

    <div style="height: 12px;"/>
    <BlockCmp01 ref="block01ref" v-if="show%2===0"/>

    <div style="height: 12px;"/>
    <BlockCmp01 v-if="show%2===0"/>

    <div style="height: 12px;"/>
    <BlockCmp02/>

    <div style="height: 12px;"/>
    <BlockCmp03/>

    <div style="height: 12px;"/>
    <BlockCmp04/>
</template>

<style scoped>

</style>
