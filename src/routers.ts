import { Router, RouteRecordRaw } from "vue-router";
import globalConfig from "@/GlobalConfig";
import { sleep } from "@/utils/Utils";
import { DesignPageMate, LoadDesignPageMate } from "@/draggable/types/DesignBlock";
import { designerTest } from "@/views/DesignerTest";

function defineLoadDesignPageMate(fun: LoadDesignPageMate): LoadDesignPageMate {
    return fun;
}

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
            {
                name: 'designer',
                path: '/designer',
                strict: true,
                component: () => import("@/views/DesignerPage.vue"),
            },
            {
                name: 'test_page',
                path: '/test_page',
                strict: true,
                component: () => import("@/views/TestPage.vue"),
            },
        ],
    },
    {
        name: 'workbench',
        path: '/workbench',
        strict: true,
        component: () => import("@/draggable/components/Workbench.vue"),
        props: {
            componentManage: globalConfig.componentManage,
            materialMetaTabs: globalConfig.materialMetaTabs,
        },
        children: [
            {
                name: 'WelcomePanel',
                path: '/workbench/welcome',
                strict: true,
                meta: {
                    title: "欢迎",
                },
                component: () => import("@/draggable/components/widgets/WelcomePanel.vue"),
            },
            {
                name: 'DictPanel',
                path: '/workbench/dict',
                strict: true,
                meta: {
                    title: "字典管理",
                },
                component: () => import("@/draggable/components/widgets/DictPanel.vue"),
            },
            {
                name: 'DesignerPanel',
                path: '/workbench/designer/:pageId',
                strict: true,
                meta: {
                    loader: defineLoadDesignPageMate(async params => {
                        await sleep(500);
                        // if(params.pageId==='333') await sleep(100000000);
                        return {
                            title: params.pageId,
                            designBlock: designerTest,
                        } as DesignPageMate;
                    }),
                },
                component: () => import("@/draggable/components/widgets/DesignerPanel.vue"),
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
