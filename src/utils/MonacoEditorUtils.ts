import type { editor } from "monaco-editor";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { isArray, isStr } from "@/utils/Typeof";
import { ideaDraculaTheme, ideaLightTheme } from "@/utils/IdeaTheme";

type MonacoType = typeof Monaco;

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

function keyBinding(editor: editor.IStandaloneCodeEditor, monaco: MonacoType) {
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

enum MonacoTheme {
    IdeaDracula = "idea-dracula",
    IdeaLight = "idea-light",
}

const themeColor: { [name: string]: string; } = {
    black: "#000000",
    silver: "#C0C0C0",
    gray: "#808080",
    white: "#FFFFFF",
    maroon: "#800000",
    red: "#FF0000",
    purple: "#800080",
    fuchsia: "#FF00FF",
    green: "#008000",
    lime: "#00FF00",
    olive: "#808000",
    yellow: "#FFFF00",
    navy: "#000080",
    blue: "#0000FF",
    teal: "#008080",
    aqua: "#00FFFF",
};

interface ThemeConfig {
    colors: any;
    tokenColors: Array<{ scope?: string | string[], settings: any }>;
}

function getRules(themeConfig: ThemeConfig): Array<Monaco.editor.ITokenThemeRule> {
    const rules: Array<Monaco.editor.ITokenThemeRule> = [];
    themeConfig.tokenColors.forEach(tokenColor => {
        const settings = tokenColor?.settings ?? {};
        const scope = tokenColor?.scope;
        if (settings?.fontStyle && !settings.fontStyle.startsWith("#") && themeColor[settings.fontStyle]) {
            settings.fontStyle = themeColor[settings.fontStyle];
        }
        if (settings?.foreground && !settings.foreground.startsWith("#") && themeColor[settings.foreground]) {
            settings.foreground = themeColor[settings.foreground];
        }
        if (isStr(scope)) {
            rules.push({ token: scope, ...settings });
        } else if (isArray(scope)) {
            scope.forEach(scope => rules.push({ token: scope, ...settings }));
        }
    });
    return rules;
}

function registerTheme(monaco: MonacoType) {
    // 定义IDEA黑暗主题
    monaco.editor.defineTheme(MonacoTheme.IdeaDracula, {
        base: "vs-dark",
        inherit: true,
        rules: [
            ...getRules(ideaDraculaTheme),
        ],
        colors: {
            ...ideaDraculaTheme.colors,
            "editor.background": "#2B2B2B",
            "editor.lineHighlightBackground": "#323232",
            "editorLineNumber.foreground": "#606366",
            "editorGutter.background": "#313335",
            "editor.selectionHighlightBackground": "#214283",
        },
        encodedTokensColors: [],
    });
    // 定义IDEA高亮主题
    monaco.editor.defineTheme(MonacoTheme.IdeaLight, {
        base: "vs",
        inherit: true,
        rules: [
            ...getRules(ideaLightTheme),
        ],
        colors: {
            ...ideaLightTheme.colors,
        },
        encodedTokensColors: [],
    });
}

export {
    defOptions,
    keyBinding,
    MonacoTheme,
    registerTheme,
}
