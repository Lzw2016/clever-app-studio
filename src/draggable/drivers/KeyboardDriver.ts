import lodash from "lodash";
import hotkeys, { HotkeysEvent } from "hotkeys-js";
import { DesignerDriver } from "@/draggable/DesignerDriver";
import { ShortcutKeyEvent } from "@/draggable/events/keyboard/ShortcutKeyEvent";

const rawFilter = hotkeys.filter;
hotkeys.filter = function (event) {
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
        return true;
    }
    const pressedFnKey = event.ctrlKey || event.altKey || event.metaKey;
    const target = event.target as Element;
    // 属于 monaco 编辑器
    if (pressedFnKey && target?.className?.includes('monaco-mouse-cursor-text')) {
        return true;
    }
    // 默认的过滤规则 https://github.com/jaywcjlove/hotkeys-js/blob/master/README-zh.md#filter
    return rawFilter(event);
}

/**
 * 封装键盘事件，产生的业务事件：ShortcutKeyEvent
 */
class KeyboardDriver extends DesignerDriver {
    protected readonly scope = "designer-engine";
    protected readonly shortcutKeys = {
        allKey: "*",
        save: "ctrl+s",
        showBlockEditorDialog: "ctrl+p",
        showEventEditorDialog: "ctrl+e",
    };

    /** 启动当前 EventDriver 的监听 */
    attach(): void {
        hotkeys.setScope(this.scope);
        hotkeys(this.shortcutKeys.allKey, { scope: this.scope, keyup: true, keydown: true, capture: true }, this.keepPressedKey);
        hotkeys(this.shortcutKeys.save, { scope: this.scope, capture: true }, this.onSave);
        hotkeys(this.shortcutKeys.showBlockEditorDialog, { scope: this.scope, capture: true }, this.onShowBlockEditorDialog);
        hotkeys(this.shortcutKeys.showEventEditorDialog, { scope: this.scope, capture: true }, this.onShowEventEditorDialog);
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

    // 打开Block编辑对话框
    onShowBlockEditorDialog = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
        this.preventDefault(keyboardEvent);
        this.designerEngine.showBlockEditorDialog = true;
        // 关闭其它对话框
        this.designerEngine.showEventEditorDialog = false;
    }

    // 打开Event编辑对话框
    onShowEventEditorDialog = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
        this.preventDefault(keyboardEvent);
        this.designerEngine.showEventEditorDialog = true;
        // 关闭其它对话框
        this.designerEngine.showBlockEditorDialog = false;
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
