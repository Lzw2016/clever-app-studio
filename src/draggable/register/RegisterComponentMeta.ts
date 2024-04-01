import { ComponentManage } from "@/draggable/types/ComponentManage";
import { materialMetaTabs } from "@/draggable/register/MaterialMetaTabs";

/**
 * 注册组件元信息
 */
function registerComponentMeta(componentManage: ComponentManage) {
    for (let tab of materialMetaTabs) {
        for (let group of tab.groups) {
            for (let item of group.items) {
                componentManage.registerMaterialMeta(item);
            }
        }
    }
    componentManage.registerAsyncComponentMeta("div", () => import("@/draggable/register/meta/div").then(module => module.default));
    componentManage.registerAsyncComponentMeta("span", () => import("@/draggable/register/meta/span").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Button", () => import("@/draggable/register/meta/Button").then(module => module.default));
    componentManage.registerAsyncComponentMeta("ButtonGroup", () => import("@/draggable/register/meta/ButtonGroup").then(module => module.default));
    componentManage.registerAsyncComponentMeta("Cascader", () => import("@/draggable/register/meta/Cascader").then(module => module.default));
}

export {
    registerComponentMeta,
}
