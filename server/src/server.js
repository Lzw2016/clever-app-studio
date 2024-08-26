const path = require('path')
const { Command } = require('commander');
const express = require('express');
const compression = require('compression');
const utils = require('./utils');

// 命令行参数处理
const program = new Command();
program
    .version('0.0.1', '-v, --version')
    .option('-H, --host [host]', '监听IP地址', '0.0.0.0')
    .option('-P, --port [port]', '监听端口号', '3000')
    .option('-D, --debug [debug]', '是否debug', 'true')
    .option('-C, --compression [compression]', '是否启用gzip压缩', 'false')
    .option('-T, --target [target]', '目标地址', 'http://127.0.0.1:9090')
    .option('-F, --file [file]', 'cache文件', './cacheData.json')
    .on('--help', () => {
        console.log('');
        console.log('Examples:');
        console.log('  $ custom-port -P 9066');
    })
    .parse(process.argv);
const options = program.opts();
options.debug = (options.debug === 'true');
options.compression = (options.compression === 'true');
utils.config.cmdOptions = options;
const { staticConfig, proxyConfig } = require('./config');

// 启动服务
const start = Date.now();
console.log('服务启动中...');
const app = express();
// 不限制监听数量
app.setMaxListeners(300);
// 请求日志
app.use(utils.logHandler);
// 启用压缩
if (options.compression) {
    console.log("启用Gzip压缩");
    app.use(compression({}));
}
// 静态文件映射配置
staticConfig.forEach(mapping => utils.applyStatic(app, mapping));
// 应用代理配置
utils.loadCacheData();
app.use(utils.useCacheData);
proxyConfig.forEach(proxy => utils.applyProxy(app, proxy));
// 404 处理
app.use(utils.notFoundHandler);
// 500 处理
app.use(utils.errorHandler);
// 监听端口
app.listen(options.port, options.host, () => {
    console.log(`监听地址 -> [${options.host}:${options.port}]`);
    const startedTime = Date.now() - start;
    console.log(`服务启动成功,耗时[${startedTime}]ms`);
}).on("error", err => {
    if (err) {
        console.error("Web Server异常", err);
    }
});
