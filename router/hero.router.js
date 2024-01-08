const router = require('@koa/router')()
router.prefix('/hero');
const {
    list,
} = require('../controller/hero.controller.js');

router.get('/list', list)

module.exports = router;