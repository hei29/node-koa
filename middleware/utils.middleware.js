const jwt = require('jsonwebtoken');
const { JWTSECRETKEY } = require('../config/config.default.js');
const {
    isNotToken,
    tokenExpiredError,
    jsonWebTokenError,
    tokenError,
    isNotAdmin
} = require('../constant/err.type.js');

class utilsMiddleware {
    // 解析token(验证是否登录)
    async jwtParserAuth(ctx, next) {
        const { authorization } = ctx.request.header;
        const token = authorization ? authorization.replace('Bearer ', '') : '';
        if(!token) return ctx.app.emit('error', isNotToken, ctx)
        try {
            const data = jwt.verify(token, JWTSECRETKEY);
            ctx.state.auth = data;
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
            return;
        }
        await next();
    }

    async isAdmin(ctx, next) {
        const { isAdmin } = ctx.state.auth;
        if(!isAdmin) return ctx.app.emit('error', isNotAdmin, ctx)
        await next();
    }

    validator(rules, paramsValidateError) {
        return async (ctx, next) => {
        try {
            if (!(rules instanceof Object && Object.keys(rules).length !== 0)) {
            throw new Error('rules must be an object');
            }
            // goods_id: 'number' // 相当于 { type: 'number', required: true }
            ctx.verifyParams(rules);
        } catch (error) {
            paramsValidateError.result = error;
            return ctx.app.emit('error', paramsValidateError, ctx, { errApi: 'utils.middleware-validator', paramsValidateError });
        }
        await next();
        };
    }
}

module.exports = new utilsMiddleware();