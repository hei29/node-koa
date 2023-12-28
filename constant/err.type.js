module.exports = {
    userFormatEmpty: {
        code: 400,
        message: '用户名或密码为空',
        result: ''
    },
    userRepitition: {
        code: 401,
        message: '用户名已存在',
        result: ''
    },
    userRegisterError: {
        code: 401,
        message: '用户注册错误',
        result: ''
    },
    userNotFound: {
        code: 401,
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: 401,
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: 401,
        message: '密码错误',
        result: ''
    },
    isNotToken: {
        code: 401,
        message: '无token，请重新登录',
        result: ''
    },
    tokenExpiredError: {
        code: 401,
        message: 'token已过期',
        result: ''
    },
    jsonWebTokenError: {
        code: 401,
        message: '无效的token',
        result: ''
    },
    tokenError: {
        code: 401,
        message: 'token错误',
        result: ''
    }
}