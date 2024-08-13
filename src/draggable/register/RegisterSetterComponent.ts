import { ComponentManage } from "@/draggable/types/ComponentManage";

/**
 * 注册组件设置器
 */
function registerSetterComponent(componentManage: ComponentManage) {
    // 绑定表达式输入
    componentManage.registerAsyncComponent("BindSetter", () => import("@/draggable/components/setter/BindSetter.vue").then(module => module.default));
    // 基础数据类型输入
    componentManage.registerAsyncComponent("BoolSetter", () => import("@/draggable/components/setter/BoolSetter.vue").then(module => module.default));
    componentManage.registerAsyncComponent("StringSetter", () => import("@/draggable/components/setter/StringSetter.vue").then(module => module.default));
    componentManage.registerAsyncComponent("NumberSetter", () => import("@/draggable/components/setter/NumberSetter.vue").then(module => module.default));
    // 输入控件
    componentManage.registerAsyncComponent("SelectSetter", () => import("@/draggable/components/setter/SelectSetter.vue").then(module => module.default));
    componentManage.registerAsyncComponent("IconSetter", () => import("@/draggable/components/setter/IconSetter.vue").then(module => module.default));
    componentManage.registerAsyncComponent("ColorSetter", () => import("@/draggable/components/setter/ColorSetter.vue").then(module => module.default));
}

export {
    registerSetterComponent,
}
