import { markRaw, ref, Ref, shallowReactive, ShallowReactive, watch } from "vue";
import { EventBus } from "@/draggable/EventBus";
import { DesignerDriver, DesignerDriverConstructor } from "@/draggable/DesignerDriver";
import { DesignerEffect, DesignerEffectConstructor } from "@/draggable/DesignerEffect";
import { DefComponentManage } from "@/draggable/DefComponentManage";
import { EventContainer } from "@/draggable/types/Designer";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { Cursor } from "@/draggable/models/Cursor";
import { DraggingCmpMetas } from "@/draggable/models/DraggingCmpMetas";
import { DesignerState } from "@/draggable/models/DesignerState";
import { Insertion } from "@/draggable/models/Insertion";

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
    // protected _initialized: boolean = false;
    /** 设计器事件总线 */
    readonly eventbus: EventBus = new EventBus();
    /** 初始化属性 */
    readonly props: DesignerEngineProps;
    /** 设计器内部业务事件生产者集合 */
    protected readonly drivers: Array<DesignerDriver> = [];
    /** 设计器内部业务事件消费者集合 */
    protected readonly effects: Array<DesignerEffect> = [];
    /** 当前光标状态 */
    readonly cursor: Cursor;
    /** 当前仅仅按下 ctrl 键 */
    protected readonly _onlyPressedCtrl: Ref<boolean> = ref<boolean>(false);
    /** 当前仅仅按下 shift 键 */
    protected readonly _onlyPressedShift: Ref<boolean> = ref<boolean>(false);
    /** 正在拖拽的组件的元信息 */
    readonly draggingCmpMetas: DraggingCmpMetas;
    /** 当前活动的设计器页面路由路径(fullPath) */
    protected readonly _activeDesignerPath: Ref<string | undefined> = ref<string>();
    /** 所有的设计器状态数据 */
    readonly allDesignerState: ShallowReactive<Record<string, DesignerState>> = shallowReactive<Record<string, DesignerState>>({});
    /** 设计器插入组件的信息 */
    readonly insertion: Insertion;
    // /** 捕捉线(多选组件时的矩形线条) */
    // protected readonly _snapLine: Ref<SnapLine | undefined> = ref<SnapLine>();
    /** 是否显示Block编辑对话框 */
    protected readonly _showBlockEditorDialog: Ref<boolean> = ref<boolean>(false);
    /** 是否显示Event编辑对话框 */
    protected readonly _showEventEditorDialog: Ref<boolean> = ref<boolean>(false);

    constructor(props: Partial<DesignerEngineProps>) {
        this.props = { ...defaultProps, ...props };
        this.cursor = new Cursor(this);
        this.draggingCmpMetas = new DraggingCmpMetas(this);
        this.insertion = new Insertion(this);
        this.setGlobalVar();
    }

    protected setGlobalVar() {
        watch(this._activeDesignerPath, value => {
            let setUndefined = true;
            if (value) {
                const designerState = this.allDesignerState[value];
                if (designerState) {
                    setUndefined = false;
                    window.__crb = designerState.designerBlockInstance;
                    window.__crn = designerState.selectNode;
                }
            }
            if (setUndefined) {
                window.__crb = undefined;
                window.__crn = undefined;
            }
        });
    }

    /** 组件管理器 */
    get componentManage() {
        return this.props.componentManage;
    }

    /** 当前仅仅按下 ctrl 键 */
    get onlyPressedCtrl() {
        return this._onlyPressedCtrl.value;
    }

    /** 当前仅仅按下 ctrl 键 */
    set onlyPressedCtrl(value: boolean) {
        this._onlyPressedCtrl.value = value;
    }

    /** 当前仅仅按下 shift 键 */
    get onlyPressedShift() {
        return this._onlyPressedShift.value;
    }

    /** 当前仅仅按下 shift 键 */
    set onlyPressedShift(value: boolean) {
        this._onlyPressedShift.value = value;
    }

    /** 当前活动的设计器页面路由路径(fullPath) */
    get activeDesignerPath(): string | undefined {
        return this._activeDesignerPath.value;
    }

    /** 当前活动的设计器页面路由路径(fullPath) */
    set activeDesignerPath(value: string | undefined) {
        if (value && !this.allDesignerState[value]) value = undefined;
        this._activeDesignerPath.value = value;
    }

    /** 是否显示Block编辑对话框 */
    get showBlockEditorDialog(): boolean {
        return this._showBlockEditorDialog.value;
    }

    /** 是否显示Block编辑对话框 */
    set showBlockEditorDialog(value: boolean) {
        this._showBlockEditorDialog.value = value;
    }

    /** 是否显示Event编辑对话框 */
    get showEventEditorDialog(): boolean {
        return this._showEventEditorDialog.value;
    }

    /** 是否显示Event编辑对话框 */
    set showEventEditorDialog(value: boolean) {
        this._showEventEditorDialog.value = value;
    }

    /** 当前活动的设计器状态数据 */
    get activeDesignerState(): DesignerState | undefined {
        const activeDesignerPath = this.activeDesignerPath;
        if (!activeDesignerPath) return;
        return this.allDesignerState[activeDesignerPath];
    }

    /**
     * 新增 DesignerState 对象(如果存在直接返回已存在的)
     * @param fullPath 设计器页面路由路径
     */
    addDesignerState(fullPath: string): DesignerState {
        let designerState = this.allDesignerState[fullPath];
        if (!designerState) {
            designerState = markRaw(new DesignerState(this));
            this.allDesignerState[fullPath] = designerState;
        }
        return designerState;
    }

    /**
     * 删除 DesignerState 对象
     * @param fullPath 设计器页面路由路径
     */
    delDesignerState(fullPath: string): DesignerState | undefined {
        const designerState = this.allDesignerState[fullPath];
        delete this.allDesignerState[fullPath];
        return designerState;
    }

    /** 挂载当前设计器 */
    mount(container: EventContainer, window: Window): void {
        // 先卸载
        this.unmount();
        // console.log("DesignerEngine mount");
        // 创建设计器功能模块集合
        const drivers = this.props.drivers.map(driver => new driver(this, container, window));
        const effects = this.props.effects.map(effect => new effect(this, container, window));
        this.drivers.push(...drivers);
        this.effects.push(...effects);
        // 开始消费 EventBus 事件
        this.effects.forEach(effect => effect.effect());
        this.eventbus.startListening();
        // 启动 DesignerDriver
        this.drivers.forEach(driver => driver.attach());
    }

    /** 卸载当前设计器 */
    unmount(): void {
        // console.log("DesignerEngine unmount");
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
