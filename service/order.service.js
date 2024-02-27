const { Op } = require('sequelize');
const Order = require('../model/order.model');

class OrderService {
    async addOrder(order) {
        // console.log(order);
        return await Order.create(order);
    }

    async findAllOrder({pageSize, pageNum, ...limitParams}) {
        const { rows, count } = await Order.findAndCountAll({
            where: {
                [Op.and]: {
                    ...limitParams
                }
            },
            limit: pageSize,
            offset: (pageNum - 1) * pageSize
        })
        return {
            pageSize,
            pageNum,
            total: count,
            list: rows
        }
    }

    async updateOrder(id, status) {
        return await Order.update({
            status
        }, {
            where: {
                id
            }
        })
    }
}

module.exports = new OrderService();