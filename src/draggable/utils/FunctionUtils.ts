import lodash from "lodash";
import { hasValue, isArray, isFun } from "@/utils/Typeof";
import { FunctionInfo } from "@/draggable/types/Base";

/**
 * 解析函数的正则(非lambda函数)
 * 1. /^....$/
 *      从开头到结尾匹配整个字符串
 * 2. (async\s+)?
 *      可选的 async 关键字捕获组
 * 3. (function\s*)?
 *      function 关键字捕获组
 * 4. ([\w_$]*)?
 *      可选的函数名
 * 5. (\([^)]*\))\s*
 *      函数参数捕获组
 * 6. (\{.*})
 *      函数体
 */
const funPattern = /^(async\s+)?(function\s*)?([\w_$]*)?\s*(\([^)]*\))\s*(\{.*})$/s;

/**
 * 解析函数的正则(lambda函数)
 * 1. /^....$/
 *      从开头到结尾匹配整个字符串
 * 2. (async\s+)?
 *      可选的 async 关键字捕获组
 * 3. (\(?[\w\s_$,]*\)?)\s*
 *      函数参数捕获组
 * 4. =>
 *      lambda函数的箭头
 * 5. ([\s\S]*)
 *      函数体
 */
const lambdaFunPattern = /^(async\s*)?(\(?[\w\s_$,]*\)?)\s*=>([\s\S]*)$/;

/**
 * 解析函数信息，支持的函数形式 <br />
 * <pre>
 * 1. 'function test(p1, p2) {\n    console.log("p1", p1, "p2", p2);\n}'
 * 2. 'function(p1, p2) {\n    console.log("p1", p1, "p2", p2);\n}'
 * 3. '(p1, p2) => {\n    console.log("p1", p1, "p2", p2);\n}'
 * 4. '(p1, p2) => console.log("p1", p1, "p2", p2)'
 * 5. 'async function test(p1, p2) {\n    console.log("p1", p1, "p2", p2);\n}'
 * 6. 'async function(p1, p2) {\n    console.log("p1", p1, "p2", p2);\n}'
 * 7. 'async (p1, p2) => {\n    console.log("p1", p1, "p2", p2);\n}'
 * 8. 'async (p1, p2) => console.log("p1", p1, "p2", p2)'
 * 9. 'async p1 => console.log("p1", p1)'
 * </pre>
 * @param fun 函数对象
 */
function parseFun(fun: Function | string): FunctionInfo | undefined {
    const code = lodash.trim(isFun(fun) ? Function.prototype.toString.call(fun) : (fun ?? "").toString());
    let match = code.match(funPattern);
    let async: string;
    let name: string | undefined;
    let params: string;
    let body: string;
    let lambda: boolean;
    if (match) {
        async = lodash.trim(match[1]);
        name = match[3];
        if (hasValue(name)) name = lodash.trim(name);
        params = lodash.trim(match[4]);
        body = lodash.trim(match[5]);
        lambda = false;
    } else {
        match = code.match(lambdaFunPattern);
        if (!match) return;
        async = lodash.trim(match[1]);
        params = lodash.trim(match[2]);
        body = lodash.trim(match[3]);
        lambda = true;
    }
    if (params.startsWith("(") || params.endsWith(")")) {
        params = params.substring(1, params.length - 1);
    }
    if (body.startsWith("{") || body.endsWith("}")) {
        body = body.substring(1, body.length - 1);
        body = lodash.trim(body);
    }
    return {
        async: async === "async",
        name: name,
        params: lodash.trim(params).length > 0 ? params.split(",").map(name => lodash.trim(name)) : [],
        body: body,
        lambda: lambda,
        funName: isFun(fun) ? fun.name : name,
    };
}

/**
 * 将函数信息转成字符串
 * @param funInfo 函数信息
 */
function funToString(funInfo: FunctionInfo): string {
    const indent = "    ";
    if (!funInfo.name && funInfo.lambda) {
        return `${funInfo.async ? 'async ' : ''}(${funInfo.params.join(", ")}) => {\n${indent}${funInfo.body}\n}`;
    }
    return `${funInfo.async ? 'async ' : ''}function${funInfo.name ? (' ' + funInfo.name) : ''}(${funInfo.params.join(", ")}) {\n${indent}${funInfo.body}\n}`;
}

/**
 * 将 funInfo 还原成函数对象
 * @param funInfo 函数信息
 */
function createFun(funInfo: FunctionInfo): Function {
    if (funInfo.name) {
        return new Function([funToString(funInfo), `return ${funInfo.name};`].join("\n"))();
    } else {
        return new Function(`return ${funToString(funInfo)}`)();
    }
}

/**
 * 将一行或者代码合并成一个代码块字符串
 */
function codeToString(code?: string | Array<string>) {
    if (!code) return '';
    if (isArray(code)) return code.join("\n");
    return code;
}

export {
    parseFun,
    funToString,
    createFun,
    codeToString,
}
