const { Op } = require('sequelize');
const Cart = require('../model/cart.model');

class CartServer {
    async createOrUpdateCart(user_id, goods_id) {
        const res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })
        if (res) {
            return await res.increment('number', { by: 1 });
        } else {
            return await Cart.create({
                user_id,
                goods_id
            });
        }
    }
}

module.exports = new CartServer();