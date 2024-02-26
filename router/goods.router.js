const Router = require('@koa/router');
const router = new Router({prefix: '/goods'});
const { paramsValidateError } = require('../constant/err.type');
const { 
    list, 
    addGoods, 
    updateGoods, 
    removeGoods, 
    restoreGoods,
    findAll
} = require('../controller/goods.controller');
const { jwtParserAuth, isAdmin, validator } = require('../middleware/utils.middleware');

router.get('/list', list)
router.post('/add', jwtParserAuth, validator({
    goods_name: { type: 'string', required: true },
    goods_price: { type: 'number', required: true },
    goods_num: { type: 'number', required: true },
    goods_img: { type: 'string', required: true, allowEmpty: true },
}, paramsValidateError), isAdmin, addGoods)
router.put('/:id', jwtParserAuth , validator({
    goods_name: { type: 'string', required: true },
    goods_price: { type: 'number', required: true },
    goods_num: { type: 'number', required: true },
    goods_img: { type: 'string', required: true, allowEmpty: true },
}, paramsValidateError), isAdmin, updateGoods)
// 删除商品
// router.delete('/:id', jwtParserAuth, isAdmin, removeGoods)
// 下架商品
router.post('/:id/off', jwtParserAuth, isAdmin, removeGoods)
// 上架商品
router.post('/:id/on', jwtParserAuth, isAdmin, restoreGoods)
router.get('/', findAll)

module.exports = router;