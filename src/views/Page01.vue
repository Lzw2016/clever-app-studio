<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Block01 } from "./Block01";

const show = ref(1);

const block01ref = ref();

onMounted(() => {
    console.log("block01", block01ref);
});

// const data = {
//     a: "a",
//     b: 1,
//     c: true,
//     d: new Date(),
//     e: /aa/,
//     f: [1, 2, 3],
//     g: {
//         h: [4, 5, 6, { j: "BBB" }],
//         i: "AAA",
//     },
// };
//
// let value = calcExpression("{{b+123}}", data);
// console.log("@@@ 1", value);
//
// value = calcExpression("{{f[2]}}", data);
// console.log("@@@ 2", value);
//
// value = calcExpression("{{g?.h[3].j}}", data);
// console.log("@@@ 3", value);
//
// value = calcExpression([
//     '{{b+123}}',
//     '{{f[2]}}',
//     '{{g?.h[3].j}}',
// ], data);
// console.log("@@@ 4", value)
//
// value = calcExpression({
//     a: '{{b+123}}',
//     b: '{{g?.h[3].j}}',
//     c: ['{{b+123}}', '{{f[2]}}',],
//     d: {
//         e: '{{c}}',
//         f: '{{d}}',
//         g: 999,
//     },
//     h: false,
// }, data);
// console.log("@@@ 5", value);
</script>

<template>
    Page01
    <button @click="show++">{{ show % 2 === 0 ? '卸载' : '加载' }}</button>

    <div style="height: 12px;"/>
    <Block01 ref="block01ref" v-if="show%2===0"/>

    <div style="height: 12px;"/>
<!--    <Block01 v-if="show%2===0"/>-->
</template>

<style scoped>

</style>
