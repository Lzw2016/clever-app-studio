const utils = require('./utils');
const cacheTarget = utils.cacheTarget;
const config = utils.config;

// 静态文件映射配置(静态文件 (path支持“字符串”、“字符串模式”、“正则表达式”)),
// 参考: https://www.expressjs.com.cn/4x/api.html#express.static
const staticConfig = [
    {
        path: "/",
        location: "../../dist/",
        gzFirst: true,
        options: {
            index: ['index.html'],
            maxAge: 0,
        },
    },
    {
        path: "/assets",
        location: "../../dist/assets/",
        gzFirst: true,
        options: {
            maxAge: 31536000,
        },
    },
    {
        path: "/font",
        location: "../../dist/font/",
        gzFirst: true,
        options: {
            maxAge: 31536000,
        },
    },
];

// 代理配置(path支持“字符串”、“字符串模式”、“正则表达式”)
// 参考: https://github.com/chimurai/http-proxy-middleware
const proxyConfig = [
    // {
    //     path: "/public/*",
    //     target: "https://cdn.jsdelivr.net/",
    //     options: {
    //         pathRewrite: { '^/public/': '' },
    //         onProxyRes: cacheTarget,
    //     },
    // },
    // {
    //     path: "/*",
    //     target: "http://122.9.140.63:8095",
    //     options: {
    //         autoRewrite: true,
    //     },
    // },
];

exports.staticConfig = staticConfig;
exports.proxyConfig = proxyConfig;
