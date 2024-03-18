<script setup lang="ts">
import { useRoute } from "vue-router";
// 当前命中的路由
const route = useRoute();
</script>

<template>
    <div>
       设计器页面 {{ route.params }}
    </div>
</template>

<style scoped>

</style>
