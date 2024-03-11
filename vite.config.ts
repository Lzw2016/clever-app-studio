import { resolve } from "path";
import { defineConfig, UserConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from 'vite-plugin-html';
import { compression } from 'vite-plugin-compression2'
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
                output: {
                    manualChunks: function (id) {
                        if (id.includes('lodash')) {
                            return 'lodash';
                        }
                        if (id.includes('@tabler/')) {
                            return 'tabler-icons';
                        }
                        if (id.includes('@fortawesome/')) {
                            return 'font-awesome-icon';
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
