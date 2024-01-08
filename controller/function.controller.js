class Controller {
    async uploads(ctx, next) {
        ctx.body = {
            status: 200,
            message: '上传成功'
        }
    }
}

module.exports = new Controller();