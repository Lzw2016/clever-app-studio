import { Router, RouteRecordRaw } from "vue-router";

const staticRouters: RouteRecordRaw[] = [
    {
        name: 'defLayout',
        path: '/',
        strict: true,
        // component: () => import("@/layouts/Layouts01.vue"),
        children: [
            {
                name: 'test',
                path: '/test',
                strict: true,
                component: () => import("@/views/Page01.vue"),
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
