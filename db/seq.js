const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize(
//     'test',
//     'postgres',
//     'postgres',
//     {
//         host: 'localhost',
//         port: 3336,
//         dialect: 'postgres'
//     }
// )

// 方法二：使用连接 URI '使用数据库(mysql/postgres/...)://数据库账号:数据库密码@ip地址:端口/数据库名字' 
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:3336/test')


module.exports = sequelize