const Router = require('@koa/router');

const router = new Router({prefix: '/order'});

const {
    orderParamsValidateError
} = require('../constant/err.type');
const {
    jwtParserAuth,
    validator
} = require('../middleware/utils.middleware');
const {
    add,
    findAll,
    update
} = require('../controller/order.controller')

router.post('/', jwtParserAuth, validator({
    addressId: 'number',
    goodsInfo: 'string',
    total: 'string'
}, orderParamsValidateError), add)

router.get('/', jwtParserAuth, findAll)

router.patch('/:id', jwtParserAuth, validator({
    status: 'string'
}, orderParamsValidateError), update)

module.exports = router;