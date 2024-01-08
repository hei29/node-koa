const router = require('@koa/router')();
router.prefix('/fn');

const { uploads } = require('../controller/function.controller.js');
const { 
    jwtParserAuth, 
    isAdmin 
} = require('../middleware/user.middleware.js');

router.post('/uploads', jwtParserAuth, isAdmin, uploads)

module.exports = router;