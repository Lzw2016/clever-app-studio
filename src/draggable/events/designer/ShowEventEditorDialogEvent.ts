import { DesignerEvent } from "@/draggable/types/Designer";

interface ShowEventEditorDialogData {
    /** RuntimeNode 的 id 属性 */
    readonly nodeId?: string;
    /** 事件名称 */
    readonly eventName: string;
}

class ShowEventEditorDialogEvent implements DesignerEvent<ShowEventEditorDialogData> {
    /** 事件类型 */
    readonly type: string;
    /** 事件数据 */
    readonly data: ShowEventEditorDialogData;

    constructor(data: ShowEventEditorDialogData) {
        this.type = this['constructor'].name;
        this.data = data;
    }
}

export type {
    ShowEventEditorDialogData,
}

export {
    ShowEventEditorDialogEvent,
}
