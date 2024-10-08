import localforage from "localforage";
import { Router, RouteRecordRaw } from "vue-router";
import globalConfig from "@/GlobalConfig";
// import { sleep } from "@/utils/Utils";
import { DesignPageMate, LoadDesignPageMate } from "@/draggable/types/DesignBlock";
// import { designerTest } from "@/views/DesignerTest";
import { designerEmpty } from "@/views/DesignerEmpty";

localforage.config({
    name: 'clever-app-studio'
});

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
            materialDependence: globalConfig.materialDependence,
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
                        const pagesData: any = await localforage.getItem("pagesData");
                        let res: any;
                        if (pagesData) {
                            function findPageById(pages: Array<any>, id: any) {
                                for (let page of pages) {
                                    if (id === page.id) {
                                        return page;
                                    }
                                    if (page.children) {
                                        return findPageById(page.children, id);
                                    }
                                }
                            }

                            res = findPageById(pagesData, params.pageId);
                            if (res) {
                                res = {
                                    title: res.label,
                                    designBlock: res.data ?? designerEmpty,
                                };
                            }
                        }
                        if (!res) {
                            res = {
                                title: params.pageId,
                                // designBlock: designerTest,
                                designBlock: designerEmpty,
                            } as DesignPageMate;
                        }
                        // await sleep(500);
                        // if(params.pageId==='333') await sleep(100000000);
                        return res;
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
