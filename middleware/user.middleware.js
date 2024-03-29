const bcrypt = require('bcryptjs');

const { 
    userFormatEmpty, 
    userRepitition,
    userNotFound,
    userLoginError,
    invalidPassword,
    paramsValidateError
} = require('../constant/err.type.js');
const { getUserInfo } = require('../service/user.service.js');

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

    // 校验用户登录（账号密码是否正确）
    async verifyLogin(ctx, next) {
        try {
            ctx.verifyParams({
                username: { type: 'string', required: true },
                password: { type: 'string', required: true }
            })
            const { username, password } = ctx.request.body;
            // 1.判断用户名是否存在
            const res = await getUserInfo({ username });
            ctx.request.body = res;
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
            if (error.name === 'UnprocessableEntityError') return ctx.app.emit('error', paramsValidateError, ctx)
            return ctx.app.emit('error', userLoginError, ctx);
        }
        await next();
    }
}

module.exports = new UserMiddleware();