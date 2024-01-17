const db = require('../db/seq.js');
const jwt = require('jsonwebtoken');
const { JWTSECRETKEY } = require('../config/config.default.js');
const bcrypt = require('bcryptjs');
const { create, selectAll, update, dele } = require('../server/user.server.js');
const {
    apiServerErr,
    paramsValidateError
} = require('../constant/err.type.js');

class Controller {
    async list(ctx, next) {
        try {
            ctx.verifyParams({
                id: { type: 'int', required: false },
                username: { type: 'string', required: false },
                age: { type: 'int', required: false },
                isAdmin: { type: 'boolean', required: false},
                gender: { type: 'boolean', required: false }
            })
            const params = ctx.request.query;
            const res = await selectAll(params);
            ctx.body = {
                status: 200,
                message: '获取成功',
                data: res
            }
        } catch (error) {
            return ctx.app.emit('error', paramsValidateError, ctx)
        }
    }

    async login(ctx, next) {
        const { password, ...res } = ctx.request.body;
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
            code: 200,
            message: '登录成功',
            token
        }
    }

    async register(ctx, next) {
        try {
            ctx.verifyParams({
                username: { type: 'string', required: true },
                password: { type: 'string', required: true },
                age: { type: 'int', required: false },
                isAdmin: { type: 'boolean', required: false},
                gender: { type: 'boolean', required: false }
            })
            const res = await create(ctx.request.body);
            ctx.body = {
                code: 200,
                message: '注册成功',
                data: {
                    id: res.id,
                    username: res.username
                }
            }
        } catch (error) {
            if (error.name === 'UnprocessableEntityError') return ctx.app.emit('error', paramsValidateError, ctx)
            ctx.app.emit('error', apiServerErr, ctx);
        }
    }

    async modifyUser(ctx, next) {
        try {
            const { username } = ctx.request.auth;
            const { password, ...params } = ctx.request.body;
            const res = await update({ username }, params);
            if (res) {
                ctx.body = {
                    status: 200,
                    message: '修改成功',
                    data: res
                }
            }
        } catch (error) {
            ctx.app.emit('error', apiServerErr, ctx);
        }
    }
    
    async changePassword(ctx, next) {
        try {
            const { username } = ctx.request.auth;
            const { password } = ctx.request.body;
            const res = await update({ username }, { password });
            if(res) {
                ctx.body = {
                    status: 200,
                    message: '修改成功',
                    data: res
                }
                // 修改完密码后删除cookie
                ctx.cookies.set('set_token', '', {
                    maxAge: 0
                })
            }
        } catch (error) {
            ctx.app.emit('error', apiServerErr, ctx);
        }
    }

    // 重置密码
    async resetPassword(ctx, next) {
        try {
            const { id } = ctx.request.query;
            // 加盐
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync('123456', salt);
            const res = await update({ id }, { password: hash });
            if (res) {
                ctx.body = {
                    status: 200,
                    message: '重置成功',
                    result: res
                }
                ctx.cookies.set('set_token', '', {
                    maxAge: 0
                })
            }
        } catch (error) {
            ctx.app.emit('error', apiServerErr, ctx);
        }
    }

    async deleteUser(ctx, next) {
        try {
            const { id } = ctx.request.body;
            const res = await dele(id);
            if (res) {
                ctx.body = {
                    status: 200,
                    message: '删除成功'
                }
            }
        } catch (error) {
            ctx.app.emit('error', apiServerErr, ctx);
        }
    }

}

module.exports = new Controller();