import { DesignerEvent } from "@/draggable/types/Designer";

interface UpdateListenerData {
    /** RuntimeNode 的 id 属性 */
    readonly nodeId: string;
    /** 事件名称 */
    readonly eventName: string;
}

class UpdateListenerEvent implements DesignerEvent<UpdateListenerData> {
    /** 事件类型 */
    readonly type: string;
    /** 事件数据 */
    readonly data: UpdateListenerData;

    constructor(data: UpdateListenerData) {
        this.type = this['constructor'].name;
        this.data = data;
    }
}

export type {
    UpdateListenerData,
}

export {
    UpdateListenerEvent,
}
