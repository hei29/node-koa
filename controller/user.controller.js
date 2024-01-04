const db = require('../db/seq.js');
const jwt = require('jsonwebtoken');
const { JWTSECRETKEY } = require('../config/config.default.js');
const { create, selectAll, getUserInfo, update, dele } = require('../server/user.server.js');
const { userRegisterError } = require('../constant/err.type.js');

class Controller {
    async list(ctx, next) {
        const res = await selectAll();
        ctx.body = {
            status: 200,
            message: '获取成功',
            data: res
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body;
        const { password, ...res } = await getUserInfo({ username });
        // token
        const token = jwt.sign(res, JWTSECRETKEY, {expiresIn: '1d'}) // 也可以写作expiresIm: 60 * 60 * 24
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
        const { password } = ctx.request.body;
        const res = await update(username, { password });
        ctx.body = {
            status: 200,
            message: '修改成功',
            data: res
        }
    }

    async deleteUser(ctx, next) {
        const { id } = ctx.request.body;
        const res = await dele(id);
        if (res) {
            ctx.body = {
                status: 200,
                message: '删除成功'
            }
        } else {
            ctx.body = {
                status: 400,
                message: '删除失败'
            }
        }
    }

}

module.exports = new Controller();