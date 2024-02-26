const Router = require('@koa/router');
const router = new Router({prefix: '/address'});

const {
    jwtParserAuth,
    validator
} = require('../middleware/utils.middleware');

const {
    add,
    findAll,
    update,
    remove,
    setDefault
} = require('../controller/address.controller');

const {
    addressParamsValidateError
} = require('../constant/err.type');
// 新增收货地址
router.post('/', jwtParserAuth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1[3-9]\d{9}$/ },
    address: 'string',
    isDefault: { type: 'boolean', required: true, default: false }
}, addressParamsValidateError), add)
// 查看收货地址
router.get('/', jwtParserAuth, findAll)
// 修改收货地址
router.put('/:id', jwtParserAuth, update)
// 删除收货地址
router.delete('/:id', jwtParserAuth, remove)
// 设置默认收货地址
router.patch('/:id', jwtParserAuth, setDefault)

module.exports = router;