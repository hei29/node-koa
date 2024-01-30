const Router = require('@koa/router');
const router = new Router({prefix: '/goods'});
const { 
    list, 
    addGoods, 
    updateGoods, 
    removeGoods, 
    restoreGoods,
    findAll
} = require('../controller/goods.controller');
const { jwtParserAuth, isAdmin } = require('../middleware/user.middleware');
const { validator } = require('../middleware/goods.middleware');

router.get('/list', list)
router.post('/add', validator, jwtParserAuth, isAdmin, addGoods)
router.put('/:id', validator, jwtParserAuth, isAdmin, updateGoods)
// 删除商品
// router.delete('/:id', jwtParserAuth, isAdmin, removeGoods)
// 下架商品
router.post('/:id/off', jwtParserAuth, isAdmin, removeGoods)
// 上架商品
router.post('/:id/on', jwtParserAuth, isAdmin, restoreGoods)
router.get('/', findAll)

module.exports = router;