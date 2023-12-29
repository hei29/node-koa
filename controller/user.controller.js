const db = require('../db/seq.js');
const jwt = require('jsonwebtoken');
const { JWTSECRETKEY } = require('../config/config.default.js');
const { create, getUserInfo, update } = require('../server/user.server.js');
const { userRegisterError } = require('../constant/err.type.js');

class Controller {
    async list(ctx, next) {
        const str = 'select * from userinfo';
        await db.query(str, []).then(res => {
            ctx.body = {
                status: 200,
                message: 'ok',
                data: res[0]
            };
        }).catch(err => {
            return console.error('查询出错', err);
        });
    }

    async login(ctx, next) {
        const body = ctx.request.body;
        console.log(process.env.JWTSECRETKEY, 23);
        // token
        const token = jwt.sign({
            data: body.username,
            // exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        }, JWTSECRETKEY, {expiresIn: '1d'}) // 也可以写作expiresIm: 60 * 60 * 24
        // session
        // ctx.session.userinfo = body.user;
        // cookie
        const isCookie = ctx.cookies.get('set_token');
        // 设置cookie有效期
        !isCookie && ctx.cookies.set('set_token', 'Bearer ' + token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: false,
        })

        ctx.body = {
            status: 200,
            message: '登录成功',
            token
        }
        await next()
    }

    async register(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            const res = await create(username, password);
            ctx.body = {
                code: 200,
                message: '注册成功',
                data: {
                    id: res.id,
                    username: res.username
                }
            }
        } catch (error) {
            ctx.app.emit('error', userRegisterError, ctx);
            return
        }
        
        await next()
    }

    async queryUserInfo(ctx, next) {
        const { username } = ctx.request.query;
        const res = await getUserInfo({ username });
        ctx.body = {
            status: 200,
            message: '获取成功',
            data: res
        }
        await next()
    }
    
    async changePassword(ctx, next) {
        const { username } = ctx.request.auth;
        const res = await update(username, ctx.request.body);
        ctx.body = {
            status: 200,
            message: '修改成功',
            data: res
        }
    }

    async info(ctx, next) {
        // token解析数据默认放在ctx.state.user
        const {data} = ctx.state.user;
        ctx.body = {
            status: 200,
            message: '获取成功',
            data
        }
        await next()
    }

    async add(ctx, next) {
        const body = ctx.request.body;
        const str = 'insert into userinfo (username, password) values (?, ?)';
        await db.query(str, [body.username, body.password]).then(res => {
            ctx.body = {
                status: 200,
                message: '添加成功',
                data: res
            }
        }).catch(err => {
            return console.error('添加出错', err);
        });
        next();
    }

}

module.exports = new Controller();