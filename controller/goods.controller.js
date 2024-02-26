const { 
    selcetAll, 
    add, 
    update, 
    remove,
    restore ,
    findGoods
} = require('../service/goods.service.js');
const { 
    addGoodsError, 
    updateGoodsError, 
    validGoodsID, 
    removeGoodsError,
    restoreGoodsError
} = require('../constant/err.type.js');

class Controller {
    async list(ctx) {
        const params = ctx.request.query;
        const res = await selcetAll(params);
        ctx.body = {
            code: 0,
            message: '获取成功',
            data: res
        }
    }

    async addGoods(ctx) {
        try {
            const res = await add(ctx.request.body);
            ctx.body = {
                code: 0,
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
            if(res) {
                ctx.body = {
                    code: 0,
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

    async removeGoods(ctx) {
        try {
            const res = await remove(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '商品下架成功',
                    data: res
                }
            } else {
                return ctx.app.emit('error', validGoodsID, ctx, { errApi: 'goods.controller-removeGoods' })
            }
        } catch (error) {
            ctx.app.emit('error', removeGoodsError, ctx, { errApi: 'goods.controller-removeGoods', error })
        }
    }

    async restoreGoods(ctx) {
        try {
            const res = await restore(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '商品上架成功',
                    data: res
                }
            } else {
                return ctx.app.emit('error', validGoodsID, ctx, { errApi: 'goods.controller-restoreGoods' })
            }
        } catch (error) {
            ctx.app.emit('error', restoreGoodsError, ctx, { errApi: 'goods.controller-restoreGoods', error })
        }
    }

    async findAll(ctx) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query;
        const res = await findGoods(pageNum, pageSize);
        ctx.body = {
            code: 0,
            message: '获取成功',
            data: res
        }
    }
}

module.exports = new Controller();