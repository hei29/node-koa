const router = require('@koa/router')()
const {list} = require('../controller/hero.controller.js');
router.prefix('/hero');

router.get('/list', list)

module.exports = router;