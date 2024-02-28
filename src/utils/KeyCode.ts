/**
 * 按键编码
 */
enum KeyCode {
    Backspace = 'Backspace',
    Tab = 'Tab',
    Enter = 'Enter',
    Shift = 'Shift',
    Control = 'Control',
    Alt = 'Alt',
    CapsLock = 'CapsLock',
    Escape = 'Escape',
    Space = ' ',
    PageUp = 'PageUp',
    PageDown = 'PageDown',
    End = 'End',
    Home = 'Home',
    ArrowLeft = 'ArrowLeft',
    ArrowUp = 'ArrowUp',
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown',
    Left = 'Left',
    Up = 'Up',
    Right = 'Right',
    Down = 'Down',
    Insert = 'Insert',
    Delete = 'Delete',
    Zero = '0',
    ClosedParen = ')',
    One = '1',
    ExclamationMark = '!',
    Two = '2',
    AtSign = '@',
    Three = '3',
    PoundSign = '£',
    Hash = '#',
    Four = '4',
    DollarSign = '$',
    Five = '5',
    PercentSign = '%',
    Six = '6',
    Caret = '^',
    Hat = '^',
    Seven = '7',
    Ampersand = '&',
    Eight = '8',
    Star = '*',
    Asterisk = '*',
    Nine = '9',
    OpenParen = '(',
    a = 'a',
    b = 'b',
    c = 'c',
    d = 'd',
    e = 'e',
    f = 'f',
    g = 'g',
    h = 'h',
    i = 'i',
    j = 'j',
    k = 'k',
    l = 'l',
    m = 'm',
    n = 'n',
    o = 'o',
    p = 'p',
    q = 'q',
    r = 'r',
    s = 's',
    t = 't',
    u = 'u',
    v = 'v',
    w = 'w',
    x = 'x',
    y = 'y',
    z = 'z',
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G',
    H = 'H',
    I = 'I',
    J = 'J',
    K = 'K',
    L = 'L',
    M = 'M',
    N = 'N',
    O = 'O',
    P = 'P',
    Q = 'Q',
    R = 'R',
    S = 'S',
    T = 'T',
    U = 'U',
    V = 'V',
    W = 'W',
    X = 'X',
    Y = 'Y',
    Z = 'Z',
    Meta = 'Meta',
    LeftWindowKey = 'Meta',
    RightWindowKey = 'Meta',
    Numpad0 = '0',
    Numpad1 = '1',
    Numpad2 = '2',
    Numpad3 = '3',
    Numpad4 = '4',
    Numpad5 = '5',
    Numpad6 = '6',
    Numpad7 = '7',
    Numpad8 = '8',
    Numpad9 = '9',
    Multiply = '*',
    Add = '+',
    Subtract = '-',
    DecimalPoint = '.',
    MSDecimalPoint = 'Decimal',
    Divide = '/',
    F1 = 'F1',
    F2 = 'F2',
    F3 = 'F3',
    F4 = 'F4',
    F5 = 'F5',
    F6 = 'F6',
    F7 = 'F7',
    F8 = 'F8',
    F9 = 'F9',
    F10 = 'F10',
    F11 = 'F11',
    F12 = 'F12',
    NumLock = 'NumLock',
    ScrollLock = 'ScrollLock',
    SemiColon = ';',
    Equals = '=',
    Comma = ',',
    Dash = '-',
    Period = '.',
    UnderScore = '_',
    PlusSign = '+',
    ForwardSlash = '/',
    Tilde = '~',
    GraveAccent = '`',
    OpenBracket = '[',
    ClosedBracket = ']',
    Quote = "'",
}

/**
 * 修饰键编码
 */
const modifierKeys: Array<[keyof KeyboardEvent, KeyCode]> = [
    /** win键(mac中是Command键) */
    ['metaKey', KeyCode.Meta],
    ['shiftKey', KeyCode.Shift],
    ['ctrlKey', KeyCode.Control],
    ['altKey', KeyCode.Alt],
]

/**
 * 从键盘事件中获取按下的键
 */
function getKeyCode(event: KeyboardEvent): KeyCode {
    return event.key as any;
}

/**
 * 判断两个“按键编码”是否相同
 * @param code1 按键编码1
 * @param code2 按键编码2
 */
function keyCodeEquals(code1?: KeyCode, code2?: KeyCode) {
    return code1 === code2;
}

/**
 * 当前“键盘事件”是否是“修饰键编码”(如：Shift、Control、Alt...)
 * @param keyCode 按键编码
 */
function isModifier(keyCode: KeyCode): boolean {
    return modifierKeys.some(item => keyCodeEquals(keyCode, item[1]));
}

/**
 * 从“键盘事件”中获取“修饰键编码”(如：Shift、Control、Alt...)，如果存在多个就一同返回
 * @param keyboardEvent 键盘事件
 */
function modifierKeyCode(keyboardEvent: KeyboardEvent): KeyCode[] {
    let modifiers: KeyCode[] = [];
    for (let item of modifierKeys) {
        if (keyboardEvent[item[0]]) {
            modifiers.push(item[1]);
        }
    }
    return modifiers;
}

/**
 * 快捷键组合(可能是一个键也可能是多个键)
 * 快捷键必须是：多个“修饰键”(可以没有) + 一个“普通键” 的组合形式
 */
type ShortcutKeyCode = KeyCode[];

/**
 * 快捷键组合的最大键数量
 */
const shortcutKeyMaxLength: number = 6;

/**
 * 排序“键队列”(把修饰键放在队列的最开始，其它键位置不变)
 * @param keyCodeSequence 键队列
 */
function sortKeyCodeSequence(keyCodeSequence: KeyCode[]): KeyCode[] {
    const modifiers: KeyCode[] = [];
    const others: KeyCode[] = [];
    for (let keyCode of keyCodeSequence) {
        if (modifierKeys.some(item => keyCode === item[1])) {
            modifiers.push(keyCode);
        } else {
            others.push(keyCode);
        }
    }
    return modifiers.sort().concat(others)
}

/**
 * 判断“快捷键”是否与给定的“键队列”匹配
 * @param shortcutKeyCode 快捷键
 * @param keyCodeSequence 键队列
 */
function matchShortcutKeys(shortcutKeyCode: ShortcutKeyCode, keyCodeSequence: KeyCode[]): boolean {
    if (shortcutKeyCode.length !== keyCodeSequence.length) return false;
    shortcutKeyCode = sortKeyCodeSequence(shortcutKeyCode);
    keyCodeSequence = sortKeyCodeSequence(keyCodeSequence);
    for (let idx = 0; idx < shortcutKeyCode.length; idx++) {
        if (!keyCodeEquals(shortcutKeyCode[idx], keyCodeSequence[idx])) {
            return false;
        }
    }
    return true;
}

/**
 * 判断“键队列”是否与给定的“快捷键”处于预匹配状态(不完全匹配但是前缀是相同的)
 * @param shortcutKeyCode 快捷键
 * @param keyCodeSequence 键队列
 */
function preMatchShortcutKeys(shortcutKeyCode: ShortcutKeyCode, keyCodeSequence: KeyCode[]): boolean {
    if (keyCodeSequence.length <= 0 || keyCodeSequence.length > shortcutKeyCode.length) return false;
    shortcutKeyCode = sortKeyCodeSequence(shortcutKeyCode);
    keyCodeSequence = sortKeyCodeSequence(keyCodeSequence);
    for (let idx = 0; idx < keyCodeSequence.length; idx++) {
        if (!keyCodeEquals(shortcutKeyCode[idx], keyCodeSequence[idx])) {
            return false;
        }
    }
    return true;
}

export type {
    ShortcutKeyCode,
}

export {
    KeyCode,
    modifierKeys,
    getKeyCode,
    keyCodeEquals,
    isModifier,
    modifierKeyCode,
    shortcutKeyMaxLength,
    sortKeyCodeSequence,
    matchShortcutKeys,
    preMatchShortcutKeys,
}
