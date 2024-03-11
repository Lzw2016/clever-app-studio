<script setup lang="ts">
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { block05 } from "@/views/Block05";
import { block06 } from "@/views/Block06";
</script>

<template>
    Page03

    <div style="height: 12px;"/>
    <RuntimeBlock :block="block05"/>

    <div style="height: 12px;"/>
    <RuntimeBlock :block="block06"/>
</template>

<style scoped>

</style>
