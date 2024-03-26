import { reactive } from "vue";
import { EventBus } from "@/draggable/EventBus";
import { DesignerDriver, DesignerDriverConstructor } from "@/draggable/DesignerDriver";
import { DesignerEffect, DesignerEffectConstructor } from "@/draggable/DesignerEffect";
import { EventContainer } from "@/draggable/types/Designer";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { DefComponentManage } from "@/draggable/models/DefComponentManage";
import { Cursor } from "@/draggable/models/Cursor";
import { DraggingCmpMetas } from "@/draggable/models/DraggingCmpMetas";

interface DesignerEngineProps {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 设计器内部业务事件生产者集合 */
    drivers: Array<DesignerDriverConstructor>;
    /** 设计器内部业务事件消费者集合 */
    effects: Array<DesignerEffectConstructor>;
}

const defaultProps: DesignerEngineProps = {
    componentManage: new DefComponentManage(),
    drivers: [],
    effects: [],
};

/**
 * 设计器引擎(管理整个开发平台，包含：组件拖拽模块、各种快捷键模块、页面大纲树拖拽)
 */
class DesignerEngine {
    // /** 当前设计器是否初始化 */
    // private _initialized: boolean = false;
    /** 设计器事件总线 */
    readonly eventbus: EventBus = new EventBus();
    /** 初始化属性 */
    readonly props: DesignerEngineProps;
    /** 设计器内部业务事件生产者集合 */
    private readonly drivers: Array<DesignerDriver> = [];
    /** 设计器内部业务事件消费者集合 */
    private readonly effects: Array<DesignerEffect> = [];
    /** 当前光标状态 */
    readonly cursor: Cursor;
    /** 正在拖拽的组件的元信息 */
    readonly draggingCmpMetas: DraggingCmpMetas;

    // 活动的设计器页面路由路径(fullPath)
    // readonly activeDesignerPath: string;
    // 所有的设计器
    // readonly allDesignerPanel: Record<string, DesignerPanel>

    /** TODO 临时测试数据 */
    readonly tmp = reactive<any>({});

    constructor(props: Partial<DesignerEngineProps>) {
        this.props = { ...defaultProps, ...props };
        this.cursor = new Cursor(this);
        this.draggingCmpMetas = new DraggingCmpMetas(this);
    }

    /** 挂载当前设计器 */
    mount(container: EventContainer, window: Window): void {
        // 先卸载
        this.unmount();
        console.log("DesignerEngine mount");
        // 创建设计器功能模块集合
        const drivers = this.props.drivers.map(driver => new driver(this, container, window));
        const effects = this.props.effects.map(effect => new effect(this, container, window));
        this.drivers.push(...drivers);
        this.effects.push(...effects);
        // 开始消费 EventBus 事件
        this.effects.forEach(effect => effect.effect());
        // 启动 DesignerDriver
        this.drivers.forEach(driver => driver.attach());
    }

    /** 卸载当前设计器 */
    unmount(): void {
        console.log("DesignerEngine unmount");
        // 清除所有的订阅函数
        this.eventbus.clearAllSubscribe();
        // 停止当前 DesignerDriver 监听 HTMLElement 事件
        this.drivers.forEach(driver => driver.detach());
        // 清空 drivers 和 effects
        this.drivers.length = 0;
        this.effects.length = 0;
    }
}

export {
    DesignerEngine,
}
