const { paramsValidateError } = require('../constant/err.type');

class goodsMiddleware {
    async validateGoodsParams(ctx, next) {
        try {
            ctx.verifyParams({
                goods_name: { type: 'string', required: true },
                goods_price: { type: 'number', required: true },
                goods_num: { type: 'number', required: true },
                goods_img: { type: 'string', required: true, allowEmpty: true },
            })
            await next();
        } catch (error) {
            ctx.app.emit('error', paramsValidateError, ctx)
        }
    }
}

module.exports = new goodsMiddleware();