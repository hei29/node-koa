const { 
    createOrUpdateCart, 
    findCarts, 
    updateCart,
    removeCarts,
    isSelectAllCarts
} = require('../service/cart.service');

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

    async findAll(ctx) {
        const { id } = ctx.state.auth;
        const res = await findCarts(id);

        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            data: res
        }
    }

    async update(ctx) {
        // 解析参数
        const { id } = ctx.params;
        const { number, selected } = ctx.request.body;
        // 操作数据库
        const res = await updateCart({ id, number, selected });
        // 返回结果
        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            data: res
        }
    }

    async remove(ctx) {
        const { ids } = ctx.request.body;
        const res = await removeCarts(ids);
        ctx.body = {
            code: 0,
            message: '删除购物车成功',
            data: res
        }
    }

    async isSelectAll(ctx) {
        const { id } = ctx.state.auth;
        const { selected } = ctx.request.body;
        const res = await isSelectAllCarts(id, selected);
        ctx.body = {
            code: 0,
            message: '全选或全不选购物车成功',
            data: res
        }
    }
}

module.exports = new CartController();