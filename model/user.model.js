const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq.js');

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 唯一
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {
    // freezeTableName: true, // 强制表面等于模型名称(user)
    // tableName: 'user', // 直接定义表名
});


module.exports = User;
// 创建表，如果表已经存在，则将其首先删除
// User.sync({ force: true })