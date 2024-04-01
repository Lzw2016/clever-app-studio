<script setup lang="ts">
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { block05 } from "@/views/Block05";
import { block06 } from "@/views/Block06";
import globalConfig from "@/GlobalConfig";
</script>

<template>
    Page03

    <div style="height: 12px;"/>
    <RuntimeBlock :component-manage="globalConfig.componentManage" :block="block05"/>

    <div style="height: 12px;"/>
    <RuntimeBlock :component-manage="globalConfig.componentManage" :block="block06"/>
</template>

<style scoped>

</style>
