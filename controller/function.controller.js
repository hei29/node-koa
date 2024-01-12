const { unsupportedFileType } = require('../constant/err.type');

class Controller {
    async uploads(ctx, next) {
        const file = ctx.request.files.file;
        if(file) {
            const supportType = ['image/png', 'image/jpeg', 'image/gif'];
            const reg = new RegExp(`^(${supportType.join('|')})$`, 'i');
            if(file instanceof Array) {
                const typeCheck = file.map(item => {
                    if(!reg.test(item.mimetype)) return false;
                })
                if(typeCheck.includes(false)) {
                    return ctx.app.emit('error', unsupportedFileType, ctx);
                }
            } else {
                if(!reg.test(file.mimetype)) {
                    return ctx.app.emit('errot', unsupportedFileType, ctx);
                }
            }
            ctx.body = {
                status: 200,
                message: '上传成功',
                data: file
            }
        }
    }
}

module.exports = new Controller();