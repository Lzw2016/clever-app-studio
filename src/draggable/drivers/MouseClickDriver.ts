import { DesignerDriver } from "@/draggable/DesignerDriver";
import { designerContent } from "@/draggable/Constant";
import { MouseClickEvent } from "@/draggable/events/cursor/MouseClickEvent";
import { MouseDoubleClickEvent } from "@/draggable/events/cursor/MouseDoubleClickEvent";
import { htmlExtAttr, useHtmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";

/**
 * 封装鼠标点击事件，产生的业务事件：MouseClickEvent、MouseDoubleClickEvent
 */
class MouseClickDriver extends DesignerDriver {

    // --------------------------------------------------------------------------------------------
    // 生产事件
    // --------------------------------------------------------------------------------------------

    /** 启动当前 EventDriver 的监听 */
    attach(): void {
        this.addEventListener('click', this.onMouseClick);
        this.addEventListener('dblclick', this.onMouseDoubleClick);
    }

    /** 停止当前 EventDriver 的监听 */
    detach(): void {
        this.removeEventListener('click', this.onMouseClick);
        this.addEventListener('dblclick', this.onMouseDoubleClick);
    }

    onMouseClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target?.closest) return;
        const element = target.closest(designerContent);
        if (!element) return;
        this.eventbus.dispatch(new MouseClickEvent(event));
    }

    onMouseDoubleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target?.closest) return;
        const element = target.closest(designerContent);
        if (!element) return;
        this.eventbus.dispatch(new MouseDoubleClickEvent(event));
    }

    // --------------------------------------------------------------------------------------------
    // 消费事件
    // --------------------------------------------------------------------------------------------

    effect(): void {
        // 鼠标单击
        this.eventbus.subscribe(MouseClickEvent, event => {
            console.log(" MouseClickEvent");
            const target = event.data.target as HTMLElement;
            if (!target?.closest) return;
            const container = target.closest(designerContent);
            if (!container) return;
            const element = target.closest(`[${htmlExtAttr.nodeRef}]`);
            if (!element) return;
            const containerRect = container.getBoundingClientRect()
            const elementRect = element.getBoundingClientRect()
            this.designerEngine.tmp.selection = {
                height: elementRect.height - 2,
                width: elementRect.width - 2,
                top: elementRect.top - containerRect.top + 1,
                left: elementRect.left - containerRect.left + 1,
                componentType: useHtmlExtAttr.componentType(element),
            };
        });
    }
}

export {
    MouseClickDriver,
}
