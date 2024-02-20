const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');

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

    async findCarts(user_id) {
        try {
            const res = await Cart.findAll({
                where: {
                    user_id
                },
                attributes: ['id', 'user_id', 'number', 'selected'],
                include: {
                    model: Goods,
                    as: 'goods_info',
                    attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
                }
            })
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(params) {
        const { id, number, selected } = params;
        const res = await Cart.findByPk(id);
        if(!res) return null;
        number !== undefined ? res.number = number : null;
        selected !== undefined ? res.selected = selected : null;
        return await res.save();
    }

    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    async isSelectAllCarts(user_id, selected) {
        return await Cart.update({
            selected
        }, {
            where: {
                user_id
            }
        })
    }
}

module.exports = new CartServer();