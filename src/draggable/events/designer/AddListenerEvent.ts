import { DesignerEvent } from "@/draggable/types/Designer";
import { EventInfo } from "@/draggable/types/ComponentMeta";

interface AddListenerData {
    /** RuntimeNode 的 id 属性 */
    readonly nodeId: string;
    /** 事件信息 */
    readonly eventInfo: EventInfo
}

class AddListenerEvent implements DesignerEvent<AddListenerData> {
    /** 事件类型 */
    readonly type: string;
    /** 事件数据 */
    readonly data: AddListenerData;

    constructor(data: AddListenerData) {
        this.type = this['constructor'].name;
        this.data = data;
    }
}

export type {
    AddListenerData,
}

export {
    AddListenerEvent,
}
