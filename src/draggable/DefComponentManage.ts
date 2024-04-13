import lodash from "lodash";
import { markRaw } from "vue";
import { BatchRegister, ComponentManage } from "@/draggable/types/ComponentManage";
import { AsyncVueComponent, VueComponent } from "@/draggable/types/Base";
import { AsyncComponentMeta, ComponentMeta } from "@/draggable/types/ComponentMeta";
import { isHtmlTag } from "@/draggable/utils/HtmlTag";

/**
 * 组件管理器模型
 */
class DefComponentManage implements ComponentManage {
    private readonly batchRegister: Map<RegExp, BatchRegister> = new Map<RegExp, BatchRegister>();
    private readonly asyncComponents: Map<string, AsyncVueComponent> = new Map<string, AsyncVueComponent>();
    private readonly components: Map<string, VueComponent> = new Map<string, VueComponent>();
    private readonly componentMetas: Map<string, ComponentMeta> = new Map<string, ComponentMeta>();
    private readonly asyncComponentMetas: Map<string, AsyncComponentMeta> = new Map<string, AsyncComponentMeta>();

    registerComponent(type: string, component: VueComponent): void {
        this.components.set(type, markRaw(component));
    }

    registerAsyncComponent(type: string, asyncComponent: AsyncVueComponent): void {
        this.asyncComponents.set(type, asyncComponent);
    }

    batchRegisterComponent(type: RegExp, register: BatchRegister): void {
        this.batchRegister.set(type, register);
    }

    async loadAsyncComponent(types: string[]): Promise<Record<string, VueComponent>> {
        const needLoadTypes = types.filter(type => !isHtmlTag(type) && !this.components.has(type));
        const notExistTypes = needLoadTypes.filter(type => !this.asyncComponents.has(type));
        const registers: { [type: string]: BatchRegister } = {};
        this.batchRegister.forEach((register, regexp) => {
            const matchTypes = notExistTypes.filter(type => type.match(regexp));
            for (let matchType of matchTypes) {
                registers[matchType] = register;
            }
            // 在 notExistTypes 中删除 matchTypes
            lodash.pullAll(notExistTypes, matchTypes);
        });
        // 有未注册的组件
        if (notExistTypes.length > 0) {
            console.warn(`组件 ${notExistTypes.join("、")} 未注册`);
        }
        // 异步加载组件
        const loadTypes = needLoadTypes.filter(type => !notExistTypes.includes(type));
        if (loadTypes.length > 0) {
            for (let type of loadTypes) {
                let cmp = this.components.get(type);
                if (cmp) continue;
                const asyncCmp = this.asyncComponents.get(type);
                try {
                    if (!asyncCmp) {
                        const register = registers[type];
                        await register(type);
                        cmp = this.components.get(type);
                    } else {
                        cmp = await asyncCmp(type);
                    }
                    if (cmp) {
                        this.components.set(type, markRaw(cmp));
                    }
                } catch (reason) {
                    console.warn(`加载组件 ${type} 失败：${reason}`);
                    console.warn(reason);
                }
            }
        }
        // 返回组件
        const components: Record<string, VueComponent> = {};
        types.filter(type => !isHtmlTag(type)).forEach(type => components[type] = this.components.get(type)!);
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
        this.componentMetas.set(componentMeta.type, markRaw(componentMeta));
    }

    registerAsyncComponentMeta(type: string, asyncComponentMeta: AsyncComponentMeta): void {
        this.asyncComponentMetas.set(type, asyncComponentMeta);
    }

    async loadAsyncComponentMeta(types: string[]): Promise<Record<string, ComponentMeta>> {
        const needLoadTypes = types.filter(type => !this.componentMetas.has(type));
        // 异步加载组件元信息
        if (needLoadTypes.length > 0) {
            for (let type of needLoadTypes) {
                let meta = this.componentMetas.get(type);
                if (meta) continue;
                const asyncMeta = this.asyncComponentMetas.get(type);
                if (!asyncMeta) {
                    if (!isHtmlTag(type)) console.warn(`未注册组件 ${type} 元信息`);
                    continue;
                }
                try {
                    meta = await asyncMeta(type);
                    this.componentMetas.set(type, markRaw(meta));
                } catch (reason) {
                    throw new Error(`加载组件 ${type} 元信息失败：${reason}`);
                }
            }
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
    DefComponentManage,
}
