import { globalThisPolyfill } from "@/utils/GlobalThisPolyfill";
import { CursorPosition, DesignerEvent } from "@/draggable/types/Designer";

/**
 * 光标事件数据
 */
interface CursorEventData extends CursorPosition {
    /** 指向触发该事件的实际DOM元素 */
    target: /*  */ EventTarget;
    /** 生成事件的 document.defaultView 对象，在浏览器中，就是事件所在的 Window 对象(在 iframe 中很有用) */
    view: /*    */ Window;
}

abstract class AbstractCursorEvent implements DesignerEvent<CursorEventData> {
    /** 事件类型 */
    readonly type: string;
    /** 光标事件数据 */
    readonly data: CursorEventData;

    protected constructor(event: MouseEvent) {
        this.type = this['constructor'].name;
        this.data = this.transformCoordinates(event);
    }

    /**
     * 坐标转换，参考: https://juejin.cn/post/7063073539191996453
     */
    protected transformCoordinates(event: MouseEvent): CursorEventData {
        const data: CursorEventData = {
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX,
            pageY: event.pageY,
            target: event.target!,
            view: event.view!,
            topClientX: event.clientX,
            topClientY: event.clientY,
            topPageX: event.pageX,
            topPageY: event.pageY,
        };
        // 当前脚本运行在 iframe 中时
        const { frameElement } = event.view || {};
        if (frameElement && data.view !== globalThisPolyfill) {
            //  DOMRect 对象，是包含整个元素的最小矩形（包括 padding 和 border-width）
            const frameRect = frameElement.getBoundingClientRect();
            // frameRect.width 是元素在视口中的实际渲染宽度（包括任何CSS变换如缩放的影响）
            // frameElement.offsetWidth 属性则返回元素的内容区域（不包括边框和内填充）的实际CSS宽度
            // scale 描述了元素在渲染时被放大或缩小的程度
            const scale = frameRect.width / frameElement['offsetWidth'];
            // iframe存在的情况计算出：以“最外层窗口”左上角为原点的坐标位置
            data.topClientX = data.clientX * scale + frameRect.x;
            data.topClientY = data.clientY * scale + frameRect.y;
            data.topPageX = data.pageX + frameRect.x - data.view.scrollX;
            data.topPageY = data.pageY + frameRect.y - data.view.scrollY;
            // 获取“最外层窗口”下的HTML元素
            const topElement = document.elementFromPoint(data.topPageX, data.topClientY);
            if (topElement !== frameElement) data.target = topElement!;
        }
        return data;
    }
}

export type {
    CursorEventData,
}

export {
    AbstractCursorEvent,
}
