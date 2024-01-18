const { selcetAll } = require('../server/goods.server.js');

class Controller {
    async list(ctx) {
        const params = ctx.request.query;
        const res = await selcetAll(params);
        ctx.body = {
            status: 200,
            message: '获取成功',
            data: res
        }
    }
}

module.exports = new Controller();