const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
    appenders: {
        // 访问日志
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 生成文件的规则
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(__dirname, 'logs', 'access.log') // 生成文件名
        },
        // 错误日志
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true, // 文件名始终以日期区分
            encoding: 'utf-8',
            filename: path.join(__dirname, 'logs', 'application.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        // 系统日志
        default: {
            appenders: ['out'],
            level: 'info'
        },
        // 访问日志
        access: {
            appenders: ['access'],
            level: 'info'
        },
        // 错误日志
        application: {
            appenders: ['application'],
            level: 'WARN'
        }
    }
});

module.exports = {
    // 访问日志
    accessLogger: () => log4js.koaLogger(log4js.getLogger('access')),
    // 应用日志
    logger: log4js.getLogger('application'),
}