<script setup lang="ts">
import { ref } from "vue";
import { BlockCmp01 } from "./Block01";
import { BlockCmp02 } from "./Block02";
import { BlockCmp03 } from "./Block03";
import { BlockCmp04 } from "./Block04";

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
