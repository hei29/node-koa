const { createOrUpdateCart, findCarts } = require('../server/cart.server');

class CartController {
    async add(ctx) {
        try {
            // 1. 解析user_id, goods_id
            const { id:user_id } = ctx.state.auth;
            const { goods_id } = ctx.request.body;
            // 2. 操作数据库
            const res = await createOrUpdateCart(user_id, goods_id);
            // 3. 返回结果
            ctx.body = {
                code: 0,
                message: '添加购物车成功',
                data: res
            }
        } catch (error) {
            console.log(error);
        }
    }

    async cartsList(ctx) {
        const { id } = ctx.state.auth;
        const res = await findCarts(id);

        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            data: res
        }
    }
}

module.exports = new CartController();