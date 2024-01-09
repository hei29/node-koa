const Router = require('@koa/router')
const router = new Router({prefix: '/userinfo'})
// router.prefix('/userinfo')

// const jwtParser = require('koa-jwt');
// const router = new Router()
const { JWTSECRETKEY:secret } = require('../config/config.default')

const { 
    list, 
    login, 
    register, 
    modifyUser,
    changePassword, 
    resetPassword,
    deleteUser
} = require('../controller/user.controller.js')
const { 
    userValidate, 
    userController, 
    bcryptPassword,
    verifyLogin,
    jwtParserAuth,
    isAdmin
} = require('../middleware/user.middleware.js');

// 永久重定向301，临时重定向302
router.get('/', ctx => {
    console.log('xxx');
    ctx.redirect('/userinfo/list');
    ctx.status = 302;
})

// 解析后的数据将会存在ctx.state.auth中，默认是存在ctx.state.user中
// router.use(jwtParser({secret, key: 'auth'}).unless({path: [/^\/userinfo\/login/, /^\/userinfo\/register/]}))

router.get('/list', jwtParserAuth, list)
router.post('/login', userValidate, verifyLogin, login)
router.post('/register', userValidate, userController, bcryptPassword, register)
router.post('/modifyUser', jwtParserAuth, modifyUser)
router.patch('/changePassword', jwtParserAuth, bcryptPassword, changePassword)
router.get('/resetPassword', jwtParserAuth, isAdmin, resetPassword)
router.post('/delete', jwtParserAuth, isAdmin, deleteUser)

module.exports = router