const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWTSECRETKEY } = require('../config/config.default.js');
const { 
    userFormatEmpty, 
    userRepitition,
    userNotFound,
    userLoginError,
    invalidPassword,
    isNotToken,
    tokenExpiredError,
    jsonWebTokenError,
    tokenError
 } = require('../constant/err.type.js');
const { getUserInfo } = require('../server/user.server.js');

class UserMiddleware {
    // 判断用户名密码是否为空
    async userValidate(ctx, next) {
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.app.emit('error', userFormatEmpty, ctx);
            return
        }
        await next();

    }

    // 判断用户名是否重复
    async userController(ctx, next) {
        const { username } = ctx.request.body;
        const res = await getUserInfo({ username });
        if (res) {
            ctx.app.emit('error', userRepitition, ctx);
            return
        }
        await next();
    }

    // 密码加密
    async bcryptPassword(ctx, next) {
        const { password } = ctx.request.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt); // 密文
        ctx.request.body.password = hash;
        await next();
    }

    // 校验用户登录
    async verifyLogin(ctx, next) {
        const { username, password } = ctx.request.body;
        try {
            // 1.判断用户名是否存在
            const res = await getUserInfo({ username });
            if (!res) {
                ctx.app.emit('error', userNotFound, ctx);
                return
            }
            // 2.判断密码是否正确
            const { password: hash } = res;
            const isMatch = bcrypt.compareSync(password, hash);
            if (!isMatch) {
                ctx.app.emit('error', invalidPassword, ctx);
                return
            }
        } catch (error) {
            return ctx.app.emit('error', userLoginError, ctx);
        }
        await next();
    }


    // 解析token
    async jwtParserAuth(ctx, next) {
        const { authorization } = ctx.request.header;
        const token = authorization ? authorization.replace('Bearer ', '') : '';
        if(!token) return ctx.app.emit('error', isNotToken, ctx)
        try {
            const data = jwt.verify(token, JWTSECRETKEY);
            ctx.request.auth = data;
        } catch (error) {
            switch(error.name) {
                case 'TokenExpiredError':
                    ctx.app.emit('error', tokenExpiredError, ctx);
                    break;
                case 'JsonWebTokenError':
                    ctx.app.emit('error', jsonWebTokenError, ctx);
                    break;
                default:
                    ctx.app.emit('error', tokenError, ctx);
            }
        }
        await next();
    }
}

module.exports = new UserMiddleware();