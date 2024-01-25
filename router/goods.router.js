const Router = require('@koa/router');
const router = new Router({prefix: '/goods'});
const { list, addGoods, updateGoods, removeGoods } = require('../controller/goods.controller');
const { jwtParserAuth, isAdmin } = require('../middleware/user.middleware');
const { validateGoodsParams } = require('../middleware/goods.middleware');

router.get('/list', list)
router.post('/add', validateGoodsParams, jwtParserAuth, isAdmin, addGoods)
router.put('/:id', validateGoodsParams, jwtParserAuth, isAdmin, updateGoods)
// 删除商品
router.delete('/:id', jwtParserAuth, isAdmin, removeGoods)
// 删除商品方法二

module.exports = router;