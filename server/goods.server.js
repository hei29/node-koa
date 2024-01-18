const Goods = require('../model/goods.model.js');

class GoodsServer {
    async selcetAll(params) {
        const res = await Goods.findAll({
            where: params
        })
        return res;
    }
}

module.exports = new GoodsServer();