const sequelize = require('../db/seq');
const { DataTypes } = require('sequelize');
const Goods = require('./goods.model');

const Cart = sequelize.define('carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     comment: '创建时间',
    //     defaultValue: DataTypes.NOW,
    //     field: 'create_time' // 指定字段名，不然会使用默认字段createAt
    // },
    // updatedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     comment: '更新时间',
    //     defaultValue: DataTypes.NOW,
    //     field: 'update_time'
    // }
})

// Cart.sync({force: true})
Cart.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info'
})

module.exports = Cart;