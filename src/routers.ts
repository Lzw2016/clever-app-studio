import { Router, RouteRecordRaw } from "vue-router";

const staticRouters: RouteRecordRaw[] = [
    {
        name: 'defLayout',
        path: '/',
        strict: true,
        // component: () => import("@/layouts/Layouts01.vue"),
        children: [
            {
                name: 'test1',
                path: '/test1',
                strict: true,
                component: () => import("@/views/Page01.vue"),
            },
            {
                name: 'test2',
                path: '/test2',
                strict: true,
                component: () => import("@/views/Page02.vue"),
            },
        ],
    },
];

function initRouter(router: Router) {
    staticRouters.forEach(item => router.addRoute(item));
}

export {
    staticRouters,
    initRouter,
}
