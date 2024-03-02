import {ComponentManage} from "@/draggable/types/ComponentManage";
import {AsyncVueComponent, VueComponent} from "../types/Base";
import {AsyncComponentMeta, ComponentMeta} from "../types/ComponentMeta";

/**
 * 组件管理器模型
 */
class ComponentManageModel implements ComponentManage {
    private readonly asyncComponents: Map<string, AsyncVueComponent> = new Map<string, AsyncVueComponent>();
    private readonly components: Map<string, VueComponent> = new Map<string, VueComponent>();
    private readonly componentMetas: Map<string, ComponentMeta> = new Map<string, ComponentMeta>();
    private readonly asyncComponentMetas: Map<string, AsyncComponentMeta> = new Map<string, AsyncComponentMeta>();

    registerComponent(type: string, component: VueComponent): void {
        this.components.set(type, component);
    }

    registerAsyncComponent(type: string, asyncComponent: AsyncVueComponent): void {
        this.asyncComponents.set(type, asyncComponent);
    }

    async loadAsyncComponent(types: string[]): Promise<Record<string, VueComponent>> {
        const needLoadTypes = types.filter(type => !this.components.has(type));
        const notExistTypes = needLoadTypes.filter(type => !this.asyncComponents.has(type));
        // 有未注册的组件
        if (notExistTypes.length > 0) {
            throw new Error(`组件 ${notExistTypes.join("、")} 未注册`);
        }
        // 异步加载组件
        if (needLoadTypes.length > 0) {
            await Promise.all(needLoadTypes.map(async type => {
                let cmp = this.components.get(type);
                if (cmp) return cmp;
                const asyncCmp = this.asyncComponents.get(type)!;
                try {
                    cmp = await asyncCmp(type);
                    this.components.set(type, cmp);
                    return cmp;
                } catch (reason) {
                    throw new Error(`加载组件 ${type} 失败，错误信息：${reason}`);
                }
            }));
        }
        // 返回组件
        const components: Record<string, VueComponent> = {};
        types.forEach(type => components[type] = this.components.get(type)!);
        return components;
    }

    getComponent(type: string): VueComponent | undefined;
    getComponent(type: string, def: VueComponent): VueComponent | undefined;
    getComponent(type: string, def?: VueComponent): VueComponent | undefined {
        const cmp = this.components.get(type);
        if (cmp) return cmp;
        return def;
    }

    registerComponentMeta(componentMeta: ComponentMeta): void {
        this.componentMetas.set(componentMeta.type, componentMeta);
    }

    registerAsyncComponentMeta(type: string, asyncComponentMeta: AsyncComponentMeta): void {
        this.asyncComponentMetas.set(type, asyncComponentMeta);
    }

    async loadAsyncComponentMeta(types: string[]): Promise<Record<string, ComponentMeta>> {
        const needLoadTypes = types.filter(type => !this.componentMetas.has(type));
        // 异步加载组件元信息
        if (needLoadTypes.length > 0) {
            await Promise.all(needLoadTypes.map(async type => {
                let meta = this.componentMetas.get(type);
                if (meta) return meta;
                const asyncMeta = this.asyncComponentMetas.get(type)!;
                try {
                    meta = await asyncMeta(type);
                    this.componentMetas.set(type, meta);
                    return meta;
                } catch (reason) {
                    throw new Error(`加载组件 ${type} 元信息失败，错误信息：${reason}`);
                }
            }));
        }
        // 返回组件元信息
        const metas: Record<string, ComponentMeta> = {};
        types.forEach(type => metas[type] = this.componentMetas.get(type)!);
        return metas;
    }

    getComponentMeta(type: string): ComponentMeta | undefined {
        return this.componentMetas.get(type);
    }
}

export {
    ComponentManageModel,
}
