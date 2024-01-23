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
        return res;
    }
}

module.exports = new GoodsServer();