const router = require('@koa/router')()
router.prefix('/hero');
const {
    list,
    uploads
} = require('../controller/hero.controller.js');

const { 
    jwtParserAuth, 
    isAdmin 
} = require('../middleware/user.middleware.js');

router.get('/list', list)
router.post('/uploads', jwtParserAuth, isAdmin, uploads)

module.exports = router;