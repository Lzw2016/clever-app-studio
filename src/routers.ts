import { Router, RouteRecordRaw } from "vue-router";

const staticRouters: RouteRecordRaw[] = [
    {
        name: 'defLayout',
        path: '/',
        strict: true,
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
            {
                name: 'test3',
                path: '/test3',
                strict: true,
                component: () => import("@/views/Page03.vue"),
            },
        ],
    },
    {
        name: 'workbench',
        path: '/workbench',
        strict: true,
        component: () => import("@/draggable/components/Workbench.vue"),
        children: [
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
