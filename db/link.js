// nodejs连接psql数据库

// 引入pg模块
const pg = require('pg');

// 配置连接参数
const config = {
    user: 'postgres',
    database: 'test',
    password: 'postgres',
    host: 'localhost',
    port: 3336,
    max: 10,
    idleTimeoutMillis: 3000
};

// 创建连接池
const pool = new pg.Pool(config);

// 导出查询方法
module.exports = {
    query: (sql, params) => {
        return new Promise((resolve, reject) => {
            pool.connect((err, client, done) => {
                if (err) {
                    reject(err)
                    return console.error('数据库连接出错', err);
                }
                client.query(sql, params, (err, result) => {
                    if (err) {
                        reject(err)
                        return console.error('数据库執行出错', err);
                    }
                    done();
                    resolve(result.rows || result)
                });
            });
        })
    }
};

// 使用方法
// const db = require('./link.js');
// db.query('select * from users', [], (err, result) => {
//     if (err) {
//         return console.error('查询出错', err);
//     }
//     console.log(result.rows);
// });

// 说明
// 1.导入模块
// 2.配置连接参数
// 3.创建连接池
// 4.导出查询方法
// 5.使用方法