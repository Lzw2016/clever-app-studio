import { createApp, readonly } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { focus } from "./directives";
import { initRouter } from "./routers";

window['APP_INFO'] = readonly(__APP_INFO__);

(async () => {
    // 创建 vue 应用
    const app = createApp(App);
    // 初始化状态管理插件
    const pinia = createPinia();
    app.use(pinia);
    // 初始化路由
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [],
        strict: true,
        sensitive: true,
    });
    initRouter(router);
    app.use(router);
    // 自定义指令
    app.directive("focus", focus);
    // 挂载 vue 应用到页面上
    app.mount("#app");
})().finally();
