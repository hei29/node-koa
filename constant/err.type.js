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
    },
    unsupportedFileType: {
        code: 400,
        message: '不支持的文件类型',
        result: ''
    },
    paramsValidateError: {
        code: 422,
        message: '参数校验失败',
        result: ''
    },
    addGoodsError: {
        code: 500,
        message: '添加商品失败',
        result: ''
    },
    updateGoodsError: {
        code: 500,
        message: '修改商品失败',
        result: ''
    },
    validGoodsID: {
        code: 400,
        message: '无效的商品ID',
        result: ''
    },
    removeGoodsError: {
        code: 500,
        message: '商品下架失败',
        result: ''
    },
    restoreGoodsError: {
        code: 500,
        message: '商品上架失败',
        result: ''
    },
    addressParamsValidateError: {
        code: 10401,
        message: '地址参数校验失败',
        result: ''
    },
    orderParamsValidateError: {
        code: 10501,
        message: '订单参数校验失败',
        result: ''
    }
}