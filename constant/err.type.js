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
    },
    isNotAdmin: {
        code: 403,
        message: '没有管理员权限',
        result: ''
    },
    apiServerErr: {
        code: 500,
        message: '接口请求异常，服务器错误',
        result: ''
    },
    fileUploadErr: {
        code: 500,
        message: '文件上传失败',
        result: ''
    }
}