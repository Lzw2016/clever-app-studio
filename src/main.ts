import { createApp, readonly } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { focus } from "@/directives";
import { initRouter } from "@/routers";
import { initI18n } from "@/i18n";
import { registerComponent } from "@/draggable/register/RegisterComponent";
import { registerComponentMeta } from "@/draggable/register/RegisterComponentMeta";
import { useComponent } from "@/register";
import globalConfig from "@/GlobalConfig";

window['APP_INFO'] = readonly(__APP_INFO__);

(async () => {
    // 创建 vue 应用
    const app = createApp(App);
    // 初始化状态管理插件
    const pinia = createPinia();
    app.use(pinia);
    // i18n
    const i18n = initI18n();
    app.use(i18n);
    // 自定义指令
    app.directive("focus", focus);
    // 配置组件库
    useComponent(app);
    // 注册组件
    registerComponent(globalConfig.componentManage);
    // 注册组件元信息
    registerComponentMeta(globalConfig.componentManage);
    // 初始化路由
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [],
        strict: true,
        sensitive: true,
    });
    initRouter(router);
    app.use(router);
    // 挂载 vue 应用到页面上
    app.mount("#app");
})().finally();
