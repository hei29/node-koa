const { createOrUpdateCart } = require('../service/cart.service');

class CartController {
    async add(ctx) {
        // 将商品添加到购物车
        ctx.body = '添加购物车成功';
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
    }
}

module.exports = new CartController();