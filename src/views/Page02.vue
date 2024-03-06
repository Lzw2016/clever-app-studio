<script setup lang="ts">
import { ref } from "vue";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { block01 } from "./Block01";
import { block02 } from "./Block02";

const show = ref(1);
const block01ref = ref();

</script>

<template>
    Page02
    <button @click="show++">{{ show % 2 === 0 ? '卸载' : '加载' }}</button>

    <div style="height: 12px;"/>
    <div style="width:300px;border: 1px solid #ccc;">
        空组件
        <RuntimeBlock/>
    </div>

    <div style="height: 12px;"/>
    <RuntimeBlock ref="block01ref" v-if="show%2===0" :block="block01"/>

    <div style="height: 12px;"/>
    <RuntimeBlock v-if="show%2===0" :block="block01"/>

    <div style="height: 12px;"/>
    <RuntimeBlock :block="block02"/>
</template>

<style scoped>

</style>
