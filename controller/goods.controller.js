const { selcetAll, add, update } = require('../server/goods.server.js');
const { addGoodsError, updateGoodsError, validGoodsID } = require('../constant/err.type.js');

class Controller {
    async list(ctx) {
        const params = ctx.request.query;
        const res = await selcetAll(params);
        ctx.body = {
            status: 200,
            message: '获取成功',
            data: res
        }
    }

    async addGoods(ctx) {
        try {
            const res = await add(ctx.request.body);
            ctx.body = {
                status: 200,
                message: '添加成功',
                data: res
            }
        } catch (error) {
            ctx.app.emit('error', addGoodsError, ctx)
        }

    }

    async updateGoods(ctx) {
        try {
            const res = await update(ctx.params.id, ctx.request.body);
            if(res[0]) {
                ctx.body = {
                    status: 200,
                    message: '修改成功',
                    data: res
                }
            } else {
                ctx.app.emit('error', validGoodsID, ctx)
            }
            
        } catch (error) {
            ctx.app.emit('error', updateGoodsError, ctx)
        }
    }
}

module.exports = new Controller();