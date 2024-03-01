import {AsyncVueComponent, VueComponent} from "@/draggable/types/Base";
import {AsyncComponentMeta, ComponentMeta} from "@/draggable/types/ComponentMeta";

/** 组件管理 */
interface ComponentManage {
    /**
     * 注册组件
     * @param type      组件类型(唯一值)
     * @param component 组件对象
     */
    registerComponent(type: string, component: VueComponent): void;

    /**
     * 注册异步组件
     * @param type              组件类型(唯一值)
     * @param asyncComponent    异步组件
     */
    registerAsyncComponent(type: string, asyncComponent: AsyncVueComponent): void;

    /**
     * 加载指定的异步组件(如果已加载就直接返回)
     * @param types     组件类型(唯一值)集合
     * @throws {Error}  组件不存在就报错
     */
    loadAsyncComponent(types: string[]): Promise<Record<string, VueComponent>>;

    /**
     * 获取组件
     * @param type 组件类型(唯一值)
     */
    getComponent(type: string): VueComponent | undefined;

    /**
     * 获取组件
     * @param type  组件类型(唯一值)
     * @param def   组件不存在时返回默认组件
     */
    getComponent(type: string, def: VueComponent): VueComponent | undefined;

    /**
     * 注册组件元信息
     * @param componentMeta 组件元信息对象
     */
    registerComponentMeta(componentMeta: ComponentMeta): void;

    /**
     * 注册异步组件元信息
     * @param type               组件类型(唯一值)
     * @param asyncComponentMeta 异步组件元信息
     */
    registerAsyncComponentMeta(type: string, asyncComponentMeta: AsyncComponentMeta): void;

    /**
     * 加载指定的异步组件元信息(如果已加载就直接返回)
     * @param types     组件类型(唯一值)集合
     * @return {Object} 组件不存在就是空值
     */
    loadAsyncComponentMeta(types: string[]): Promise<Record<string, ComponentMeta>>;

    /**
     * 获取组件元信息
     * @param type 组件类型(唯一值)
     */
    getComponentMeta(type: string): ComponentMeta | undefined;
}

export type {
    ComponentManage,
}
