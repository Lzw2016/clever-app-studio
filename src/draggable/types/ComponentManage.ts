import {AsyncVueComponent, VueComponent} from "@/draggable/types/Base";

/** 组件管理 */
interface ComponentManage {
    /** 异步组件 */
    readonly asyncComponents: Map<string, AsyncVueComponent>;
    /** 所有已加载的组件 */
    readonly components: Map<string, VueComponent>;

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
     * @param types 组件类型(唯一值)集合
     */
    loadAsyncComponent(types: string[]): Promise<Array<VueComponent>>;

    /**
     * 获取组件
     * @param type 组件类型(唯一值)
     */
    getComponent(type: string): VueComponent;

    /**
     * 获取组件
     * @param type  组件类型(唯一值)
     * @param def   组件不存在时返回默认组件
     */
    getComponent(type: string, def: VueComponent): VueComponent;

    /**  */
    /**  */
    /**  */
    /**  */
}

export type {
    ComponentManage,
}
