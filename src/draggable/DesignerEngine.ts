import { EventBus } from "@/draggable/EventBus";
import { DesignerDriver, DesignerDriverConstructor } from "@/draggable/DesignerDriver";
import { EventContainer } from "@/draggable/types/Designer";

interface DesignerEngineProps {
    // /** 设计器对应的 HTMLElement 对象 */
    // container: EventContainer;
    // /** 设计器对应的 window 对象 */
    // window: Window;
    /** 设计器功能模块集合 */
    drivers: Array<DesignerDriverConstructor>;
}

const defaultProps: DesignerEngineProps = {
    // container: window.document,
    // window: window,
    drivers: [],
};

/**
 * 设计器引擎(管理整个开发平台，包含：组件拖拽模块、各种快捷键模块、页面大纲树拖拽)
 */
class DesignerEngine {
    /** 当前设计器是否初始化 */
    private _initialized: boolean = false;
    /** 设计器事件总线 */
    private readonly eventbus: EventBus = new EventBus();
    /** 初始化属性 */
    private readonly props: DesignerEngineProps;
    /** 设计器功能模块集合 */
    private readonly drivers: Array<DesignerDriver> = [];

    constructor(props: Partial<DesignerEngineProps>) {
        this.props = { ...defaultProps, ...props };
    }

    /** 挂载当前设计器 */
    mount(container: EventContainer, window: Window): void {
        // 先卸载
        this.unmount();
        // 创建设计器功能模块集合
        const drivers = this.props.drivers.map(driver => new driver(this.eventbus, container, window));
        this.drivers.push(...drivers);
        // 开始消费 EventBus 事件
        this.drivers.forEach(driver => driver.effect());
        // 启动 DesignerDriver
        this.drivers.forEach(driver => driver.attach());
    }

    /** 卸载当前设计器 */
    unmount(): void {
        this.drivers.forEach(driver => driver.detach());
        this.drivers.length = 0;
    }
}

export {
    DesignerEngine,
}