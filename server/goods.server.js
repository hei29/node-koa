const Goods = require('../model/goods.model.js');

class GoodsServer {
    async selcetAll(params) {
        try {
            const res = await Goods.findAll({
                where: params
            })
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async add(params) {
        const res = await Goods.create(params);
        return res;
    }

    async update(id, params) {
        const res = await Goods.update(params, {
            where: {
                id
            }
        })
        // res[0] 为受影响的行数
        return res[0] > 0 ? true : false;
    }

    async remove(id) {
        const res = await Goods.destroy({where: {id}});
        // res 为受影响的行数
        return res;
    }

    async restore(id) {
        const res = await Goods.restore({where: {id}});
        // res 为受影响的行数
        return res;
    }

    async findGoods(pageNum, pageSize) {
        console.log(pageSize, typeof pageSize);
        const { count: total, rows: list } = await Goods.findAndCountAll({
            offset: (pageNum - 1) * pageSize,
            limit: pageSize
        })
        return {
            pageNum,
            pageSize,
            total,
            list
        }
    }
}

module.exports = new GoodsServer();