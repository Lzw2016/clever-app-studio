import { DesignerEvent } from "@/draggable/types/Designer";

interface RemoveListenerData {
    /** RuntimeNode 的 id 属性 */
    readonly nodeId: string;
    /** 事件名称 */
    readonly eventName: string;
}

class RemoveListenerEvent implements DesignerEvent<RemoveListenerData> {
    /** 事件类型 */
    readonly type: string;
    /** 事件数据 */
    readonly data: RemoveListenerData;

    constructor(data: RemoveListenerData) {
        this.type = this['constructor'].name;
        this.data = data;
    }
}

export type {
    RemoveListenerData,
}

export {
    RemoveListenerEvent,
}
