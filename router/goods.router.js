const Router = require('@koa/router');
const { list } = require('../controller/goods.controller');
const router = new Router({prefix: '/goods'});

router.get('/list', list)

module.exports = router;