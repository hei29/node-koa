// 导入koa-router
const Router = require('@koa/router')
// 实例化router对象，可以设置前缀
const router = new Router({prefix: '/carts'})


const {
    paramsValidateError
} = require('../constant/err.type')
// 中间件
const { 
    jwtParserAuth,
    validator 
} = require('../middleware/utils.middleware')
// 控制器
const {
    add,
    findAll,
    update,
    remove,
    isSelectAll
} = require('../controller/cart.controller')

// 编写路由
// 添加购物车 登录 格式校验
router.post('/', jwtParserAuth, validator({
    goods_id: 'number'
}, paramsValidateError), add)

// 获取购物车列表
router.get('/', jwtParserAuth, findAll)

// 更新购物车
router.patch('/:id', jwtParserAuth, validator({
    number: { type: 'number', required: false },
    selected: { type: 'boolean', required: false }
}, paramsValidateError), update)

// 删除购物车
router.delete('/', jwtParserAuth, validator({
    ids: { type: 'array', itemType: 'number', required: true }
}, paramsValidateError), remove)

// 全选或全不选购物车
router.post('/isSelectAll', jwtParserAuth, validator({
    selected: 'boolean'
}, paramsValidateError), isSelectAll)
// 导出路由
module.exports = router