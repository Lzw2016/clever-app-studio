<script setup lang="ts">
import Panel from "primevue/panel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { ComponentMetaTab } from "@/draggable/types/ComponentMeta";

// 定义组件选项
defineOptions({
    name: 'ComponentPane',
});

// 定义 Props 类型
interface ComponentPaneProps {
    /** 组件叶签信息 */
    tabs: Array<ComponentMetaTab>;
    /** 默认的叶签 */
    defTab?: string;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<ComponentPaneProps>(), {});
const unstyled = false;

</script>

<template>
    <Panel style="height: 100%;" header="组件库" :unstyled="unstyled">
        <IconField iconPosition="left">
            <InputIcon :unstyled="unstyled">
                <FontAwesomeIcon :icon="faSearch"/>
            </InputIcon>
            <InputText :unstyled="unstyled" placeholder="搜索组件"/>
        </IconField>
        <TabView class="multi-pages" style="height: 100%;" :scrollable="true" :unstyled="unstyled">
            <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">

            </TabPanel>
        </TabView>
    </Panel>
</template>

<style scoped>

</style>
