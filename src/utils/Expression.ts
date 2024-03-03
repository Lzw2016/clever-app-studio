import {isArray, isObj, isStr} from "@/utils/Typeof";

/** 编译表达式选项 */
interface ExpOptions {
    /** 表达式函数的内部this指向值 */
    thisArg?: any;
    /** 是否缓存编译结果 */
    cache?: boolean;
}

/** 表达式执行器 */
interface ExpressionExecutor {
    (data?: object): any;

    /** 表达式源码 */
    source: string;
}

/** 表达式编译结果缓存 */
const expCache: Map<string, ExpressionExecutor> = new Map<string, ExpressionExecutor>();

/**
 * 编译表达式
 * @param expression    表达式字符串
 * @param options       编译选项
 */
function compileExp(expression: string, options?: ExpOptions): ExpressionExecutor {
    if (!expression) expression = "";
    // 除去首尾空字符
    expression = expression.trim();
    // 插入 return 语句，未考虑：表达式是多个语句且没有写分号(通过换行表达多语句)
    const code = expression.split(";");
    const lastLine = code[code.length - 1];
    if (!lastLine.trim().startsWith("return ")) {
        code[code.length = 1] = `return ${lastLine}`;
    }
    expression = code.join(";\n");
    if (expCache.has(expression)) {
        return expCache.get(expression)!;
    }
    const cache = options?.cache;
    try {
        // 这里使用了弃用的 with 关键字，后面有需要可以参考 art-template 项目实现此功能
        const source = `with (obj) {\n${expression}\n}`;
        let executor: any = new Function("obj", source);
        if (options?.thisArg) {
            executor = executor.bind(options.thisArg);
        }
        executor.source = source;
        if (cache) {
            expCache.set(expression, executor);
        }
        return executor;
    } catch (e) {
        throw new Error(`编译表达式失败，表达式内容: ${expression}`, {cause: e});
    }
}

/**
 * 计算表达式值(仅支持“字符串形式”表达式)
 */
function calcStrExp(exp: any, data: object, options?: ExpOptions): any {
    // 不是表达式的情况
    if (!isStr(exp)) return exp;
    exp = exp.trim();
    if (!exp.startsWith("{{") || !exp.endsWith("}}")) return exp;
    // 得到表达式内容
    exp = exp.substring(2, exp.length - 2);
    const expFun = compileExp(exp, options);
    return expFun(data);
}

/**
 * 计算表达式值。表达式形式：
 * 1. '{{ exp }}'
 * 2. { a: '{{ exp }}', b: '{{ exp }}', c: { d: '{{ exp }}', e: 123, ... }, ... }
 *
 * @param expObj    表达式(“字符串形式”、“数组形式”、“对象形式”)
 * @param data      表达式数据
 * @param options   编译选项
 */
function calcExpression(expObj: any, data: object, options?: ExpOptions): any {
    if (isStr(expObj)) {
        return calcStrExp(expObj, data, options);
    } else if (isArray(expObj)) {
        return expObj.map(item => calcExpression(item, data, options));
    } else if (isObj(expObj)) {
        const res: any = {};
        for (let name in expObj) {
            const value = expObj[name];
            // name不是字符串
            if (!isStr(name)) {
                res[name] = value
                continue;
            }
            res[name] = calcExpression(value, data, options);
        }
        return res;
    } else {
        // 不支持的情况，直接返回
        return expObj;
    }
}

export type {
    ExpOptions,
    ExpressionExecutor,
}

export {
    compileExp,
    calcExpression,
}
