const koa = require('koa');
const path = require('path');
// 引入解析post的模块
const { koaBody } = require('koa-body');
const koaStatic = require('koa-static');
const onerror = require('koa-onerror');
const static = require('koa-static');
const cors = require('@koa/cors');
const session = require('koa-session');
const {accessLogger, logger} = require('../logger/index.js');

const router = require('../router');

const app = new koa();

app.use(static(__dirname + '/public')); // 配置静态资源目录
// 配置错误处理中间件
onerror(app);
// 配置访问日志中间件
app.use(accessLogger());
// 对cookie进行加密签名
app.keys = ['some secret hurr']
// 配置session中间件
const SESSION_CONFIG = {
    key: 'koa:session', // cookie键名
    maxAge: 86400000, // 有效期，默认一天
    httpOnly: true, // 仅服务器修改
    signed: true, // 签名cookie
}
app.use(session(SESSION_CONFIG, app));
// 配置post请求的中间件
app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        maxFileSize: 200 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
        // 尽量不要使用相对路径，这里的相对路径是相对于process.cwd()的，即项目根目录
        uploadDir: path.join(__dirname, '../public/uploads'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
    }
}));
app.use(koaStatic(path.join(__dirname, '../public/uploads')));

app.use(async (ctx, next) => {
    if(typeof ctx.request.body === 'string') {
        ctx.request.body = JSON.parse(ctx.request.body);
    }
    await next();
})

// 配置跨域中间件
app.use(cors({
    origin: (ctx) => { // 设置允许来自指定域名请求
        return 'http://localhost:8000'; // 只允许http://localhost:8080这个域名的请求
    },
    credentials: true, // 是否允许发送Cookie
}));

// 配置路由中间件
// allowedMethods() , 当ctx.status === 404或为空时，丰富response对象的header头
// 先判断是否存在对应的请求路由，如果存在，获取对应路由已存在的methods，返回405，设置响应头Allow: methods
// 如果请求的方法不是['get', 'post', 'put', 'head', 'delete', 'options', 'patch']中的一种，返回501
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {  
    if(ctx.url === '/favicon.ico') return;
    await next();
});

// 错误监听，后台报错
app.on('error', (err, ctx) => {
    // 利用logger.error打印错误日志
    logger.error(err);
    ctx.status = err.code || err.status || 500;
    ctx.body = err
});

module.exports = app;