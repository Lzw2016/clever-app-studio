import type { editor } from "monaco-editor";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoEditor = typeof Monaco;

const defOptions: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    automaticLayout: true,
    contextmenu: true,
    minimap: { enabled: false },
    scrollbar: {
        // vertical: "auto",
        // horizontal: "auto",
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        arrowSize: 24,
    },
    fixedOverflowWidgets: true,
    // formatOnType: true,
    // formatOnPaste: true,
};

function keyBinding(editor: editor.IStandaloneCodeEditor, monaco: MonacoEditor) {
    // Alt + / --> 智能提示
    editor.addCommand(
        monaco.KeyMod.Alt | monaco.KeyCode.Slash,
        () => editor.trigger(null, "editor.action.triggerSuggest", {}),
        "!findWidgetVisible && !inReferenceSearchEditor && !editorHasSelection"
    );
    // Ctrl + Shift + U --> 选中内容转大写
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyU,
        () => editor.trigger(null, "editor.action.transformToUppercase", {}),
    );
    // Ctrl + Shift + I --> 选中内容转小写
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyI,
        () => editor.trigger(null, "editor.action.transformToLowercase", {}),
    );
    // Ctrl + Alt + L --> 代码格式化
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
        () => editor.trigger(null, "editor.action.formatDocument", {}),
        "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly"
    );
    // Ctrl + Alt + L --> 选中代码格式化
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
        () => editor.trigger(null, "editor.action.formatSelection", {}),
        "editorHasDocumentFormattingProvider && editorHasSelection && editorTextFocus && !editorReadonly"
    );
    // Ctrl + Alt + O --> 优化导入语句
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyO,
        () => editor.trigger(null, "editor.action.organizeImports", {}),
        "editorTextFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/"
    );
    // Shift + Enter 在下面插入一行
    editor.addCommand(
        monaco.KeyMod.Shift | monaco.KeyCode.Enter,
        () => editor.trigger(null, "editor.action.insertLineAfter", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + Shift + Enter 在上面插入一行
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
        () => editor.trigger(null, "editor.action.insertLineBefore", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + D 向下复制一行
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD,
        () => editor.trigger(null, "editor.action.copyLinesDownAction", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + Y 删除行
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY,
        () => editor.trigger(null, "editor.action.deleteLines", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + P 触发参数提示
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP,
        () => editor.trigger(null, "editor.action.triggerParameterHints", {}),
        "editorHasSignatureHelpProvider && editorTextFocus"
    );
    // Ctrl + Shift + UP 向上移动行
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow,
        () => editor.trigger(null, "editor.action.moveLinesUpAction", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + Shift + Down 向下移动行
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow,
        () => editor.trigger(null, "editor.action.moveLinesDownAction", {}),
        "editorTextFocus && !editorReadonly"
    );
    // Ctrl + Q 显示悬停
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyQ,
        () => editor.trigger(null, "editor.action.showHover", {}),
        "editorTextFocus"
    );
}

export {
    defOptions,
    keyBinding,
}

