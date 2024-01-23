const sequelize = require('../db/seq.js');
const { DataTypes } = require('sequelize');

const Goods = sequelize.define('goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称',
        // unique: true, // 唯一
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格',
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片的url'
    },
})

// Goods.sync({alter: true})

module.exports = Goods;