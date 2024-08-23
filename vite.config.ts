import { resolve } from "path";
import { defineConfig, HtmlTagDescriptor, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import { compression } from "vite-plugin-compression2";
import svgLoader from "vite-svg-loader";
import dayjs from "dayjs";
import allEnv from "./env.config";
import pkg from "./package.json";

export default defineConfig(env => {
    const isBuild = env.command === 'build';
    const mode = env.mode;
    const envConfig = allEnv[mode];
    const appInfo: AppInfo = {
        isBuild: isBuild,
        mode: mode,
        envConfig: envConfig,
        name: pkg.name || 'app',
        version: pkg.version || '1.0.0',
        buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const externalLibs = [
        // "vue",
        // "vue-router",
        // "vue-i18n",
        // "pinia",
        // "pinia-plugin-persistedstate",
        // "@vueuse/core",
        // "@vueuse/components",
        // "csstype",
        // "lodash",
        // "dayjs",
        // "localforage",
        // "numeral",
        // "axios",
        // "qs",
        // "mitt",
        // "hotkeys-js",
        // "@fortawesome/fontawesome-svg-core",
        // "@fortawesome/free-solid-svg-icons",
        // "@fortawesome/free-regular-svg-icons",
        // "@fortawesome/free-brands-svg-icons",
        // "@fortawesome/vue-fontawesome",
        // "@tabler/icons-vue",
        // "codemirror",
        // "codemirror-editor-vue3",
        // "monaco-editor",
        // "@guolao/vue-monaco-editor",
        // "sortablejs",
        // "@opentiny/vue",
        // "@opentiny/vue-locale",
        // "primevue",
        // "ant-design-vue",
    ];
    const injectTags: Array<HtmlTagDescriptor> = [];
    if (isBuild) {
        // const resourcePrefix = "https://cdn.jsdelivr.net";
        // injectTags.push({
        //     tag: 'link',
        //     attrs: {
        //         rel: 'stylesheet',
        //         type: 'text/css',
        //         href: `${resourcePrefix}/font-awesome.css`,
        //     },
        // });
        // injectTags.push([
        //     "https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.runtime.global.prod.js",
        //     "https://cdn.jsdelivr.net/npm/vue-demi@0.14.7/lib/index.iife.js",
        //     "https://cdn.jsdelivr.net/npm/vue-router@4.3.0/dist/vue-router.global.prod.js",
        //     "https://cdn.jsdelivr.net/npm/vue-i18n@9.10.2/dist/vue-i18n.runtime.global.prod.js",
        //     "https://cdn.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.prod.js",
        // ].map(item => ({
        //     tag: 'script',
        //     attrs: {
        //         // type: "module",
        //         // src: "https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.runtime.esm-browser.prod.js",
        //         src: item,
        //     },
        // })));
    }
    const config: UserConfig = {
        base: '/',
        publicDir: 'public',
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        define: {
            __APP_INFO__: JSON.stringify(appInfo),
        },
        css: {},
        assetsInclude: [
            '**/*.png',
            '**/*.jpg',
            '**/*.jpeg',
            '**/*.gif',
            '**/*.ico',
            '**/*.svg',
        ],
        server: {
            host: envConfig.serverHost,
            port: envConfig.serverPort,
            open: false,
            cors: true,
            proxy: {
                '^/api/.*': {
                    target: envConfig.apiTarget,
                    changeOrigin: false,
                },
            },
        },
        preview: {
            port: envConfig.serverPort,
        },
        plugins: [
            vue({}),
            vueJsx({}),
            svgLoader({}),
            legacy({
                targets: ['>= 0.03%, android >= 4'],
            }),
            createHtmlPlugin({
                entry: 'src/main.ts',
                template: 'index.html',
                inject: {
                    data: {
                        title: envConfig.htmlTitle,
                    },
                    tags: injectTags,
                },
                minify: isBuild,
            }),
        ],
        build: {
            // target: 'es2015',
            outDir: 'dist',
            assetsInlineLimit: 4096,
            sourcemap: true,
            minify: 'esbuild',
            reportCompressedSize: true,
            chunkSizeWarningLimit: 512,
            rollupOptions: {
                external: externalLibs,
                output: {
                    // format: 'umd',
                    // globals: {
                    //     vue: 'Vue',
                    //     pinia: 'Pinia',
                    // },
                    manualChunks: function (id) {
                        // if (id.includes('/node_modules/')) {
                        //     console.log("id->", id);
                        // }
                        if (id.includes('/mitt/')) {
                            return 'mitt';
                        }
                        if (id.includes('/lodash/') || id.includes('/lodash-es/')) {
                            return 'lodash';
                        }
                        if (id.includes('@fortawesome/')) {
                            return 'font-awesome-icon';
                        }
                        if (id.includes('/GoogleIconsAll')) {
                            return 'google-icon';
                        }
                        if (id.includes('@tabler/icons')) {
                            return 'tabler-icons';
                        }
                        if (id.includes('@opentiny/')) {
                            return 'opentiny';
                        }
                        if (id.includes('/sortablejs/')) {
                            return 'sortablejs';
                        }
                        if (id.includes('/vue-draggable-plus/')) {
                            return 'vue-draggable-plus';
                        }
                        if (id.includes('@layui/')) {
                            return 'layui';
                        }
                        if (id.includes('/codemirror/') || id.includes('/codemirror-editor-vue3/')) {
                            return 'codemirror';
                        }
                        if (id.includes('/monaco-editor/') || id.includes('@guolao/vue-monaco-editor')) {
                            return 'monaco-editor';
                        }
                        if (id.includes('/prettier/')) {
                            return 'prettier';
                        }
                        if (id.includes('/draggable/register/meta/')) {
                            return 'components-meta';
                        }
                    },
                },
            },
        },
    };
    if (isBuild) {
        // 资源压缩插件
        config.plugins?.push(compression({
            algorithm: "gzip",
            skipIfLargerOrEqual: false,
        }));
    }
    return config;
});
