// 导入koa-router
const Router = require('@koa/router')
// 实例化router对象，可以设置前缀
const router = new Router({prefix: '/carts'})

// 中间件
const { 
    jwtParserAuth 
} = require('../middleware/user.middleware')
const {
    validator
} = require('../middleware/cart.middleware')
// 控制器
const {
    add
} = require('../controller/cart.controller')

// 编写路由
// 添加购物车 登录 格式校验
router.post('/', jwtParserAuth, validator, add)
// 导出路由
module.exports = router