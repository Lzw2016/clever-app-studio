import { createApp, readonly } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import { focus } from "./directives";
import { initRouter } from "./routers";
// import initI18n from "./i18n";
import { registerComponent, registerComponentMeta, useComponent } from "./register";

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
    // i18n
    // const i18n = initI18n("zhCN");
    // app.use(i18n);
    // 自定义指令
    app.directive("focus", focus);
    // 配置组件库
    useComponent(app);
    // 注册组件
    registerComponent();
    // 注册组件元信息
    registerComponentMeta();
    // 挂载 vue 应用到页面上
    app.mount("#app");
})().finally();
