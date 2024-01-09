class Controller {
    async uploads(ctx, next) {
        const file = ctx.request.files.file;
        if(file) {
            // const { path: filePath, name: fileName } = file;
            // ctx.body = {
            //     status: 200,
            //     message: '上传成功',
            //     data: {
            //         filePath,
            //         fileName
            //     }
            // }
            ctx.body = {
                status: 200,
                message: '上传成功',
                data: file
            }
        }
    }
}

module.exports = new Controller();