const path = require('path')
const fs = require('fs')
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

let cacheTargetData = {};
let saveCacheDataLock = false;
const config = {
    cmdOptions: {},
    cacheContentType: ['', 'javascript', 'json', 'css', 'html'],
};
let cacheGzipExists = {};

/**
 * 静态资源映射
 */
const applyStatic = (app, mapping) => {
    let absPath = mapping.location;
    if (!path.isAbsolute(absPath)) {
        absPath = path.join(__dirname, mapping.location);
    }
    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        ...(mapping.options || {}),
    };
    const staticCallback = express.static(absPath, {
        index: ['index.html'],
        ...options,
    });
    if (mapping.gzFirst === true) {
        console.log('静态文件(gz优先): ', mapping.path, '->', absPath);
        app.use(mapping.path, (req, res, next) => {
            const type = path.extname(req.originalUrl);
            const absGzipPath = path.join(absPath, req.originalUrl + '.gz');
            let exists = cacheGzipExists[absGzipPath];
            if (exists !== true && fs.existsSync(absGzipPath)) {
                cacheGzipExists[absGzipPath] = true;
                exists = true;
            }
            if (exists === true) {
                try {
                    res.setHeader('Content-Encoding', 'gzip');
                    res.sendFile(absGzipPath, options);
                    res.type(type || 'gzip');
                    return;
                } catch (err) {
                    console.error('静态文件(gz优先)异常', err);
                }
            }
            return staticCallback(req, res, next);
        });
    } else {
        console.log('静态文件: ', mapping.path, '->', absPath);
        app.use(mapping.path, staticCallback);
    }
};

/**
 * 应用代理配置
 */
const applyProxy = (app, proxy) => {
    console.log('代理配置: ', proxy.path, '->', proxy.target);
    const proxyHandler = createProxyMiddleware({
        target: proxy.target,
        changeOrigin: true,
        proxyTimeout: 1000 * 60 * 2,
        onError: (err, req, res) => {
            console.error('代理异常', err);
            errorHandler(err, req, res, null);
        },
        onProxyReq: (proxyReq, req, res) => {
            if (config.cmdOptions.debug) {
                console.log(
                    `代理请求 ${req.protocol}://${req.headers.host}${req.originalUrl ?? ''}`,
                    '->',
                    `${proxyReq.protocol}//${proxyReq.getHeader('host')}${proxyReq.path ?? ''}`,
                );
            }
        },
        onProxyRes: (proxyRes, req, res) => {
        },
        ...(proxy.options || {}),
    });
    app.use(proxy.path, proxyHandler);
};

/**
 * 从文件加载缓存数据
 */
const loadCacheData = () => {
    if (!fs.existsSync(config.cmdOptions.file)) return;
    const data = fs.readFileSync(config.cmdOptions.file, { encoding: 'utf-8' });
    if (!data || data.trim().length <= 0) return;
    cacheTargetData = JSON.parse(data);
};

/**
 * 保存缓存数据到文件
 */
const saveCacheData = () => {
    if (saveCacheDataLock) return;
    saveCacheDataLock = true;
    const data = JSON.stringify(cacheTargetData, null, 2);
    if (!fs.existsSync(config.cmdOptions.file)) {
        fs.mkdirSync(path.dirname(config.cmdOptions.file), { recursive: true });
    }
    fs.writeFile(config.cmdOptions.file, data, { encoding: 'utf-8', flag: 'w' }, err => {
        saveCacheDataLock = false;
    });
};

/**
 * 缓存被代理的远端服务响应数据
 */
const cacheTarget = (proxyRes, req, res) => {
    // 当前 content-type 是否支持远端响应数据缓存
    const contentType = proxyRes.headers['content-type'] || '';
    if (!config.cacheContentType.some(type => contentType.includes(type))) return;
    if (proxyRes.statusCode < 200 || proxyRes.statusCode >= 400) return;
    const cacheKey = `${req.originalUrl}(${proxyRes.statusCode})`;
    const dataChunks = [];
    proxyRes.on('data', (chunk) => dataChunks.push(chunk));
    proxyRes.on('end', () => {
        const bodyBuffer = Buffer.concat(dataChunks).toString('base64');
        cacheTargetData[cacheKey] = {
            statusCode: proxyRes.statusCode,
            statusMessage: proxyRes.statusMessage,
            headers: proxyRes.headers,
            body: bodyBuffer,
        };
        saveCacheData();
    });
};

/**
 * 使用缓存数据响应
 */
const useCacheData = (req, res, next) => {
    const cacheControl = (req.header('cache-control') || '').trim();
    const ifModifiedSince = (req.header('if-modified-since') || '').trim();
    const ifNoneMatch = (req.header('if-none-match') || '').trim();
    const use304 = cacheControl.includes('max-age') && ifModifiedSince && ifNoneMatch;
    let cacheEntry;
    if (use304) {
        cacheEntry = cacheTargetData[`${req.originalUrl}(304)`];
    } else {
        cacheEntry = cacheTargetData[`${req.originalUrl}(200)`];
    }
    if (cacheEntry) {
        res.writeHead(cacheEntry.statusCode, cacheEntry.statusMessage, cacheEntry.headers);
        res.end(Buffer.from(cacheEntry.body, 'base64'));
        if (config.cmdOptions.debug) {
            console.log(`使用缓存 ${req.protocol}://${req.headers.host}${req.originalUrl ?? ''}`,);
        }
        return;
    }
    return next();
};

/**
 * 请求日志
 */
const logHandler = (req, res, next) => {
    const startTime = new Date().getTime();
    if (config.cmdOptions.debug) {
        res.once('finish', () => {
            const endTime = new Date().getTime();
            console.log(`[${req.method}] ${req.path ?? ""} | [${res.statusCode}] | ${endTime - startTime}ms`);
        });
    }
    return next();
}

/**
 * 404 处理
 */
const notFoundHandler = (req, res, next) => {
    res.writeHead(404, { 'Content-Type': 'application/json;charset=UTF-8' });
    res.end(JSON.stringify({
        timestamp: Date.now(),
        error: "Not found",
        status: 404,
        exception: "Not found",
        message: "Not found",
        path: req.path,
    }));
}

/**
 * 500 处理
 */
const errorHandler = (err, req, res, next) => {
    res.writeHead(500, { 'Content-Type': 'application/json;charset=UTF-8' });
    res.end(JSON.stringify({
        timestamp: Date.now(),
        error: err.message || "Internal Server Error",
        status: 500,
        exception: "Internal Server Error",
        message: "Internal Server Error",
        path: req.path,
    }));
}

exports.config = config;
exports.applyStatic = applyStatic;
exports.applyProxy = applyProxy;
exports.loadCacheData = loadCacheData;
exports.saveCacheData = saveCacheData;
exports.cacheTarget = cacheTarget;
exports.useCacheData = useCacheData;
exports.logHandler = logHandler;
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
