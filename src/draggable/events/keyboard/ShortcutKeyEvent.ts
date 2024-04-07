import { HotkeysEvent } from "hotkeys-js";
import { DesignerEvent } from "@/draggable/types/Designer";

/**
 * 键盘快捷键事件
 */
class ShortcutKeyEvent implements DesignerEvent<HotkeysEvent> {
    /** 事件类型 */
    readonly type: string;
    /** 光标事件数据 */
    readonly data: HotkeysEvent;
    /** 原始的键盘事件 */
    readonly rawEvent: KeyboardEvent;

    constructor(keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) {
        this.type = this['constructor'].name;
        this.data = hotkeysEvent;
        this.rawEvent = keyboardEvent;
    }
}

export {
    ShortcutKeyEvent,
}
