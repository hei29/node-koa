const Goods = require('../model/goods.model.js');

class GoodsServer {
    async selcetAll(params) {
        const res = await Goods.findAll({
            where: params
        })
        return res;
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
}

module.exports = new GoodsServer();