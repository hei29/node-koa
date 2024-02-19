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
    add,
    findAll,
    update
} = require('../controller/cart.controller')

// 编写路由
// 添加购物车 登录 格式校验
router.post('/', jwtParserAuth, validator({
    goods_id: 'number'
}), add)

// 获取购物车列表
router.get('/', jwtParserAuth, findAll)

// 更新购物车
router.patch('/:id', jwtParserAuth, validator({
    number: { type: 'number', required: false },
    selected: { type: 'boolean', required: false }
}), update)
// 导出路由
module.exports = router