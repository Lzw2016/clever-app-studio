import { DesignerDriver } from "@/draggable/DesignerDriver";
import hotkeys, { HotkeysEvent } from "hotkeys-js";
import lodash from "lodash";
import { ShortcutKeyEvent } from "@/draggable/events/keyboard/ShortcutKeyEvent";

/**
 * 封装键盘事件，产生的业务事件：ShortcutKeyEvent
 */
class KeyboardDriver extends DesignerDriver {
    protected readonly scope = "designer-engine";
    protected readonly shortcutKeys = {
        allKey: "*",
        save: "ctrl+s",
    };

    /** 启动当前 EventDriver 的监听 */
    attach(): void {
        hotkeys.setScope(this.scope);
        hotkeys(this.shortcutKeys.allKey, { scope: this.scope, keyup: true, keydown: true }, this.keepPressedKey);
        hotkeys(this.shortcutKeys.save, this.scope, this.onSave);
    }

    /** 停止当前 EventDriver 的监听 */
    detach(): void {
        lodash.forEach(this.shortcutKeys, shortcutKey => hotkeys.unbind(shortcutKey, this.scope));
        hotkeys.deleteScope(this.scope);
    }

    // 保存事件
    onSave = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
        this.preventDefault(keyboardEvent);
        this.eventbus.dispatch(new ShortcutKeyEvent(keyboardEvent, hotkeysEvent));
    }

    // 键盘按键是否按下的状态维护
    keepPressedKey = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
        const multipleKeys = hotkeys.getPressedKeyString().length > 1;
        const keydown = (keyboardEvent.type === "keydown");
        const keyup = (keyboardEvent.type === "keyup");
        const ctrl = hotkeys.ctrl || hotkeys.control;
        const shift = hotkeys.shift;
        if (ctrl || shift) this.preventDefault(keyboardEvent);
        if (multipleKeys) {
            // 按下多个键
            this.designerEngine.onlyPressedCtrl = false;
            this.designerEngine.onlyPressedShift = false;
            return;
        }
        if (keydown) {
            if (ctrl) {
                this.designerEngine.onlyPressedCtrl = true;
            } else if (shift) {
                this.designerEngine.onlyPressedShift = true;
            }
        }
        if (keyup) {
            if (ctrl) {
                this.designerEngine.onlyPressedCtrl = false;
            } else if (shift) {
                this.designerEngine.onlyPressedShift = false;
            }
        }
    }
}

export {
    KeyboardDriver,
}
