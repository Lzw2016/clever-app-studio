import lodash from "lodash";
import { isArray, isObj, noValue } from "@/utils/Typeof";

/** 模拟休眠 */
function sleep(times: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), times));
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
function removeNullProperty(object: Record<string, any>, createObj?: boolean): Record<string, any> {
    if (!object) return object;
    if (isObj(object) && !isArray(object)) {
        if (createObj) object = { ...object };
        for (let property in object) {
            const value = object[property];
            if (noValue(value)) {
                delete object[property];
            }
        }
    }
    return object;
}

interface OverwritePropertyOptions {
    /** 包含的属性 */
    includes?: Array<string>;
    /** 排除的属性 */
    excludes?: Array<string>;
    /** 忽略 sources 没有值的属性 */
    ignoreNoValue?: boolean;
}

/**
 * 覆写 sources 的所有属性到 object
 * @param object    被覆写的对象(会改变这个对象)
 * @param sources   数据源对象
 * @param options   扩展选项
 */
function overwriteProperty(object: Record<string, any>, sources: Record<string, any>, options?: OverwritePropertyOptions) {
    for (let property in object) {
        if (options?.includes && !options.includes.includes(property)) continue;
        if (options?.excludes && options.excludes.includes(property)) continue;
        if (!lodash.has(sources, property)) {
            delete object[property];
        }
    }
    for (let property in sources) {
        if (options?.includes && !options.includes.includes(property)) continue;
        if (options?.excludes && options.excludes.includes(property)) continue;
        const value = sources[property];
        if (options?.ignoreNoValue && noValue(value)) continue;
        object[property] = value;
    }
}

/**
 * 从 objects 中取出相同属性值的属性组成新对象
 * @param objects 对象集合
 */
function getSamePropertyObj(objects: Array<Record<string, any> | undefined | null>) {
    const res: Record<string, any> = {};
    if (objects.some(object => noValue(object))) return res;
    // 属性交集
    for (let object of objects) {
        for (let key in object) {
            res[key] = object[key];
        }
    }
    // 删除不一致的属性值
    for (let key in res) {
        const value = res[key];
        if (noValue(value)) {
            delete res[key];
        } else if (objects.some(object => object?.[key] !== value)) {
            delete res[key];
        }
    }
    return res;
}

export type {
    OverwritePropertyOptions,
}

export {
    sleep,
    toBatch,
    removeNullProperty,
    overwriteProperty,
    getSamePropertyObj,
}
