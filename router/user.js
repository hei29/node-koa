const router = require('@koa/router')()

// const jwtParser = require('koa-jwt');
// const router = new Router()
const { JWTSECRETKEY:secret } = require('../config/config.default')

const { 
    list, 
    login, 
    register, 
    queryUserInfo, 
    changePassword, 
    deleteUser
} = require('../controller/user.controller.js')
const { 
    userValidate, 
    userController, 
    bcryptPassword,
    verifyLogin,
    jwtParserAuth
} = require('../middleware/user.middleware.js');

router.prefix('/userinfo')

// 永久重定向301，临时重定向302
router.get('/', ctx => {
    console.log('xxx');
    ctx.redirect('/userinfo/list');
    ctx.status = 302;
})

// 解析后的数据将会存在ctx.state.auth中，默认是存在ctx.state.user中
// router.use(jwtParser({secret, key: 'auth'}).unless({path: [/^\/userinfo\/login/, /^\/userinfo\/register/]}))

router.get('/list', list)
router.post('/login', userValidate, verifyLogin, login)
router.post('/register', userValidate, userController, bcryptPassword, register)
router.get('/queryUserInfo', queryUserInfo)
router.patch('/changePassword', jwtParserAuth, bcryptPassword, changePassword)
router.post('/delete', deleteUser)

module.exports = router