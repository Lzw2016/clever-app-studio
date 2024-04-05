import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件设置器
 */
function registerSetterComponent(componentManage: ComponentManage) {
    componentManage.registerAsyncComponent("StringSetter", () => import("@/draggable/components/setter/StringSetter.vue").then(module => module.default));
}

export {
    registerSetterComponent,
}
