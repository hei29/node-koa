const Router = require('@koa/router');
const router = new Router({prefix: '/goods'});
const { list, addGoods, updateGoods } = require('../controller/goods.controller');
const { jwtParserAuth, isAdmin } = require('../middleware/user.middleware')

router.get('/list', list)
router.post('/add', jwtParserAuth, isAdmin, addGoods)
router.put('/:id', jwtParserAuth, isAdmin, updateGoods)

module.exports = router;