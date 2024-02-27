const {
    addOrder,
    findAllOrder,
    updateOrder
} = require('../service/order.service');

class OrderController {
    async add(ctx) {
        const { id } = ctx.state.auth;
        const orderNumber = 'order' + Date.now();
        const res = await addOrder({ ...ctx.request.body, orderNumber, userId: id });
        ctx.body = {
            code: 0,
            message: '添加订单成功',
            data: res
        }
    }

    async findAll(ctx) {
        console.log(ctx.query);
        const userId = ctx.state.auth.id;
        const { pageSize = 10, pageNum = 1, status } = ctx.query;
        const params = {
            pageSize,
            pageNum,
            userId
        }
        status && (params.status = status);
        const res = await findAllOrder(params);
        ctx.body = {
            code: 0,
            message: '获取订单成功',
            data: res
        }
    }

    async update(ctx) {
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        const res = await updateOrder(id, status);
        ctx.body = {
            code: 0,
            message: '更新订单状态成功',
            data: res
        }
    }
}

module.exports = new OrderController();