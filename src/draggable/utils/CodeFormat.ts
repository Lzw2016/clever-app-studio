import lodash from "lodash";
import prettier, { Options } from "prettier";
import Estree from "prettier/plugins/estree";
import Babel from "prettier/plugins/babel";

async function formatJavascript(source: string, options?: Options): Promise<string> {
    // 参考 https://www.prettier.cn/playground/
    const code = await prettier.format(source, {
        parser: 'babel',
        printWidth: 800,
        tabWidth: 4,
        singleQuote: true,
        plugins: [Estree, Babel],
        ...(options ?? {}),
    })
    return lodash.trim(code);
}

export {
    formatJavascript,
}
