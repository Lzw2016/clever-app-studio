import { DesignerEngine } from "@/draggable/DesignerEngine";
import { EventBus } from "@/draggable/EventBus";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import { EventContainer } from "@/draggable/types/Designer";
import { Property } from "csstype";

abstract class DesignerModule {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 设计器事件总线 */
    readonly eventbus: EventBus;
    /** 组件管理器 */
    readonly componentManage: ComponentManage;
    /** 当前模块对应的 HTMLElement 对象 */
    readonly container: EventContainer = window.document;
    /** 当前模块对应的 window 对象 */
    readonly window: Window = window;

    constructor(designerEngine: DesignerEngine, container: EventContainer, window: Window) {
        this.designerEngine = designerEngine;
        this.eventbus = designerEngine.eventbus;
        this.componentManage = designerEngine.props.componentManage;
        this.container = container;
        this.window = window;
    }

    protected getContainerCursorStyle() {
        if (this.container instanceof Document) {
            return this.container.body.style.cursor;
        }
        return this.container.style.cursor;
    }

    protected setContainerCursorStyle(cursorStyle: Property.Cursor) {
        if (this.container instanceof Document) {
            this.container.body.style.cursor = cursorStyle;
        } else {
            this.container.style.cursor = cursorStyle;
        }
    }
}

export {
    DesignerModule
}
