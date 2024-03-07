/** 获取js变量类型的字符串形式，如：“[object Number]” */
function getTypeStr(obj: any): string {
    return Object.prototype.toString.call(obj);
}

/** 判断变量是否有值 obj !== null && obj !== undefined */
function hasValue(obj: any): obj is {} {
    return obj !== null && obj !== undefined;
}

/** 判断变量是否没有值 obj === null || obj === undefined */
function noValue(obj: any): obj is null | undefined {
    return obj === null || obj === undefined;
}

function isType<T>(types: string | string[]) {
    return function (obj: unknown): obj is T {
        if (noValue(types)) return false;
        if (!Array.isArray(types)) types = [types];
        const typeStr = getTypeStr(obj).toLowerCase();
        return types.map(type => type.toLowerCase()).some(type => `[object ${type}]` === typeStr);
    };
}

/** 变量是否是 string */
const isStr = isType<string>('String');

/** 变量是否是 number */
const isNum = isType<number>('Number');

/** 变量是否是无效的 number */
const isNaN = Number.isNaN;

/** 变量是否是有效的 number */
const isValidNumber = (val: any): val is number => !isNaN(val) && isNum(val);

/** 变量是否是 boolean */
const isBool = isType<boolean>('Boolean');

/** 变量是否是 Date */
const isDate = isType<Date>('Date');

/** 变量是否是 Array */
const isArray = Array.isArray;

/** 变量是否是 Map */
const isMap = isType<Map<any, any>>('Map');

/** 变量是否是 Set */
const isSet = isType<Set<any>>('Set');

/** 变量是否是 null */
const isNull = isType<null>('Null');

/** 变量是否是 undefined */
const isUndefined = isType<undefined>('Undefined');

/** 变量是否是 RegExp */
const isRegExp = isType<RegExp>('RegExp');

/** 变量是否是 Symbol */
const isSymbol = isType<Symbol>('Symbol');

/** 变量是否是 函数(Function、AsyncFunction、GeneratorFunction) */
const isFun = isType<(...args: any[]) => any>(['Function', 'AsyncFunction', 'GeneratorFunction']);

/** 变量是否是 Function(普通函数) */
const isFunction = isType<(...args: any[]) => any>('Function');

/** 变量是否是 AsyncFunction(异步函数，返回Promise的函数) */
const isAsyncFunction = isType<(...args: any[]) => any>('AsyncFunction');

/** 变量是否是 GeneratorFunction(异步函数，返回Generator的函数) */
const isGeneratorFunction = isType<(...args: any[]) => any>('GeneratorFunction');

/** 变量是否是 Promise */
const isPromise = isType<Promise<any>>("Promise");

/** 变量是否是 普通Object(对象的内部属性 [Class] 为 Object) */
const isPlainObj = isType<object>('Object');

/** 变量是否是 Object(非 number、string、undefined、boolean、bigint、symbol、function 类型的都是 object, array也是object) */
const isObj = <T = any>(val: unknown): val is T => (typeof val === 'object');

/** 变量是否是 JSON */
const isJSON = isType<JSON>('JSON');

/** 变量是否是 Math */
const isMath = isType<Math>('Math');

/** 变量是否是 Window */
const isWindow = isType<Window>('Window');

/** 变量是否是 HTMLElement */
const isHTMLElement = (obj: any): obj is HTMLElement => {
    if (obj instanceof HTMLElement) {
        return true;
    }
    const typeStr = getTypeStr(obj).toLowerCase();
    return typeStr.startsWith('[object html') && typeStr.endsWith('element]');
};

// /** 变量是否是 ReactNode */
// export const isReactNode = isType<boolean>('');

export {
    isStr,
    isNum,
    isNaN,
    isValidNumber,
    isBool,
    isDate,
    isArray,
    isMap,
    isSet,
    isNull,
    isUndefined,
    hasValue,
    noValue,
    isRegExp,
    isSymbol,
    isFun,
    isFunction,
    isAsyncFunction,
    isGeneratorFunction,
    isPromise,
    isPlainObj,
    isObj,
    isJSON,
    isMath,
    isWindow,
    isHTMLElement,
}
