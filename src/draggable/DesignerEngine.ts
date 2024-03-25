import { reactive } from "vue";
import { EventBus } from "@/draggable/EventBus";
import { DesignerDriver, DesignerDriverConstructor } from "@/draggable/DesignerDriver";
import { EventContainer } from "@/draggable/types/Designer";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { DefComponentManage } from "@/draggable/models/DefComponentManage";
import { Cursor } from "@/draggable/models/Cursor";
import { DraggingCmpMetas } from "@/draggable/models/DraggingCmpMetas";

interface DesignerEngineProps {
    /** 组件管理器 */
    componentManage: ComponentManage;
    /** 设计器功能模块集合 */
    drivers: Array<DesignerDriverConstructor>;
}

const defaultProps: DesignerEngineProps = {
    componentManage: new DefComponentManage(),
    drivers: [],
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
    /** 设计器功能模块集合 */
    private readonly drivers: Array<DesignerDriver> = [];
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
        this.drivers.push(...drivers);
        // 开始消费 EventBus 事件
        this.drivers.forEach(driver => driver.effect());
        // 启动 DesignerDriver
        this.drivers.forEach(driver => driver.attach());
    }

    /** 卸载当前设计器 */
    unmount(): void {
        console.log("DesignerEngine unmount");
        this.eventbus.clearAllSubscribe();
        this.drivers.forEach(driver => driver.detach());
        this.drivers.length = 0;
    }
}

export {
    DesignerEngine,
}
