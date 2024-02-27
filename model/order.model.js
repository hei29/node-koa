const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Order = seq.define('order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id'
    },
    goodsInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品信息'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '总价'
    },
    orderNumber: {
        type: DataTypes.CHAR(18),
        allowNull: false,
        comment: '订单号'
    },
    status: {
        type: DataTypes.ENUM('0', '1', '2', '3', '4'),
        allowNull: false,
        defaultValue: '0',
        comment: '订单状态 0未付款 1已付款 2已发货 3已收货 4已取消'
    }
}, {
    underscored: true,
    comment: '订单表'
})

// Order.sync({force: true})

module.exports = Order;