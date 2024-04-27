import lodash from "lodash";
import { hasValue, isArray, isObj } from "@/utils/Typeof";

/** 模拟休眠 */
function sleep(times: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), times));
}

/**
 * 函数信息
 */
interface FunctionInfo {
    /** 是否是异步函数 */
    async: boolean;
    /** 函数名 */
    name?: string;
    /** 函数参数 */
    params: Array<string>;
    /** 函数体 */
    body: string;
    /** 是否是 lambda 形式的函数 */
    lambda: boolean;
}

/**
 * 解析函数的正则(非lambda函数)
 * 1. /^....$/
 *      从开头到结尾匹配整个字符串
 * 2. (async\s+)?
 *      可选的 async 关键字捕获组
 * 3. function\s*
 *      function 关键字
 * 4. ([\w_$]*)?
 *      可选的函数名
 * 5. (\([^)]*\))\s*
 *      函数参数捕获组
 * 6. (\{[^}]*})
 *      函数体
 */
const funPattern = /^(async\s+)?function\s*([\w_$]*)?\s*(\([^)]*\))\s*(\{[^}]*})$/;

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
function parseFun(fun: Function): FunctionInfo | undefined {
    const code = lodash.trim(fun.toString());
    let match = code.match(funPattern);
    let async: string;
    let name: string | undefined;
    let params: string;
    let body: string;
    let lambda: boolean;
    if (match) {
        async = lodash.trim(match[1]);
        name = match[2];
        if (hasValue(name)) name = lodash.trim(name);
        params = lodash.trim(match[3]);
        body = lodash.trim(match[4]);
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
        params: params.split(",").map(name => lodash.trim(name)),
        body: body,
        lambda: lambda,
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
 * 把原始数据集合转换成批量数据集合
 * @param data      原始数据集合
 * @param batchSize 批量大小(默认：1000)
 */
function toBatch<T = any>(data: Array<T>, batchSize: number = 1000): Array<Array<T>> {
    const batchData: Array<Array<T>> = [];
    let batch: Array<T> = [];
    for (let item of data) {
        if (batch.length >= batchSize) {
            batchData.push(batch);
            batch = [];
        }
        batch.push(item);
    }
    if (batch.length > 0) {
        batchData.push(batch);
    }
    return batchData;
}

/**
 * 删除空属性
 * @param object    对象样式
 * @param createObj 是否创建新对象，不改变 object 对象
 */
function removeNullProperty(object: Record<string, any>, createObj: boolean): Record<string, any> {
    if (!object) return object;
    if (isObj(object) && !isArray(object)) {
        if (createObj) object = { ...object };
        for (let property in object) {
            const value = object[property];
            if (!hasValue(value)) {
                delete object[property];
            }
        }
    }
    return object;
}

/**
 * 覆写 sources 的所有属性到 object
 * @param object    被覆写的对象(会改变这个对象)
 * @param sources   数据源对象
 */
function overwriteProperty(object: Record<string, any>, sources: Record<string, any>) {
    for (let property in object) {
        if (!lodash.has(sources, property)) {
            delete object[property];
        }
    }
    for (let property in sources) {
        object[property] = sources[property];
    }
}

export {
    sleep,
    parseFun,
    funToString,
    toBatch,
    removeNullProperty,
    overwriteProperty,
}
