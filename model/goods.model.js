const sequelize = require('../db/seq.js');
const { DataTypes } = require('sequelize');

const Goods = sequelize.define('goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true, // 唯一
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

// Goods.sync({alter: true})

module.exports = Goods;