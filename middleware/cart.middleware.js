const { paramsValidateError } = require('../constant/err.type');

class CartMiddleware {
    async validator(ctx, next) {
        try {
            ctx.verifyParams({
                goods_id: 'number' // 相当于 { type: 'number', required: true }
            })
        } catch (error) {
            return ctx.app.emit('error', paramsValidateError, ctx, { errApi: 'cart.middleware-validator', error })
        }
        await next();
    }
}

module.exports = new CartMiddleware();