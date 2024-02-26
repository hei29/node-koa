const seq = require('../db/seq');
const { DataTypes } = require('sequelize');

const Adress = seq.define('adress', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人'
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '联系电话'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货地址'
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否设置为默认地址'
    }
}, {
    underscored: true,
    comment: '收货地址表'
})

// Adress.sync({force: true})

module.exports = Adress;