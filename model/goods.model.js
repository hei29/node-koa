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
    create_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '创建时间',
        defaultValue: DataTypes.NOW
    },
    update_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '更新时间',
        defaultValue: DataTypes.NOW
    },
    delete_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '删除时间',
    }
}, {
    // (paranoid: true 会使删除变为软删除)使用模型的destory方法删除数据时，不会真正的删除数据，而是设置一个deletedAt字段，表示删除的时间
    paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时). 
    freezeTableName: true, // 禁止修改表名
    // timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)默认为true
    createdAt: 'create_time', // 将createdAt字段改个名
    updatedAt: 'update_time', // 将updatedAt字段改个名
    deletedAt: 'delete_time', // 将deletedAt字段改个名
    underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式.
    comment: '商品表'
})

// Goods.sync({force: true})

module.exports = Goods;

