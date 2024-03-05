import type { TemplateExecutor, TemplateOptions } from "lodash";
import lodash from "lodash";
import { isArray } from "@/utils/Typeof";

// // 会输出动态内容的正则，默认：/<%=([\s\S]+?)%>/g
// lodash.templateSettings.interpolate = /<%=([\s\S]+?)%>/g
// // 会html转义的输出的正则，默认：/<%-([\s\S]+?)%>/g
// lodash.templateSettings.escape = /<%-([\s\S]+?)%>/g
// // 会执行流程计算(if/else/for...)的正则，默认：/<%([\s\S]+?)%>/g
// lodash.templateSettings.evaluate = /<%([\s\S]+?)%>/g
// // 用于导入自定义变量到模板中
// lodash.templateSettings.imports = {
//     ...lodash.templateSettings.imports,
// };

type TplOptions = TemplateOptions & { cache?: boolean; };

/** 模版编译结果缓存 */
const tplFunCache: Map<string, TemplateExecutor> = new Map<string, TemplateExecutor>();

/**
 * 编译模版
 * @param tpl       模版内容
 * @param options   编译选项
 */
function compileTpl(tpl: string | string[], options?: TplOptions): TemplateExecutor {
    if (isArray(tpl)) {
        tpl = tpl.join("\n");
    }
    if (tplFunCache.has(tpl)) {
        return tplFunCache.get(tpl)!;
    }
    const cache = options?.cache;
    try {
        // 这里暂时使用 lodash 的 template 功能，后面有需要可以换成 art-template
        // art-template 相对于 lodash template 优势:
        //  1.模版语法错误时能提示到具体的错误位置
        //  2.自带的模版语法更加简洁
        //  3.没有使用已经弃用的 with 关键字
        //  4.功能更加强大：支持过滤器语法，模版缓存，模版压缩
        const tplFun = lodash.template(tpl, options);
        if (cache) {
            tplFunCache.set(tpl, tplFun);
        }
        return tplFun;
    } catch (e) {
        throw new Error(`编译模版失败，模版内容: ${tpl}`, { cause: e });
    }
}

export {
    compileTpl,
}
