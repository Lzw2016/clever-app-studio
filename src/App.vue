<script setup lang="ts">
import { RouterView } from "vue-router";
import { ConfigProvider, legacyLogicalPropertiesTransformer, StyleProvider } from "ant-design-vue";
import { antDesignLocale } from "@/i18n";
</script>

<template>
    <StyleProvider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]">
        <ConfigProvider :locale="antDesignLocale['zh-CN']">
            <RouterView/>
        </ConfigProvider>
    </StyleProvider>
</template>
